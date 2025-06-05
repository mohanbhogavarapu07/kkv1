import React, { useEffect, useState } from "react";
import BlogPost from "@/components/BlogPost";
import NewsletterSubscription from "@/components/NewsletterSubscription";
import { format } from "date-fns";

interface Post {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://kk-backend-wra3.onrender.com/api/blog/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        // Format dates and ensure all required fields are present
        const formattedPosts = data.map((post: any) => ({
          title: post.title,
          excerpt: post.excerpt,
          date: format(new Date(post.date), 'MMMM d, yyyy'),
          slug: post.slug
        }));
        setPosts(formattedPosts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <p>Loading posts...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <p className="text-red-600">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="section pb-0">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-playfair">Insights</h1>
            <p className="text-xl text-gray-700 mb-8">
              Insights on performance psychology, strategic clarity, and intentional productivity for ambitious professionals.
            </p>
          </div>
        </div>
      </section>

      <section className="section pt-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {posts.map((post) => (
                <BlogPost
                  key={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  slug={post.slug}
                />
              ))}
            </div>
            <div className="lg:col-span-1">
              <div className="border border-gray-200 p-6 sticky top-24">
                <h3 className="text-lg font-playfair mb-6">Categories</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="">Productivity</a>
                  </li>
                  <li>
                    <a href="#" className="">Leadership</a>
                  </li>
                  <li>
                    <a href="#" className="">Performance Psychology</a>
                  </li>
                  <li>
                    <a href="#" className="">Strategic Thinking</a>
                  </li>
                  <li>
                    <a href="#" className="">Project Management</a>
                  </li>
                </ul>
                
                <div className="mt-12">
                  <NewsletterSubscription />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
