import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jceaelywutqciiwxmocw.supabase.co";
const supabaseAnonKey = 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpjZWFlbHl3dXRxY2lpd3htb2N3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0Njc0NjAsImV4cCI6MjA1NzA0MzQ2MH0.QMey6fHp_Xbr0Btqo48cI6M6JW4NMmIw90VgpQFJlLs";

/* supabase instance that connects to supabase project */
const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;