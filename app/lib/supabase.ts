import { createClient } from '@supabase/supabase-js';
import { Database } from '../api/cavos/database.types';

export const supabase = createClient<Database>(
	process.env.SUPABASE_URL || 'https://lipqhibiyftiahrbfzdg.supabase.co',
	process.env.SUPABASE_ANON_KEY ||
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpcHFoaWJpeWZ0aWFocmJmemRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyMDMxMTAsImV4cCI6MjA2MDc3OTExMH0.d_4XRzQKPzjhSSrcqmj0WOb_AFWJ_dxEFEDRwcx8oeo'
);
