"use server";

import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client securely on the server, or fall back to client env in Vite
let supabaseUrl = "";
let supabaseServiceKey = "";

if (typeof process !== "undefined" && process.env) {
  supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
}

if (!supabaseUrl && typeof window !== "undefined") {
  try {
    // @ts-ignore
    supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
    // @ts-ignore
    supabaseServiceKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
  } catch (e) {
    // Ignore reference errors in non-Vite environments
  }
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateSlug(slug: string): boolean {
  // Must start with '/' and end with '/' and be lowercase with dashes
  return /^\/[a-z0-9]+(?:-[a-z0-9]+)*\/$/.test(slug);
}

export interface ActionResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export async function createDealership(prevState: any, formData: FormData): Promise<ActionResponse> {
  // Validate Env
  if (!supabaseUrl || !supabaseServiceKey) {
    return {
      success: false,
      error: "Server configuration error: Supabase environment variables are missing."
    };
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const dealershipName = formData.get("dealership_name")?.toString().trim();
  const primaryContactName = formData.get("primary_contact_name")?.toString().trim();
  const primaryContactEmail = formData.get("primary_contact_email")?.toString().trim();
  const itContactEmail = formData.get("it_contact_email")?.toString().trim();
  const ftpFolderPath = formData.get("ftp_folder_path")?.toString().trim();

  // New production-grade fields
  const phoneNumber = formData.get("phone_number")?.toString().trim() || "";
  const websiteUrl = formData.get("website_url")?.toString().trim() || "";
  const streetAddress = formData.get("street_address")?.toString().trim() || "";
  const city = formData.get("city")?.toString().trim() || "";
  const stateVal = formData.get("state")?.toString().trim() || "";
  const zipCode = formData.get("zip_code")?.toString().trim() || "";
  const dmsProvider = formData.get("dms_provider")?.toString().trim() || "";
  const inventoryStatus = formData.get("inventory_status")?.toString().trim() || "pending_feed";
  const subscriptionTier = formData.get("subscription_tier")?.toString().trim() || "standard";

  // Basic validations
  if (!dealershipName) {
    return { success: false, error: "Dealership Name is required." };
  }
  if (!primaryContactName) {
    return { success: false, error: "Primary Contact Name is required." };
  }
  if (!primaryContactEmail || !validateEmail(primaryContactEmail)) {
    return { success: false, error: "A valid Primary Contact Email is required." };
  }
  if (!itContactEmail || !validateEmail(itContactEmail)) {
    return { success: false, error: "A valid IT Contact Email is required." };
  }
  if (!ftpFolderPath) {
    return { success: false, error: "FTP Folder Path is required." };
  }
  if (!validateSlug(ftpFolderPath)) {
    return {
      success: false,
      error: "FTP Folder Path format must start and end with a slash, using lowercase and dashes (e.g., /texas-motors/)."
    };
  }

  try {
    const { error } = await supabase
      .from("dealerships")
      .insert([
        {
          dealership_name: dealershipName,
          primary_contact_name: primaryContactName,
          primary_contact_email: primaryContactEmail,
          it_contact_email: itContactEmail,
          ftp_folder_path: ftpFolderPath,
          phone_number: phoneNumber,
          website_url: websiteUrl,
          street_address: streetAddress,
          city: city,
          state: stateVal,
          zip_code: zipCode,
          dms_provider: dmsProvider,
          inventory_status: inventoryStatus,
          subscription_tier: subscriptionTier
        }
      ]);

    if (error) {
      console.error("Database insert error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, message: `Successfully registered ${dealershipName}!` };
  } catch (err: any) {
    console.error("Server Action exception:", err);
    return { success: false, error: err.message || "An unexpected server error occurred." };
  }
}
