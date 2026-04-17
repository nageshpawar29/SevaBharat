import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase URL and Anon Key
// They can be found in your Supabase Dashboard under Project Settings > API
const supabaseUrl = 'https://yavgxcmsdihybkrkyurn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlhdmd4Y21zZGloeWJrcmt5dXJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4Mzg1ODEsImV4cCI6MjA5MTQxNDU4MX0.smdC6DGiRX74ZIqEYUjyiklpl2PyhSkRc8zjZvxAzqE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
