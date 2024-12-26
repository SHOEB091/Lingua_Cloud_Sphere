import { useState } from "react";
import apiClient from "../api/apiClient";
import { generateUniqueFileName } from "../utils/generateUniqueFileName"; // Import the generateUniqueFileName function
import axios from "axios";

const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const uploadFile = async (file, folder_name) => {
    setUploading(true);
    setError(null);
    setSuccess(false);

    try {
      // Generate a unique file name
      const uniqueFileName = generateUniqueFileName(file.name);

      // Step 1: Get the pre-signed URL from the backend
      const payload = {
        file_name: uniqueFileName,
        content_type: file.type,
        folder_name: folder_name,
      };
      const response = await apiClient.post("/upload", payload);
      const { url: presignedUrl } = response.data;

      // Step 2: Upload the file to S3 using the pre-signed URL
      await axios.put(presignedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      setSuccess(true);
      return uniqueFileName;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  return {
    uploading,
    error,
    success,
    uploadFile,
  };
};

export default useFileUpload;
