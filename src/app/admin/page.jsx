"use client";
import React, { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/firebaseConfig.js";
import axios from "axios";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    images: [],
  });

  const [fileUpload, setFileUpload] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {

      const response = await axios.post("/api/products/addproduct", formData);
      console.log(response);

      alert("Product created successfully!");

      setFormData({
        name: "",
        category: "",
        price: "",
        quantity: "",
        images: [],
      });

    } catch (error) {

      console.error("Error creating product:", error);
      alert("Error creating product. Please try again.");
    }
  };

  const handleImageChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      return; // No file selected, do nothing
    }

    // Get Firebase Storage reference
    const storage = getStorage(app);
    const storageRef = ref(
      storage,
      `${new Date().getTime() + selectedFile.name}`
    ); // Create a child path with the original filename

    // Upload the file with progress tracking (optional for user feedback)
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload progress: ${Math.round(progress)}%`);
        setFileUpload(`${Math.round(progress)}%`);
      },
      (error) => {
        console.error(error);
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        // Correcting the update of formData
        setFormData({
          ...formData,
          images: [...formData.images, downloadUrl], // Use spread operator to create a new array
        });
        console.log("Uploaded file");
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 p-4 border rounded-lg"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="mt-1 p-2 border rounded-md w-full"
        >
          <option value="">Select Category</option>
          <option value="Fruits & Vegetables">Fruits & Vegetables</option>
          <option value="Daily use Products">Daily use Products</option>
          <option value="Masala & Dry Fruits">Masala & Dry Fruits</option>
          <option value="Toys">Toys</option>
          <option value="Baby Products">Baby Products</option>
          <option value="Dairy Bread and Eggs">Dairy Bread and Eggs</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Price:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Quantity:</label>
        <input
          type="text"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Images:</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 p-2 border rounded-md w-full"
        />
        {fileUpload}
      </div>
      <button
        type="submit"
        className="bg-primary text-primary-foreground py-2 px-4 rounded-md"
      >
        Submit
      </button>
    </form>
  );
};

export default ProductForm;
