import { useState } from "react";
import apiClient from "../api/apiClient";
import useFileUpload from "./useFileUpload";

const useSst = () => {
  const {
    uploading,
    error: uploadError,
    success,
    uploadFile,
  } = useFileUpload();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState("");

  const uploadAndConvert = async (file) => {
    setLoading(true);
    setError(null);
    setResult("");
    console.log("file", file);
    try {
      // Step 1: Upload the file using useFileUpload hook
      const uniqueFileName = await uploadFile(file, "SSTUploads");
      if (!uniqueFileName) {
        throw new Error("File upload failed");
      }

      console.log(uniqueFileName, "Here");
      // Step 2: Request SST conversion
      const sstResponse = await apiClient.post("", {
        Provider: "AWS",
        Service: "SST",
        file_name: uniqueFileName,
        media_format: "mp3",
      });
      console.log("sstResponse", sstResponse);
      setResult(sstResponse.data.response.transcript_text);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading: loading || uploading,
    error: error || uploadError,
    result,
    uploadAndConvert,
  };
};

export default useSst;
