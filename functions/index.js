// functions/index.js
const functions = require("firebase-functions");
const fetch = require("node-fetch");

// optional: cap instances
functions.setGlobalOptions({ maxInstances: 10 });

exports.geminiChat = functions.https.onRequest(async (req, res) => {
  // CORS
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }
  if (req.method !== "POST") {
    res.status(405).json({ error: "Only POST allowed" });
    return;
  }

  const { message } = req.body || {};
  if (!message || typeof message !== "string") {
    res.status(400).json({ error: "Missing 'message' string in body" });
    return;
  }

  const key = functions.config()?.gemini?.key || null;
  if (!key) {
    console.error("Gemini API key missing in functions.config()");
    return res.json({
      reply:
        '⚠️ Gemini API key not found. Set it with: firebase functions:config:set gemini.key="YOUR_KEY"',
    });
  }

  try {
    // use a valid model (from your list). gemini-2.5-flash is a good choice.
    const model = "gemini-2.5-flash";
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(
      key
    )}`;

    // <-- FIXED payload shape: use "contents" with "parts" containing text
    const payload = {
      contents: [
        {
          parts: [
            {
              text: message,
            },
          ],
        },
      ],
      // optional generation parameters (uncomment/change when needed)
      // temperature: 0.7,
      // maxOutputTokens: 512
    };

    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!upstream.ok) {
      const txt = await upstream.text();
      console.error("Gemini API error:", upstream.status, txt);
      return res
        .status(502)
        .json({ error: "Gemini API error", status: upstream.status, details: txt });
    }

    const data = await upstream.json();

    // extract text from common response shapes
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      data?.candidates?.[0]?.content?.[0]?.text ||
      data?.output?.[0]?.text ||
      data?.choices?.[0]?.message?.content ||
      (typeof data === "string" ? data : JSON.stringify(data).slice(0, 2000));

    return res.json({ reply });
  } catch (err) {
    console.error("Function error:", err);
    return res.status(500).json({ error: "Internal function error", detail: String(err) });
  }
});
