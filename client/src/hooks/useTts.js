import { useState } from "react";
import { textToSpeech } from "../api/nlpApi";

const useTts = () => {
  const [audio, setAudio] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const speech = async (text, voice_id) => {
    setLoading(true);
    try {
      const speechLink = await textToSpeech(text, voice_id);
      setAudio(speechLink);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { audio, loading, error, speech, setAudio };
};

export default useTts;
