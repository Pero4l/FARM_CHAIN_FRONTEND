'use client';
import React, { useState } from "react";
import {
  Image as ImageIcon,
  Video,
  Leaf,
  FileText,
  Tag,
  Grid,
  Upload,
  Send,
  X
} from "lucide-react";

const CreatePost: React.FC = () => {
  const [content, setContent] = useState("");
  const [farmSize, setFarmSize] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("general");
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);

  // Preview URLs
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [videoPreviews, setVideoPreviews] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = [...images, ...files].slice(0, 10);
    setImages(newImages);
    setImagePreviews(newImages.map((f) => URL.createObjectURL(f)));
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newVideos = [...videos, ...files].slice(0, 4);
    setVideos(newVideos);
    setVideoPreviews(newVideos.map((f) => URL.createObjectURL(f)));
  };

  // Remove specific image
  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  // Remove specific video
  const removeVideo = (index: number) => {
    const newVideos = videos.filter((_, i) => i !== index);
    const newPreviews = videoPreviews.filter((_, i) => i !== index);
    setVideos(newVideos);
    setVideoPreviews(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    images.forEach((file) => formData.append("images", file));
    videos.forEach((file) => formData.append("video", file));
    
    formData.append("farmSize", farmSize);
    formData.append("content", content);
    formData.append("tags", tags);
    formData.append("category", category);


    // try {
    //   const res = await fetch("/api/posts/create", {
    //     method: "POST",
    //     body: formData,
    //     credentials: "include",
    //   });

    //   const data = await res.json();
    //   if (data.success) {
    //     alert("✅ Post created successfully!");
    //     setContent("");
    //     setImages([]);
    //     setVideos([]);
    //     setImagePreviews([]);
    //     setVideoPreviews([]);
    //   } else {
    //     alert("❌ " + data.message);
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    //   alert("Something went wrong.");
    // }

    
  };

  return (
    <div className="max-w-2xl md:max-w-full pt-2">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-700  to-emerald-500 rounded-3xl shadow-xl text-white p-8 py-10 mb-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-2 flex items-center space-x-2">
            <Leaf className="w-7 h-7" />
            <span>Create New Post</span>
          </h2>
          <p className="text-green-100 text-lg pt-2">
            Share your latest farming update 🌾
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 space-y-6"
      >
        {/* Content */}
        <div>
          <label className="flex items-center font-semibold text-gray-700 mb-2">
            <FileText className="w-4 h-4 mr-2" /> Post Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening on your farm today?"
            rows={4}
            className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none"
            required
          ></textarea>
        </div>

        {/* Farm size */}
        <div>
          <label className="flex items-center font-semibold text-gray-700 mb-2">
            <Grid className="w-4 h-4 mr-2" /> Farm Size (e.g. 5 acres)
          </label>
          <input
            type="text"
            value={farmSize}
            onChange={(e) => setFarmSize(e.target.value)}
            placeholder="Enter your farm size"
            className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="flex items-center font-semibold text-gray-700 mb-2">
            <Tag className="w-4 h-4 mr-2" /> Tags
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. corn harvest irrigation"
            className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="flex items-center font-semibold text-gray-700 mb-2">
            <ImageIcon className="w-4 h-4 mr-2" /> Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-green-500 outline-none"
          >
            <option value="general">General</option>
            <option value="crop">Crop</option>
            <option value="livestock">Livestock</option>
            <option value="equipment">Equipment</option>
            <option value="market">Market</option>
          </select>
        </div>

        {/* Upload Section */}
        <div className="border-t pt-4">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center">
            <Upload className="w-5 h-5 mr-2" /> Upload Photos & Videos
          </h3>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Image Upload */}
            <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-green-400 rounded-2xl p-6 cursor-pointer hover:bg-green-50 transition-colors">
              <ImageIcon className="w-10 h-10 text-green-500 mb-2" />
              <span className="text-gray-600 text-sm">
                Upload Images (max 10)
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handleImageChange}
              />
            </label>

            {/* Video Upload */}
            <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-2xl p-6 cursor-pointer hover:bg-blue-50 transition-colors">
              <Video className="w-10 h-10 text-blue-500 mb-2" />
              <span className="text-gray-600 text-sm">
                Upload Videos (max 4)
              </span>
              <input
                type="file"
                accept="video/*"
                multiple
                hidden
                onChange={handleVideoChange}
              />
            </label>
          </div>

          {/* Previews with Cancel */}
          {(imagePreviews.length > 0 || videoPreviews.length > 0) && (
            <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
              {imagePreviews.map((src, i) => (
                <div key={i} className="relative group">
                  <img
                    src={src}
                    alt={`Preview ${i}`}
                    className="w-full h-24 object-cover rounded-xl shadow"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {videoPreviews.map((src, i) => (
                <div key={i} className="relative group">
                  <video
                    src={src}
                    controls
                    className="w-full h-24 object-cover rounded-xl shadow"
                  />
                  <button
                    type="button"
                    onClick={() => removeVideo(i)}
                    className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="">
         <button
            className="bg-green-600 text-white px-6 py-3 w-full rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Send className="w-5 h-5" />
            <span>Post Update</span>
          </button>


        </div>
      </form>
    </div>
  );
};

export default CreatePost;
