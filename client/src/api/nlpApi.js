import apiClient from "./apiClient";

const translateText = async (text, toLanguage) => {
  try {
    const body = {
      Provider: "AWS",
      Service: "Translate",
      text: text,
      target_language: toLanguage,
    };
    const response = await apiClient.post("", body);
    return response.data.response.translated_text; // Ensure this matches the API response structure
  } catch (error) {
    console.error("Error translating text:", error);
    throw error;
  }
};

const textToSpeech = async (text, voice_id) => {
  try {
    const body = {
      Provider: "AWS",
      Service: "TTS",
      text: text,
      voice_id,
    };
    const response = await apiClient.post("", body);
    return response.data.response.file_url; // Ensure this matches the API response structure
  } catch (error) {
    console.error("Error translating text:", error);
    throw error;
  }
};

const comprehrend = async (text, operation) => {
  try {
    const body = {
      Provider: "AWS",
      Service: "Comprehend",
      text: text,
      operation,
    };
    const response = await apiClient.post("", body);

    if (operation === "sentiment")
      return response?.data?.response?.response?.sentiment;
    else if (operation === "entities")
      return response?.data?.response?.Entities;
    // operation === "language"
    else return response.data.response.file_url; // Ensure this matches the API response structure
  } catch (error) {
    console.error("Error translating text:", error);
    throw error;
  }
};

const textract = async (text, operation, document_name, document_type) => {
  try {
    const body = {
      Provider: "AWS",
      Service: "Textract",
      document_name: document_name,
      document_type: document_type,
      operation,
    };
    const response = await apiClient.post("", body);

    if (operation === "handwriting") return response?.data?.response?.Status;
    else return response.data.response; // Ensure this matches the API response structure
  } catch (error) {
    console.error("Error performing ocr textract:", error);
    throw error;
  }
};

const rekognition = async (operation, image_name) => {
  try {
    const body = {
      Provider: "AWS",
      Service: "Rekognition",
      image_name: image_name,
      operation,
    };
    const response = await apiClient.post("", body);
    console.log(
      "rekognition response",
      response.data.response.response.CelebrityFaces
    );
    if (operation === "facial_analysis")
      return response?.data?.response?.response?.FaceDetails;
    else if (operation === "object_detection")
      return response?.data?.response?.response?.Labels;
    else return response?.data?.response?.response.CelebrityFaces; // celebrity
  } catch (error) {
    console.error("Error performing rekognition:", error);
    throw error;
  }
};

export { translateText, textToSpeech, comprehrend, textract, rekognition };
