import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? ""
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ""
// Create a custom secret token the data provider must include in their header
const CUSTOM_SECRET_TOKEN = Deno.env.get('DATA_PROVIDER_SECRET_TOKEN') ?? "CarMeta_Secure_2026_Token"

serve(async (req) => {
  // 1. Security Check: Verify their authorization token
  const authHeader = req.headers.get("Authorization")
  if (!authHeader || authHeader !== `Bearer ${CUSTOM_SECRET_TOKEN}`) {
    return new Response(JSON.stringify({ error: "Unauthorized access token" }), { status: 401 })
  }

  try {
    // 2. Extract the incoming file body (handling text/csv or binary data stream)
    const formData = await req.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return new Response(JSON.stringify({ error: "No file provided in request" }), { status: 400 })
    }

    // 3. Initialize Supabase Admin Client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    // 4. Upload directly to your private 'dealership-inventory' bucket
    const { data, error } = await supabase.storage
      .from('dealership-inventory')
      .upload(`latest_inventory.csv`, file, {
        cacheControl: '3600',
        upsert: true // This overwrites the old file with the fresh daily drop
      })

    if (error) throw error

    return new Response(JSON.stringify({ message: "Inventory feed uploaded successfully!", data }), { status: 200 })

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
})
