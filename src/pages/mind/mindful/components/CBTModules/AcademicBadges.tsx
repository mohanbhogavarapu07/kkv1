
import React from "react";
import { Book, Star, Check } from "lucide-react";

const AcademicBadges = () => (
  <div className="flex gap-2 items-center">
    <span className="text-xs bg-blue-100 rounded px-2 py-1 flex items-center gap-1">
      <Book size={14} className="text-indigo-400"/> Beck Institute
    </span>
    <span className="text-xs bg-green-100 rounded px-2 py-1 flex items-center gap-1">
      <Check size={14} className="text-emerald-400"/> APA Verified
    </span>
    <span className="text-xs bg-purple-100 rounded px-2 py-1 flex items-center gap-1">
      <Star size={14} className="text-purple-400"/> NHS (UK)
    </span>
  </div>
);

export default AcademicBadges;
