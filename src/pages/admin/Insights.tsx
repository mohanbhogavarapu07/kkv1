import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

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
}

const Insights = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({
    title: '',
    content: '',
    excerpt: '',
    isPublished: false
  });

  // Fetch all blog posts
  const fetchPosts = async () => {
    try {
      const response = await fetch('https://kk-backend-wra3.onrender.com/api/blog/posts');
      const data = await response.json();
      if (response.ok) {
        setPosts(data);
      } else {
        toast.error('Failed to fetch blog posts');
      }
    } catch (error) {
      toast.error('Error fetching blog posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Create or update blog post
  const savePost = async () => {
    if (!currentPost.title?.trim() || !currentPost.content?.trim()) {
      toast.error('Title and content are required');
      return;
    }

    try {
      const url = currentPost._id 
        ? `https://kk-backend-wra3.onrender.com/api/blog/posts/${currentPost._id}`
        : 'https://kk-backend-wra3.onrender.com/api/blog/posts';
      
      const response = await fetch(url, {
        method: currentPost._id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentPost),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(`Blog post ${currentPost._id ? 'updated' : 'created'} successfully`);
        setIsEditing(false);
        setCurrentPost({ title: '', content: '', excerpt: '', isPublished: false });
        fetchPosts();
      } else {
        toast.error(data.message || 'Failed to save blog post');
      }
    } catch (error) {
      toast.error('Error saving blog post');
    }
  };

  // Delete blog post
  const deletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const response = await fetch(`https://kk-backend-wra3.onrender.com/api/blog/posts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Blog post deleted successfully');
        fetchPosts();
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to delete blog post');
      }
    } catch (error) {
      toast.error('Error deleting blog post');
    }
  };

  // Send post to subscribers
  const sendToSubscribers = async (post: BlogPost) => {
    try {
      // First fetch the complete post data
      const postResponse = await fetch(`https://kk-backend-wra3.onrender.com/api/blog/posts/${post.slug}`);
      const completePost = await postResponse.json();
      
      if (!postResponse.ok) {
        throw new Error('Failed to fetch complete post data');
      }

      const response = await fetch('https://kk-backend-wra3.onrender.com/api/subscribers/send-newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          content: `
            <h2>${completePost.title}</h2>
            <p>${completePost.excerpt}</p>
            <p>Read more at: <a href="${window.location.origin}/insights/${completePost.slug}">${window.location.origin}/insights/${completePost.slug}</a></p>
          `
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // Update the post's published status and date
        const updateResponse = await fetch(`https://kk-backend-wra3.onrender.com/api/blog/posts/${completePost._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: completePost.title,
            content: completePost.content,
            excerpt: completePost.excerpt,
            isPublished: true,
            category: completePost.category || 'Productivity',
            featuredImage: completePost.featuredImage,
            tags: completePost.tags || [],
            date: completePost.date || new Date().toISOString(),
            publishedAt: new Date().toISOString()
          }),
        });

        if (updateResponse.ok) {
          toast.success(`Post sent to ${data.count} subscribers and published`);
          // Refresh the posts list to show updated date
          fetchPosts();
        } else {
          const errorData = await updateResponse.json();
          toast.error(errorData.message || 'Post sent to subscribers but failed to update publish status');
        }
      } else {
        toast.error(data.message || 'Failed to send post to subscribers');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error sending post to subscribers');
    }
  };

  // Edit post
  const editPost = (post: BlogPost) => {
    // If the post has sections, join them for editing
    let content = post.content;
    if (!content && Array.isArray((post as any).sections)) {
      content = (post as any).sections.map((s: any) => s.content).join('\n\n');
    }
    setCurrentPost({
      _id: post._id,
      title: post.title,
      content: content,
      excerpt: post.excerpt,
      isPublished: post.isPublished
    });
    setIsEditing(true);
  };

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
              className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition-colors"
            >
              {isEditing ? 'Update Post' : 'Create Post'}
            </button>
            {isEditing && (
              <button
                onClick={() => {
                  setIsEditing(false);
                  setCurrentPost({ title: '', content: '', excerpt: '', isPublished: false });
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
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p>No posts found.</p>
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
                      <span className={`px-2 py-1 rounded text-sm ${post.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {post.isPublished ? 'Published' : 'Draft'}
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