
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center max-w-xl px-4">
        <h1 className="text-5xl md:text-6xl font-playfair mb-6">404</h1>
        <p className="text-xl text-gray-700 mb-8">The page you're looking for doesn't exist.</p>
        <Link to="/" className="border border-black px-6 py-3 hover:bg-black hover:text-white transition-colors duration-300">
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
