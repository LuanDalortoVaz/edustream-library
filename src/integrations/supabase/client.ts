// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://xxurftabmzpjruvekudk.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4dXJmdGFibXpwanJ1dmVrdWRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3OTU1MjMsImV4cCI6MjA1NDM3MTUyM30.S30mQY-7_Uo6FDGHg2cq-hadGc614VtYD9LlV-11avY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);