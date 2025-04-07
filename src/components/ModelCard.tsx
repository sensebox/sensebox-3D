import React from "react";
import { Link } from "react-router-dom";
import { BiCube, BiChevronRight } from "react-icons/bi";

interface ModelCardProps {
  title: string;
  description: string;
  path: string;
}

export default function ModelCard({
  title,
  description,
  path,
}: ModelCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-1 bg-blue-500"></div>
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        <BiCube className="h-20 w-20 text-gray-400" />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link
          to={path}
          className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
        >
          View Model <BiChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}
