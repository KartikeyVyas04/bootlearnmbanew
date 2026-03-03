// 1. INITIALIZE SUPABASE
const supabaseUrl = 'https://ykapcsubuoupqunurglz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrYXBjc3VidW91cHF1bnVyZ2x6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1MzYxNjMsImV4cCI6MjA4ODExMjE2M30.US-XWivfleScFchbKVqIJzFmgu2kOuTatmQXQgVo_K8';
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

// 2. RENDER NAVBAR HTML
function renderNavbar() {
    const path = window.location.pathname;
    const page = path.split("/").pop() || 'index.html'; 

    const activeClass = (target) => page === target 
        ? 'bg-indigo-50 text-indigo-600' 
        : 'text-slate-600 hover:text-indigo-700 hover:bg-indigo-50'; 

    // 🟢 USING PURE TAILWIND NOW - NO CUSTOM CSS REQUIRED!
    const navbarHTML = `
        <nav class="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-6 py-4 flex justify-between items-center shadow-sm">
            <a href="index.html" class="flex items-center shrink-0 group">
                <span class="text-lg font-extrabold text-slate-900 tracking-tight hover:text-indigo-600 transition-colors">BootLearn-MBA</span>
            </a>
            
            <button class="lg:hidden text-slate-600 hover:text-indigo-600 transition-colors p-2" id="menu-toggle" aria-label="Open Menu">
                <i data-lucide="menu" class="w-6 h-6"></i>
            </button>

            <ul class="hidden lg:flex items-center gap-1 xl:gap-2">
                <li><a href="index.html" class="px-3 xl:px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeClass('index.html')}">Home</a></li>
                <li><a href="quant.html" class="px-3 xl:px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeClass('quant.html')}">Quant</a></li>
                <li><a href="lrdi.html" class="px-3 xl:px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeClass('lrdi.html')}">LR-DI</a></li>
                <li><a href="verbal.html" class="px-3 xl:px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeClass('verbal.html')}">Verbal</a></li>
                <li><a href="mocks.html" class="px-3 xl:px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeClass('mocks.html')}">Mock Tests</a></li>
                <li><a href="updates.html" class="px-3 xl:px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeClass('updates.html')}">Updates</a></li>
                <li><a href="gdpi.html" class="px-3 xl:px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeClass('gdpi.html')}">GD/PI</a></li>
                
                <li id="desktop-auth-btn" class="ml-2"></li>
            </ul>
        </nav>

        <div id="overlay" class="lg:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[90] opacity-0 pointer-events-none transition-opacity duration-300 ease-in-out"></div>
        
        <ul id="nav-links" class="lg:hidden fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-[100] flex flex-col pt-20 border-r border-slate-200 overflow-y-auto -translate-x-full transition-transform duration-300 ease-in-out">
            <div class="absolute top-4 left-6 flex items-center">
                <span class="text-lg font-extrabold text-slate-900 tracking-tight">Menu</span>
            </div>
            <li><a href="index.html" class="block px-6 py-4 border-b border-slate-100 text-sm font-bold transition-colors ${page === 'index.html' ? 'text-indigo-600 bg-slate-50' : 'text-slate-700 hover:bg-slate-50'}">Home</a></li>
            <li><a href="quant.html" class="block px-6 py-4 border-b border-slate-100 text-sm font-bold transition-colors ${page === 'quant.html' ? 'text-indigo-600 bg-slate-50' : 'text-slate-700 hover:bg-slate-50'}">Quant</a></li>
            <li><a href="lrdi.html" class="block px-6 py-4 border-b border-slate-100 text-sm font-bold transition-colors ${page === 'lrdi.html' ? 'text-indigo-600 bg-slate-50' : 'text-slate-700 hover:bg-slate-50'}">LR-DI</a></li>
            <li><a href="verbal.html" class="block px-6 py-4 border-b border-slate-100 text-sm font-bold transition-colors ${page === 'verbal.html' ? 'text-indigo-600 bg-slate-50' : 'text-slate-700 hover:bg-slate-50'}">Verbal</a></li>
            <li><a href="mocks.html" class="block px-6 py-4 border-b border-slate-100 text-sm font-bold transition-colors ${page === 'mocks.html' ? 'text-indigo-600 bg-slate-50' : 'text-slate-700 hover:bg-slate-50'}">Mock Tests</a></li>
            <li><a href="updates.html" class="block px-6 py-4 border-b border-slate-100 text-sm font-bold transition-colors ${page === 'updates.html' ? 'text-indigo-600 bg-slate-50' : 'text-slate-700 hover:bg-slate-50'}">Updates</a></li>
            <li><a href="gdpi.html" class="block px-6 py-4 border-b border-slate-100 text-sm font-bold transition-colors ${page === 'gdpi.html' ? 'text-indigo-600 bg-slate-50' : 'text-slate-700 hover:bg-slate-50'}">GD/PI</a></li>
            
            <li id="mobile-auth-btn" class="w-full border-b border-slate-100 mt-auto"></li>
        </ul>
    `;

    document.getElementById('navbar-container').innerHTML = navbarHTML;

    lucide.createIcons();
    setupMobileMenu();
    checkAuthStatus();
}

