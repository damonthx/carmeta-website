import { supabase } from '../supabaseClient';
import { MarketCheckCar } from './marketcheck';

export async function getFavorites() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return [];

  const { data, error } = await supabase
    .from('saved_vehicles')
    .select('*')
    .eq('user_id', session.user.id);

  if (error) {
    console.error('Error fetching favorites:', error);
    return [];
  }
  return data;
}

export async function toggleFavorite(vehicle: MarketCheckCar) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('Sign in to save vehicles');

  const { data: existing } = await supabase
    .from('saved_vehicles')
    .select('id')
    .eq('user_id', session.user.id)
    .eq('vehicle_id', vehicle.id)
    .single();

  if (existing) {
    const { error } = await supabase
      .from('saved_vehicles')
      .delete()
      .eq('id', existing.id);
    if (error) throw error;
    return false; // Removed
  } else {
    const { error } = await supabase
      .from('saved_vehicles')
      .insert([
        {
          user_id: session.user.id,
          vehicle_id: vehicle.id,
          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year,
          price: vehicle.price,
          image_url: vehicle.media?.photo_links?.[0] || null
        }
      ]);
    if (error) throw error;
    return true; // Added
  }
}
