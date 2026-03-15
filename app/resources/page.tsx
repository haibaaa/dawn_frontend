"use client";

import { useEffect, useState } from "react";

export default function ResourcesPage() {

  const [resources, setResources] = useState<any[]>([]);

  const fetchResources = async () => {
    try {

      const res = await fetch("http://localhost:8000/resources/");
      const data = await res.json();

      console.log("API RESPONSE:", data);

      // Ensure resources is always an array
      if (Array.isArray(data)) {
        setResources(data);
      } else if (Array.isArray(data.data)) {
        setResources(data.data);
      } else if (Array.isArray(data.resources)) {
        setResources(data.resources);
      } else {
        setResources([]);
      }

    } catch (error) {
      console.error("Failed to fetch resources:", error);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-12 py-10">

      <h1 className="text-3xl font-semibold text-teal-900 mb-10">
        Resource Bank
      </h1>

      <div className="grid grid-cols-4 gap-6">

        {resources.length === 0 && (
          <p className="text-gray-500">No resources uploaded yet.</p>
        )}

        {resources.map((resource: any) => (

          <a
            key={resource.id}
            href={resource.file_url}
            target="_blank"
            className="bg-white rounded-xl p-6 shadow hover:shadow-md transition"
          >

            <h3 className="font-semibold text-gray-700 mb-2">
              {resource.title}
            </h3>

            <p className="text-sm text-gray-500">
              {resource.tags?.join(", ")}
            </p>

          </a>

        ))}

      </div>

    </div>
  );
}