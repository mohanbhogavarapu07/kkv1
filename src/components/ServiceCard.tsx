
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  slug: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, slug }) => {
  return (
    <div className="border border-gray-200 p-8 hover:bg-gray-50 transition-colors">
      <h3 className="text-xl font-playfair mb-4">{title}</h3>
      <p className="text-gray-700 mb-6">{description}</p>
      <Link to={`/services/${slug}`} className="inline-flex items-center group">
        <span className="text-sm uppercase tracking-wide font-medium border-b border-black pb-1 mr-2 group-hover:mr-4 transition-all duration-300">
          Learn More
        </span>
        <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
      </Link>
    </div>
  );
};

export default ServiceCard;
