import { useState, useEffect, useRef } from "react";
import { supabase } from "./supabaseClient";

const COLORS = {
    primary: "var(--primary)",
    primaryLight: "var(--primary-light)",
    primaryDark: "var(--primary-dark)",
    accent: "var(--accent)",
    accentLight: "var(--accent-light)",
    blue: "var(--blue)",
    blueLight: "var(--blue-light)",
    danger: "var(--danger)",
    bg: "var(--bg)",
    card: "var(--card)",
    text: "var(--text)",
    textMuted: "var(--text-muted)",
    border: "var(--border)",
};

const CAUSES = [
    {
        id: 1,
        title: "Bright Futures Education Fund",
        category: "Education",
        ngo: "Shiksha Daan Foundation",
        location: "Bihar, Jharkhand",
        image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&q=80",
        description: "Providing quality education to over 5,000 underprivileged children in rural Bihar and Jharkhand. We build schools, train teachers, and offer scholarships.",
        raised: 1820000,
        goal: 2500000,
        donors: 1243,
        urgent: false,
    },
    {
        id: 2,
        title: "Rural Health Access Initiative",
        category: "Healthcare",
        ngo: "Aarogya Seva Trust",
        location: "Rajasthan, UP",
        image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&q=80",
        description: "Mobile medical units delivering primary healthcare to 200+ remote villages. Free consultations, medicines, and maternal care for thousands every month.",
        raised: 980000,
        goal: 1500000,
        donors: 764,
        urgent: true,
    },
    {
        id: 3,
        title: "Flood Relief — Assam 2025",
        category: "Disaster Relief",
        ngo: "Rahat India Network",
        location: "Assam",
        image: "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=600&q=80",
        description: "Emergency food kits, temporary shelters, and clean water for 30,000+ families displaced by the 2025 Assam floods. Every rupee counts.",
        raised: 3200000,
        goal: 4000000,
        donors: 5821,
        urgent: true,
    },
    {
        id: 4,
        title: "Zero Hunger — Mid-Day Meals",
        category: "Hunger & Poverty",
        ngo: "Annapurna Samiti",
        location: "Maharashtra, MP",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
        description: "Nutritious mid-day meals for 10,000 children daily in government schools. Tackling malnutrition and improving attendance simultaneously.",
        raised: 640000,
        goal: 1000000,
        donors: 412,
        urgent: false,
    },
    {
        id: 5,
        title: "Plant a Billion Trees Campaign",
        category: "Environment",
        ngo: "HaritaBhumi Trust",
        location: "Pan India",
        image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&q=80",
        description: "Restoring degraded forests and urban green cover. Each donation plants native trees and employs local communities as forest guardians.",
        raised: 2100000,
        goal: 5000000,
        donors: 3092,
        urgent: false,
    },
    {
        id: 6,
        title: "Empowering Women Artisans",
        category: "Hunger & Poverty",
        ngo: "Mahila Shakti Foundation",
        location: "Rajasthan, Gujarat",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
        description: "Skill development, micro-loans, and market linkages for 3,000 rural women artisans. Turning traditional crafts into sustainable livelihoods.",
        raised: 445000,
        goal: 750000,
        donors: 289,
        urgent: false,
    },
    {
        id: 7,
        title: "Clean Water for Remote Villages",
        category: "Healthcare",
        ngo: "Jal Jeevan Trust",
        location: "Odisha, Madhya Pradesh",
        image: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=600&q=80",
        description: "Installing community water filtration systems and solar pumps in villages where residents travel 5km+ for contaminated water.",
        raised: 1250000,
        goal: 2000000,
        donors: 845,
        urgent: true,
    },
    {
        id: 8,
        title: "Stray Animal Rescue & Care",
        category: "Environment",
        ngo: "Pawsitive India",
        location: "New Delhi, Pune",
        image: "https://images.unsplash.com/photo-1548191265-cc70d3d45ba1?w=600&q=80",
        description: "A 24/7 rescue service for injured stray animals, providing medical treatment, rehabilitation, and finding forever homes for abandoned pets.",
        raised: 310000,
        goal: 500000,
        donors: 412,
        urgent: false,
    },
    {
        id: 9,
        title: "Digital Literacy for Rural Youth",
        category: "Education",
        ngo: "TechBharat Foundation",
        location: "Karnataka, Telangana",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80",
        description: "Setting up computer labs and providing coding workshops for youth in government schools to bridge the digital divide and create future-ready skills.",
        raised: 890000,
        goal: 1200000,
        donors: 567,
        urgent: false,
    },
    {
        id: 10,
        title: "Senior Home Care & Health",
        category: "Healthcare",
        ngo: "Aadhar Senior Citizen Trust",
        location: "Pune, Maharashtra",
        image: "https://images.unsplash.com/photo-1581578731548-c64695ce6958?w=600&q=80",
        description: "Providing palliative care, regular health checkups, and emotional support to abandoned or lone senior citizens. Ensuring dignity in their silver years.",
        raised: 420000,
        goal: 800000,
        donors: 310,
        urgent: false,
    },
    {
        id: 11,
        title: "Clean Energy for Tribal Schools",
        category: "Environment",
        ngo: "Surya Shakti Collective",
        location: "Chhattisgarh, Odisha",
        image: "https://images.unsplash.com/photo-1509391366360-fe5bb658589c?w=600&q=80",
        description: "Installing solar grids in remote tribal schools that have never had electricity. Powers lights, computers, and water pumps for students.",
        raised: 1560000,
        goal: 3000000,
        donors: 1120,
        urgent: true,
    },
    {
        id: 12,
        title: "Street Children Rehabilitation",
        category: "Hunger & Poverty",
        ngo: "Nanhi Muskan Foundation",
        location: "Mumbai, New Delhi",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80",
        description: "Saving children from forced labor and street life. Providing them with safety, nutrition, and foundational learning to rejoin formal schools.",
        raised: 780000,
        goal: 1500000,
        donors: 642,
        urgent: true,
    },
    {
        id: 13,
        title: "Mental Health Support Hotline",
        category: "Healthcare",
        ngo: "Mann ki Shanti Trust",
        location: "Pan India",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80",
        description: "A 24/7 free counseling helpline for youth and students. Tackling rising anxiety and depression through professional, anonymous support.",
        raised: 280000,
        goal: 600000,
        donors: 195,
        urgent: false,
    },
];



const AWARDS = [
    { title: "National Social Impact Award", year: "2024", org: "Ministry of Social Justice, GoI", icon: "🏆" },
    { title: "Best NGO Platform — Digital India", year: "2024", org: "NASSCOM Foundation", icon: "🌟" },
    { title: "Transparency Gold Certificate", year: "2023", org: "GuideStar India", icon: "🏅" },
    { title: "UN SDG Champion Award", year: "2023", org: "United Nations India", icon: "🌍" },
    { title: "Forbes India Social Entrepreneur", year: "2022", org: "Forbes Media India", icon: "📰" },
    { title: "CSR Partner of the Year", year: "2022", org: "CII National Council", icon: "🤝" },
];

const MONTHLY_DONATIONS = [180, 240, 195, 310, 280, 420, 380, 510, 460, 590, 540, 720];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const CATEGORY_DATA = [
    { cat: "Education", pct: 28, color: "#3498db" },
    { cat: "Healthcare", pct: 22, color: "#1a7a4a" },
    { cat: "Disaster", pct: 25, color: "#e74c3c" },
    { cat: "Hunger", pct: 14, color: "#f39c12" },
    { cat: "Environment", pct: 11, color: "#27ae60" },
];

const DONOR_LOG = [
    { name: "Vikram Bose", email: "v.bose@gmail.com", phone: "98765XXXXX", amount: 5000, cause: "Flood Relief — Assam 2025", date: "2025-06-14" },
    { name: "Meena Krishnan", email: "meena.k@yahoo.in", phone: "99123XXXXX", amount: 2000, cause: "Rural Health Access", date: "2025-06-13" },
    { name: "Aryan Patel", email: "aryan.p@outlook.com", phone: "87654XXXXX", amount: 10000, cause: "All Causes", date: "2025-06-12" },
    { name: "Geeta Singh", email: "gsingh@rediff.com", phone: "76543XXXXX", amount: 1500, cause: "Education Fund", date: "2025-06-11" },
    { name: "Suresh Nambiar", email: "s.nambiar@gmail.com", phone: "91234XXXXX", amount: 3000, cause: "Plant a Billion Trees", date: "2025-06-10" },
];

const STORAGE_KEY = "sevabharat_donations";

const SUCCESS_STORIES = [
    {
        id: 1,
        title: "Kiran's Journey to School",
        category: "Education",
        text: "Kiran, a 10-year-old from a remote village in Jharkhand, was nearly forced into child labor. Thanks to the Bright Futures Education Fund, she is now the top of her class and dreams of becoming a doctor.",
        image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80",
        ngo: "Shiksha Daan Foundation"
    },
    {
        id: 2,
        title: "Clean Water in Odisha",
        category: "Healthcare",
        text: "After the installation of solar-powered water filters, the incidence of water-borne diseases in the village of Ganjam has dropped by 80%. Women no longer have to walk 4km for water.",
        image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=600&q=80",
        ngo: "Jal Jeevan Trust"
    }
];

const PROOF_OF_WORK = [
    { title: "80G Tax Exemption Certificate", date: "2024-05-10", icon: "📄" },
    { title: "FCRA Audit Report 2023", date: "2024-03-15", icon: "📊" },
    { title: "Assam Flood Relief Video Report", date: "2025-07-20", icon: "🎥" },
];

const fmt = (n) => "₹" + (n >= 100000 ? (n / 100000).toFixed(1) + "L" : n >= 1000 ? (n / 1000).toFixed(0) + "K" : n);
const fmtFull = (n) => "₹" + n.toLocaleString("en-IN");
const pct = (r, g) => Math.min(100, Math.round((r / g) * 100));

const catColors = {
    Education: "#3498db",
    Healthcare: "#1a7a4a",
    "Disaster Relief": "#e74c3c",
    "Hunger & Poverty": "#f39c12",
    Environment: "#27ae60",
};

