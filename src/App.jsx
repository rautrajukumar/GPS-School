import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import Home from "./pages/Home";
import About from "./pages/About";
import Academics from "./pages/Academics";
import Admissions from "./pages/Admissions";
import Gallery from "./pages/Gallery";
import EventsNews from "./pages/EventsNews";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-blue-50 font-sans">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/events-news" element={<EventsNews />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </BrowserRouter>
  );
}
