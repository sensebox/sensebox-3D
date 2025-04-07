import React from "react";
import { BiCube } from "react-icons/bi";

export default function PlaceholderCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-dashed border-gray-300">
      <div className="h-48 bg-gray-100 flex items-center justify-center">
        <div className="text-gray-400 text-center">
          <BiCube className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>Coming Soon</p>
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-400 mb-2">
          Future Model
        </h2>
        <p className="text-gray-400">More 3D models will be added soon</p>
      </div>
    </div>
  );
}