export default function App() {
    const [page, setPage] = useState("home");
    const [filterCat, setFilterCat] = useState("All");
    const [donationCause, setDonationCause] = useState(null);
    const [adminAuth, setAdminAuth] = useState(false);
    const [adminEmail, setAdminEmail] = useState("");
    const [user, setUser] = useState(null);
    const [adminForm, setAdminForm] = useState({ u: "", p: "" });
    const [adminError, setAdminError] = useState("");
    const [donations, setDonations] = useState(DONOR_LOG);
    const [notification, setNotification] = useState(null);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [hasDetectedRoute, setHasDetectedRoute] = useState(false);
    const [hologramMode, setHologramMode] = useState(() => {
        return localStorage.getItem("sevabharat_theme") === "hologram";
    });

    useEffect(() => {
        localStorage.setItem("sevabharat_theme", hologramMode ? "hologram" : "standard");
    }, [hologramMode]);

    // Initial Route Detection
    useEffect(() => {
        const path = window.location.pathname.replace(/^\/|\/$/g, '');
        if (path === "admin-login") setPage("admin-login");
        else if (path === "admin") setPage("admin");
        else if (path === "login") setPage("login");
        else if (path === "dashboard") setPage("dashboard");
        setHasDetectedRoute(true);
    }, []);
    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const { data, error } = await supabase
                    .from('donations')
                    .select('*')
                    .order('date', { ascending: false });

                if (error) {
                    console.warn('Using local fallback. Supabase error:', error.message);
                } else if (data && data.length > 0) {
                    setDonations(data);
                }
            } catch (err) {
                console.warn('Supabase not initialized. Using local data.');
            }
        };
        fetchDonations();

        // Handle Supabase Auth Change
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
                setUser(session.user);
                const allowedEmail = import.meta.env.VITE_ALLOWED_ADMIN_EMAIL || "nageshpawar2902@gmail.com";
                if (session.user.email === allowedEmail) {
                    setAdminAuth(true);
                    setAdminEmail(session.user.email);
                    if (["home", "admin-login", "login"].includes(page)) navigate("admin");
                } else {
                    setAdminAuth(false);
                    setAdminEmail("");
                    if (["home", "admin-login", "login"].includes(page)) navigate("dashboard");
                }
            } else {
                setUser(null);
                setAdminAuth(false);
                setAdminEmail("");
            }
        });

        // Initial session check
        const checkInitialSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                setUser(session.user);
                const allowedEmail = import.meta.env.VITE_ALLOWED_ADMIN_EMAIL || "nageshpawar2902@gmail.com";
                if (session.user.email === allowedEmail) {
                    setAdminAuth(true);
                    setAdminEmail(session.user.email);
                }
            }
        };
        checkInitialSession();

        return () => subscription.unsubscribe();
    }, [page]);

    const navigate = (p, data) => {
        setPage(p);
        if (data) setDonationCause(data);
        setShowMobileMenu(false);
        window.scrollTo(0, 0);
    };

    const showNotif = (msg, type = "success") => {
        setNotification({ msg, type });
        setTimeout(() => setNotification(null), 4000);
    };

    const totalRaised = CAUSES.reduce((s, c) => s + c.raised, 0);
    const totalDonors = CAUSES.reduce((s, c) => s + c.donors, 0);

    const navLinks = [
        { label: "Home", key: "home" },
        { label: "Explore Causes", key: "explore" },
        { label: "Donate", key: "donate" },
        { label: "About Us", key: "about" },
        { label: "Awards", key: "awards" },
    ];

    return (
        <div className={hologramMode ? "hologram-mode" : ""} style={{ fontFamily: "'Outfit', 'Poppins', sans-serif", background: COLORS.bg, minHeight: "100vh", color: COLORS.text, transition: "all 0.4s ease" }}>
            <div className="scanline-overlay"></div>
            <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { color: inherit; text-decoration: none; }
        button { cursor: pointer; font-family: inherit; border: none; outline: none; }
        input, select, textarea { font-family: inherit; }
        .hover-lift { transition: transform 0.2s, box-shadow 0.2s; }
        .hover-lift:hover { transform: translateY(-4px); box-shadow: var(--shadow-hover) !important; }
        .btn-primary { background: linear-gradient(135deg, var(--primary), var(--primary-light)); color: var(--bg); border-radius: 8px; padding: 12px 24px; font-weight: 600; font-size: 15px; transition: all 0.2s; box-shadow: var(--shadow); }
        .btn-primary:hover { opacity: 0.92; transform: translateY(-1px); box-shadow: var(--shadow-hover); }
        .btn-outline { background: transparent; border: 2px solid var(--primary); color: var(--primary); border-radius: 8px; padding: 10px 22px; font-weight: 600; font-size: 14px; transition: all 0.2s; }
        .btn-outline:hover { background: var(--primary); color: var(--bg); }
        .card { background: var(--card); border-radius: 16px; box-shadow: var(--shadow); border: 1px solid var(--border); transition: all 0.3s; }
        .progress-bar { background: var(--border); border-radius: 99px; height: 8px; overflow: hidden; }
        .progress-fill { height: 100%; border-radius: 99px; background: linear-gradient(90deg, var(--primary), var(--primary-light)); transition: width 0.8s ease; }
        .tag { display: inline-block; padding: 3px 10px; border-radius: 99px; font-size: 12px; font-weight: 600; }
        .urgent-badge { background: rgba(231, 76, 60, 0.1); color: var(--danger); border: 1px solid rgba(231, 76, 60, 0.2); }
        .input-field { width: 100%; padding: 12px 16px; border: 1.5px solid var(--border); border-radius: 10px; font-size: 15px; transition: border-color 0.2s; outline: none; background: var(--card); color: var(--text); }
        .input-field:focus { border-color: var(--primary); }
        .hero-bg { background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 40%, var(--primary-light) 100%); position: relative; overflow: hidden; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.5s ease forwards; }
        @keyframes countUp { from { opacity: 0; } to { opacity: 1; } }
        .notif { position: fixed; top: 80px; right: 20px; z-index: 9999; padding: 14px 24px; border-radius: 12px; font-weight: 500; font-size: 14px; box-shadow: 0 8px 24px rgba(0,0,0,0.15); animation: fadeIn 0.3s ease; max-width: 360px; }
        .notif-success { background: var(--primary); color: var(--bg); }
        .notif-error { background: var(--danger); color: white; }
        .stat-card { text-align: center; }
        .stat-num { font-family: var(--font-sans); font-size: 42px; font-weight: 800; color: white; line-height: 1; }
        .stat-label { font-size: 14px; color: rgba(255,255,255,0.85); margin-top: 6px; }
        .section-title { font-family: var(--font-sans); font-size: 36px; font-weight: 800; color: var(--text); }
        .section-sub { font-size: 16px; color: var(--text-muted); margin-top: 8px; }
        @media (max-width: 768px) {
          .section-title { font-size: 26px; }
          .stat-num { font-size: 30px; }
          .hero-title { font-size: 32px !important; }
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 769px) { .mobile-menu-btn { display: none !important; } }
        .chip { padding: 8px 18px; border-radius: 99px; font-size: 14px; font-weight: 500; cursor: pointer; border: 1.5px solid; transition: all 0.18s; }
        .chip-active { background: var(--primary); color: var(--bg); border-color: var(--primary); }
        .chip-inactive { background: var(--card); color: var(--primary); border-color: var(--border); }
        .chip-inactive:hover { border-color: var(--primary); }
        table { border-collapse: collapse; width: 100%; }
        th { text-align: left; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-muted); padding: 10px 14px; background: var(--bg); }
        td { padding: 12px 14px; font-size: 14px; border-top: 1px solid var(--border); }
        tr:hover td { background: var(--bg); }
        .award-card { border-radius: 16px; padding: 24px; background: var(--card); box-shadow: var(--shadow); border-left: 4px solid var(--primary); transition: all 0.2s; }
        .award-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-hover); }
      `}</style>

            {/* Notification */}
            {notification && (
                <div className={`notif notif-${notification.type}`}>{notification.msg}</div>
            )}

            {/* Navbar */}
            <nav style={{ position: "sticky", top: 0, zIndex: 100, background: COLORS.card, borderBottom: `1px solid ${COLORS.border}`, boxShadow: "0 2px 12px rgba(0,0,0,0.03)", transition: "all 0.4s" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div onClick={() => navigate("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,var(--primary),var(--primary-light))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, boxShadow: "0 2px 8px rgba(0,255,102,0.2)" }}>🌿</div>
                        <div>
                            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 19, color: COLORS.primary, lineHeight: 1.1, letterSpacing: "-0.5px" }} className="glow-text">SevaBharat</div>
                            <div style={{ fontSize: 9, color: COLORS.textMuted, letterSpacing: "1px", fontWeight: 700 }}>NGO GIVING PLATFORM</div>
                        </div>
                    </div>
                    <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        {navLinks.map(l => (
                            <button key={l.key} onClick={() => navigate(l.key)}
                                style={{ padding: "8px 14px", borderRadius: 8, background: page === l.key ? "rgba(16, 185, 129, 0.08)" : "transparent", color: page === l.key ? COLORS.primary : COLORS.textMuted, fontWeight: page === l.key ? 700 : 500, fontSize: 14, transition: "all 0.2s" }}
                                className={page === l.key ? "glow-text" : ""}>
                                {l.label}
                            </button>
                        ))}
                        
                        {/* Theme Toggle */}
                        <button onClick={() => setHologramMode(!hologramMode)}
                            style={{ 
                                marginLeft: 12, 
                                padding: "8px 14px", 
                                borderRadius: 8, 
                                background: hologramMode ? "rgba(52, 211, 153, 0.12)" : "rgba(16, 185, 129, 0.05)", 
                                border: `1px solid ${hologramMode ? "var(--primary)" : "transparent"}`,
                                color: hologramMode ? "var(--primary)" : COLORS.textMuted, 
                                fontSize: 12, 
                                fontWeight: 700,
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                cursor: "pointer",
                                transition: "all 0.3s"
                            }}>
                            {hologramMode ? "🌙 DARK" : "☀️ LIGHT"}
                        </button>

                        <button className="btn-primary" onClick={() => navigate("donate")} style={{ marginLeft: 12, padding: "9px 20px", fontSize: 14 }}>Donate Now</button>
                        {user ? (
                            <button onClick={() => navigate(adminAuth ? "admin" : "dashboard")} 
                                style={{ marginLeft: 4, padding: "9px 14px", borderRadius: 8, background: COLORS.primaryLight, color: COLORS.bg, fontSize: 13, fontWeight: 700 }}>
                                {adminAuth ? "Admin Dashboard" : "My Account"}
                            </button>
                        ) : (
                            <button onClick={() => navigate("login")} 
                                style={{ marginLeft: 4, padding: "9px 14px", borderRadius: 8, background: "rgba(0,0,0,0.03)", color: COLORS.textMuted, fontSize: 13, fontWeight: 600, border: `1px solid ${COLORS.border}` }}>
                                Login
                            </button>
                        )}
                    </div>
                    <button className="mobile-menu-btn" onClick={() => setShowMobileMenu(!showMobileMenu)}
                        style={{ background: "none", border: "none", fontSize: 24, color: COLORS.text, display: "none", flexDirection: "column", gap: 5, padding: 8 }}>
                        <div style={{ width: 22, height: 2, background: COLORS.text, borderRadius: 2 }} />
                        <div style={{ width: 22, height: 2, background: COLORS.text, borderRadius: 2 }} />
                        <div style={{ width: 22, height: 2, background: COLORS.text, borderRadius: 2 }} />
                    </button>
                </div>
                {showMobileMenu && (
                    <div style={{ background: COLORS.card, borderTop: `1px solid ${COLORS.border}`, padding: "12px 20px" }}>
                        {navLinks.map(l => (
                            <button key={l.key} onClick={() => navigate(l.key)}
                                style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 0", background: "none", color: page === l.key ? COLORS.primary : COLORS.text, fontWeight: page === l.key ? 700 : 500, fontSize: 15, borderBottom: `1px solid ${COLORS.border}` }}>
                                {l.label}
                            </button>
                        ))}
                        
                        <button onClick={() => setHologramMode(!hologramMode)}
                            style={{ 
                                marginTop: 12, 
                                width: "100%", 
                                padding: "12px", 
                                borderRadius: 8, 
                                background: hologramMode ? "rgba(52, 211, 153, 0.15)" : "#f0f4f2", 
                                border: hologramMode ? "1px solid var(--primary)" : "none",
                                color: hologramMode ? "var(--primary)" : COLORS.textMuted, 
                                fontWeight: 700,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 6
                            }}>
                            {hologramMode ? "🌙 DARK MODE" : "☀️ LIGHT MODE"}
                        </button>

                        <button className="btn-primary" onClick={() => navigate("donate")} style={{ marginTop: 12, width: "100%" }}>Donate Now</button>
                        {user ? (
                            <button onClick={() => navigate(adminAuth ? "admin" : "dashboard")} 
                                style={{ marginTop: 12, width: "100%", padding: "12px", borderRadius: 8, background: COLORS.primaryLight, color: COLORS.bg, fontWeight: 700 }}>
                                {adminAuth ? "Admin Dashboard" : "My Account"}
                            </button>
                        ) : (
                            <button onClick={() => navigate("login")} 
                                style={{ marginTop: 12, width: "100%", padding: "12px", borderRadius: 8, background: "#f0f4f2", color: COLORS.textMuted }}>
                                Login / Sign Up
                            </button>
                        )}
                    </div>
                )}
            </nav>

            {/* Pages */}
            {page === "home" && <HomePage navigate={navigate} totalRaised={totalRaised} totalDonors={totalDonors} />}
            {page === "explore" && <ExplorePage navigate={navigate} filterCat={filterCat} setFilterCat={setFilterCat} />}
            {page === "donate" && <DonatePage navigate={navigate} causeData={donationCause} donations={donations} setDonations={setDonations} showNotif={showNotif} />}
            {page === "about" && <AboutPage />}
            {page === "awards" && <AwardsPage />}
            {(page === "admin-login" || page === "login") && <AuthPage setShowNotif={showNotif} />}
            {page === "admin" && adminAuth && <AdminDashboard adminEmail={adminEmail} donations={donations} setDonations={setDonations} navigate={navigate} showNotif={showNotif} />}
            {page === "admin" && !adminAuth && <AuthPage setShowNotif={showNotif} />}
            {page === "dashboard" && user && <UserDashboard user={user} donations={donations} navigate={navigate} showNotif={showNotif} />}

            {/* Footer */}
            <footer style={{ background: "#0d1f15", color: "#9dbfa8", padding: "48px 20px 24px", marginTop: 60 }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32, marginBottom: 40 }}>
                        <div>
                            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "white", marginBottom: 10 }}>SevaBharat</div>
                            <p style={{ fontSize: 13, lineHeight: 1.7, color: "#7a9e87" }}>India's most trusted NGO giving platform. Every rupee creates real change for real people.</p>
                        </div>
                        <div>
                            <div style={{ color: "white", fontWeight: 600, marginBottom: 12 }}>Quick Links</div>
                            {["Home", "Explore Causes", "Donate", "About Us", "Awards"].map(l => (
                                <div key={l} style={{ fontSize: 14, marginBottom: 8, cursor: "pointer" }}
                                    onClick={() => navigate(l.toLowerCase().replace(" ", "").replace("causes", "explore").replace("aboutus", "about"))}>
                                    {l}
                                </div>
                            ))}
                        </div>
                        <div>
                            <div style={{ color: "white", fontWeight: 600, marginBottom: 12 }}>Contact</div>
                            <div style={{ fontSize: 13, lineHeight: 2 }}>
                                <div>📍 Pune, Maharashtra 411041</div>
                                <div>📞 1800-XXX-XXXX (Toll Free)</div>
                                <div>✉️ hello@sevabharat.org</div>
                                <div>🕘 Mon–Sat, 9 AM – 6 PM IST</div>
                            </div>
                        </div>
                        <div>
                            <div style={{ color: "white", fontWeight: 600, marginBottom: 12 }}>We Accept</div>
                            {["UPI / PhonePe / GPay", "Net Banking", "Credit / Debit Cards", "Wallets"].map(m => (
                                <div key={m} style={{ fontSize: 13, marginBottom: 8 }}>✔ {m}</div>
                            ))}
                            <div style={{ marginTop: 12, fontSize: 12, background: "#1a3d26", padding: "8px 12px", borderRadius: 8, color: "#5eb87a" }}>
                                80G Tax Exemption Available
                            </div>
                        </div>
                    </div>
                    <div style={{ borderTop: "1px solid #1a3d26", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                        <div style={{ fontSize: 13 }}>© 2025 SevaBharat. All rights reserved. Registered under FCRA &amp; 12A.</div>
                        <div style={{ fontSize: 13, display: "flex", gap: 20 }}>
                            <span style={{ cursor: "pointer" }}>Privacy Policy</span>
                            <span style={{ cursor: "pointer" }}>Terms of Use</span>
                            <span style={{ cursor: "pointer" }}>Refund Policy</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
// ==========================================
// FUTURISTIC BENTO GRID WIDGETS
// ==========================================

function LiveTickerWidget() {
    const updates = [
        "🔥 URGENT CAUSE: Assam Flood Relief requires food kits for 5,000 families.",
        "📚 BRIGHT FUTURES: Computer lab set up in Bihar school complete.",
        "🌳 HARITABHUMI: 5,200 native trees successfully planted and tagged.",
        "🏥 HEALTH ACCESS: Mobile medical clinic starts service in Rajasthan rural block.",
        "🍚 ZERO HUNGER: 10,000 mid-day meals successfully distributed today.",
        "🏆 MILESTONE: SevaBharat crossed 12,600 registered donors across India."
    ];

    const doubleUpdates = [...updates, ...updates];

    return (
        <div className="ticker-wrap" style={{ transition: "all 0.4s" }}>
            <div className="ticker-content">
                {doubleUpdates.map((item, idx) => (
                    <div key={idx} className="ticker-item">
                        <span style={{ color: "var(--primary)", fontWeight: 700 }}>⚡</span>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700, color: "var(--text)" }} className="tech-font">{item}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function LiveActivityLogWidget() {
    const logPool = [
        "SYS: Supabase listener active on donations table...",
        "SECURE PORT: SSL handshake established successfully.",
        "DB ALERT: New donation of ₹2,500 for Zero Hunger.",
        "NGO STATUS: Shiksha Daan audited - 100% compliant.",
        "FUND UPDATE: Assam Flood Relief reached 85% of goal.",
        "SYS CALC: Section 80G tax receipt dispatched to donor.",
        "COMMUNITY: Priya K. set up monthly donation of ₹1,000.",
        "EVENT: HaritaBhumi Trust planted 120 trees in Rajasthan.",
        "SYS LOG: Mobile clinic support dispatch verified.",
        "PAY STATUS: UPI transaction SB298410 verified.",
        "DB UPDATE: Total lives impacted updated to 48,000+.",
        "COMMUNITY: Aarav Patel contributed ₹5,000 for remote health."
    ];

    const [logs, setLogs] = useState([
        "SYSTEM INITIALIZATION...",
        "SYS: Supabase listener active on donations table...",
        "SECURE PORT: SSL handshake established successfully.",
        "DB UPDATE: Total lives impacted updated to 48,000+."
    ]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setLogs(prev => {
                const nextLogs = [...prev, logPool[index]];
                if (nextLogs.length > 5) nextLogs.shift();
                return nextLogs;
            });
            setIndex(i => (i + 1) % logPool.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [index]);

    return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: "var(--primary)" }} className="tech-font">📡 Live Network Activity</span>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--primary)", display: "inline-block", boxShadow: "var(--glow)" }}></span>
                </div>
                <div style={{ background: "rgba(8, 15, 10, 0.95)", border: "1.5px solid rgba(0, 255, 102, 0.25)", borderRadius: 10, padding: 14, minHeight: 170, fontFamily: "var(--font-mono)", fontSize: 11, display: "flex", flexDirection: "column", gap: 8, color: "#dcfce7", textShadow: "0 0 2px rgba(0, 255, 102, 0.3)", transition: "all 0.3s", boxShadow: "inset 0 0 10px rgba(0, 255, 102, 0.05)" }} className="tech-font">
                    {logs.map((log, idx) => (
                        <div key={idx} style={{ color: log.startsWith("DB ALERT") || log.startsWith("DB UPDATE") ? "#00ff66" : log.startsWith("SYSTEM") ? "#ffd000" : "#dcfce7" }}>
                            {log.startsWith("SYS") || log.startsWith("DB") ? "> " : ""}{log}
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ marginTop: 12, fontSize: 11, color: "var(--text-muted)", display: "flex", justifyContent: "space-between" }} className="tech-font">
                <span>DB Status: Connected</span>
                <span>Uptime: 99.98%</span>
            </div>
        </div>
    );
}

function IndiaMapWidget({ filterState, setFilterState }) {
    const states = [
        { id: "rajasthan", name: "Rajasthan", x: 130, y: 170, projects: "Rural Health Access, Water Harvesting", count: 2 },
        { id: "bihar", name: "Bihar & Jharkhand", x: 280, y: 170, projects: "Bright Futures Education, Tribal Schools", count: 2 },
        { id: "assam", name: "Assam", x: 370, y: 150, projects: "Assam Flood Relief & Rescue Kits", count: 1 },
        { id: "maharashtra", name: "Maharashtra & Pune", x: 160, y: 260, projects: "Zero Hunger, Senior Home Care", count: 2 },
        { id: "odisha", name: "Odisha & Chhattisgarh", x: 260, y: 230, projects: "Clean Drinking Water Project, Solar Grids", count: 2 },
        { id: "karnataka", name: "Karnataka", x: 180, y: 340, projects: "Rural Digital Labs, Animal Welfare", count: 2 }
    ];

    const activeState = states.find(s => s.id === filterState) || null;

    return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <div>
                        <span className="cyber-badge" style={{ marginBottom: 4 }}>Command Center</span>
                        <h3 style={{ fontSize: 18, fontWeight: 800 }}>National Project Node Map</h3>
                    </div>
                    {filterState && (
                        <button onClick={() => setFilterState(null)} style={{ background: "transparent", border: "1px solid var(--border)", color: "var(--primary)", fontSize: 11, padding: "4px 8px", borderRadius: 6, cursor: "pointer", fontWeight: 700 }} className="tech-font">
                            Clear Filter
                        </button>
                    )}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 16, alignItems: "center" }}>
                    {/* SVG Map of India (Stylized blueprint grid) */}
                    <div style={{ position: "relative", background: "rgba(0, 0, 0, 0.02)", border: "1px solid var(--border)", borderRadius: 12, padding: 8, display: "flex", justifyContent: "center", alignItems: "center", height: 230, overflow: "hidden" }}>
                        <svg viewBox="0 0 420 420" style={{ width: "100%", height: "100%", maxHeight: 220 }}>
                            {/* Blueprint grid pattern */}
                            <defs>
                                <pattern id="map-grid" width="16" height="16" patternUnits="userSpaceOnUse">
                                    <path d="M 16 0 L 0 0 0 16" fill="none" stroke="var(--border)" strokeWidth="0.5" opacity="0.25"/>
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#map-grid)" rx="8" />

                            {/* Outer India Path Silhouette */}
                            <path d="M 175,70 L 210,35 L 245,70 L 260,110 L 270,140 L 320,140 L 350,165 L 325,190 L 300,205 L 285,205 L 270,220 L 260,250 L 245,280 L 220,330 L 210,360 L 200,360 L 195,330 L 170,280 L 155,250 L 155,220 L 135,210 L 110,200 L 95,185 L 110,160 L 135,150 L 150,135 L 160,110 Z" 
                                  fill="rgba(0, 255, 102, 0.02)" stroke="var(--primary)" strokeWidth="1.5" opacity="0.3" style={{ transition: "all 0.3s" }} className="india-svg-path" />

                            {/* Hotspots */}
                            {states.map(state => {
                                const isActive = filterState === state.id;
                                return (
                                    <g key={state.id} onClick={() => setFilterState(isActive ? null : state.id)} style={{ cursor: "pointer" }}>
                                        <circle cx={state.x} cy={state.y} r={isActive ? 14 : 9} fill="var(--primary)" opacity={isActive ? 0.35 : 0.15}>
                                            <animate attributeName="r" values={isActive ? "10;18;10" : "7;13;7"} dur="2s" repeatCount="indefinite" />
                                        </circle>
                                        <circle cx={state.x} cy={state.y} r={isActive ? 6 : 4} fill={isActive ? "var(--accent)" : "var(--primary)"} style={{ filter: "drop-shadow(0 0 3px var(--primary))" }} />
                                    </g>
                                );
                            })}
                        </svg>
                    </div>

                    {/* Node Details Info Panel */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, height: "100%", justifyContent: "center" }}>
                        {activeState ? (
                            <div className="fade-in" style={{ padding: 14, border: "1.5px solid rgba(26, 122, 74, 0.3)", borderRadius: 12, background: "rgba(26, 122, 74, 0.05)", backdropFilter: "blur(8px)", boxShadow: "0 4px 20px rgba(26, 122, 74, 0.08)" }}>
                                <div style={{ fontSize: 13, fontWeight: 800, color: "var(--primary)" }}>📍 {activeState.name}</div>
                                <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 6, fontWeight: 700, textTransform: "uppercase" }}>Impact Projects</div>
                                <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text)", marginTop: 2, lineHeight: 1.4 }}>{activeState.projects}</div>
                                <div style={{ fontSize: 10, color: "var(--accent)", fontWeight: 700, marginTop: 8 }} className="tech-font">{activeState.count} campaigns detected</div>
                            </div>
                        ) : (
                            <div style={{ padding: 12, border: "1px dashed var(--border)", borderRadius: 10, textAlign: "center", color: "var(--text-muted)", fontSize: 11, display: "flex", flexDirection: "column", gap: 6 }}>
                                <span style={{ fontSize: 18 }}>🌐</span>
                                <span>Click pulsing map coordinates to examine regional NGO projects.</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div style={{ fontSize: 10, color: "var(--text-muted)", textAlign: "left", marginTop: 8 }} className="tech-font">
                * Real-time geospatial allocation verified via Ledger nodes.
            </div>
        </div>
    );
}

function ImpactCalculatorWidget({ navigate }) {
    const [calcCat, setCalcCat] = useState("Education");
    const [amount, setAmount] = useState(2500);

    const getImpactText = (cat, val) => {
        if (cat === "Education") {
            const supplyCount = Math.floor(val / 500);
            const tabCount = Math.floor(val / 10000);
            if (val >= 25000) return `Establish a fully-equipped mini smart computer lab in a tribal school.`;
            if (val >= 10000) return `Provide digital learning tablets and network access for ${tabCount} rural students.`;
            return `Provide comprehensive study supply kits (textbooks, bag, uniform) for ${supplyCount} children.`;
        } else if (cat === "Environment") {
            const treeCount = Math.floor(val / 100);
            if (val >= 25000) return `Restore 3 acres of community forest land and pay for local community wardens.`;
            if (val >= 10000) return `Establish a community solar street light system in an off-grid village.`;
            return `Plant and care for ${treeCount} native trees employing rural forest managers.`;
        } else if (cat === "Healthcare") {
            const kitCount = Math.floor(val / 250);
            const cataractCount = Math.floor(val / 5000);
            if (val >= 25000) return `Install a solar-powered clean community water purification hub for a village.`;
            if (val >= 5000) return `Sponsor restorative eye cataract surgeries for ${cataractCount} senior villagers.`;
            return `Sponsor critical health kits and mobile clinic checkups for ${kitCount} rural families.`;
        } else {
            const mealsCount = Math.floor(val / 50);
            if (val >= 25000) return `Set up a micro-sewing mill center empowering 5 women artisans.`;
            if (val >= 5000) return `Deliver highly nutritious dry ration grocery packs to ${Math.floor(mealsCount/4)} families.`;
            return `Deliver fresh hot mid-day meals to ${mealsCount} underprivileged children.`;
        }
    };

    const handleQuickDonate = () => {
        const catMap = {
            "Education": "Education",
            "Healthcare": "Healthcare",
            "Hunger & Poverty": "Hunger & Poverty",
            "Environment": "Environment"
        };
        const searchCategory = catMap[calcCat] || "Education";
        const matchingCause = CAUSES.find(c => c.category === searchCategory) || CAUSES[0];
        
        navigate("donate", {
            ...matchingCause,
            prefilledAmount: amount
        });
    };

    return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
                <span className="cyber-badge" style={{ marginBottom: 4 }}>Visualizer Engine</span>
                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 14 }}>Interactive Impact Calculator</h3>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                    <div>
                        <label style={{ display: "block", fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 4 }}>Cause Area</label>
                        <select className="input-field" value={calcCat} onChange={e => setCalcCat(e.target.value)} style={{ padding: "8px 10px", borderRadius: 8, fontSize: 13 }}>
                            <option value="Education">📚 Education</option>
                            <option value="Healthcare">🏥 Healthcare</option>
                            <option value="Hunger & Poverty">🍚 Hunger & Poverty</option>
                            <option value="Environment">🌳 Environment</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ display: "block", fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 4 }}>Contribution</label>
                        <div style={{ position: "relative" }}>
                            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 13, fontWeight: 700, color: "var(--primary)" }}>₹</span>
                            <input className="input-field" type="number" value={amount} onChange={e => setAmount(Math.max(0, parseInt(e.target.value) || 0))} style={{ padding: "8px 10px 8px 22px", borderRadius: 8, fontSize: 13, fontWeight: 700 }} />
                        </div>
                    </div>
                </div>

                <div style={{ margin: "14px 0" }}>
                    <input type="range" min="500" max="50000" step="500" value={amount} onChange={e => setAmount(parseInt(e.target.value))} />
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--text-muted)", marginTop: 4, fontWeight: 600 }}>
                        <span>₹500</span>
                        <span>₹10,000</span>
                        <span>₹25,000</span>
                        <span>₹50,000</span>
                    </div>
                </div>

                <div style={{ padding: 12, background: "rgba(0, 255, 102, 0.03)", border: "1px solid var(--border)", borderRadius: 10, minHeight: 70 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.5px" }} className="tech-font">Direct Social Outcome</div>
                    <p style={{ fontSize: 12, fontWeight: 600, color: "var(--text)", marginTop: 4, lineHeight: 1.4 }}>
                        {getImpactText(calcCat, amount)}
                    </p>
                </div>
            </div>

            <button className="cyber-btn" onClick={handleQuickDonate} style={{ width: "100%", padding: 10, fontSize: 13, marginTop: 12 }}>
                ⚡ Express Donate ₹{amount.toLocaleString("en-IN")}
            </button>
        </div>
    );
}

function TaxEstimatorWidget() {
    const [income, setIncome] = useState(1200000);
    const [donation, setDonation] = useState(5000);

    const getTaxSavings = (incomeVal, donationVal) => {
        const exemptedAmount = donationVal * 0.5; // 80G is 50%
        let slabRate = 0.05;
        if (incomeVal > 1500000) slabRate = 0.30;
        else if (incomeVal > 1200000) slabRate = 0.20;
        else if (incomeVal > 800000) slabRate = 0.15;
        else if (incomeVal > 500000) slabRate = 0.10;
        return Math.round(exemptedAmount * slabRate);
    };

    const savings = getTaxSavings(income, donation);

    return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
                <span className="cyber-badge" style={{ marginBottom: 4 }}>Exemption Calculator</span>
                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 14 }}>Tax Savings Estimator (80G)</h3>

                <div style={{ marginBottom: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>
                        <span>Annual Taxable Income</span>
                        <span style={{ color: "var(--primary)", fontWeight: 700 }}>₹{income.toLocaleString("en-IN")}</span>
                    </div>
                    <input type="range" min="300000" max="3000000" step="50000" value={income} onChange={e => setIncome(parseInt(e.target.value))} />
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "var(--text-muted)", marginTop: 2 }}>
                        <span>₹3L</span>
                        <span>₹15L</span>
                        <span>₹30L</span>
                    </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>
                        <span>Target Donation Value</span>
                        <span style={{ color: "var(--primary)", fontWeight: 700 }}>₹{donation.toLocaleString("en-IN")}</span>
                    </div>
                    <input type="range" min="1000" max="100000" step="1000" value={donation} onChange={e => setDonation(parseInt(e.target.value))} />
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "var(--text-muted)", marginTop: 2 }}>
                        <span>₹1,000</span>
                        <span>₹50,000</span>
                        <span>₹1L</span>
                    </div>
                </div>

                <div style={{ padding: 12, background: "rgba(243, 156, 18, 0.06)", border: "1px solid rgba(243, 156, 18, 0.2)", borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "var(--accent)" }} className="tech-font">Tax Exemption Value</div>
                        <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 1 }}>80G rebate amount</div>
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: "var(--accent)" }}>
                        ₹{savings.toLocaleString("en-IN")}
                    </div>
                </div>
            </div>

            <div style={{ fontSize: 10, color: "var(--text-muted)", lineHeight: 1.4, marginTop: 12 }}>
                * Standard 80G certificate is automatically compiled and dispatched via receipt email on validation.
            </div>
        </div>
    );
}

// ==========================================
// UPGRADED BENTO-GRID HOME PAGE
// ==========================================

function HomePage({ navigate, totalRaised, totalDonors }) {
    const [filterState, setFilterState] = useState(null);

    // Map selected state to actual campaigns
    const stateFilterMap = {
        rajasthan: "Rajasthan",
        bihar: "Bihar",
        assam: "Assam",
        maharashtra: "Maharashtra",
        odisha: "Odisha",
        karnataka: "Karnataka"
    };

    const selectedStateName = stateFilterMap[filterState];

    const filteredCauses = selectedStateName 
        ? CAUSES.filter(c => c.location.toLowerCase().includes(selectedStateName.toLowerCase()))
        : CAUSES.filter(c => c.id !== 6);

    const featured = filteredCauses.slice(0, 3);

    return (
        <div className="fade-in" style={{ position: "relative" }}>
            <div className="bento-bg-glow-1"></div>
            <div className="bento-bg-glow-2"></div>
            {/* Bento Grid Layout Wrapper */}
            <div style={{ maxWidth: 1200, margin: "24px auto", padding: "0 20px", position: "relative", zIndex: 1 }}>
                <div className="bento-grid">
                    
                    {/* BENTO BLOCK 1: Hero Block (Span 8) */}
                    <div className="bento-item span-8 hero-bg" style={{ minHeight: 320, padding: 36, display: "flex", flexDirection: "column", justifyContent: "space-between", color: "white" }}>
                        <div className="grid-bg-effects"></div>
                        <div className="laser-scanner"></div>
                        
                        <div style={{ position: "relative", zIndex: 2 }}>
                            <span className="cyber-badge" style={{ borderColor: "rgba(255,255,255,0.4)", color: "white", background: "rgba(255,255,255,0.1)", marginBottom: 12 }}>
                                🌿 Next-Gen Giving Protocol
                            </span>
                            <h1 className="hero-title" style={{ fontFamily: "var(--font-sans)", fontSize: 44, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>
                                Together We Can<br />
                                <span style={{ color: "var(--primary-light)" }} className="glow-text">Change India</span>
                            </h1>
                            <p style={{ fontSize: 16, color: "rgba(255, 255, 255, 0.85)", maxWidth: 520, lineHeight: 1.5 }}>
                                Leverage modular smart-giving to direct transparent aid to verified NGOs in education, healthcare, hunger, and environment.
                            </p>
                        </div>

                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24, position: "relative", zIndex: 2 }}>
                            <button className="cyber-btn glow-text" onClick={() => navigate("donate")} style={{ background: "white", color: "#1a7a4a", borderColor: "white" }}>
                                💚 Donate Now
                            </button>
                            <button onClick={() => navigate("explore")} className="cyber-btn outline" style={{ color: "white", borderColor: "rgba(255,255,255,0.5)" }}>
                                Explore Causes →
                            </button>
                        </div>
                    </div>

                    {/* BENTO BLOCK 2: Key Platform Stats (Span 4) */}
                    <div className="bento-item span-4 glass" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <div>
                            <span className="cyber-badge" style={{ marginBottom: 10 }}>Ledger Audit</span>
                            <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>Impact Analytics</h3>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                            {[
                                { val: "₹4.78 Cr", label: "Consolidated Funding Disbursed", col: "var(--primary)" },
                                { val: "12,654", label: "Active Verified Donors Node", col: "var(--accent)" },
                                { val: "48,000+", label: "Target Lives Impacted", col: "var(--blue)" }
                            ].map(st => (
                                <div key={st.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <div style={{ width: 4, height: 28, background: st.col, borderRadius: 2 }} />
                                    <div>
                                        <div style={{ fontSize: 18, fontWeight: 800, color: "var(--text)" }} className="tech-font glow-text">{st.val}</div>
                                        <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{st.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 12, marginTop: 12, fontSize: 11, color: "var(--text-muted)" }} className="tech-font">
                            ℹ Data updated hourly. Cryptographically verified.
                        </div>
                    </div>

                    {/* BENTO BLOCK 3: Live Banner Ticker (Span 12) */}
                    <div className="span-12" style={{ margin: "-10px 0" }}>
                        <LiveTickerWidget />
                    </div>

                    {/* BENTO BLOCK 4: Interactive Regional Map (Span 8) */}
                    <div className="bento-item span-8 glass">
                        <IndiaMapWidget filterState={filterState} setFilterState={setFilterState} />
                    </div>

                    {/* BENTO BLOCK 5: Real-time Operations Console (Span 4) */}
                    <div className="bento-item span-4 glass">
                        <LiveActivityLogWidget />
                    </div>

                    {/* BENTO BLOCK 6: Interactive Impact Calculator (Span 6) */}
                    <div className="bento-item span-6 glass">
                        <ImpactCalculatorWidget navigate={navigate} />
                    </div>

                    {/* BENTO BLOCK 7: Tax Exemption Estimator (Span 6) */}
                    <div className="bento-item span-6 glass">
                        <TaxEstimatorWidget />
                    </div>

                    {/* BENTO BLOCK 8: Featured Causes Grid Header & Grid (Span 12) */}
                    <div className="span-12" style={{ marginTop: 20 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 20 }}>
                            <div>
                                <span className="cyber-badge" style={{ marginBottom: 4 }}>Smart Directives</span>
                                <h2 className="section-title">
                                    {selectedStateName ? `Active Campaigns in ${selectedStateName}` : "Featured Campaigns"}
                                </h2>
                                <p className="section-sub">Direct matching funds to audit-verified NGO campaigns.</p>
                            </div>
                            <button className="btn-outline tech-font" onClick={() => navigate("explore")} style={{ fontSize: 12, fontWeight: 700, padding: "8px 16px" }}>
                                VIEW ALL CAMPAIGNS →
                            </button>
                        </div>

                        {featured.length > 0 ? (
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
                                {featured.map(c => <CauseCard key={c.id} cause={c} navigate={navigate} />)}
                            </div>
                        ) : (
                            <div style={{ background: "var(--card)", padding: "48px 20px", borderRadius: 16, border: "1px dashed var(--border)", textAlign: "center", color: "var(--text-muted)" }}>
                                <span style={{ fontSize: 32 }}>🔍</span>
                                <p style={{ marginTop: 12, fontSize: 14 }}>No active campaigns match this state filter currently.</p>
                                <button onClick={() => setFilterState(null)} style={{ marginTop: 12, background: "var(--primary)", color: "var(--bg)", border: "none", padding: "8px 16px", borderRadius: 8, fontWeight: 600, cursor: "pointer" }}>
                                    Clear Map Filter
                                </button>
                            </div>
                        )}
                    </div>

                    {/* BENTO BLOCK 9: NGO Certification standards (Span 12) */}
                    <div className="bento-item span-12 glass" style={{ textAlign: "center", padding: "32px 24px" }}>
                        <span className="cyber-badge" style={{ marginBottom: 12 }}>Trust Protocols</span>
                        <h4 style={{ fontSize: 16, fontWeight: 800, marginBottom: 12 }}>Cryptographic Auditing & Certification Partners</h4>
                        <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", marginTop: 16 }}>
                            {["GuideStar India Platinum", "NASSCOM Social Audit", "UN SDG Compliant", "Section 80G Certified", "FCRA Node Validated"].map(org => (
                                <div key={org} style={{ padding: "8px 16px", background: "rgba(0, 0, 0, 0.03)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 12, fontWeight: 700, color: "var(--text-muted)" }} className="tech-font">
                                    🛡️ {org}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

function CauseCard({ cause, navigate }) {
    const p = pct(cause.raised, cause.goal);
    const catColor = catColors[cause.category] || COLORS.primary;
    return (
        <div className="card hover-lift cause-card" style={{ overflow: "hidden", cursor: "pointer", border: "1px solid var(--border)", background: "var(--card)", display: "flex", flexDirection: "column", height: "100%", boxShadow: "var(--shadow)" }} onClick={() => navigate("donate", cause)}>
            <div style={{ position: "relative", overflow: "hidden" }}>
                <img src={cause.image} alt={cause.title} className="cause-img" style={{ width: "100%", height: 200, objectFit: "cover", display: "block", transition: "transform 0.5s ease" }} loading="lazy" />
                <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 6 }}>
                    <span className="tag" style={{ background: `${catColor}33`, color: "white", textShadow: "0 1px 3px rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", fontWeight: 700, fontSize: 11, border: `1px solid ${catColor}66` }}>{cause.category}</span>
                    {cause.urgent && <span className="tag urgent-badge" style={{ fontSize: 11, fontWeight: 700 }}>🔥 Urgent</span>}
                </div>
            </div>
            <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
                <div>
                    <div style={{ fontSize: 10, color: "var(--text-muted)", marginBottom: 6, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }} className="tech-font">{cause.ngo} · {cause.location}</div>
                    <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 8, lineHeight: 1.3, color: "var(--text)", transition: "color 0.2s" }} className="glow-text">{cause.title}</h3>
                    <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5, marginBottom: 16, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{cause.description}</p>
                </div>
                <div>
                    <div className="progress-bar" style={{ marginBottom: 10, height: 6 }}>
                        <div className="progress-fill" style={{ width: `${p}%`, background: catColor }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 12 }}>
                        <div>
                            <span style={{ fontWeight: 800, color: "var(--text)" }} className="tech-font">{fmt(cause.raised)}</span>
                            <span style={{ color: "var(--text-muted)" }}> raised</span>
                        </div>
                        <div style={{ color: "var(--text-muted)", fontWeight: 600 }}>{p}%</div>
                    </div>
                    <button className="cyber-btn" style={{ width: "100%", padding: "10px", borderRadius: 8, fontSize: 12, fontWeight: 700, background: catColor, borderColor: catColor }} onClick={e => { e.stopPropagation(); navigate("donate", cause); }}>
                        Donate to This Cause
                    </button>
                </div>
            </div>
        </div>
    );
}

function ExplorePage({ navigate, filterCat, setFilterCat }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("urgent");

    const cats = ["All", ...Object.keys(catColors)];
    
    let filtered = filterCat === "All" ? [...CAUSES] : CAUSES.filter(c => c.category === filterCat);
    
    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(c => c.title.toLowerCase().includes(q) || c.ngo.toLowerCase().includes(q) || c.location.toLowerCase().includes(q));
    }

    filtered.sort((a, b) => {
        const pctA = a.raised / a.goal;
        const pctB = b.raised / b.goal;
        if (sortBy === "urgent") {
            return (b.urgent ? 1 : 0) - (a.urgent ? 1 : 0);
        } else if (sortBy === "closest") {
            return pctB - pctA;
        } else if (sortBy === "needs-help") {
            return pctA - pctB;
        }
        return 0;
    });

    return (
        <div className="fade-in" style={{ maxWidth: 1200, margin: "0 auto 60px", padding: "0 20px" }}>
            <style>{`
                .cause-card:hover .cause-img { transform: scale(1.08); }
                .explore-hero { background: linear-gradient(135deg, #0d5c35 0%, #1a7a4a 100%); color: white; padding: 60px 40px; border-radius: 24px; margin-top: 30px; margin-bottom: 40px; box-shadow: 0 20px 40px rgba(26,122,74,0.15); text-align: center; position: relative; overflow: hidden; }
                .explore-hero::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%); pointer-events: none; }
            `}</style>
            
            <div className="explore-hero">
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 46, marginBottom: 16, position: "relative", zIndex: 1 }}>Explore Causes</h1>
                <p style={{ fontSize: 18, opacity: 0.9, maxWidth: 600, margin: "0 auto", position: "relative", zIndex: 1, lineHeight: 1.6 }}>Browse verified NGO campaigns across India. Find a cause that speaks to your heart and make an impact today.</p>
            </div>

            {/* Filters & Controls */}
            <div style={{ background: "white", padding: 24, borderRadius: 16, boxShadow: "0 4px 20px rgba(0,0,0,0.04)", marginBottom: 32 }}>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
                    {cats.map(c => (
                        <button key={c} className={`chip ${filterCat === c ? "chip-active" : "chip-inactive"}`} onClick={() => setFilterCat(c)}
                            style={{ padding: "10px 20px", borderRadius: 30, fontWeight: 600, fontSize: 14, transition: "all 0.2s" }}>
                            {c}
                        </button>
                    ))}
                </div>
                
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ position: "relative", flex: "1 1 300px" }}>
                        <svg style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: COLORS.textMuted }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <input type="text" placeholder="Search causes, NGOs, or locations..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                            style={{ width: "100%", padding: "14px 16px 14px 44px", borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 15, background: "#f8faf9" }} />
                    </div>
                    
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontSize: 14, color: COLORS.textMuted, fontWeight: 600 }}>Sort by:</span>
                        <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ padding: "12px 16px", borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 14, background: "#f8faf9", fontWeight: 600, color: COLORS.text, cursor: "pointer", outline: "none" }}>
                            <option value="urgent">🔥 Most Urgent</option>
                            <option value="closest">🎯 Closest to Goal</option>
                            <option value="needs-help">❤️ Needs Most Help</option>
                        </select>
                    </div>
                </div>
            </div>

            <div style={{ fontSize: 15, color: COLORS.textMuted, marginBottom: 24, fontWeight: 500 }}>
                Showing <strong style={{ color: COLORS.text }}>{filtered.length}</strong> cause{filtered.length !== 1 ? "s" : ""}
                {searchQuery && <span> matching "{searchQuery}"</span>}
            </div>

            {filtered.length > 0 ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 30 }}>
                    {filtered.map(c => <CauseCard key={c.id} cause={c} navigate={navigate} />)}
                </div>
            ) : (
                <div style={{ textAlign: "center", padding: "80px 20px", background: "white", borderRadius: 16 }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                    <div style={{ fontSize: 18, fontWeight: 600, color: COLORS.primaryDark, marginBottom: 8 }}>No causes found</div>
                    <div style={{ color: COLORS.textMuted }}>Try adjusting your filters or search term to find what you're looking for.</div>
                    <button className="btn-outline" style={{ marginTop: 20 }} onClick={() => { setSearchQuery(""); setFilterCat("All"); }}>Clear All Filters</button>
                </div>
            )}

            <div style={{ marginTop: 60, padding: "40px 32px", background: "linear-gradient(135deg, #e8f5ee, #d1eedd)", borderRadius: 24, textAlign: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: COLORS.primaryDark, marginBottom: 12 }}>Can't decide? Donate to All Causes</div>
                <div style={{ color: COLORS.textMuted, marginBottom: 24, fontSize: 16, maxWidth: 500, margin: "0 auto 30px" }}>Your donation will be distributed across all 6 sectors based on urgent need, ensuring maximum impact.</div>
                <button className="btn-primary hover-lift" onClick={() => navigate("donate", null)} style={{ padding: "16px 40px", fontSize: 18, borderRadius: 12 }}>
                    Donate to All Causes
                </button>
            </div>
        </div>
    );
}

function DonatePage({ navigate, causeData, donations, setDonations, showNotif }) {
    const [form, setForm] = useState(() => {
        const prefill = causeData?.prefilledAmount || "";
        const presets = [500, 1000, 2000, 5000, 10000];
        const isPreset = presets.includes(prefill);
        return {
            name: "",
            email: "",
            phone: "",
            amount: isPreset ? prefill.toString() : prefill ? "custom" : "",
            custom: isPreset ? "" : prefill ? prefill.toString() : "",
            cause: causeData ? causeData.title : "All Causes"
        };
    });
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [isMonthly, setIsMonthly] = useState(false);
    const [coverFees, setCoverFees] = useState(false);

    const presets = [500, 1000, 2000, 5000, 10000];
    const selectedCause = causeData || { title: "All Causes", description: "Your donation will be split across all 6 cause categories.", image: null };
    
    const baseAmount = parseInt(form.amount || form.custom || "0");
    const finalAmount = coverFees ? Math.ceil(baseAmount * 1.02) : baseAmount;

    const handleSubmit = async () => {
        if (!form.name || !form.email || !form.phone || baseAmount <= 0) {
            showNotif("Please fill in all required fields and select an amount.", "error");
            return;
        }
        if (!/^\d{10}$/.test(form.phone)) {
            showNotif("Please enter a valid 10-digit mobile number.", "error");
            return;
        }

        setLoading(true);

        try {
            // 1. Create order on the backend
            console.log("Requesting order from backend...");
            const API_URL = import.meta.env.VITE_API_URL;

            const orderRes = await fetch(`${API_URL}/create-order`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: finalAmount }),
            });
            const order = await orderRes.json();
            
            if (!orderRes.ok) throw new Error(order.error || "Failed to create order");

            if (!window.Razorpay) throw new Error("Razorpay SDK not loaded.");

            const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

            // 2. Open Razorpay Checkout
            const options = {
                key: razorpayKey || "YOUR_RAZORPAY_KEY_ID",
                amount: order.amount,
                currency: order.currency,
                name: "SevaBharat",
                description: `${isMonthly ? 'Monthly ' : ''}Donation for ${form.cause}`,
                order_id: order.id,
                handler: async function (response) {
                    // 3. Save donation on success
                    const newDonor = {
                        name: form.name,
                        email: form.email,
                        phone: form.phone,
                        amount: finalAmount,
                        cause: form.cause,
                        date: new Date().toISOString().split("T")[0],
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature,
                        type: isMonthly ? "monthly" : "one-time"
                    };

                    const { error } = await supabase.from('donations').insert([newDonor]);

                    if (error) {
                        console.error('Error saving donation:', error);
                        showNotif(`Storage Error: ${error.message}`, "error");
                    } else {
                        setDonations(prev => [newDonor, ...prev]);
                        // Send email
                        await fetch(`${API_URL}/send-email`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                name: newDonor.name,
                                email: newDonor.email,
                                amount: newDonor.amount,
                            }),
                        });
                    }
                    setLoading(false);
                    setSubmitted(true);
                },
                prefill: {
                    name: form.name,
                    email: form.email,
                    contact: form.phone,
                },
                theme: { color: "#1a7a4a" },
                modal: { ondismiss: function () { setLoading(false); } }
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response) {
                showNotif(`Payment Failed: ${response.error.description}`, "error");
                setLoading(false);
            });
            rzp.open();
        } catch (err) {
            console.error(err);
            showNotif(`Error: ${err.message}`, "error");
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="fade-in" style={{ maxWidth: 600, margin: "60px auto", padding: "0 20px", textAlign: "center" }}>
                <div className="card" style={{ padding: "60px 40px", border: "none", boxShadow: "0 20px 40px rgba(0,0,0,0.08)", background: "white" }}>
                    <div style={{ width: 80, height: 80, background: "#e8f5ee", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", color: COLORS.primary }}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: COLORS.primaryDark, marginBottom: 12 }}>Thank You, {form.name}!</div>
                    <div style={{ color: COLORS.textMuted, fontSize: 16, lineHeight: 1.7, marginBottom: 24 }}>
                        Your {isMonthly ? "monthly " : ""}donation of <strong style={{ color: COLORS.primary }}>{fmtFull(finalAmount)}</strong> to <strong>{form.cause}</strong> has been received. An 80G receipt will be sent to {form.email}.
                    </div>
                    <div style={{ background: "#f8fdfa", border: "1px dashed #c0dfcd", borderRadius: 12, padding: "16px 24px", marginBottom: 32, fontSize: 14, color: COLORS.textMuted, display: "inline-block" }}>
                        🔖 Transaction Ref: SB{Date.now().toString().slice(-8)}
                    </div>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <button className="btn-primary hover-lift" onClick={() => { setSubmitted(false); navigate("dashboard"); }}>View Dashboard</button>
                        <button className="btn-outline hover-lift" onClick={() => { setSubmitted(false); navigate("home"); }}>Back to Home</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fade-in" style={{ maxWidth: 1100, margin: "40px auto", padding: "0 20px" }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, color: COLORS.primaryDark, marginBottom: 12 }}>Make a Donation</h1>
                <p style={{ fontSize: 16, color: COLORS.textMuted, maxWidth: 600, margin: "0 auto" }}>100% of your donation reaches the cause. Zero platform fee.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 32, alignItems: "start" }}>
                <div>
                    {/* Step Indicator */}
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 32, position: "relative", maxWidth: 300, margin: "0 auto 32px" }}>
                        <div style={{ position: "absolute", top: 14, left: 20, right: 20, height: 2, background: "#f0f4f2", zIndex: 0 }} />
                        {[1, 2, 3].map(num => (
                            <div key={num} style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                                <div style={{ width: 30, height: 30, borderRadius: "50%", background: step >= num ? COLORS.primary : "white", border: `2px solid ${step >= num ? COLORS.primary : "#d1e0d7"}`, color: step >= num ? "white" : COLORS.textMuted, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, transition: "all 0.3s" }}>
                                    {step > num ? "✓" : num}
                                </div>
                                <div style={{ fontSize: 12, fontWeight: 600, color: step >= num ? COLORS.primaryDark : COLORS.textMuted }}>
                                    {num === 1 ? "Cause" : num === 2 ? "Amount" : "Details"}
                                </div>
                            </div>
                        ))}
                    </div>

                    {step === 1 && (
                        <div className="fade-in">
                            {/* Donation Type Toggle */}
                            <div style={{ display: "flex", background: "white", borderRadius: 12, padding: 6, marginBottom: 24, boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
                                <button onClick={() => setIsMonthly(false)} style={{ flex: 1, padding: "12px", borderRadius: 8, border: "none", background: !isMonthly ? COLORS.primary : "transparent", color: !isMonthly ? "white" : COLORS.textMuted, fontWeight: 600, cursor: "pointer", transition: "all 0.2s", fontSize: 15 }}>Give Once</button>
                                <button onClick={() => setIsMonthly(true)} style={{ flex: 1, padding: "12px", borderRadius: 8, border: "none", background: isMonthly ? COLORS.primary : "transparent", color: isMonthly ? "white" : COLORS.textMuted, fontWeight: 600, cursor: "pointer", transition: "all 0.2s", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                                    Monthly <span style={{ background: isMonthly ? "rgba(255,255,255,0.2)" : "#f0f4f2", color: isMonthly ? "white" : COLORS.primary, padding: "2px 8px", borderRadius: 10, fontSize: 11 }}>Impact</span>
                                </button>
                            </div>

                            {/* Cause selection */}
                            <div className="card" style={{ padding: 32, marginBottom: 24, border: "none", boxShadow: "0 10px 30px rgba(0,0,0,0.04)" }}>
                                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 20, color: COLORS.primaryDark }}>Select Cause</div>
                                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                                    <button onClick={() => setForm(f => ({ ...f, cause: "All Causes" }))}
                                        className="hover-lift"
                                        style={{ padding: "12px 20px", borderRadius: 12, border: `2px solid ${form.cause === "All Causes" ? COLORS.primary : "#f0f4f2"}`, background: form.cause === "All Causes" ? "#f8fdfa" : "white", color: form.cause === "All Causes" ? COLORS.primary : COLORS.text, fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "all 0.2s" }}>
                                        🌐 All Causes
                                    </button>
                                    {CAUSES.map(c => (
                                        <button key={c.id} onClick={() => setForm(f => ({ ...f, cause: c.title }))}
                                            className="hover-lift"
                                            style={{ padding: "12px 20px", borderRadius: 12, border: `2px solid ${form.cause === c.title ? COLORS.primary : "#f0f4f2"}`, background: form.cause === c.title ? "#f8fdfa" : "white", color: form.cause === c.title ? COLORS.primary : COLORS.text, fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "all 0.2s" }}>
                                            {c.title}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            <button className="btn-primary hover-lift" onClick={() => setStep(2)}
                                style={{ width: "100%", padding: 18, fontSize: 16, borderRadius: 12, fontWeight: 600 }}>
                                Continue to Amount ➔
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="fade-in">
                            {/* Amount */}
                            <div className="card" style={{ padding: 32, marginBottom: 24, border: "none", boxShadow: "0 10px 30px rgba(0,0,0,0.04)" }}>
                                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 20, color: COLORS.primaryDark }}>Choose Amount</div>
                                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
                                    {presets.map(p => (
                                        <button key={p} onClick={() => setForm(f => ({ ...f, amount: p.toString(), custom: "" }))}
                                            className="hover-lift"
                                            style={{ flex: "1 1 100px", padding: "16px 20px", borderRadius: 12, border: `2px solid ${form.amount === p.toString() ? COLORS.primary : "#f0f4f2"}`, background: form.amount === p.toString() ? "#f8fdfa" : "white", color: form.amount === p.toString() ? COLORS.primary : COLORS.text, fontWeight: 700, fontSize: 16, cursor: "pointer", transition: "all 0.2s" }}>
                                            ₹{p.toLocaleString("en-IN")}
                                        </button>
                                    ))}
                                </div>
                                <input className="input-field" type="number" placeholder="Enter custom amount (₹)"
                                    style={{ padding: "16px", fontSize: 16, borderRadius: 12, background: "#f8faf9", border: "1px solid #e2e8f0" }}
                                    value={form.custom}
                                    onChange={e => setForm(f => ({ ...f, custom: e.target.value, amount: "" }))} />
                                
                                <div style={{ marginTop: 24, padding: "16px", background: "#f8fdfa", borderRadius: 12, border: "1px solid #c0dfcd", display: "flex", gap: 12, alignItems: "flex-start" }}>
                                    <input type="checkbox" id="coverFees" checked={coverFees} onChange={e => setCoverFees(e.target.checked)} style={{ width: 18, height: 18, marginTop: 2, accentColor: COLORS.primary, cursor: "pointer" }} />
                                    <div>
                                        <label htmlFor="coverFees" style={{ fontWeight: 600, color: COLORS.text, cursor: "pointer", display: "block", marginBottom: 4 }}>Cover processing fees (2%)</label>
                                        <div style={{ fontSize: 13, color: COLORS.textMuted }}>Optional: Add ₹{Math.ceil(baseAmount * 0.02)} so 100% of your donation reaches the NGO.</div>
                                    </div>
                                </div>

                                {baseAmount > 0 && (
                                    <div style={{ marginTop: 20, fontSize: 15, color: COLORS.primary, fontWeight: 600, display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px dashed #e2e8f0", paddingTop: 20 }}>
                                        <span>Total Contribution</span>
                                        <span style={{ fontSize: 24, color: COLORS.primaryDark }}>{fmtFull(finalAmount)}</span>
                                    </div>
                                )}
                            </div>

                            <div style={{ display: "flex", gap: 12 }}>
                                <button className="btn-outline hover-lift" onClick={() => setStep(1)} style={{ padding: "16px 24px", borderRadius: 12, fontWeight: 600 }}>Back</button>
                                <button className="btn-primary hover-lift" onClick={() => {
                                    if (baseAmount <= 0) showNotif("Please select an amount.", "error");
                                    else setStep(3);
                                }} style={{ flex: 1, padding: 18, fontSize: 16, borderRadius: 12, fontWeight: 600 }}>
                                    Continue to Details ➔
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="fade-in">
                            {/* Personal Details */}
                            <div className="card" style={{ padding: 32, marginBottom: 24, border: "none", boxShadow: "0 10px 30px rgba(0,0,0,0.04)" }}>
                                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 20, color: COLORS.primaryDark }}>Your Details</div>
                                <div style={{ display: "grid", gap: 16 }}>
                                    <input className="input-field" style={{ borderRadius: 10, padding: 14 }} placeholder="Full Name *" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                                    <input className="input-field" style={{ borderRadius: 10, padding: 14 }} type="email" placeholder="Email Address *" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                                    <input className="input-field" style={{ borderRadius: 10, padding: 14 }} type="tel" placeholder="Mobile Number (10 digits) *" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value.replace(/\D/g, "").slice(0, 10) }))} />
                                </div>
                            </div>

                            <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                                <button className="btn-outline hover-lift" onClick={() => setStep(2)} disabled={loading} style={{ padding: "16px 24px", borderRadius: 12, fontWeight: 600 }}>Back</button>
                                <button className="btn-primary hover-lift" onClick={handleSubmit} disabled={loading}
                                    style={{ flex: 1, padding: 18, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", gap: 12, borderRadius: 14, boxShadow: "0 10px 20px rgba(26, 122, 74, 0.2)" }}>
                                    {loading ? (
                                        <>
                                            <div style={{ width: 22, height: 22, borderRadius: "50%", border: "3px solid rgba(255,255,255,0.4)", borderTopColor: "white", animation: "spin 0.8s linear infinite" }} />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                            Donate {fmtFull(finalAmount)}
                                        </>
                                    )}
                                </button>
                            </div>
                            
                            <div style={{ textAlign: "center", fontSize: 13, color: COLORS.textMuted, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                                SSL Secured · RBI Compliant · 80G Tax Receipt
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div>
                    {/* Trust Badge / Testimonial */}
                    <div className="card" style={{ padding: 24, marginBottom: 24, background: "linear-gradient(135deg, #1a7a4a, #0d5c35)", color: "white", border: "none" }}>
                        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                            <div style={{ color: "#f1c40f", display: "flex" }}>
                                {[1,2,3,4,5].map(i => <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>)}
                            </div>
                        </div>
                        <div style={{ fontStyle: "italic", fontSize: 15, lineHeight: 1.6, marginBottom: 16, opacity: 0.95 }}>
                            "SevaBharat's transparency is unmatched. I can track exactly where every rupee of my donation goes."
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>AP</div>
                            <div style={{ fontSize: 13 }}>
                                <div style={{ fontWeight: 600 }}>Amit P.</div>
                                <div style={{ opacity: 0.8 }}>Donor since 2021</div>
                            </div>
                        </div>
                    </div>

                    {causeData && (
                        <div className="card" style={{ overflow: "hidden", marginBottom: 24, border: "none", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
                            <img src={causeData.image} alt={causeData.title} style={{ width: "100%", height: 180, objectFit: "cover" }} loading="lazy" />
                            <div style={{ padding: 24 }}>
                                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{causeData.title}</div>
                                <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 16 }}>{causeData.ngo} · {causeData.location}</div>
                                <div className="progress-bar" style={{ marginBottom: 10, height: 8 }}>
                                    <div className="progress-fill" style={{ width: `${pct(causeData.raised, causeData.goal)}%` }} />
                                </div>
                                <div style={{ fontSize: 14, display: "flex", justifyContent: "space-between" }}>
                                    <span style={{ fontWeight: 700, color: COLORS.primary }}>{fmt(causeData.raised)}</span>
                                    <span style={{ color: COLORS.textMuted }}>Goal: {fmt(causeData.goal)}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="card" style={{ padding: 24, border: "none", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
                        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 20, color: COLORS.primaryDark }}>Why Trust Us</div>
                        {[
                            { svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>, text: "All NGOs verified by GuideStar India" },
                            { svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>, text: "Real-time fund tracking dashboard" },
                            { svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l8 4v6c0 5.5-3.58 10.74-8 12-4.42-1.26-8-6.5-8-12V6l8-4z"></path></svg>, text: "FCRA registered & 80G certified" },
                            { svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>, text: "Photo & video proof of impact" },
                            { svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>, text: "Bank-grade data encryption" },
                        ].map((t, i) => (
                            <div key={i} style={{ display: "flex", gap: 14, marginBottom: 16, alignItems: "flex-start" }}>
                                <div style={{ color: COLORS.primary, marginTop: 2 }}>{t.svg}</div>
                                <span style={{ color: COLORS.text, fontSize: 14, lineHeight: 1.5, fontWeight: 500 }}>{t.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}
function AboutPage() {
    return (
        <div className="fade-in">
            {/* Hero */}
            <div style={{ background: "linear-gradient(135deg, #0d5c35, #1a7a4a)", padding: "60px 20px", textAlign: "center" }}>
                <div style={{ maxWidth: 700, margin: "0 auto" }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, color: "white", marginBottom: 16 }}>Our Story</div>
                    <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 18, lineHeight: 1.7 }}>
                        Founded in 2019 in Pune, SevaBharat bridges the gap between generous donors and verified NGOs working on the ground across India.
                    </p>
                </div>
            </div>

            <div style={{ maxWidth: 1100, margin: "60px auto", padding: "0 20px" }}>
                {/* Mission & Vision */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 60 }}>
                    {[
                        { icon: "🎯", title: "Our Mission", text: "To democratize giving in India by connecting every willing donor — regardless of contribution size — with verified, impactful NGOs, enabling transparent and accountable social change." },
                        { icon: "🔭", title: "Our Vision", text: "A future where no child in India goes without education, no family faces preventable illness, and every community has the resources to thrive — powered by the collective generosity of a billion Indians." },
                        { icon: "💎", title: "Our Values", text: "Transparency in every rupee tracked. Accountability to our donors and NGOs. Inclusivity across regions and causes. Impact measured and reported faithfully, always." },
                    ].map(item => (
                        <div key={item.title} className="card" style={{ padding: 32 }}>
                            <div style={{ fontSize: 40, marginBottom: 16 }}>{item.icon}</div>
                            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, marginBottom: 12, color: COLORS.primaryDark }}>{item.title}</div>
                            <p style={{ color: COLORS.textMuted, lineHeight: 1.8, fontSize: 15 }}>{item.text}</p>
                        </div>
                    ))}
                </div>

                {/* Impact Numbers */}
                <div style={{ background: "linear-gradient(135deg, #e8f5ee, #d1eedd)", borderRadius: 20, padding: "48px 32px", marginBottom: 60 }}>
                    <div className="section-title" style={{ textAlign: "center", marginBottom: 8 }}>Our Impact Since 2019</div>
                    <div className="section-sub" style={{ textAlign: "center", marginBottom: 40 }}>Numbers that represent lives changed</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 24 }}>
                        {[
                            { n: "₹4.7 Cr+", l: "Funds Raised" },
                            { n: "42", l: "NGO Partners" },
                            { n: "48,000+", l: "Lives Impacted" },
                            { n: "12,600+", l: "Donors" },
                            { n: "18", l: "States Covered" },
                            { n: "100%", l: "Fund Traceability" },
                        ].map(s => (
                            <div key={s.l} style={{ textAlign: "center" }}>
                                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: COLORS.primary, fontWeight: 700 }}>{s.n}</div>
                                <div style={{ fontSize: 14, color: COLORS.textMuted, marginTop: 6 }}>{s.l}</div>
                            </div>
                        ))}
                    </div>
                </div>


            </div>
        </div>
    );
}

function AwardsPage() {
    return (
        <div className="fade-in">
            <div style={{ background: "linear-gradient(135deg, #b7860b 0%, #f39c12 50%, #f7c55a 100%)", padding: "60px 20px", textAlign: "center" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, color: "white", marginBottom: 12 }}>Awards & Recognition</div>
                <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 18 }}>Recognised by India's top institutions for transparency, innovation, and impact</p>
            </div>
            <div style={{ maxWidth: 1100, margin: "60px auto", padding: "0 20px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24, marginBottom: 60 }}>
                    {AWARDS.map(a => (
                        <div key={a.title} className="award-card hover-lift">
                            <div style={{ fontSize: 40, marginBottom: 12 }}>{a.icon}</div>
                            <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 4, color: COLORS.text }}>{a.title}</div>
                            <div style={{ fontSize: 13, color: COLORS.primary, fontWeight: 600, marginBottom: 4 }}>{a.year}</div>
                            <div style={{ fontSize: 13, color: COLORS.textMuted }}>{a.org}</div>
                        </div>
                    ))}
                </div>

                {/* Milestones */}
                <div className="card" style={{ padding: 40 }}>
                    <div className="section-title" style={{ marginBottom: 8 }}>Impact Milestones</div>
                    <div className="section-sub" style={{ marginBottom: 36 }}>Key achievements in our journey</div>
                    <div style={{ position: "relative" }}>
                        {[
                            { year: "2019", event: "SevaBharat founded with 3 NGO partners and ₹12L in first-year donations" },
                            { year: "2020", event: "COVID-19 relief: Distributed PPE kits and rations to 25,000 families in 6 states" },
                            { year: "2021", event: "Crossed ₹1 Crore in total donations. Launched mobile app with 50,000+ downloads" },
                            { year: "2022", event: "Forbes India Social Entrepreneur recognition. 20 NGO partners onboarded" },
                            { year: "2023", event: "UN SDG Champion Award. Expanded to 18 states with ₹3 Cr raised" },
                            { year: "2024", event: "National Social Impact Award. 42 NGO partners. ₹4.7 Cr+ raised to date" },
                        ].map((m, i) => (
                            <div key={m.year} style={{ display: "flex", gap: 20, marginBottom: 28, position: "relative" }}>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 60 }}>
                                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#e8f5ee", border: `3px solid ${COLORS.primary}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, color: COLORS.primary, zIndex: 1 }}>
                                        {m.year.slice(2)}
                                    </div>
                                    {i < 5 && <div style={{ width: 2, height: "calc(100% + 12px)", background: "#d4e8da", marginTop: 4 }} />}
                                </div>
                                <div style={{ paddingTop: 8, flex: 1 }}>
                                    <div style={{ fontWeight: 700, color: COLORS.primary, fontSize: 15, marginBottom: 4 }}>{m.year}</div>
                                    <div style={{ fontSize: 14, color: COLORS.textMuted, lineHeight: 1.6 }}>{m.event}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function AuthPage({ setShowNotif }) {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const handleAuth = async (e) => {
        if (e) e.preventDefault();
        if (!email || !password) return;
        setLoading(true);
        setError("");
        try {
            if (isLogin) {
                const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
                if (authError) throw authError;
                setShowNotif("Logged in successfully!");
            } else {
                const { error: authError } = await supabase.auth.signUp({
                    email,
                    password,
                    options: { data: { full_name: name } }
                });
                if (authError) throw authError;
                setShowNotif("Account created! Please check your email for verification.", "info");
            }
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const { error: authError } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: { redirectTo: window.location.origin }
            });
            if (authError) throw authError;
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="fade-in" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
            <div className="card" style={{ width: "100%", maxWidth: 440, padding: 40 }}>
                <div style={{ textAlign: "center", marginBottom: 32 }}>
                    <div style={{ width: 64, height: 64, borderRadius: 18, background: "linear-gradient(135deg,#1a7a4a,#2ecc71)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto 16px", color: "white" }}>
                        {isLogin ? "🔐" : "🌱"}
                    </div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, marginBottom: 8 }}>{isLogin ? "Welcome Back" : "Join SevaBharat"}</div>
                    <div style={{ fontSize: 14, color: COLORS.textMuted }}>{isLogin ? "Sign in to track your donations and impact" : "Create an account to start your giving journey"}</div>
                </div>

                <div style={{ display: "flex", background: "#f0f4f2", borderRadius: 10, padding: 4, marginBottom: 24 }}>
                    <button onClick={() => setIsLogin(true)} style={{ flex: 1, padding: "10px", borderRadius: 8, border: "none", background: isLogin ? "white" : "transparent", color: isLogin ? COLORS.primary : COLORS.textMuted, fontWeight: 600, cursor: "pointer", boxShadow: isLogin ? "0 2px 8px rgba(0,0,0,0.05)" : "none", transition: "all 0.2s" }}>Login</button>
                    <button onClick={() => setIsLogin(false)} style={{ flex: 1, padding: "10px", borderRadius: 8, border: "none", background: !isLogin ? "white" : "transparent", color: !isLogin ? COLORS.primary : COLORS.textMuted, fontWeight: 600, cursor: "pointer", boxShadow: !isLogin ? "0 2px 8px rgba(0,0,0,0.05)" : "none", transition: "all 0.2s" }}>Sign Up</button>
                </div>

                {error && (
                    <div style={{ background: "#fef2f2", color: "#b91c1c", padding: "12px 16px", borderRadius: 10, fontSize: 13, marginBottom: 20, border: "1px solid #fee2e2" }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleAuth} style={{ display: "grid", gap: 16 }}>
                    {!isLogin && (
                        <div>
                            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: COLORS.text, marginBottom: 6 }}>Full Name</label>
                            <input className="input-field" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} required disabled={loading} style={{ width: "100%" }} />
                        </div>
                    )}
                    <div>
                        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: COLORS.text, marginBottom: 6 }}>Email Address</label>
                        <input className="input-field" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required disabled={loading} style={{ width: "100%" }} />
                    </div>
                    <div>
                        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: COLORS.text, marginBottom: 6 }}>Password</label>
                        <input className="input-field" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required disabled={loading} style={{ width: "100%" }} />
                    </div>
                    <button className="btn-primary" type="submit" disabled={loading} style={{ padding: 16, fontSize: 16, width: "100%", marginTop: 8 }}>
                        {loading ? "Processing…" : (isLogin ? "Sign In" : "Create Account")}
                    </button>
                </form>

                <div style={{ margin: "24px 0", display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ flex: 1, height: 1, background: "#f0f4f2" }} />
                    <div style={{ fontSize: 12, color: COLORS.textMuted }}>OR</div>
                    <div style={{ flex: 1, height: 1, background: "#f0f4f2" }} />
                </div>

                <button className="btn-outline" onClick={handleGoogleLogin} disabled={loading} 
                    style={{ width: "100%", padding: 12, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: "white", border: "1px solid #d4e8da" }}>
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="18" alt="Google" />
                    Continue with Google
                </button>
            </div>
        </div>
    );
}

