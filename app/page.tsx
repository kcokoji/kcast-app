"use client";
import React, { useState } from "react";
import axios from "axios";

const FileUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
    setErrorMessage(""); // Clear any previous error messages
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!selectedFile) {
      setErrorMessage("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("/api/podcast", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessMessage("File uploaded successfully!");
      console.log(response.data); // Handle the response data from the API
    } catch (error: any) {
      setErrorMessage("Error uploading file: " + error.message);
    } finally {
      setSelectedFile(null); // Clear the selected file after upload
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </form>
  );
};

export default FileUploadForm;
