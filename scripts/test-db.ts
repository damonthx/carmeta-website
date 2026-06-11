import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

if (fs.existsSync('.env.local')) {
  dotenv.config({ path: '.env.local' });
} else {
  dotenv.config();
}

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing Supabase credentials.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function test() {
  const { data, error } = await supabase.rpc('get_table_columns', { table_name_param: 'inventory' });
  
  if (error) {
    // If RPC doesn't exist, we can try running a direct query using supabase.from() or another method,
    // but since we only have the REST API (supabase-js client), standard SQL queries must be done via RPC
    // or we can select a record and see its keys. Let's run a query to get a record first, but wait,
    // we can also create a custom function to run queries if we have the service role key, or check keys of a record.
    console.log('RPC get_table_columns error or not found. Let\'s fetch one row and inspect its keys.');
    const { data: rowData, error: rowError } = await supabase.from('inventory').select('*').limit(1);
    if (rowError) {
      console.error('Error fetching row:', rowError);
    } else if (rowData && rowData.length > 0) {
      console.log('Keys in row:', Object.keys(rowData[0]));
      console.log('Full Row:', rowData[0]);
    } else {
      console.log('No rows found in inventory.');
    }
  } else {
    console.log('Columns from RPC:', data);
  }
}

test().catch(console.error);