function UserDashboard({ user, donations, navigate, showNotif }) {
    const userDonations = donations.filter(d => d.email === user.email);
    const totalDonated = userDonations.reduce((s, d) => s + d.amount, 0);
    const taxSavings = Math.round(totalDonated * 0.5);

    // Gamification Logic
    const getBadge = (total) => {
        if (total >= 50000) return { name: "Gold Donor", icon: "🥇", color: "#f1c40f", next: null, min: 50000 };
        if (total >= 10000) return { name: "Silver Donor", icon: "🥈", color: "#bdc3c7", next: 50000, min: 10000 };
        if (total > 0) return { name: "Bronze Donor", icon: "🥉", color: "#cd7f32", next: 10000, min: 0 };
        return { name: "New Donor", icon: "🌱", color: "#2ecc71", next: 1000, min: 0 };
    };
    
    const badge = getBadge(totalDonated);
    const progressPct = badge.next ? Math.min(100, Math.max(0, ((totalDonated - badge.min) / (badge.next - badge.min)) * 100)) : 100;

    return (
        <div className="fade-in" style={{ minHeight: "80vh", paddingBottom: 60 }}>
            {/* Dynamic Hero Section */}
            <div style={{ background: "linear-gradient(135deg, #0d5c35 0%, #1a7a4a 100%)", padding: "60px 20px 80px", color: "white", marginBottom: -40 }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20 }}>
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                            <div style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1.5, background: "rgba(255,255,255,0.2)", padding: "4px 10px", borderRadius: 20 }}>
                                Donor Dashboard
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(0,0,0,0.2)", padding: "4px 10px", borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
                                <span>{badge.icon}</span> <span style={{ color: badge.color }}>{badge.name}</span>
                            </div>
                        </div>
                        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, marginBottom: 8 }}>Hello, {user.user_metadata?.full_name || user.email.split('@')[0]}!</h1>
                        <p style={{ opacity: 0.85, fontSize: 16 }}>You have supported {userDonations.length} causes since joining SevaBharat.</p>
                        
                        {badge.next && (
                            <div style={{ marginTop: 24, maxWidth: 400 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6, opacity: 0.9 }}>
                                    <span>Progress to next tier</span>
                                    <span>₹{(badge.next - totalDonated).toLocaleString("en-IN")} away</span>
                                </div>
                                <div style={{ height: 6, background: "rgba(255,255,255,0.2)", borderRadius: 10, overflow: "hidden" }}>
                                    <div style={{ width: `${progressPct}%`, height: "100%", background: badge.color, borderRadius: 10, transition: "width 1s ease" }} />
                                </div>
                            </div>
                        )}
                    </div>
                    <button onClick={async () => { await supabase.auth.signOut(); navigate("home"); showNotif("Logged out successfully."); }}
                        style={{ padding: "10px 20px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.3)", color: "white", background: "transparent", fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }} className="hover-lift">
                        Sign Out
                    </button>
                </div>
            </div>

            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
                {/* Stats */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24, marginBottom: 48, position: "relative", zIndex: 10 }}>
                    {[
                        { label: "Total Contributed", value: fmtFull(totalDonated), svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>, color: COLORS.primary },
                        { label: "Donations Made", value: userDonations.length, svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/></svg>, color: "#e74c3c" },
                        { label: "Estimated Tax Benefit", value: fmtFull(taxSavings), svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>, color: "#f39c12", sub: "u/s 80G" },
                        { label: "Lives Impacted", value: userDonations.length * 12, svg: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, color: "#9b59b6" },
                    ].map(s => (
                        <div key={s.label} className="card hover-lift" style={{ padding: 28, background: "white", boxShadow: "0 10px 30px rgba(0,0,0,0.08)", border: "none" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                                <div style={{ color: s.color, background: `${s.color}15`, padding: 12, borderRadius: 12 }}>
                                    {s.svg}
                                </div>
                                {s.sub && <div style={{ fontSize: 11, fontWeight: 600, color: s.color, background: `${s.color}15`, padding: "4px 8px", borderRadius: 20 }}>{s.sub}</div>}
                            </div>
                            <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.text, marginBottom: 4 }}>{s.value}</div>
                            <div style={{ fontSize: 14, color: COLORS.textMuted, fontWeight: 500 }}>{s.label}</div>
                        </div>
                    ))}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 32, alignItems: "start" }}>
                    <div>
                        {/* Recent Donations */}
                        <div className="card" style={{ padding: 0, overflow: "hidden", marginBottom: 40, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                            <div style={{ padding: "24px 24px", borderBottom: "1px solid #f0f4f2", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div style={{ fontWeight: 700, fontSize: 18, color: COLORS.primaryDark }}>Donation History</div>
                            </div>
                            {userDonations.length > 0 ? (
                                <table style={{ margin: 0 }}>
                                    <thead>
                                        <tr style={{ background: "#f8fdfa" }}>
                                            <th style={{ padding: "16px 24px" }}>Cause & Date</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                            <th style={{ textAlign: "right", paddingRight: 24 }}>Receipt</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userDonations.map((d, i) => (
                                            <tr key={i} style={{ borderBottom: "1px solid #f0f4f2" }}>
                                                <td style={{ padding: "16px 24px" }}>
                                                    <div style={{ fontWeight: 600, color: COLORS.text, marginBottom: 4 }}>{d.cause}</div>
                                                    <div style={{ fontSize: 12, color: COLORS.textMuted }}>{d.date}</div>
                                                </td>
                                                <td style={{ fontWeight: 700, color: COLORS.primary }}>₹{d.amount.toLocaleString("en-IN")}</td>
                                                <td>
                                                    <div style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "#e8f5ee", color: COLORS.primary, padding: "4px 8px", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                        Verified
                                                    </div>
                                                </td>
                                                <td style={{ textAlign: "right", paddingRight: 24 }}>
                                                    <button onClick={() => showNotif(`80G Receipt for ₹${d.amount.toLocaleString("en-IN")} downloaded.`, "info")} 
                                                        style={{ background: "transparent", border: `1px solid ${COLORS.primary}`, color: COLORS.primary, padding: "6px 12px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6 }} className="hover-lift">
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                                                        80G
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div style={{ padding: 60, textAlign: "center", color: COLORS.textMuted }}>
                                    <div style={{ fontSize: 48, marginBottom: 16 }}>🍃</div>
                                    <h3 style={{ fontSize: 18, color: COLORS.text, marginBottom: 8 }}>No donations yet</h3>
                                    <p style={{ marginBottom: 20 }}>Your giving journey starts here. Explore causes to make an impact.</p>
                                    <button className="btn-primary" onClick={() => navigate("explore")}>Browse Causes</button>
                                </div>
                            )}
                        </div>

                        {/* Success Stories */}
                        <div style={{ marginBottom: 40 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 20 }}>
                                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: COLORS.primaryDark, margin: 0 }}>How Your Work is Going</h2>
                            </div>
                            <div style={{ display: "grid", gap: 24 }}>
                                {SUCCESS_STORIES.map(story => (
                                    <div key={story.id} className="card hover-lift" style={{ display: "flex", overflow: "hidden", padding: 0, border: "none", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
                                        <div style={{ width: 240, overflow: "hidden" }}>
                                            <img src={story.image} alt={story.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }} className="zoom-on-hover" />
                                        </div>
                                        <div style={{ padding: 24, flex: 1, display: "flex", flexDirection: "column" }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                                                <span className="tag" style={{ background: "#e8f5ee", color: COLORS.primary, fontWeight: 600 }}>{story.category} Story</span>
                                                <button onClick={() => showNotif("Shared to your network!", "info")} style={{ background: "none", border: "none", color: COLORS.textMuted, cursor: "pointer" }} title="Share Impact">
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                                                </button>
                                            </div>
                                            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: COLORS.text }}>{story.title}</h3>
                                            <p style={{ fontSize: 14, color: COLORS.textMuted, lineHeight: 1.6, marginBottom: 16, flex: 1 }}>{story.text}</p>
                                            <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.primaryDark }}>By {story.ngo}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <aside>
                        {/* Proof of Work */}
                        <div className="card" style={{ padding: 24, marginBottom: 24, border: "none", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
                            <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 20, color: COLORS.primaryDark }}>NGO Proof of Work</h3>
                            <div style={{ display: "grid", gap: 12 }}>
                                {PROOF_OF_WORK.map(item => (
                                    <div key={item.title} style={{ display: "flex", gap: 14, alignItems: "center", padding: "14px 16px", borderRadius: 12, border: "1px solid #f0f4f2", cursor: "pointer", transition: "all 0.2s", background: "white" }} className="hover-lift">
                                        <div style={{ fontSize: 24, background: "#f5f9f6", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8 }}>{item.icon}</div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text, marginBottom: 2 }}>{item.title}</div>
                                            <div style={{ fontSize: 11, color: COLORS.textMuted }}>{item.date}</div>
                                        </div>
                                        <div style={{ color: COLORS.primary }}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Impact Quote */}
                        <div style={{ background: "linear-gradient(135deg, #1a7a4a, #0d5c35)", borderRadius: 20, padding: 32, color: "white", textAlign: "center", position: "relative", overflow: "hidden" }}>
                            <div style={{ position: "absolute", top: -20, left: -20, opacity: 0.1 }}>
                                <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                            </div>
                            <div style={{ fontStyle: "italic", fontSize: 16, lineHeight: 1.6, marginBottom: 20, position: "relative", zIndex: 1 }}>
                                "Giving is not just about making a donation. It's about making a difference."
                            </div>
                            <div style={{ fontWeight: 600, fontSize: 12, textTransform: "uppercase", letterSpacing: 1, opacity: 0.9 }}>
                                — SevaBharat Community
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
            {/* Adding the style for image hover zoom here */}
            <style>{`
                .zoom-on-hover:hover { transform: scale(1.05); }
            `}</style>
        </div>
    );
}


function AdminDashboard({ adminEmail, donations, setDonations, navigate, showNotif }) {
    const [activeTab, setActiveTab] = useState("overview");
    const [campaigns, setCampaigns] = useState(CAUSES);
    const [newCampaign, setNewCampaign] = useState({ title: "", category: "Education", goal: "", description: "", ngo: "", location: "", urgent: false, image: "" });
    const [showAddCampaign, setShowAddCampaign] = useState(false);
    const [editingCampaignId, setEditingCampaignId] = useState(null);

    const totalAmount = donations.reduce((s, d) => s + d.amount, 0);
    const uniqueDonors = new Set(donations.map(d => d.email)).size;

    const tabs = [
        { id: "overview", label: "Overview", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg> },
        { id: "donors", label: "Donors", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> },
        { id: "campaigns", label: "NGO Campaigns", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> },
        { id: "analytics", label: "Analytics", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg> }
    ];

    const handleSaveCampaign = () => {
        if (!newCampaign.title || !newCampaign.goal || !newCampaign.ngo || !newCampaign.location) {
            showNotif("Please fill in all required fields (Title, NGO, Location, Goal).", "error");
            return;
        }
        
        if (editingCampaignId) {
            setCampaigns(prev => prev.map(c => c.id === editingCampaignId ? { ...c, ...newCampaign, goal: parseInt(newCampaign.goal) } : c));
            showNotif("Campaign updated successfully!");
        } else {
            const nc = { 
                ...newCampaign, 
                id: Date.now(), 
                raised: 0, 
                goal: parseInt(newCampaign.goal), 
                donors: 0, 
                image: newCampaign.image || "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80" 
            };
            setCampaigns(prev => [nc, ...prev]);
            showNotif("Campaign added successfully!");
        }
        
        setNewCampaign({ title: "", category: "Education", goal: "", description: "", ngo: "", location: "", urgent: false, image: "" });
        setShowAddCampaign(false);
        setEditingCampaignId(null);
    };

    const handleEditClick = (c) => {
        setNewCampaign({ title: c.title, category: c.category, goal: c.goal.toString(), description: c.description, ngo: c.ngo, location: c.location, urgent: c.urgent || false, image: c.image });
        setEditingCampaignId(c.id);
        setShowAddCampaign(true);
    };

    return (
        <div className="fade-in" style={{ minHeight: "80vh", background: "#f8faf9" }}>
            <div style={{ background: "linear-gradient(135deg, #0f2b1d, #1a4a32)", padding: "30px 20px" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <div style={{ width: 50, height: 50, background: "rgba(255,255,255,0.1)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "#4ade80" }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                        </div>
                        <div>
                            <div style={{ fontSize: 24, fontWeight: 700, color: "white", letterSpacing: "-0.5px" }}>Control Center</div>
                            <div style={{ fontSize: 14, color: "#86efac", opacity: 0.9 }}>Admin: {adminEmail}</div>
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: 12 }}>
                        <button className="hover-lift" onClick={() => navigate("home")}
                            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "white", padding: "10px 20px", borderRadius: 10, cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 600 }}>
                            View Site
                        </button>
                        <button className="hover-lift" onClick={async () => { await supabase.auth.signOut(); navigate("home"); showNotif("Logged out successfully."); }}
                            style={{ background: "#e74c3c", color: "white", border: "none", padding: "10px 20px", borderRadius: 10, cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 600 }}>
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div style={{ borderBottom: "1px solid #e2e8f0", background: "white", position: "sticky", top: 0, zIndex: 10 }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 8, padding: "0 20px", overflowX: "auto" }}>
                    {tabs.map(t => (
                        <button key={t.id} onClick={() => { setActiveTab(t.id); setShowAddCampaign(false); setEditingCampaignId(null); }}
                            style={{ display: "flex", alignItems: "center", gap: 8, padding: "16px 20px", background: "none", border: "none", borderBottom: `3px solid ${activeTab === t.id ? COLORS.primary : "transparent"}`, color: activeTab === t.id ? COLORS.primaryDark : COLORS.textMuted, fontWeight: activeTab === t.id ? 700 : 600, cursor: "pointer", fontFamily: "inherit", fontSize: 15, transition: "all 0.2s", whiteSpace: "nowrap" }}>
                            {t.icon}
                            {t.label}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 20px" }}>
                {/* Summary Cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, marginBottom: 32 }}>
                    {[
                        { label: "Total Raised", value: fmtFull(totalAmount), icon: "₹", color: "#10b981", bg: "#d1fae5" },
                        { label: "Total Donors", value: donations.length.toLocaleString(), icon: "👥", color: "#3b82f6", bg: "#dbeafe" },
                        { label: "Unique Supporters", value: uniqueDonors.toLocaleString(), icon: "🌟", color: "#8b5cf6", bg: "#ede9fe" },
                        { label: "Active Campaigns", value: campaigns.length, icon: "📋", color: "#f59e0b", bg: "#fef3c7" },
                    ].map(c => (
                        <div key={c.label} className="card hover-lift" style={{ padding: 24, display: "flex", alignItems: "center", gap: 16, border: "none", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
                            <div style={{ width: 54, height: 54, borderRadius: 16, background: c.bg, color: c.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700 }}>
                                {c.icon}
                            </div>
                            <div>
                                <div style={{ fontSize: 13, color: COLORS.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>{c.label}</div>
                                <div style={{ fontSize: 24, fontWeight: 800, color: COLORS.primaryDark }}>{c.value}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Overview */}
                {activeTab === "overview" && (
                    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24, alignItems: "start" }}>
                        <div className="card" style={{ padding: 24, border: "none", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                                <div style={{ fontWeight: 700, fontSize: 16, color: COLORS.primaryDark }}>Recent Transactions</div>
                                <button className="btn-outline" onClick={() => setActiveTab("donors")} style={{ padding: "6px 12px", fontSize: 13 }}>View All</button>
                            </div>
                            {donations.slice(0, 6).map((d, i) => (
                                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i !== 5 ? "1px solid #f1f5f9" : "none" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: COLORS.textMuted }}>
                                            {d.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: 14, color: COLORS.text }}>{d.name}</div>
                                            <div style={{ fontSize: 12, color: COLORS.textMuted, display: "flex", gap: 6, alignItems: "center" }}>
                                                <span>{d.date}</span> • <span>{d.cause}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: "right" }}>
                                        <div style={{ fontWeight: 700, color: COLORS.primary }}>+₹{d.amount.toLocaleString("en-IN")}</div>
                                        <div style={{ fontSize: 11, color: "#10b981", fontWeight: 600 }}>Success</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                            <div className="card" style={{ padding: 24, border: "none", boxShadow: "0 4px 15px rgba(0,0,0,0.03)", background: "linear-gradient(135deg, #1a7a4a, #0d5c35)", color: "white" }}>
                                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Quick Actions</div>
                                <div style={{ display: "grid", gap: 10 }}>
                                    <button className="hover-lift" onClick={() => showNotif("Generating Tax Report...")} style={{ background: "rgba(255,255,255,0.15)", border: "none", padding: 14, borderRadius: 10, color: "white", fontWeight: 600, textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                        Download Tax Report
                                    </button>
                                    <button className="hover-lift" onClick={() => { setActiveTab("campaigns"); setShowAddCampaign(true); }} style={{ background: "white", border: "none", padding: 14, borderRadius: 10, color: COLORS.primaryDark, fontWeight: 700, textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                        Create Campaign
                                    </button>
                                </div>
                            </div>

                            <div className="card" style={{ padding: 24, border: "none", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
                                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16, color: COLORS.primaryDark }}>Fund Distribution</div>
                                {CATEGORY_DATA.map(c => (
                                    <div key={c.cat} style={{ marginBottom: 16 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6, fontWeight: 600 }}>
                                            <span style={{ color: COLORS.text }}>{c.cat}</span>
                                            <span style={{ color: c.color }}>{c.pct}%</span>
                                        </div>
                                        <div className="progress-bar" style={{ height: 8, background: "#f1f5f9" }}>
                                            <div style={{ height: "100%", width: `${c.pct}%`, background: c.color, borderRadius: 99 }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Donors */}
                {activeTab === "donors" && (
                    <div className="card" style={{ overflow: "hidden", border: "none", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
                        <div style={{ padding: "20px 24px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", background: "white" }}>
                            <div style={{ fontWeight: 700, fontSize: 16, color: COLORS.primaryDark }}>All Donor Records ({donations.length})</div>
                            <button className="btn-outline" onClick={() => showNotif("Exporting CSV...")} style={{ padding: "8px 16px", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                Export CSV
                            </button>
                        </div>
                        <div style={{ overflowX: "auto" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", background: "white" }}>
                                <thead style={{ background: "#f8faf9", borderBottom: "2px solid #e2e8f0" }}>
                                    <tr>
                                        <th style={{ padding: "16px 24px", textAlign: "left", fontSize: 13, color: COLORS.textMuted, fontWeight: 600, textTransform: "uppercase" }}>Donor Info</th>
                                        <th style={{ padding: "16px 24px", textAlign: "left", fontSize: 13, color: COLORS.textMuted, fontWeight: 600, textTransform: "uppercase" }}>Contact</th>
                                        <th style={{ padding: "16px 24px", textAlign: "left", fontSize: 13, color: COLORS.textMuted, fontWeight: 600, textTransform: "uppercase" }}>Contribution</th>
                                        <th style={{ padding: "16px 24px", textAlign: "left", fontSize: 13, color: COLORS.textMuted, fontWeight: 600, textTransform: "uppercase" }}>Status</th>
                                        <th style={{ padding: "16px 24px", textAlign: "right", fontSize: 13, color: COLORS.textMuted, fontWeight: 600, textTransform: "uppercase" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {donations.map((d, i) => (
                                        <tr key={i} style={{ borderBottom: "1px solid #f1f5f9", transition: "background 0.2s" }} onMouseOver={e => e.currentTarget.style.background = "#f8faf9"} onMouseOut={e => e.currentTarget.style.background = "white"}>
                                            <td style={{ padding: "16px 24px" }}>
                                                <div style={{ fontWeight: 600, color: COLORS.text }}>{d.name}</div>
                                                <div style={{ fontSize: 12, color: COLORS.textMuted }}>{d.date}</div>
                                            </td>
                                            <td style={{ padding: "16px 24px" }}>
                                                <div style={{ color: COLORS.text, fontSize: 14 }}>{d.email}</div>
                                                <div style={{ fontSize: 12, color: COLORS.textMuted }}>{d.phone}</div>
                                            </td>
                                            <td style={{ padding: "16px 24px" }}>
                                                <div style={{ fontWeight: 700, color: COLORS.primaryDark }}>₹{d.amount.toLocaleString("en-IN")}</div>
                                                <div style={{ fontSize: 12, color: COLORS.textMuted }}>{d.cause}</div>
                                            </td>
                                            <td style={{ padding: "16px 24px" }}>
                                                <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 10px", background: "#d1fae5", color: "#065f46", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                                                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#059669" }} /> Completed
                                                </span>
                                            </td>
                                            <td style={{ padding: "16px 24px", textAlign: "right" }}>
                                                <button onClick={() => { setDonations(prev => prev.filter((_, idx) => idx !== i)); showNotif("Donor record removed."); }}
                                                    style={{ background: "#fef2f2", color: "#ef4444", border: "none", padding: "6px 12px", borderRadius: 6, cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 600, transition: "background 0.2s" }}>
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Campaigns */}
                {activeTab === "campaigns" && (
                    <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                            <div style={{ fontWeight: 700, fontSize: 20, color: COLORS.primaryDark }}>NGO Campaigns ({campaigns.length})</div>
                            {!showAddCampaign && (
                                <button className="btn-primary hover-lift" onClick={() => { setNewCampaign({ title: "", category: "Education", goal: "", description: "", ngo: "", location: "", urgent: false, image: "" }); setEditingCampaignId(null); setShowAddCampaign(true); }} style={{ padding: "12px 24px", fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                    Add New Campaign
                                </button>
                            )}
                        </div>

                        {showAddCampaign && (
                            <div className="card fade-in" style={{ padding: 32, marginBottom: 32, border: "none", boxShadow: "0 10px 40px rgba(0,0,0,0.08)", position: "relative" }}>
                                <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: COLORS.primary }} />
                                <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 24, color: COLORS.primaryDark }}>{editingCampaignId ? "Edit Campaign" : "Add New Campaign"}</div>
                                
                                <div style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr 1fr" }}>
                                    <div style={{ gridColumn: "1 / -1" }}>
                                        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: COLORS.textMuted, marginBottom: 6 }}>Campaign Title *</label>
                                        <input className="input-field" placeholder="E.g., Mid-Day Meals for Children" value={newCampaign.title} onChange={e => setNewCampaign(f => ({ ...f, title: e.target.value }))} style={{ background: "#f8faf9" }} />
                                    </div>
                                    
                                    <div>
                                        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: COLORS.textMuted, marginBottom: 6 }}>Partner NGO *</label>
                                        <input className="input-field" placeholder="E.g., Shiksha Foundation" value={newCampaign.ngo} onChange={e => setNewCampaign(f => ({ ...f, ngo: e.target.value }))} style={{ background: "#f8faf9" }} />
                                    </div>
                                    
                                    <div>
                                        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: COLORS.textMuted, marginBottom: 6 }}>Location *</label>
                                        <input className="input-field" placeholder="E.g., Bihar, India" value={newCampaign.location} onChange={e => setNewCampaign(f => ({ ...f, location: e.target.value }))} style={{ background: "#f8faf9" }} />
                                    </div>

                                    <div>
                                        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: COLORS.textMuted, marginBottom: 6 }}>Category</label>
                                        <select className="input-field" value={newCampaign.category} onChange={e => setNewCampaign(f => ({ ...f, category: e.target.value }))} style={{ background: "#f8faf9" }}>
                                            {Object.keys(catColors).map(c => <option key={c}>{c}</option>)}
                                        </select>
                                    </div>

                                    <div>
                                        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: COLORS.textMuted, marginBottom: 6 }}>Goal Amount (₹) *</label>
                                        <input className="input-field" type="number" placeholder="500000" value={newCampaign.goal} onChange={e => setNewCampaign(f => ({ ...f, goal: e.target.value }))} style={{ background: "#f8faf9" }} />
                                    </div>

                                    <div style={{ gridColumn: "1 / -1" }}>
                                        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: COLORS.textMuted, marginBottom: 6 }}>Image URL</label>
                                        <input className="input-field" placeholder="https://..." value={newCampaign.image} onChange={e => setNewCampaign(f => ({ ...f, image: e.target.value }))} style={{ background: "#f8faf9" }} />
                                    </div>

                                    <div style={{ gridColumn: "1 / -1" }}>
                                        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: COLORS.textMuted, marginBottom: 6 }}>Description</label>
                                        <textarea className="input-field" placeholder="Describe the impact of this campaign..." value={newCampaign.description} onChange={e => setNewCampaign(f => ({ ...f, description: e.target.value }))} style={{ height: 100, resize: "vertical", background: "#f8faf9" }} />
                                    </div>
                                    
                                    <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: 10, padding: "16px", background: "#fff5f5", borderRadius: 12, border: "1px solid #fed7d7" }}>
                                        <input type="checkbox" id="urgentCheck" checked={newCampaign.urgent} onChange={e => setNewCampaign(f => ({ ...f, urgent: e.target.checked }))} style={{ width: 18, height: 18, accentColor: "#ef4444", cursor: "pointer" }} />
                                        <label htmlFor="urgentCheck" style={{ fontWeight: 600, color: "#991b1b", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                                            🔥 Mark as Urgent Campaign
                                        </label>
                                    </div>
                                </div>
                                <div style={{ display: "flex", gap: 12, marginTop: 24, paddingTop: 24, borderTop: "1px solid #e2e8f0" }}>
                                    <button className="btn-primary hover-lift" onClick={handleSaveCampaign} style={{ fontSize: 15, padding: "12px 24px" }}>
                                        {editingCampaignId ? "Save Changes" : "Create Campaign"}
                                    </button>
                                    <button className="btn-outline hover-lift" onClick={() => { setShowAddCampaign(false); setEditingCampaignId(null); }} style={{ fontSize: 15, padding: "12px 24px" }}>Cancel</button>
                                </div>
                            </div>
                        )}

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))", gap: 24 }}>
                            {campaigns.map(c => (
                                <div key={c.id} className="card" style={{ padding: 20, display: "flex", gap: 20, alignItems: "center", border: "none", boxShadow: "0 4px 15px rgba(0,0,0,0.03)", transition: "all 0.2s" }} onMouseOver={e => e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.06)"} onMouseOut={e => e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.03)"}>
                                    <div style={{ position: "relative" }}>
                                        <img src={c.image} alt={c.title} style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 12 }} loading="lazy" />
                                        {c.urgent && <div style={{ position: "absolute", top: -8, right: -8, background: "#ef4444", color: "white", fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 10, border: "2px solid white" }}>URGENT</div>}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontSize: 12, color: COLORS.primary, fontWeight: 700, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{c.category}</div>
                                        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4, color: COLORS.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.title}</div>
                                        <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 12, display: "flex", alignItems: "center", gap: 4 }}>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                            {c.ngo} · {c.location}
                                        </div>
                                        
                                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                            <div className="progress-bar" style={{ flex: 1, height: 6, background: "#f1f5f9" }}>
                                                <div className="progress-fill" style={{ width: `${pct(c.raised, c.goal)}%`, background: catColors[c.category] || COLORS.primary }} />
                                            </div>
                                            <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.textMuted }}>
                                                {pct(c.raised, c.goal)}%
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                        <button onClick={() => handleEditClick(c)}
                                            style={{ background: "#f8faf9", color: COLORS.text, border: "1px solid #e2e8f0", padding: "8px", borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }} onMouseOver={e => { e.currentTarget.style.background = "#e8f5ee"; e.currentTarget.style.color = COLORS.primary; e.currentTarget.style.borderColor = COLORS.primary; }} onMouseOut={e => { e.currentTarget.style.background = "#f8faf9"; e.currentTarget.style.color = COLORS.text; e.currentTarget.style.borderColor = "#e2e8f0"; }}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                        </button>
                                        <button onClick={() => { setCampaigns(prev => prev.filter(x => x.id !== c.id)); showNotif("Campaign deleted."); }}
                                            style={{ background: "#f8faf9", color: COLORS.text, border: "1px solid #e2e8f0", padding: "8px", borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }} onMouseOver={e => { e.currentTarget.style.background = "#fef2f2"; e.currentTarget.style.color = "#ef4444"; e.currentTarget.style.borderColor = "#ef4444"; }} onMouseOut={e => { e.currentTarget.style.background = "#f8faf9"; e.currentTarget.style.color = COLORS.text; e.currentTarget.style.borderColor = "#e2e8f0"; }}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Analytics */}
                {activeTab === "analytics" && <AdminAnalytics />}
            </div>
        </div>
    );
}

function AdminAnalytics() {
    const canvasRef = useRef(null);
    const pieRef = useRef(null);
    const chart1 = useRef(null);
    const chart2 = useRef(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js";
        script.onload = () => {
            if (canvasRef.current && !chart1.current) {
                chart1.current = new window.Chart(canvasRef.current, {
                    type: "bar",
                    data: {
                        labels: MONTHS,
                        datasets: [{
                            label: "Donations (₹K)",
                            data: MONTHLY_DONATIONS,
                            backgroundColor: "#1a7a4a",
                            borderRadius: 6,
                            borderSkipped: false,
                        }]
                    },
                    options: {
                        responsive: true, maintainAspectRatio: false,
                        plugins: { legend: { display: false } },
                        scales: {
                            y: { beginAtZero: true, grid: { color: "#f0f4f2" }, ticks: { callback: v => "₹" + v + "K" } },
                            x: { grid: { display: false } }
                        }
                    }
                });
            }
            if (pieRef.current && !chart2.current) {
                chart2.current = new window.Chart(pieRef.current, {
                    type: "doughnut",
                    data: {
                        labels: CATEGORY_DATA.map(c => c.cat),
                        datasets: [{ data: CATEGORY_DATA.map(c => c.pct), backgroundColor: CATEGORY_DATA.map(c => c.color), borderWidth: 3, borderColor: "white" }]
                    },
                    options: {
                        responsive: true, maintainAspectRatio: false,
                        plugins: { legend: { position: "right", labels: { font: { family: "Poppins", size: 12 }, padding: 14, boxWidth: 14, boxHeight: 14 } } },
                        cutout: "65%"
                    }
                });
            }
        };
        document.head.appendChild(script);
        return () => { if (chart1.current) { chart1.current.destroy(); chart1.current = null; } if (chart2.current) { chart2.current.destroy(); chart2.current = null; } };
    }, []);

    return (
        <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
                <div className="card" style={{ padding: 24 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Monthly Donations (2025)</div>
                    <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 16 }}>₹ in thousands</div>
                    <div style={{ height: 260 }}>
                        <canvas ref={canvasRef} />
                    </div>
                </div>
                <div className="card" style={{ padding: 24 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Donations by Cause</div>
                    <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 16 }}>Category-wise distribution</div>
                    <div style={{ height: 260 }}>
                        <canvas ref={pieRef} />
                    </div>
                </div>
            </div>
            <div className="card" style={{ padding: 24, marginTop: 24 }}>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 20 }}>Campaign Performance</div>
                <div style={{ overflowX: "auto" }}>
                    <table>
                        <thead>
                            <tr><th>Campaign</th><th>Category</th><th>Raised</th><th>Goal</th><th>Progress</th><th>Donors</th></tr>
                        </thead>
                        <tbody>
                            {CAUSES.map(c => (
                                <tr key={c.id}>
                                    <td style={{ fontWeight: 600, maxWidth: 200 }}>{c.title}</td>
                                    <td><span className="tag" style={{ background: `${catColors[c.category]}18`, color: catColors[c.category] }}>{c.category}</span></td>
                                    <td style={{ fontWeight: 700, color: COLORS.primary }}>{fmt(c.raised)}</td>
                                    <td style={{ color: COLORS.textMuted }}>{fmt(c.goal)}</td>
                                    <td style={{ minWidth: 140 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                            <div className="progress-bar" style={{ flex: 1 }}>
                                                <div className="progress-fill" style={{ width: `${pct(c.raised, c.goal)}%` }} />
                                            </div>
                                            <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.primary, minWidth: 34 }}>{pct(c.raised, c.goal)}%</span>
                                        </div>
                                    </td>
                                    <td>{c.donors.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
