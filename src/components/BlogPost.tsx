import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface BlogPostProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ title, excerpt, date, slug }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <article className="mb-12 pb-12 border-b border-gray-200">
      <span className="text-xs text-gray-500 uppercase tracking-wider">{date}</span>
      <h2 className="text-2xl md:text-3xl font-playfair mt-2 mb-3">
        <Link to={`/insights/${slug}`} className="hover:text-gray-700 transition-colors">
          {title}
        </Link>
      </h2>
      <p className="text-gray-700">{excerpt}</p>
      <Link
        to={`/insights/${slug}`}
        className="mt-4 inline-block text-sm uppercase tracking-wide font-medium border-b border-black pb-1 focus:outline-none bg-transparent"
      >
        Continue Reading
      </Link>
    </article>
  );
};

export default BlogPost;
