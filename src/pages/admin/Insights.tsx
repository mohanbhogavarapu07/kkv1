import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  publishedAt: string;
  isPublished: boolean;
  category?: string;
  featuredImage?: string;
  tags?: string[];
  date?: string;
  attachments?: {
    _id: string;
    name: string;
    url: string;
    type: string;
  }[];
}

const API_BASE_URL = 'https://kk-backend-wra3.onrender.com';

const Insights = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(true);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({
    title: '',
    content: '',
    excerpt: '',
    isPublished: false
  });
  const [attachments, setAttachments] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  // Initialize refs array
  useEffect(() => {
    otpInputRefs.current = otpInputRefs.current.slice(0, 6);
  }, []);

  // Check for existing session
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
      setShowAuthModal(false);
      fetchPosts();
    }
  }, []);

  // Request OTP
  const requestOTP = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('OTP sent to admin email');
        setShowOtpInput(true);
      } else {
        toast.error(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      toast.error('Error sending OTP');
    }
  };

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    // Only allow single digit numbers
    if (!/^\d*$/.test(value)) {
      return;
    }

    // Take only the last character if multiple characters are pasted
    const digit = value.slice(-1);
    
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Move to next input if a digit was entered
    if (digit && index < 5) {
      setTimeout(() => {
        const nextInput = otpInputRefs.current[index + 1];
        if (nextInput) {
          nextInput.focus();
        }
      }, 0);
    }
  };

  // Handle OTP input keydown
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // If current input is empty and backspace is pressed, move to previous input
        setTimeout(() => {
          const prevInput = otpInputRefs.current[index - 1];
          if (prevInput) {
            prevInput.focus();
          }
        }, 0);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      // Move to previous input on left arrow
      setTimeout(() => {
        const prevInput = otpInputRefs.current[index - 1];
        if (prevInput) {
          prevInput.focus();
        }
      }, 0);
    } else if (e.key === 'ArrowRight' && index < 5) {
      // Move to next input on right arrow
      setTimeout(() => {
        const nextInput = otpInputRefs.current[index + 1];
        if (nextInput) {
          nextInput.focus();
        }
      }, 0);
    }
  };

  // Handle paste event
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp];
      for (let i = 0; i < pastedData.length; i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);
      // Focus the next empty input or the last input
      setTimeout(() => {
        const nextEmptyIndex = newOtp.findIndex(digit => !digit);
        const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
        const nextInput = otpInputRefs.current[focusIndex];
        if (nextInput) {
          nextInput.focus();
        }
      }, 0);
    }
  };

  // Verify OTP
  const verifyOTP = async () => {
    try {
      const otpString = otp.join('');
      if (otpString.length !== 6) {
        toast.error('Please enter complete OTP');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp: otpString }),
        credentials: 'include'
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        setIsAuthenticated(true);
        setShowAuthModal(false);
        toast.success('Authentication successful');
        fetchPosts();
      } else {
        toast.error(data.message || 'Invalid OTP');
        setOtp(['', '', '', '', '', '']); // Reset OTP on error
        otpInputRefs.current[0]?.focus(); // Focus first input
      }
    } catch (error) {
      toast.error('Error verifying OTP');
    }
  };

  // Fetch all blog posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      console.log('Fetching posts with token:', token);
      
      const response = await fetch(`${API_BASE_URL}/api/blog/posts`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        if (response.status === 401) {
          // Handle unauthorized - clear any existing session
          localStorage.removeItem('adminToken');
          setIsAuthenticated(false);
          setShowAuthModal(true);
          return;
        }
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Failed to fetch posts: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Fetched posts:', data);
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to fetch posts. Please check console for details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachments(prev => [...prev, ...newFiles]);
    }
  };

  // Remove file from selection
  const removeFile = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  // Upload files
  const uploadFiles = async (postId: string) => {
    if (attachments.length === 0) {
      console.log('No attachments to upload');
      return;
    }

    try {
      const formData = new FormData();
      attachments.forEach(file => {
        console.log('Adding file to FormData:', file.name, file.type, file.size);
        formData.append('files', file);
      });
      formData.append('postId', postId);
      
      const response = await fetch(`${API_BASE_URL}/api/blog/upload`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Upload failed:', errorText);
        throw new Error('Failed to upload files');
      }

      const data = await response.json();
      console.log('Upload response data:', data);
      
      toast.success('Files uploaded successfully');
      return data;
    } catch (error) {
      console.error('Error uploading files:', error);
      toast.error('Error uploading attachments. The post was saved but attachments failed to upload.');
      throw error;
    }
  };

  // Create or update blog post
  const savePost = async () => {
    if (!currentPost.title || !currentPost.content) {
      toast.error('Title and content are required');
      return;
    }

    try {
      setUploading(true);
      const token = localStorage.getItem('adminToken');
      const url = currentPost._id
        ? `${API_BASE_URL}/api/blog/posts/${currentPost._id}`
        : `${API_BASE_URL}/api/blog/posts`;
      
      // First save the post
      const response = await fetch(url, {
        method: currentPost._id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...currentPost,
          publishedAt: currentPost.isPublished ? new Date().toISOString() : null
        }),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to save post');
      }

      const savedPost = await response.json();
      
      // If there are attachments, upload them
      if (attachments.length > 0) {
        try {
          const formData = new FormData();
          attachments.forEach(file => {
            formData.append('files', file);
          });
          formData.append('postId', savedPost._id);
          
          const uploadResponse = await fetch(`${API_BASE_URL}/api/blog/upload`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            },
            body: formData,
            credentials: 'include'
          });

          if (!uploadResponse.ok) {
            throw new Error('Failed to upload attachments');
          }

          const uploadData = await uploadResponse.json();
          savedPost.attachments = uploadData.attachments;
          toast.success('Post and attachments saved successfully');
        } catch (uploadError) {
          console.error('Error uploading attachments:', uploadError);
          toast.error('Post saved but attachments failed to upload');
        }
      } else {
        toast.success('Post saved successfully');
      }

      // Update the posts list with the latest data
      await fetchPosts();
      
      setIsEditing(false);
      setCurrentPost({ title: '', content: '', excerpt: '', isPublished: false });
      setAttachments([]);
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error('Failed to save post');
    } finally {
      setUploading(false);
    }
  };

  // Delete blog post
  const deletePost = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/blog/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      setPosts(posts.filter(post => post._id !== id));
      toast.success('Post deleted successfully');
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
    }
  };

  // Send post to subscribers
  const sendToSubscribers = async (post: BlogPost) => {
    try {
      const token = localStorage.getItem('adminToken');
      // Using the correct endpoint for sending newsletters
      const response = await fetch(`${API_BASE_URL}/api/subscribers/send-newsletter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          content: `New Blog Post: ${post.title}\n\n${post.excerpt}\n\nRead more at: ${window.location.origin}/insights/${post.slug}`
        }),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to send post to subscribers');
      }

      const data = await response.json();
      toast.success(`Post sent to ${data.count} subscribers successfully`);
    } catch (error) {
      console.error('Error sending post to subscribers:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to send post to subscribers');
    }
  };

  // Edit post
  const editPost = async (post: BlogPost) => {
    try {
      // Fetch the complete post data including attachments
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/blog/posts/${post.slug}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch post details');
      }

      const postData = await response.json();
      console.log('Fetched post data:', postData);

      // If the post has sections, join them for editing
      let content = postData.content;
      if (!content && Array.isArray((postData as any).sections)) {
        content = (postData as any).sections.map((s: any) => s.content).join('\n\n');
      }

      // Set the current post with all data including attachments
      setCurrentPost({
        _id: postData._id,
        title: postData.title,
        content: content,
        excerpt: postData.excerpt,
        isPublished: postData.isPublished,
        attachments: postData.attachments || []
      });

      // Clear any existing new attachments
      setAttachments([]);
      setIsEditing(true);
    } catch (error) {
      console.error('Error loading post for editing:', error);
      toast.error('Failed to load post for editing');
    }
  };

  // Auth Modal Component
  const AuthModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-playfair mb-6">Admin Authentication</h2>
        {!showOtpInput ? (
          <div className="space-y-4">
            <p className="text-gray-600 mb-4">
              Click the button below to receive an OTP at the admin email address
            </p>
            <button
              onClick={requestOTP}
              className="w-full bg-black text-white px-6 py-2 hover:bg-gray-800 transition-colors"
            >
              Request OTP
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-600 mb-4">
              Enter the OTP sent to the admin email address
            </p>
            <div className="flex justify-center space-x-2 mb-4" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={el => otpInputRefs.current[index] = el}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  maxLength={1}
                  className="w-12 h-12 text-center text-xl border border-gray-300 rounded-sm focus:border-black focus:outline-none"
                  autoFocus={index === 0}
                />
              ))}
            </div>
            <div className="flex space-x-4">
              <button
                onClick={verifyOTP}
                className="flex-1 bg-black text-white px-6 py-2 hover:bg-gray-800 transition-colors"
              >
                Verify OTP
              </button>
              <button
                onClick={requestOTP}
                className="flex-1 bg-gray-200 text-gray-800 px-6 py-2 hover:bg-gray-300 transition-colors"
              >
                Resend OTP
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Add this function to handle attachment removal
  const removeAttachment = async (attachmentId: string) => {
    if (!currentPost._id) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/blog/posts/${currentPost._id}/attachments/${attachmentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to remove attachment');
      }

      // Update the current post's attachments
      setCurrentPost(prev => ({
        ...prev,
        attachments: prev.attachments?.filter(att => att._id !== attachmentId) || []
      }));

      toast.success('Attachment removed successfully');
    } catch (error) {
      console.error('Error removing attachment:', error);
      toast.error('Failed to remove attachment');
    }
  };

  // Update the status display in the table
  const getStatusDisplay = (post: BlogPost) => {
    if (!post.isPublished) {
      return {
        text: 'Draft',
        className: 'bg-yellow-100 text-yellow-800'
      };
    }
    if (post.attachments?.length > 0) {
      return {
        text: 'Published with Attachments',
        className: 'bg-green-100 text-green-800'
      };
    }
    return {
      text: 'Published',
      className: 'bg-green-100 text-green-800'
    };
  };

  if (!isAuthenticated) {
    return showAuthModal ? <AuthModal /> : null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-playfair mb-8">Manage Blog Posts</h1>

      {/* Create/Edit Post Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-playfair mb-4">
          {isEditing ? 'Edit Post' : 'Create New Post'}
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            value={currentPost.title}
            onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
            placeholder="Post Title"
            className="w-full p-3 border border-gray-300 rounded-sm"
          />
          <textarea
            value={currentPost.excerpt}
            onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
            placeholder="Post Excerpt"
            className="w-full p-3 border border-gray-300 rounded-sm h-20"
          />
          <textarea
            value={currentPost.content}
            onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
            placeholder="Post Content (HTML supported)"
            className="w-full p-3 border border-gray-300 rounded-sm h-60"
          />
          
          {/* File Upload Section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Attachments
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-sm file:border-0
                  file:text-sm file:font-semibold
                  file:bg-black file:text-white
                  hover:file:bg-gray-800"
              />
            </div>
            
            {/* Display existing attachments */}
            {currentPost.attachments?.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Current Attachments:</h3>
                <div className="space-y-2">
                  {currentPost.attachments.map((attachment) => (
                    <div key={attachment._id} className="flex items-center justify-between p-2 bg-gray-50 rounded-sm">
                      <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                        <a
                          href={`${API_BASE_URL}/api/blog/uploads/${attachment.name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {attachment.name}
                        </a>
                      </div>
                      <button
                        onClick={() => removeAttachment(attachment._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Display new attachments to be uploaded */}
            {attachments.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">New Attachments to Upload:</h3>
                <div className="space-y-2">
                  {attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-sm">
                      <span className="text-sm text-gray-600">{file.name}</span>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={currentPost.isPublished}
                onChange={(e) => setCurrentPost({ ...currentPost, isPublished: e.target.checked })}
                className="rounded"
              />
              <span>Publish immediately</span>
            </label>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={savePost}
              disabled={uploading}
              className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition-colors disabled:bg-gray-400"
            >
              {uploading ? 'Saving...' : (isEditing ? 'Update Post' : 'Create Post')}
            </button>
            {isEditing && (
              <button
                onClick={() => {
                  setIsEditing(false);
                  setCurrentPost({ title: '', content: '', excerpt: '', isPublished: false });
                  setAttachments([]);
                }}
                className="bg-gray-200 text-gray-800 px-6 py-2 hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-playfair mb-4">All Posts ({posts.length})</h2>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
            <span className="ml-3">Loading posts...</span>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No posts found.</p>
            <p className="text-sm mt-2">Create your first post using the form above.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Title</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Published On</th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post._id} className="border-b">
                    <td className="py-3 px-4">{post.title}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-sm ${getStatusDisplay(post).className}`}>
                        {getStatusDisplay(post).text}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : '-'}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => editPost(post)}
                        className="text-blue-600 hover:underline mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => sendToSubscribers(post)}
                        className="text-green-600 hover:text-green-800"
                      >
                        Send to Subscribers
                      </button>
                      <button
                        onClick={() => deletePost(post._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Insights; 