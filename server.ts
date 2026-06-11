import express from "express";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";

// Load environment variables from .env or .env.local
if (fs.existsSync('.env.local')) {
  dotenv.config({ path: '.env.local' });
} else {
  dotenv.config();
}


async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

  // Add a proxy endpoint for MarketCheck
  app.get("/api/marketcheck/search", async (req, res) => {
    try {
      const { make, model, year, query, rows, zip, radius } = req.query;
      let apiKey = process.env.VITE_MARKETCHECK_API_KEY || 'ThoKb13BeDzhQhMeHuh5XkO8UiwFRedr';
      
      const buildUrl = (key: string) => {
        let url = `https://mc-api.marketcheck.com/v2/search/car/active?api_key=${key}`;
        if (rows) url += `&rows=${rows}`;
        if (make) url += `&make=${encodeURIComponent(make as string)}`;
        if (model) url += `&model=${encodeURIComponent(model as string)}`;
        if (year) url += `&year=${encodeURIComponent(year as string)}`;
        if (zip) url += `&zip=${encodeURIComponent(zip as string)}`;
        if (radius) url += `&radius=${encodeURIComponent(radius as string)}`;
        return url;
      };

      let response = await fetch(buildUrl(apiKey));
      
      // If unauthorized, fallback to the default demo key
      if (!response.ok && process.env.VITE_MARKETCHECK_API_KEY) {
        console.warn(`Configured API key returned ${response.status}, falling back to demo key.`);
        response = await fetch(buildUrl('ThoKb13BeDzhQhMeHuh5XkO8UiwFRedr'));
      }

      if (!response.ok) {
        console.error(`MarketCheck API Error Details: status=${response.status}, text=${await response.text()}`);
        throw new Error(`MarketCheck API Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Proxy Error:', error);
      res.status(500).json({ error: 'Failed to fetch from MarketCheck', details: String(error) });
    }
  });

  // Add proxy endpoint for MarketCheck Economics/TCO
  app.get("/api/marketcheck/predict", async (req, res) => {
    try {
      const { vin, make, model, year, state } = req.query;
      let apiKey = process.env.VITE_MARKETCHECK_API_KEY || 'ThoKb13BeDzhQhMeHuh5XkO8UiwFRedr';
      
      const buildUrl = (key: string) => {
        let url = `https://mc-api.marketcheck.com/v2/predict/car/costs?api_key=${key}`;
        if (vin) url += `&vin=${encodeURIComponent(vin as string)}`;
        if (make) url += `&make=${encodeURIComponent(make as string)}`;
        if (model) url += `&model=${encodeURIComponent(model as string)}`;
        if (year) url += `&year=${encodeURIComponent(year as string)}`;
        if (state) url += `&state=${encodeURIComponent(state as string)}`;
        return url;
      };

      let response = await fetch(buildUrl(apiKey));
      
      if (!response.ok && process.env.VITE_MARKETCHECK_API_KEY) {
        response = await fetch(buildUrl('ThoKb13BeDzhQhMeHuh5XkO8UiwFRedr'));
      }

      if (!response.ok) {
        throw new Error(`MarketCheck Predict API Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Predict Proxy Error:', error);
      res.status(500).json({ error: 'Failed to fetch TCO from MarketCheck', details: String(error) });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
