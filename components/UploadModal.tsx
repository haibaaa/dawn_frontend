"use client";

import { useState } from "react";

export default function UploadModal({ onClose, refreshResources }: any) {

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [courseId, setCourseId] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const uploadResource = async () => {

    if (!file || !title) {
      alert("Title and file required");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("tags", tags);
    formData.append("file", file);

    if (courseId) {
      formData.append("course_id", courseId);
    }

    try {

      const res = await fetch(
        "http://localhost:8000/resources/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        console.error("Upload failed");
        return;
      }

      refreshResources();
      onClose();

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white p-6 rounded-xl w-[420px] space-y-4">

        <h2 className="text-lg font-semibold">
          Upload Resource
        </h2>

        <input
          placeholder="Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Tags (comma separated)"
          className="w-full border p-2 rounded"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <input
          placeholder="Course ID (optional)"
          className="w-full border p-2 rounded"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Cancel
          </button>

          <button
            onClick={uploadResource}
            className="px-4 py-2 bg-teal-600 text-white rounded"
          >
            Upload
          </button>

        </div>

      </div>

    </div>
  );
}