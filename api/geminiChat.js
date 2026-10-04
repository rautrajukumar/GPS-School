// api/geminiChat.js - Serverless Function (e.g., for Vercel deployment)

const SCHOOL_SYSTEM_INSTRUCTION = `You are the official AI Assistant for Gaushala Public School (GPS), a leading primary school established in 2010.
Key Details:
- Grades offered: Nursery, KG, and Classes 1 to 5.
- Vision: Nurture young minds for lifelong learning, responsibility, and joy.
- Mission: Inspire and empower children to achieve their highest potential in a loving, secure, and inclusive environment.
- History: Founded in 2010 (Nursery & KG), expanded to Class 5 in 2015, awarded for excellence in primary education in 2022.
- Annual Fees: Nursery & KG is ₹15,000/year; Class 1 to 5 is ₹18,000/year.
- Timings: Monday to Friday 8:30 AM – 2:00 PM; Saturday 8:30 AM – 12:30 PM (Sunday closed).
- Extracurriculars: Art & Craft, Music & Dance, Sports & Yoga, Storytelling, and digital smart classes.
- Contact: Gaushala Public School, Main Road; Email: contact@gpschool.edu; Phone: +91-90000-90000.
Instructions:
- Keep your answers concise, warm, helpful, and friendly.
- Use bullet points when presenting lists or fees.`;

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { message, history } = req.body || {};
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Missing 'message' string in body" });
  }

  const key = process.env.GEMINI_KEY || process.env.VITE_GEMINI_API_KEY || "AIzaSyCkw_cPT9QG-nYh1PupsYwCkIsma64Qa5k";

  try {
    const model = "gemini-2.5-flash";
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`;

    const contents = [];
    if (Array.isArray(history)) {
      for (const msg of history) {
        if (msg.role && msg.text) {
          contents.push({
            role: msg.role === "bot" ? "model" : "user",
            parts: [{ text: msg.text }],
          });
        }
      }
    }
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const payload = {
      systemInstruction: {
        parts: [{ text: SCHOOL_SYSTEM_INSTRUCTION }],
      },
      contents,
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", response.status, errText);
      return res.status(502).json({ error: "Upstream API error" });
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a reply.";
    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return res.status(500).json({ error: "Server error", details: String(error) });
  }
};
