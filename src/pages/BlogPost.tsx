import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";

interface Section {
  type: 'heading' | 'paragraph' | 'list' | 'subheading';
  content: string;
  level: number;
}

interface BlogPost {
  title: string;
  content: string;
  date: string;
  sections: Section[];
}

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cleanContent = (content: string) => {
    return content
      .replace(/—/g, '—') // Replace em dash with proper em dash
      .replace(/–/g, '–') // Replace en dash with proper en dash
      .replace(/-\s+/g, '') // Remove hyphens followed by spaces
      .replace(/\s+-/g, '') // Remove spaces followed by hyphens
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim();
  };

  const renderSection = (section: Section) => {
    // Helper function to check if content is a heading
    const isHeading = (content: string) => {
      // Check for common heading patterns
      const headingPatterns = [
        /^[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*$/, // Title Case
        /^The\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*$/, // Starts with "The"
        /^[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s+Framework$/, // Ends with "Framework"
        /^[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s+Paradox$/, // Ends with "Paradox"
        /^[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s+Principle$/, // Ends with "Principle"
        /^[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s+Crisis$/, // Ends with "Crisis"
        /^[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s+Implementation$/, // Ends with "Implementation"
        /^[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s+Edge$/, // Ends with "Edge"
        /^Conclusion:.*$/, // Starts with "Conclusion:"
      ];
      return headingPatterns.some(pattern => pattern.test(content));
    };

    // Helper function to check if content is a subheading
    const isSubheading = (content: string) => {
      // Check for numbered sections or specific subheading patterns
      const subheadingPatterns = [
        /^\d+\.\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*$/, // Numbered sections
        /^[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s+in\s+Practice$/, // Ends with "in Practice"
        /^[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s+Audit$/, // Ends with "Audit"
        /^[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s+Imperative$/, // Ends with "Imperative"
      ];
      return subheadingPatterns.some(pattern => pattern.test(content));
    };

    // Determine section type if not explicitly set
    let sectionType = section.type;
    if (!sectionType) {
      if (isHeading(section.content)) {
        sectionType = 'heading';
      } else if (isSubheading(section.content)) {
        sectionType = 'subheading';
      } else if (section.content.includes('\n')) {
        sectionType = 'list';
      } else {
        sectionType = 'paragraph';
      }
    }

    const cleanedContent = cleanContent(section.content);

    switch (sectionType) {
      case 'heading':
        return (
          <h2 className="text-2xl font-medium mt-8 mb-4 font-playfair text-gray-900">
            {cleanedContent}
          </h2>
        );
      case 'subheading':
        return (
          <h3 className="text-xl font-medium mt-6 mb-3 font-playfair text-gray-900">
            {cleanedContent}
          </h3>
        );
      case 'list':
        const listItems = cleanedContent.split('\n').filter(item => item.trim());
        return (
          <ul className="list-disc pl-6 mb-4">
            {listItems.map((item, index) => (
              <li key={index} className="mb-2 text-gray-700">
                {cleanContent(item)}
              </li>
            ))}
          </ul>
        );
      case 'paragraph':
        return (
          <p className="mb-4 leading-relaxed text-gray-700">
            {cleanedContent}
          </p>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://kk-backend-wra3.onrender.com/api/blog/posts/${slug}/public`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return <div>Loading post...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div className="section">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 mb-4 hover:text-gray-900 transition-colors">
            <ArrowLeft className="mr-2" /> Back to Insights
          </button>
          <h1 className="text-4xl font-playfair font-bold mb-4 text-gray-900">{post.title}</h1>
          <p className="text-gray-600 mb-8">{format(new Date(post.date), 'MMMM d, yyyy')}</p>
          <div className="prose prose-lg max-w-none">
            {post.sections.map((section, index) => (
              <div key={index}>
                {renderSection(section)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
