import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

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
    return res.status(200).json(data);
  } catch (error) {
    console.error('Proxy Error:', error);
    return res.status(500).json({ error: 'Failed to fetch from MarketCheck', details: String(error) });
  }
}
