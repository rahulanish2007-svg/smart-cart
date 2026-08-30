import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// AI Chat Assistant endpoint
app.post("/api/ai/assistant", async (req, res) => {
  try {
    const { message, history } = req.body;
    const ai = getGenAI();

    if (!ai) {
      // Intelligent fallback if API key is not configured
      const lower = (message || "").toLowerCase();
      let reply = "I can help you build your shopping list, find discounts, or suggest recipes!";
      let suggestedIds: string[] = [];

      if (lower.includes("family of 4") || lower.includes("essentials") || lower.includes("typical order")) {
        reply = "Sure! For a family of 4, I recommend these essentials based on your typical order:";
        suggestedIds = ["india-gate-basmati-5kg", "toor-dal-1kg", "fresh-whole-milk-1l"];
      } else if (lower.includes("protein") || lower.includes("gym") || lower.includes("diet")) {
        reply = "Here are high-protein essentials curated for optimal nutrition:";
        suggestedIds = ["premium-malai-paneer-200g", "farm-fresh-brown-eggs-6", "fresh-whole-milk-1l"];
      } else if (lower.includes("breakfast") || lower.includes("morning")) {
        reply = "Here are fresh breakfast favorites for a quick and wholesome morning:";
        suggestedIds = ["amul-butter-500g", "artisan-brown-bread", "fresh-whole-milk-1l", "farm-fresh-brown-eggs-6"];
      } else if (lower.includes("atta") || lower.includes("rice") || lower.includes("dal")) {
        reply = "Here are staple essentials with the best price drops this week:";
        suggestedIds = ["aashirvaad-atta-5kg", "india-gate-basmati-5kg", "toor-dal-1kg"];
      } else {
        reply = `I've analyzed your request for "${message}". Here are the best matched groceries with maximum savings:`;
        suggestedIds = ["fresh-whole-milk-1l", "premium-malai-paneer-200g", "aashirvaad-atta-5kg"];
      }

      return res.json({
        reply,
        suggestedProductIds: suggestedIds
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: `You are SmartKart AI, a smart Indian grocery shopping assistant for a user named Ananya in Mumbai.
Available products in inventory:
1. Aashirvaad Atta 5kg (id: aashirvaad-atta-5kg, ₹225)
2. Amul Butter 500g (id: amul-butter-500g, ₹270)
3. India Gate Basmati 5kg (id: india-gate-basmati-5kg, ₹799)
4. Saffola Gold Oil 1L (id: saffola-gold-oil-1l, ₹185)
5. Fresh Farm Whole Milk 1L (id: fresh-whole-milk-1l, ₹68)
6. Premium Malai Paneer 200g (id: premium-malai-paneer-200g, ₹85)
7. Thick & Creamy Curd 400g (id: thick-creamy-curd-400g, ₹45)
8. Farm Fresh Brown Eggs 6 pcs (id: farm-fresh-brown-eggs-6, ₹65)
9. Fresh Coriander 100g (id: fresh-coriander-100g, ₹15)
10. Robusta Bananas 1kg (id: robusta-bananas-1kg, ₹60)
11. Organic Spinach 2 Bunches (id: organic-spinach-2-bunches, ₹120)
12. Toor Dal 1kg (id: toor-dal-1kg, ₹180)

User asked: "${message}".

Provide a helpful, friendly, concise response in 1-2 sentences, and return a JSON object with:
- "reply": string (short helpful text)
- "suggestedProductIds": array of matching product IDs from the inventory list above.

Return strictly valid JSON.`,
      config: {
        responseMimeType: "application/json",
      }
    });

    const parsed = JSON.parse(response.text?.trim() || "{}");
    return res.json({
      reply: parsed.reply || "Here are recommendations based on your request:",
      suggestedProductIds: parsed.suggestedProductIds || ["fresh-whole-milk-1l", "premium-malai-paneer-200g"]
    });
  } catch (error: any) {
    console.error("AI Assistant error:", error);
    return res.json({
      reply: "Here are the top recommended essentials based on your shopping preferences:",
      suggestedProductIds: ["india-gate-basmati-5kg", "toor-dal-1kg", "fresh-whole-milk-1l"]
    });
  }
});

// Smart List Organizer endpoint
app.post("/api/ai/parse-list", async (req, res) => {
  try {
    const { listText } = req.body;
    const ai = getGenAI();

    if (!ai) {
      // Smart local parsing
      const items = (listText || "").split(/,|\n|\+/).map((s: string) => s.trim()).filter(Boolean);
      return res.json({
        success: true,
        items: items.map((item: string, idx: number) => ({
          name: item,
          category: item.toLowerCase().includes("milk") || item.toLowerCase().includes("paneer") || item.toLowerCase().includes("butter") ? "Dairy" : "Staples",
          quantity: "1 unit",
          estimatedPrice: 65 + (idx * 25)
        }))
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: `Parse this user grocery list into items: "${listText}". Return a JSON array of items with name, category, quantity, estimatedPrice.`,
      config: {
        responseMimeType: "application/json",
      }
    });

    const parsed = JSON.parse(response.text?.trim() || "[]");
    return res.json({ success: true, items: parsed });
  } catch (error) {
    console.error("Parse list error:", error);
    res.status(500).json({ error: "Failed to parse list" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SmartKart AI Server running on port ${PORT}`);
  });
}

startServer();
