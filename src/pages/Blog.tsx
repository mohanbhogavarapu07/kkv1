import React from "react";
import BlogPost from "@/components/BlogPost";

const Blog = () => {
  const posts = [
    {
      title: "Strategic Rest: Why High-Achievers Need to Master Recovery",
      excerpt: "The counterintuitive approach to productivity that leverages rest as a strategic advantage rather than a necessary evil. Learn the science behind cognitive recovery and practical frameworks for implementing strategic rest cycles.",
      date: "April 24, 2025",
      slug: "strategic-rest"
    },
    {
      title: "Decision Frameworks for Overwhelming Complexity",
      excerpt: "How to make clear, confident decisions when facing ambiguity, competing priorities, and information overload. A practical guide to decision frameworks that reduce cognitive burden and improve outcome quality.",
      date: "April 12, 2025",
      slug: "decision-frameworks"
    },
    {
      title: "The Integration Principle: Aligning Professional Excellence and Personal Wellbeing",
      excerpt: "Moving beyond work-life balance to a more sophisticated approach: strategic integration. How top performers design systems that allow simultaneous achievement across multiple life domains.",
      date: "March 28, 2025",
      slug: "integration-principle"
    },
    {
      title: "Project Turnaround: The Mental Models That Rescue Failing Initiatives",
      excerpt: "A comprehensive framework for diagnosing, stabilizing, and recovering troubled projects. Practical approaches based on experience with dozens of complex project rescues across industries.",
      date: "March 15, 2025",
      slug: "project-turnaround"
    },
    {
      title: "The Efficiency Paradox: When Optimization Creates Underperformance",
      excerpt: "Why relentless efficiency can actually damage long-term performance. How to identify when optimization becomes counterproductive and what to do instead to sustain meaningful productivity.",
      date: "February 27, 2025",
      slug: "efficiency-paradox"
    }
  ];

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
                  <h3 className="text-lg font-playfair mb-6">Subscribe to Newsletter</h3>
                  <p className="text-sm text-gray-700 mb-4">Receive new insights and practical frameworks directly to your inbox.</p>
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="w-full border border-gray-300 p-2 mb-2 focus:outline-none focus:border-black"
                  />
                  <button className="w-full border border-black bg-black text-white p-2 hover:bg-white hover:text-black transition-colors">
                    Subscribe
                  </button>
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