// 3. MOBILE MENU LOGIC (Updated to use Tailwind)
function setupMobileMenu() {
    const toggleBtn = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const overlay = document.getElementById('overlay');

    function toggleMenu() {
        const isClosed = navLinks.classList.contains('-translate-x-full');
        
        if (isClosed) {
            // Open Menu
            navLinks.classList.remove('-translate-x-full');
            navLinks.classList.add('translate-x-0');
            overlay.classList.remove('opacity-0', 'pointer-events-none');
            overlay.classList.add('opacity-100', 'pointer-events-auto');
            document.body.style.overflow = 'hidden';
        } else {
            // Close Menu
            navLinks.classList.add('-translate-x-full');
            navLinks.classList.remove('translate-x-0');
            overlay.classList.add('opacity-0', 'pointer-events-none');
            overlay.classList.remove('opacity-100', 'pointer-events-auto');
            document.body.style.overflow = 'auto';
        }
    }

    toggleBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    navLinks.querySelectorAll('a').forEach(link => { 
        link.addEventListener('click', toggleMenu); 
    });
}

// 4. AUTHENTICATION LOGIC
async function checkAuthStatus() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    
    const desktopAuthBtn = document.getElementById('desktop-auth-btn');
    const mobileAuthBtn = document.getElementById('mobile-auth-btn');

    if (session) {
        localStorage.removeItem('prakior_redirect_url'); 
        
        desktopAuthBtn.innerHTML = `
            <button onclick="handleLogout()" class="ml-2 px-4 py-2 rounded-lg text-sm font-bold text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2 border border-red-100">
                <i data-lucide="log-out" class="w-4 h-4"></i> Logout
            </button>
        `;
        mobileAuthBtn.innerHTML = `
            <button onclick="handleLogout()" class="w-full text-left px-6 py-4 text-sm font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors">
                <i data-lucide="log-out" class="w-4 h-4"></i> Logout
            </button>
        `;
    } else {
        desktopAuthBtn.innerHTML = `
            <a href="login.html" class="ml-2 px-4 py-2 rounded-lg text-sm font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm flex items-center gap-2">
                <i data-lucide="user" class="w-4 h-4"></i> Sign In
            </a>
        `;
        mobileAuthBtn.innerHTML = `
            <a href="login.html" class="block px-6 py-4 text-sm font-bold text-slate-900 hover:bg-slate-50 flex items-center gap-2 transition-colors">
                <i data-lucide="user" class="w-4 h-4"></i> Sign In
            </a>
        `;

        const protectedPages = ['quant.html', 'lrdi.html', 'verbal.html', 'mocks.html', 'updates.html', 'gdpi.html', 'learn.html'];
        document.querySelectorAll('a').forEach(link => {
            const href = link.getAttribute('href');
            if (href && protectedPages.includes(href)) {
                link.addEventListener('click', function(e) {
                    e.preventDefault(); 
                    localStorage.setItem('prakior_redirect_url', href); 
                    window.location.href = 'login.html'; 
                });
            }
        });
    }
    lucide.createIcons();
}

async function handleLogout() {
    await supabaseClient.auth.signOut();
    window.location.reload(); 
}

// 5. BOOT UP
renderNavbar();
