import { createClient } from "@supabase/supabase-js";
const suparbaseUrl = 'https://qwymhkktvbieizekmchi.supabase.co'
const superbaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3eW1oa2t0dmJpZWl6ZWttY2hpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyOTIxNTIsImV4cCI6MjA0Nzg2ODE1Mn0.WRdfrkbi6DArg8juG6QLjMrGf28clHX4gbIWFM79wA8'
export const supabase = createClient(suparbaseUrl, superbaseKey)