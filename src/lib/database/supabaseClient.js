import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
	'https://czhamgokmbbbkdxqddru.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6aGFtZ29rbWJiYmtkeHFkZHJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI0ODI5NjIsImV4cCI6MjAxODA1ODk2Mn0.Q4VGb-ZQxAOBPczNldxjCjQwKOz2wFL3lgL368Z8fUY'
);
