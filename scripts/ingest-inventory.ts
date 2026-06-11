import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables from .env or .env.local
if (fs.existsSync('.env.local')) {
  dotenv.config({ path: '.env.local' });
} else {
  dotenv.config();
}

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Default to the sample file location in the root folder, falling back to parent folder
const fallbackPath = fs.existsSync(path.join(process.cwd(), 'ExportSampleFile.csv'))
  ? path.join(process.cwd(), 'ExportSampleFile.csv')
  : path.join(process.cwd(), '../ExportSampleFile.csv');
const INVENTORY_CSV_PATH = process.env.INVENTORY_CSV_PATH || fallbackPath;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env file.');
  console.error('Please add SUPABASE_SERVICE_ROLE_KEY to your .env to allow backend insertion.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const BATCH_SIZE = 100;
let batch: any[] = [];
let totalProcessed = 0;
let totalInserted = 0;

async function flushBatch() {
  if (batch.length === 0) return;

  const { error } = await supabase.from('inventory').upsert(batch, {
    onConflict: 'vin',
    ignoreDuplicates: false, 
  });

  if (error) {
    console.error(`❌ Error inserting batch:`, error.message);
  } else {
    totalInserted += batch.length;
    console.log(`✅ Upserted ${batch.length} records. Total so far: ${totalInserted}`);
  }

  batch = [];
}

function parseNumber(value: string | undefined): number | null {
  if (!value) return null;
  const num = parseFloat(value.replace(/[^0-9.-]+/g, ''));
  return isNaN(num) ? null : num;
}

function parseArray(value: string | undefined): string[] {
  if (!value) return [];
  return value.split('|').filter(item => item.trim() !== '');
}

function parseDate(value: string | undefined): string | null {
  if (!value || value.trim() === '') return null;
  const date = new Date(value);
  return isNaN(date.getTime()) ? null : date.toISOString();
}

function parseBoolean(value: string | undefined): boolean {
  if (!value) return false;
  const normalized = value.trim().toLowerCase();
  return normalized === 'true' || normalized === '1' || normalized === 'yes';
}

async function run() {
  console.log(`🚀 Starting inventory ingestion from: ${INVENTORY_CSV_PATH}`);

  if (!fs.existsSync(INVENTORY_CSV_PATH)) {
    console.error(`❌ CSV file not found at ${INVENTORY_CSV_PATH}`);
    process.exit(1);
  }

  const stream = fs.createReadStream(INVENTORY_CSV_PATH).pipe(csv());

  stream.on('data', async function(this: any, data) {
    totalProcessed++;

    const record = {
      vin: data['VIN'],
      dealer_id: data['Dealer ID'],
      make: data['Make'],
      model: data['Model'],
      trim: data['Trim'],
      year: parseNumber(data['Year']),
      body_type: data['Body Type'],
      engine: data['Engine'],
      drive_type: data['Drive Type'],
      transmission: data['Transmission Type'],
      cylinders: data['Cylinders'],
      exterior_color: data['Exterior Color'],
      interior_color: data['Interior Color'],
      mileage: parseNumber(data['Mileage']),
      cost: parseNumber(data['Cost']),
      retail_price: parseNumber(data['Retail']),
      internet_price: parseNumber(data['Internet Price']),
      msrp: parseNumber(data['MSRP']),
      options: parseArray(data['Options']),
      images: parseArray(data['Images']),
      comments: data['Comments'],
      vehicle_link: data['Vehicle Link'],
      // Newly added columns mapped from ExportSampleFile.csv
      stock_number: data['Stock Number'] || null,
      interior_type: data['Interior Type'] || null,
      wholesale: parseNumber(data['Wholesale']),
      purchase_date: parseDate(data['Purchase Date']),
      video_url: data['Video URL'] || null,
      last_modified_date: parseDate(data['Last Modified Date']),
      mpg_city: parseNumber(data['MPG City']),
      mpg_highway: parseNumber(data['MPG Highway']),
      new_used: data['New / Used'] || null,
      image_last_modified_date: parseDate(data['Image Last Modified Date']),
      certified_pre_owned: parseBoolean(data['Certified Pre Owned'])
    };

    if (record.vin) {
      batch.push(record);
    } else {
      console.warn(`⚠️ Skipping row ${totalProcessed} due to missing VIN.`);
    }

    if (batch.length >= BATCH_SIZE) {
      // Pause the stream to wait for the async DB insertion
      stream.pause();
      await flushBatch();
      stream.resume();
    }
  });

  stream.on('end', async () => {
    // Flush any remaining records
    await flushBatch();
    console.log(`🎉 Ingestion complete! Processed ${totalProcessed} rows. Upserted ${totalInserted} vehicles.`);
    process.exit(0);
  });

  stream.on('error', (error) => {
    console.error(`❌ Stream error:`, error.message);
    process.exit(1);
  });
}

run().catch(console.error);
