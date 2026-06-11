export interface MarketCheckCar {
  id: string;
  vin: string;
  heading: string;
  price?: number;
  miles?: number;
  year: number;
  make: string;
  model: string;
  media?: {
    photo_links?: string[];
  };
  dealer?: {
    name: string;
    city: string;
    state: string;
  };
  build?: {
    body_type?: string;
    fuel_type?: string;
  };
  carfax_1_owner?: boolean;
  carfax_clean_title?: boolean;
  dom?: number; // days on market
}

// NOTE: We are doing client-side fetching for this demo as requested.
// WARNING: Storing APIs keys in the client is not advised for production.
export async function searchCars(params: { query?: string; make?: string; model?: string; year?: string; zip?: string; radius?: number } = {}): Promise<MarketCheckCar[]> {
  try {
    let url = `/api/marketcheck/search?rows=24`;
    
    if (params.make) {
      url += `&make=${encodeURIComponent(params.make)}`;
    }
    if (params.model) {
      url += `&model=${encodeURIComponent(params.model)}`;
    }
    if (params.year) {
      url += `&year=${encodeURIComponent(params.year)}`;
    }
    if (params.query) {
      url += `&query=${encodeURIComponent(params.query)}`;
    }
    if (params.zip) {
      url += `&zip=${encodeURIComponent(params.zip)}`;
    }
    if (params.radius) {
      url += `&radius=${encodeURIComponent(params.radius.toString())}`;
    }
    
    const response = await fetch(url);
    if (!response.ok) {
      console.error('MarketCheck Proxy API Error:', response.statusText);
      return [];
    }
    
    const data = await response.json();
    return (data.listings || []).map((listing: any) => ({
      ...listing,
      make: listing.make || listing.build?.make,
      model: listing.model || listing.build?.model,
      year: listing.year || listing.build?.year,
    }));
  } catch (error) {
    console.error('Failed to fetch from MarketCheck', error);
    return [];
  }
}

export async function getVehicleTCO(params: { vin?: string; make?: string; model?: string; year?: number; state?: string }): Promise<any> {
  try {
    let url = `/api/marketcheck/predict?`;
    const searchParams = new URLSearchParams();
    if (params.vin) searchParams.append('vin', params.vin);
    if (params.make) searchParams.append('make', params.make);
    if (params.model) searchParams.append('model', params.model);
    if (params.year) searchParams.append('year', params.year.toString());
    if (params.state) searchParams.append('state', params.state);
    
    const response = await fetch(url + searchParams.toString());
    if (!response.ok) {
      console.error('MarketCheck TCO API Error:', response.statusText);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch TCO data', error);
    return null;
  }
}

