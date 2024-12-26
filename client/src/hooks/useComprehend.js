import { useState } from "react";
import apiClient from "../api/apiClient";

const useComprehend = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const comprehend = async (text, operation) => {
    try {
      setLoading(true);
      setError(null);
      const body = {
        Provider: "AWS",
        Service: "Comprehend",
        text: text,
        operation,
      };
      const response = await apiClient.post("", body);

      if (operation === "sentiment") {
        setResult(response?.data?.response?.response);
      } else if (operation === "entities") {
        setResult(response?.data?.response?.response?.Entities);
      } else if (operation === "language") {
        setResult(response?.data?.response?.response?.Languages);
      } else {
        setResult(response.data.response.file_url);
      }
    } catch (error) {
      console.error("Error processing text:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, error, comprehend };
};

export default useComprehend;
