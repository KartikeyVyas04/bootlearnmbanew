(async function() {
    const supabaseUrl = 'https://ykapcsubuoupqunurglz.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrYXBjc3VidW91cHF1bnVyZ2x6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1MzYxNjMsImV4cCI6MjA4ODExMjE2M30.US-XWivfleScFchbKVqIJzFmgu2kOuTatmQXQgVo_K8';
    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

    const { data: { session } } = await supabase.auth.getSession();

    // If no session exists, kick them to login
    if (!session) {
        // Save where they were trying to go
        localStorage.setItem('prakior_redirect_url', window.location.pathname);
        window.location.href = 'login.html';
    }
})();
