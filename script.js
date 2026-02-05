document.addEventListener('DOMContentLoaded', function() {
    // Initialize everything
    initIslamicWebsite();
});

function initIslamicWebsite() {
    // Scroll to Top Button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollToTopBtn);

    // Show/Hide Scroll to Top Button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    // Scroll to Top functionality
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Quran Verse Rotation
    const quranVerses = [
        {
            arabic: "ٱقْرَأْ بِٱسْمِ رَبِّكَ ٱلَّذِى خَلَقَ",
            translation: "Read in the name of your Lord who created",
            reference: "Surah Al-Alaq 96:1"
        },
        {
            arabic: "إِنَّ ٱلدِّينَ عِندَ ٱللَّهِ ٱلْإِسْلَـٰمُ",
            translation: "Indeed, the religion in the sight of Allah is Islam",
            reference: "Surah Al-Imran 3:19"
        },
        {
            arabic: "ٱلْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ",
            translation: "This day I have perfected for you your religion",
            reference: "Surah Al-Ma'idah 5:3"
        },
        {
            arabic: "مُّحَمَّدٌۭ رَّسُولُ ٱللَّهِ",
            translation: "Muhammad is the Messenger of Allah",
            reference: "Surah Al-Fath 48:29"
        }
    ];

    // Rotate Quran verses every 10 seconds
    let currentVerseIndex = 0;
    const verseElement = document.querySelector('.quranic-calligraphy');
    
    if (verseElement) {
        setInterval(() => {
            currentVerseIndex = (currentVerseIndex + 1) % quranVerses.length;
            const verse = quranVerses[currentVerseIndex];
            
            verseElement.style.opacity = '0';
            verseElement.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                verseElement.querySelector('.arabic-verse').textContent = verse.arabic;
                verseElement.querySelector('.verse-translation').textContent = verse.translation;
                verseElement.querySelector('.verse-reference').textContent = verse.reference;
                
                verseElement.style.opacity = '1';
                verseElement.style.transform = 'translateY(0)';
            }, 500);
        }, 10000);
    }

    // Prayer Times Display (Placeholder - you'll need to implement actual API)
    function displayPrayerTimes() {
        const prayerTimesContainer = document.getElementById('prayer-times');
        if (prayerTimesContainer) {
            const times = {
                fajr: "5:30 AM",
                dhuhr: "12:30 PM",
                asr: "4:00 PM",
                maghrib: "6:30 PM",
                isha: "8:00 PM"
            };
            
            prayerTimesContainer.innerHTML = `
                <div class="prayer-times-grid">
                    ${Object.entries(times).map(([prayer, time]) => `
                        <div class="prayer-time">
                            <span class="prayer-name">${prayer.toUpperCase()}</span>
                            <span class="prayer-time-value">${time}</span>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }

    // Call prayer times
    displayPrayerTimes();

    // Islamic Date Display
    function updateIslamicDate() {
        const islamicDateElement = document.getElementById('islamic-date');
        if (islamicDateElement) {
            // This is a simplified version. For actual Hijri dates, use a library like Hijri.js
            const islamicMonths = [
                'Muharram', 'Safar', 'Rabi\' al-Awwal', 'Rabi\' al-Thani',
                'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha\'ban',
                'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'
            ];
            
            // Simplified calculation (actual conversion requires complex algorithm)
            const today = new Date();
            const islamicMonth = islamicMonths[today.getMonth() % 12];
            const islamicDay = today.getDate();
            const islamicYear = 1445 + Math.floor(today.getFullYear() - 2023);
            
            islamicDateElement.textContent = `${islamicDay} ${islamicMonth} ${islamicYear} AH`;
        }
    }

    updateIslamicDate();

    // Beautiful Card Hover Effects
    const cards = document.querySelectorAll('.etymology-card, .course-card, .wisdom-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.etymology-card, .course-card, .wisdom-card, .section-title').forEach(el => {
        observer.observe(el);
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.8s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .prayer-times-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
        }
        
        .prayer-time {
            background: rgba(255, 255, 255, 0.1);
            padding: 1rem;
            border-radius: 10px;
            text-align: center;
            backdrop-filter: blur(10px);
        }
        
        .prayer-name {
            display: block;
            font-weight: bold;
            color: var(--secondary-color);
            margin-bottom: 0.5rem;
        }
        
        .prayer-time-value {
            display: block;
            font-size: 1.2rem;
        }
    `;
    document.head.appendChild(style);
}

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// Tab Functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and panes
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Show corresponding pane
        const tabId = btn.getAttribute('data-tab');
        const targetPane = document.getElementById(tabId);
        if (targetPane) {
            targetPane.classList.add('active');
        }
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        }
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.style.opacity = '0';
            menu.style.visibility = 'hidden';
            menu.style.transform = 'translateY(10px)';
        });
    }
});

// Form Submission Handling
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Add your form submission logic here
        const formData = new FormData(form);
        
        // Show success message
        alert('Thank you for your message! We will respond soon.');
        form.reset();
    });
});

// Daily Quran Verse
async function getDailyVerse() {
    try {
        // This is a placeholder - you'll need to implement actual Quran API
        const verses = [
            {
                arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
                translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
                reference: "Surah Al-Fatihah 1:1"
            },
            {
                arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
                translation: "[All] praise is [due] to Allah, Lord of the worlds.",
                reference: "Surah Al-Fatihah 1:2"
            },
            {
                arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
                translation: "It is You we worship and You we ask for help.",
                reference: "Surah Al-Fatihah 1:5"
            }
        ];
        
        // Get a random verse
        const randomVerse = verses[Math.floor(Math.random() * verses.length)];
        
        // Display verse if element exists
        const verseElement = document.getElementById('daily-verse');
        if (verseElement) {
            verseElement.innerHTML = `
                <p class="arabic-verse">${randomVerse.arabic}</p>
                <p class="verse-translation">${randomVerse.translation}</p>
                <p class="verse-reference">${randomVerse.reference}</p>
            `;
        }
    } catch (error) {
        console.error('Error fetching verse:', error);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    getDailyVerse();
    
    // Add animation to cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.etymology-card, .course-card').forEach(el => {
        observer.observe(el);
    });
});
// ... all your previous JavaScript code ...

// Quran Verse of the Day
async function getDailyVerse() {
    try {
        // This is a placeholder - you'll need to implement actual Quran API
        const verse = {
            arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
            translation: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
            reference: "Surah Al-Fatihah 1:1"
        };
        
        // Display verse
        const verseElement = document.getElementById('daily-verse');
        if (verseElement) {
            verseElement.innerHTML = `
                <p class="arabic-verse">${verse.arabic}</p>
                <p class="verse-translation">${verse.translation}</p>
                <p class="verse-reference">${verse.reference}</p>
            `;
        }
    } catch (error) {
        console.error('Error fetching verse:', error);
    }
}

// Call function when page loads
window.addEventListener('load', getDailyVerse);

/* ============================================
   AUTHENTICATION SYSTEM
   ============================================ */

// Authentication Functions
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        this.loadCurrentUser();
        this.setupAuthListeners();
    }

    loadCurrentUser() {
        const userData = localStorage.getItem('currentUser');
        if (userData) {
            this.currentUser = JSON.parse(userData);
            this.updateUIForLoggedInUser();
        }
    }

    updateUIForLoggedInUser() {
        // Update navigation
        const loginLinks = document.querySelectorAll('a[href="pages/login.html"], a.login-btn');
        loginLinks.forEach(link => {
            if (this.currentUser) {
                link.innerHTML = '<i class="fas fa-user-circle"></i> Account';
                link.href = 'pages/dashboard.html';
            }
        });

        // Add user menu if not exists
        if (this.currentUser && !document.querySelector('.user-menu')) {
            this.createUserMenu();
        }
    }

    createUserMenu() {
        const userMenu = document.createElement('div');
        userMenu.className = 'user-menu';
        userMenu.innerHTML = `
            <div class="user-dropdown">
                <button class="user-btn">
                    <i class="fas fa-user-circle"></i>
                    <span>${this.currentUser.name.split(' ')[0]}</span>
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="user-dropdown-menu">
                    <a href="pages/dashboard.html"><i class="fas fa-tachometer-alt"></i> Dashboard</a>
                    <a href="pages/profile.html"><i class="fas fa-user"></i> Profile</a>
                    <a href="pages/my-courses.html"><i class="fas fa-book-open"></i> My Courses</a>
                    <div class="dropdown-divider"></div>
                    <a href="#" class="logout-link"><i class="fas fa-sign-out-alt"></i> Logout</a>
                </div>
            </div>
        `;

        // Add to navigation
        const navContainer = document.querySelector('.nav-container');
        if (navContainer) {
            const loginLi = navContainer.querySelector('a.login-btn')?.parentElement;
            if (loginLi) {
                loginLi.innerHTML = '';
                loginLi.appendChild(userMenu);
            }
        }

        // Add logout functionality
        userMenu.querySelector('.logout-link').addEventListener('click', (e) => {
            e.preventDefault();
            this.logout();
        });

        // Add styles
        this.addUserMenuStyles();
    }

    addUserMenuStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .user-menu {
                display: inline-block;
            }
            
            .user-btn {
                display: flex;
                align-items: center;
                gap: 8px;
                background: linear-gradient(135deg, var(--secondary-color), #ffed4e);
                color: var(--dark-color);
                border: none;
                padding: 10px 20px;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: var(--transition);
            }
            
            .user-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
            }
            
            .user-dropdown {
                position: relative;
            }
            
            .user-dropdown-menu {
                position: absolute;
                top: calc(100% + 10px);
                right: 0;
                background: white;
                min-width: 200px;
                box-shadow: var(--shadow-hover);
                border-radius: 10px;
                opacity: 0;
                visibility: hidden;
                transform: translateY(10px);
                transition: var(--transition);
                z-index: 1000;
            }
            
            .user-dropdown:hover .user-dropdown-menu {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
            
            .user-dropdown-menu a {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 12px 20px;
                color: var(--text-color);
                text-decoration: none;
                transition: var(--transition);
                border-bottom: 1px solid #eee;
            }
            
            .user-dropdown-menu a:hover {
                background: rgba(26, 71, 42, 0.05);
                color: var(--primary-color);
                padding-left: 25px;
            }
            
            .dropdown-divider {
                height: 1px;
                background: #eee;
                margin: 5px 0;
            }
        `;
        document.head.appendChild(style);
    }

    setupAuthListeners() {
        // Protect dashboard pages
        if (window.location.pathname.includes('dashboard.html') || 
            window.location.pathname.includes('profile.html') ||
            window.location.pathname.includes('my-courses.html')) {
            
            if (!this.currentUser) {
                window.location.href = 'pages/login.html';
            }
        }
    }

    async login(email, password) {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const user = users.find(u => u.email === email && u.password === password);
                
                if (user) {
                    const userData = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    };
                    
                    localStorage.setItem('currentUser', JSON.stringify(userData));
                    this.currentUser = userData;
                    this.updateUIForLoggedInUser();
                    resolve(userData);
                } else {
                    reject(new Error('Invalid email or password'));
                }
            }, 1000);
        });
    }

    async register(userData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                
                // Check if email exists
                if (users.some(u => u.email === userData.email)) {
                    reject(new Error('Email already registered'));
                    return;
                }
                
                // Create new user
                const newUser = {
                    id: Date.now(),
                    ...userData,
                    createdAt: new Date().toISOString(),
                    role: 'student'
                };
                
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                
                // Auto login
                const loginData = {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role
                };
                
                localStorage.setItem('currentUser', JSON.stringify(loginData));
                this.currentUser = loginData;
                this.updateUIForLoggedInUser();
                
                resolve(loginData);
            }, 1500);
        });
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
        window.location.href = 'index.html';
    }

    isAuthenticated() {
        return !!this.currentUser;
    }

    getUser() {
        return this.currentUser;
    }
}

// Initialize auth system
let authSystem;

document.addEventListener('DOMContentLoaded', () => {
    authSystem = new AuthSystem();
    
    // Add to global scope for easy access
    window.authSystem = authSystem;
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AuthSystem };
}

/* ============================================
   END OF AUTHENTICATION SYSTEM
   ============================================ */