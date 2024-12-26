import { useState } from "react";
import { rekognition } from "../api/nlpApi";
import useFileUpload from "./useFileUpload";

const useRecognition = () => {
  const {
    uploadFile,
    uploading,
    error: uploadError,
    success: uploadSuccess,
  } = useFileUpload();
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const recognize = async (file, operation) => {
    try {
      setLoading(true);
      setError(null);

      const fileName = await uploadFile(file, "RekognitionUploads");
      console.log("recognize", fileName, operation);
      if (fileName) {
        const response = await rekognition(operation, fileName);
        setResult(response);
      } else {
        setError("File upload failed");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    uploading,
    uploadError,
    uploadSuccess,
    result,
    error,
    loading,
    recognize,
  };
};

export default useRecognition;
