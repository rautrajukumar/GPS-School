// api/geminiChat.js
const fetch = require("node-fetch");

module.exports = async (req, res) => {
  // Allow CORS (so the frontend can call this)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { message } = req.body || {};
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Missing 'message' string in body" });
  }

  const key = process.env.GEMINI_KEY;
  if (!key) {
    return res.json({
      reply:
        "⚠️ GEMINI_KEY not set. Go to Vercel → Settings → Environment Variables → add GEMINI_KEY",
    });
  }

  try {
    // Correct model for 2025
    const model = "models/gemini-2.5-flash";
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/${model}:generateContent?key=${encodeURIComponent(
      key
    )}`;

    const payload = {
      contents: [{ parts: [{ text: message }] }],
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn’t generate a reply.";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Gemini error:", error);
    return res.status(500).json({ error: "Gemini API failed", details: error });
  }
};
