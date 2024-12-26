// src/App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Components Import
import Header from "./components/Header";
import Footer from "./components/Footer";

//Pages Import
import HomePage from "./pages/HomePage";
import Error404Page from "./pages/Error404Page";
import ComprehendPage from "./pages/ComprehendPage";
import RekognitionPage from "./pages/RekognitionPage";
import SSTPage from "./pages/SSTPage";
import TTSPage from "./pages/TTSPage";
import TextExtractPage from "./pages/TexttractPage";
import TranslatePage from "./pages/TranslatePage";
import TestingBackendPage from "./pages/TestingBackendPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/comphrend" element={<ComprehendPage />} />
        <Route path="/rekognition" element={<RekognitionPage />} />
        <Route path="/sst" element={<SSTPage />} />
        <Route path="/tts" element={<TTSPage />} />
        <Route path="/textract" element={<TextExtractPage />} />
        <Route path="/Translation" element={<TranslatePage />} />
        <Route path="/404" element={<Error404Page />} />
        <Route path="/Test" element={<TestingBackendPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/*" element={<Error404Page />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
