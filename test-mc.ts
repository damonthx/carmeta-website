import fs from 'fs';

async function run() {
  const apiKey = 'ThoKb13BeDzhQhMeHuh5XkO8UiwFRedr';
  const url = `https://mc-api.marketcheck.com/v2/search/car/active?api_key=${apiKey}&rows=24`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log("Total length:", data.listings?.length);
    for (const listing of data.listings) {
      console.log({
        make: listing.build?.make,
        price: listing.price,
        miles: listing.miles,
        carfax_clean_title: listing.carfax_clean_title,
        carfax_1_owner: listing.carfax_1_owner
      });
    }
  } catch (err) {
    console.error(err);
  }
}
run();
