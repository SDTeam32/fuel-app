import { createClient } from "@supabase/supabase-js";

const supabasekey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpZ2dkbWpqaW1vYWl3bGJ0ZWt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcxNjE1MTIsImV4cCI6MjAyMjczNzUxMn0.1egRR2QeqBOZBCw33yVWHYotnnmcZAlMxmcODzKeAII"
const supabseURL = "https://figgdmjjimoaiwlbtekw.supabase.co/"

export const supabase = createClient(supabseURL, supabasekey)