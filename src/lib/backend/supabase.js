import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
	'https://xhbhfqutkhwkdgwywvrr.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhoYmhmcXV0a2h3a2Rnd3l3dnJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE3MjY5ODEsImV4cCI6MjAzNzMwMjk4MX0.jNAbkYylHEVT2H4ucf-jdy8j9NZ4dL7PxXoP2hnEqfQ'
);

//import { createClient } from '@supabase/supabase-js';

//const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
//const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

//export const supabase = createClient(supabaseUrl, supabaseAnonKey);
