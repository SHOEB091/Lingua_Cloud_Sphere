import { useState } from "react";
import { textract } from "../api/nlpApi";
import useFileUpload from "./useFileUpload";

const useTextract = () => {
  const {
    uploadFile,
    uploading,
    error: uploadError,
    success: uploadSuccess,
  } = useFileUpload();
  const [textResult, setTextResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const extractText = async (file, documentType, operation = "handwriting") => {
    try {
      setLoading(true);
      setError(null);

      const fileName = await uploadFile(file, "text-extraction");
      console.log("extractText", fileName, operation);

      if (fileName) {
        const response = await textract(
          null,
          operation,
          fileName,
          documentType
        );
        console.log(response);
        if (operation === "handwriting") {
          setTextResult(
            response?.Status
              ? "Handwriting detection succeeded"
              : "Handwriting detection failed"
          );
        } else {
          setTextResult(response.Blocks.map((block) => block.Text).join("\n"));
        }

        console.log(response);
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
    textResult,
    loading,
    error,
    extractText,
  };
};

export default useTextract;
