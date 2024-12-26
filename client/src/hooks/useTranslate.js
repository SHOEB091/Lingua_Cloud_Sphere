import { useState } from "react";
import { translateText } from "../api/nlpApi";

const useTranslate = () => {
  const [translation, setTranslation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const translate = async (text, toLanguage) => {
    setLoading(true);
    try {
      const translatedText = await translateText(text, toLanguage);
      setTranslation(translatedText);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { translation, loading, error, translate };
};

export default useTranslate;
