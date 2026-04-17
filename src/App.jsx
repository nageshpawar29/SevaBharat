import { useState, useEffect, useRef } from "react";
import { supabase } from "./supabaseClient";

const COLORS = {
    primary: "#1a7a4a",
    primaryLight: "#2ecc71",
    primaryDark: "#0d5c35",
    accent: "#f39c12",
    accentLight: "#f7c55a",
    blue: "#2980b9",
    blueLight: "#3498db",
    danger: "#e74c3c",
    bg: "#f5f9f6",
    card: "#ffffff",
    text: "#1a2e23",
    textMuted: "#5a7a65",
    border: "#d4e8da",
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

const TEAM = [
    { name: "Nagesh Pawar", role: "Founder & CEO", initials: "PN", color: "#1a7a4a" },
    { name: "Akash More", role: "Head of Operations", initials: "AM", color: "#2980b9" },
    { name: "Sangram Karanjawane", role: "Community Partnerships", initials: "SR", color: "#8e44ad" },
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
    { name: "Ravi Shankar", email: "ravi.s@gmail.com", phone: "98231XXXXX", amount: 2500, cause: "Bright Futures Education Fund", date: "2025-06-09" },
    { name: "Pooja Desai", email: "p.desai@yahoo.com", phone: "91456XXXXX", amount: 7500, cause: "Flood Relief — Assam 2025", date: "2025-06-08" },
    { name: "Kunal Kapoor", email: "kunal.kapoor@outlook.com", phone: "88990XXXXX", amount: 1500, cause: "Zero Hunger — Mid-Day Meals", date: "2025-06-07" },
    { name: "Anjali Gupta", email: "anjali.g@gmail.com", phone: "70012XXXXX", amount: 4000, cause: "Rural Health Access Initiative", date: "2025-06-06" },
    { name: "Manish Sharma", email: "m.sharma@hotmail.com", phone: "90213XXXXX", amount: 5000, cause: "Plant a Billion Trees Campaign", date: "2025-06-06" },
    { name: "Neha Verma", email: "neha.verma@gmail.com", phone: "95678XXXXX", amount: 2000, cause: "All Causes", date: "2025-06-05" },
    { name: "Sanjay Joshi", email: "sanjay.j@rediff.com", phone: "81234XXXXX", amount: 10000, cause: "Bright Futures Education Fund", date: "2025-06-04" },
    { name: "Priya Singh", email: "priya.s@yahoo.in", phone: "99887XXXXX", amount: 6000, cause: "Empowering Women Artisans", date: "2025-06-03" },
    { name: "Aditya Patil", email: "aditya.patil@gmail.com", phone: "77654XXXXX", amount: 3000, cause: "Flood Relief — Assam 2025", date: "2025-06-02" },
    { name: "Kavita Nair", email: "kavita.nair@outlook.com", phone: "91029XXXXX", amount: 4500, cause: "Rural Health Access Initiative", date: "2025-06-01" },
    { name: "Tarun Kumar", email: "tarun.k@gmail.com", phone: "80099XXXXX", amount: 2000, cause: "Plant a Billion Trees Campaign", date: "2025-05-30" },
    { name: "Deepa Reddy", email: "deepa.r@yahoo.com", phone: "94567XXXXX", amount: 8000, cause: "Zero Hunger — Mid-Day Meals", date: "2025-05-29" },
    { name: "Rajesh Iyer", email: "rajesh.iyer@gmail.com", phone: "93210XXXXX", amount: 5000, cause: "All Causes", date: "2025-05-28" },
    { name: "Swati Mishra", email: "swati.m@hotmail.com", phone: "87878XXXXX", amount: 15000, cause: "Bright Futures Education Fund", date: "2025-05-27" },
    { name: "Nitin Bhasin", email: "nitin.b@gmail.com", phone: "99001XXXXX", amount: 2500, cause: "Empowering Women Artisans", date: "2025-05-26" },
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
    const [adminForm, setAdminForm] = useState({ u: "", p: "" });
    const [adminError, setAdminError] = useState("");
    const [donations, setDonations] = useState(DONOR_LOG); // Start with local data to prevent white screen
    const [notification, setNotification] = useState(null);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

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
                console.warn('Supabase not initialized yet. Using local data.');
            }
        };
        fetchDonations();
    }, []);

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
        <div style={{ fontFamily: "'Poppins', 'Segoe UI', sans-serif", background: COLORS.bg, minHeight: "100vh", color: COLORS.text }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { color: inherit; text-decoration: none; }
        button { cursor: pointer; font-family: inherit; border: none; outline: none; }
        input, select, textarea { font-family: inherit; }
        .hover-lift { transition: transform 0.2s, box-shadow 0.2s; }
        .hover-lift:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.12) !important; }
        .btn-primary { background: linear-gradient(135deg, #1a7a4a, #2ecc71); color: white; border-radius: 8px; padding: 12px 24px; font-weight: 600; font-size: 15px; transition: all 0.2s; }
        .btn-primary:hover { opacity: 0.92; transform: translateY(-1px); }
        .btn-outline { background: transparent; border: 2px solid #1a7a4a; color: #1a7a4a; border-radius: 8px; padding: 10px 22px; font-weight: 600; font-size: 14px; transition: all 0.2s; }
        .btn-outline:hover { background: #1a7a4a; color: white; }
        .card { background: white; border-radius: 16px; box-shadow: 0 2px 16px rgba(0,0,0,0.07); }
        .progress-bar { background: #e8f5ee; border-radius: 99px; height: 8px; overflow: hidden; }
        .progress-fill { height: 100%; border-radius: 99px; background: linear-gradient(90deg, #1a7a4a, #2ecc71); transition: width 0.8s ease; }
        .tag { display: inline-block; padding: 3px 10px; border-radius: 99px; font-size: 12px; font-weight: 600; }
        .urgent-badge { background: #fef0ef; color: #c0392b; }
        .input-field { width: 100%; padding: 12px 16px; border: 1.5px solid #d4e8da; border-radius: 10px; font-size: 15px; transition: border-color 0.2s; outline: none; background: white; }
        .input-field:focus { border-color: #1a7a4a; }
        .hero-bg { background: linear-gradient(135deg, #0d5c35 0%, #1a7a4a 40%, #27ae60 100%); }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.5s ease forwards; }
        @keyframes countUp { from { opacity: 0; } to { opacity: 1; } }
        .notif { position: fixed; top: 80px; right: 20px; z-index: 9999; padding: 14px 24px; border-radius: 12px; font-weight: 500; font-size: 14px; box-shadow: 0 8px 24px rgba(0,0,0,0.15); animation: fadeIn 0.3s ease; max-width: 360px; }
        .notif-success { background: #1a7a4a; color: white; }
        .notif-error { background: #e74c3c; color: white; }
        .stat-card { text-align: center; }
        .stat-num { font-family: 'Playfair Display', serif; font-size: 42px; font-weight: 700; color: white; line-height: 1; }
        .stat-label { font-size: 14px; color: rgba(255,255,255,0.8); margin-top: 6px; }
        .section-title { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 700; color: #1a2e23; }
        .section-sub { font-size: 16px; color: #5a7a65; margin-top: 8px; }
        @media (max-width: 768px) {
          .section-title { font-size: 26px; }
          .stat-num { font-size: 30px; }
          .hero-title { font-size: 32px !important; }
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 769px) { .mobile-menu-btn { display: none !important; } }
        .chip { padding: 8px 18px; border-radius: 99px; font-size: 14px; font-weight: 500; cursor: pointer; border: 1.5px solid; transition: all 0.18s; }
        .chip-active { background: #1a7a4a; color: white; border-color: #1a7a4a; }
        .chip-inactive { background: white; color: #1a7a4a; border-color: #d4e8da; }
        .chip-inactive:hover { border-color: #1a7a4a; }
        table { border-collapse: collapse; width: 100%; }
        th { text-align: left; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #5a7a65; padding: 10px 14px; background: #f5f9f6; }
        td { padding: 12px 14px; font-size: 14px; border-top: 1px solid #f0f4f2; }
        tr:hover td { background: #f9fdfb; }
        .award-card { border-radius: 16px; padding: 24px; background: white; box-shadow: 0 2px 16px rgba(0,0,0,0.07); border-left: 4px solid #1a7a4a; transition: all 0.2s; }
        .award-card:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(0,0,0,0.12); }
      `}</style>

            {/* Notification */}
            {notification && (
                <div className={`notif notif-${notification.type}`}>{notification.msg}</div>
            )}

            {/* Navbar */}
            <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div onClick={() => navigate("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#1a7a4a,#2ecc71)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🌿</div>
                        <div>
                            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 18, color: COLORS.primary, lineHeight: 1.1 }}>SevaBharat</div>
                            <div style={{ fontSize: 10, color: COLORS.textMuted, letterSpacing: "0.5px" }}>NGO GIVING PLATFORM</div>
                        </div>
                    </div>
                    <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        {navLinks.map(l => (
                            <button key={l.key} onClick={() => navigate(l.key)}
                                style={{ padding: "8px 14px", borderRadius: 8, background: page === l.key ? "#e8f5ee" : "transparent", color: page === l.key ? COLORS.primary : COLORS.textMuted, fontWeight: page === l.key ? 600 : 400, fontSize: 14, transition: "all 0.2s" }}>
                                {l.label}
                            </button>
                        ))}
                        <button className="btn-primary" onClick={() => navigate("donate")} style={{ marginLeft: 8, padding: "9px 20px", fontSize: 14 }}>Donate Now</button>
                        <button onClick={() => navigate("admin-login")} style={{ marginLeft: 4, padding: "9px 14px", borderRadius: 8, background: "#f0f4f2", color: COLORS.textMuted, fontSize: 13, fontWeight: 500 }}>Admin</button>
                    </div>
                    <button className="mobile-menu-btn" onClick={() => setShowMobileMenu(!showMobileMenu)}
                        style={{ background: "none", border: "none", fontSize: 24, color: COLORS.text, display: "none", flexDirection: "column", gap: 5, padding: 8 }}>
                        <div style={{ width: 22, height: 2, background: COLORS.text, borderRadius: 2 }} />
                        <div style={{ width: 22, height: 2, background: COLORS.text, borderRadius: 2 }} />
                        <div style={{ width: 22, height: 2, background: COLORS.text, borderRadius: 2 }} />
                    </button>
                </div>
                {showMobileMenu && (
                    <div style={{ background: "white", borderTop: "1px solid #f0f4f2", padding: "12px 20px" }}>
                        {navLinks.map(l => (
                            <button key={l.key} onClick={() => navigate(l.key)}
                                style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 0", background: "none", color: page === l.key ? COLORS.primary : COLORS.text, fontWeight: page === l.key ? 600 : 400, fontSize: 15, borderBottom: "1px solid #f5f5f5" }}>
                                {l.label}
                            </button>
                        ))}
                        <button className="btn-primary" onClick={() => navigate("donate")} style={{ marginTop: 12, width: "100%" }}>Donate Now</button>
                    </div>
                )}
            </nav>

            {/* Pages */}
            {page === "home" && <HomePage navigate={navigate} totalRaised={totalRaised} totalDonors={totalDonors} />}
            {page === "explore" && <ExplorePage navigate={navigate} filterCat={filterCat} setFilterCat={setFilterCat} />}
            {page === "donate" && <DonatePage navigate={navigate} causeData={donationCause} donations={donations} setDonations={setDonations} showNotif={showNotif} />}
            {page === "about" && <AboutPage />}
            {page === "awards" && <AwardsPage />}
            {page === "admin-login" && <AdminLogin adminForm={adminForm} setAdminForm={setAdminForm} adminError={adminError} setAdminError={setAdminError} setAdminAuth={setAdminAuth} navigate={navigate} />}
            {page === "admin" && adminAuth && <AdminDashboard donations={donations} setDonations={setDonations} navigate={navigate} showNotif={showNotif} />}
            {page === "admin" && !adminAuth && <AdminLogin adminForm={adminForm} setAdminForm={setAdminForm} adminError={adminError} setAdminError={setAdminError} setAdminAuth={setAdminAuth} navigate={navigate} />}

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

function HomePage({ navigate, totalRaised, totalDonors }) {
    const featured = CAUSES.filter(c => c.id !== 6).slice(0, 4);

    return (
        <div className="fade-in">
            {/* Hero */}
            <div className="hero-bg" style={{ padding: "80px 20px", textAlign: "center" }}>
                <div style={{ maxWidth: 800, margin: "0 auto" }}>
                    <div style={{ display: "inline-block", background: "rgba(255,255,255,0.15)", borderRadius: 99, padding: "6px 18px", fontSize: 13, color: "rgba(255,255,255,0.9)", marginBottom: 20, fontWeight: 500 }}>
                        🌿 India's Most Trusted NGO Giving Platform
                    </div>
                    <h1 className="hero-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: 52, fontWeight: 700, color: "white", lineHeight: 1.2, marginBottom: 20 }}>
                        Together We Can<br />
                        <span style={{ color: "#a8edca" }}>Change India</span>
                    </h1>
                    <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", marginBottom: 36, lineHeight: 1.7 }}>
                        Your donation reaches verified NGOs working in education, healthcare, disaster relief, hunger, and the environment. Transparent. Impactful. Accountable.
                    </p>
                    <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                        <button className="btn-primary" onClick={() => navigate("donate")}
                            style={{ padding: "15px 36px", fontSize: 17, background: "white", color: COLORS.primary, borderRadius: 10 }}>
                            💚 Donate Now
                        </button>
                        <button onClick={() => navigate("explore")}
                            style={{ padding: "15px 36px", fontSize: 17, background: "rgba(255,255,255,0.15)", color: "white", borderRadius: 10, border: "2px solid rgba(255,255,255,0.4)", cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>
                            Explore Causes →
                        </button>
                    </div>
                    {/* Stats */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 20, marginTop: 56, padding: "28px 24px", background: "rgba(0,0,0,0.2)", borderRadius: 16 }}>
                        {[
                            { num: "₹4.7Cr+", label: "Total Raised" },
                            { num: "12,600+", label: "Donors" },
                            { num: "48,000+", label: "Lives Impacted" },
                            { num: "6", label: "Cause Categories" },
                        ].map(s => (
                            <div key={s.label} className="stat-card">
                                <div className="stat-num">{s.num}</div>
                                <div className="stat-label">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Categories strip */}
            <div style={{ background: "white", padding: "20px", borderBottom: "1px solid #eee" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 12, overflowX: "auto", paddingBottom: 4 }}>
                    {Object.entries(catColors).map(([cat, col]) => (
                        <button key={cat} onClick={() => navigate("explore")}
                            style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 99, border: `1.5px solid ${col}20`, background: `${col}10`, color: col, fontWeight: 600, fontSize: 13, whiteSpace: "nowrap", cursor: "pointer", fontFamily: "inherit" }}>
                            {cat === "Education" ? "📚" : cat === "Healthcare" ? "🏥" : cat === "Disaster Relief" ? "🆘" : cat === "Hunger & Poverty" ? "🍚" : "🌳"} {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Featured Causes */}
            <div style={{ maxWidth: 1200, margin: "60px auto", padding: "0 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
                    <div>
                        <div className="section-title">Featured Causes</div>
                        <div className="section-sub">Every cause is verified. Every rupee is tracked.</div>
                    </div>
                    <button className="btn-outline" onClick={() => navigate("explore")}>View All →</button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
                    {featured.map(c => <CauseCard key={c.id} cause={c} navigate={navigate} />)}
                </div>
            </div>

            {/* How it Works */}
            <div style={{ background: "white", padding: "60px 20px" }}>
                <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
                    <div className="section-title">How It Works</div>
                    <div className="section-sub" style={{ marginBottom: 40 }}>Simple, transparent, and secure donation process</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 24 }}>
                        {[
                            { step: "1", icon: "🔍", title: "Choose a Cause", desc: "Browse verified NGOs across 6 impact areas" },
                            { step: "2", icon: "💳", title: "Donate Securely", desc: "Pay via UPI, card, or net banking — 100% secure" },
                            { step: "3", icon: "📊", title: "Track Impact", desc: "Get real-time updates on how your donation helps" },
                            { step: "4", icon: "📜", title: "Get 80G Receipt", desc: "Instant tax exemption certificate to your email" },
                        ].map(s => (
                            <div key={s.step} style={{ padding: 24, borderRadius: 16, background: "#f5f9f6", textAlign: "center" }}>
                                <div style={{ fontSize: 36, marginBottom: 12 }}>{s.icon}</div>
                                <div style={{ fontWeight: 700, color: COLORS.primary, fontSize: 13, marginBottom: 6 }}>STEP {s.step}</div>
                                <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>{s.title}</div>
                                <div style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.6 }}>{s.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Impact Banner */}
            <div style={{ background: "linear-gradient(135deg, #1a7a4a, #0d5c35)", padding: "60px 20px", textAlign: "center" }}>
                <div style={{ maxWidth: 700, margin: "0 auto" }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: "white", marginBottom: 16 }}>
                        "A single donation can light up an entire classroom."
                    </div>
                    <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 15, marginBottom: 32 }}>Join 12,600+ donors transforming India one rupee at a time.</div>
                    <button className="btn-primary" onClick={() => navigate("donate")}
                        style={{ background: "white", color: COLORS.primary, padding: "15px 36px", fontSize: 16 }}>
                        Start Giving Today
                    </button>
                </div>
            </div>

            {/* Trusted By */}
            <div style={{ padding: "40px 20px", background: "#f5f9f6", textAlign: "center" }}>
                <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 20, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Trusted & Certified By</div>
                <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap", alignItems: "center" }}>
                    {["GuideStar India", "NASSCOM Foundation", "UN SDGs", "80G Exempt", "FCRA Registered"].map(org => (
                        <div key={org} style={{ padding: "10px 20px", background: "white", borderRadius: 10, fontSize: 14, fontWeight: 600, color: COLORS.textMuted, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                            {org}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function CauseCard({ cause, navigate }) {
    const p = pct(cause.raised, cause.goal);
    const catColor = catColors[cause.category] || COLORS.primary;
    return (
        <div className="card hover-lift" style={{ overflow: "hidden", cursor: "pointer" }} onClick={() => navigate("donate", cause)}>
            <div style={{ position: "relative" }}>
                <img src={cause.image} alt={cause.title} style={{ width: "100%", height: 190, objectFit: "cover", display: "block" }} loading="lazy" />
                <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 6 }}>
                    <span className="tag" style={{ background: `${catColor}22`, color: catColor }}>{cause.category}</span>
                    {cause.urgent && <span className="tag urgent-badge">🔥 Urgent</span>}
                </div>
            </div>
            <div style={{ padding: "18px 20px" }}>
                <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 4, fontWeight: 500 }}>{cause.ngo} · {cause.location}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, lineHeight: 1.4 }}>{cause.title}</h3>
                <p style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.6, marginBottom: 16, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{cause.description}</p>
                <div className="progress-bar" style={{ marginBottom: 10 }}>
                    <div className="progress-fill" style={{ width: `${p}%` }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                    <div>
                        <span style={{ fontWeight: 700, color: COLORS.primary }}>{fmt(cause.raised)}</span>
                        <span style={{ color: COLORS.textMuted }}> of {fmt(cause.goal)}</span>
                    </div>
                    <div style={{ color: COLORS.textMuted }}>{cause.donors.toLocaleString()} donors</div>
                </div>
                <div style={{ marginTop: 4, fontSize: 12, fontWeight: 600, color: catColor }}>{p}% Funded</div>
                <button className="btn-primary" style={{ width: "100%", marginTop: 14, padding: "11px" }} onClick={e => { e.stopPropagation(); navigate("donate", cause); }}>
                    Donate to This Cause
                </button>
            </div>
        </div>
    );
}

function ExplorePage({ navigate, filterCat, setFilterCat }) {
    const cats = ["All", ...Object.keys(catColors)];
    const filtered = filterCat === "All" ? CAUSES : CAUSES.filter(c => c.category === filterCat);

    return (
        <div className="fade-in" style={{ maxWidth: 1200, margin: "40px auto", padding: "0 20px" }}>
            <div style={{ marginBottom: 32 }}>
                <div className="section-title">Explore Causes</div>
                <div className="section-sub">Browse all verified NGO campaigns and find your cause</div>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
                {cats.map(c => (
                    <button key={c} className={`chip ${filterCat === c ? "chip-active" : "chip-inactive"}`} onClick={() => setFilterCat(c)}>
                        {c}
                    </button>
                ))}
            </div>
            <div style={{ fontSize: 14, color: COLORS.textMuted, marginBottom: 20 }}>Showing {filtered.length} cause{filtered.length !== 1 ? "s" : ""}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
                {filtered.map(c => <CauseCard key={c.id} cause={c} navigate={navigate} />)}
            </div>
            <div style={{ marginTop: 48, padding: 32, background: "linear-gradient(135deg, #e8f5ee, #d1eedd)", borderRadius: 20, textAlign: "center" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: COLORS.primaryDark, marginBottom: 10 }}>Can't decide? Donate to All Causes</div>
                <div style={{ color: COLORS.textMuted, marginBottom: 24 }}>Your donation will be distributed across all 6 sectors based on urgent need.</div>
                <button className="btn-primary" onClick={() => navigate("donate", null)} style={{ padding: "14px 36px", fontSize: 16 }}>
                    Donate to All Causes
                </button>
            </div>
        </div>
    );
}

function DonatePage({ navigate, causeData, donations, setDonations, showNotif }) {
    const [form, setForm] = useState({ name: "", email: "", phone: "", amount: "", custom: "", cause: causeData ? causeData.title : "All Causes" });
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const presets = [500, 1000, 2000, 5000, 10000];

    const selectedCause = causeData || { title: "All Causes", description: "Your donation will be split across all 6 cause categories.", image: null };
    const finalAmount = form.amount || form.custom;

    const handleSubmit = () => {
        if (!form.name || !form.email || !form.phone || !finalAmount) {
            showNotif("Please fill in all required fields.", "error");
            return;
        }
        if (!/^\d{10}$/.test(form.phone)) {
            showNotif("Please enter a valid 10-digit mobile number.", "error");
            return;
        }
        setLoading(true);
        const newDonor = {
            name: form.name, 
            email: form.email, 
            phone: form.phone,
            amount: parseInt(finalAmount), 
            cause: form.cause,
            date: new Date().toISOString().split("T")[0]
        };

        const saveDonation = async () => {
            const { data, error } = await supabase
                .from('donations')
                .insert([newDonor])
                .select();

            if (error) {
                console.error('Error saving donation:', error);
                showNotif(`Storage Error: ${error.message}`, "error");
                setDonations(prev => [newDonor, ...prev]);
            } else {
                setDonations(prev => [newDonor, ...prev]);
            }
            setLoading(false);
            setSubmitted(true);
        };

        saveDonation();
    };

    if (submitted) {
        return (
            <div className="fade-in" style={{ maxWidth: 600, margin: "60px auto", padding: "0 20px", textAlign: "center" }}>
                <div className="card" style={{ padding: 48 }}>
                    <div style={{ fontSize: 64, marginBottom: 20 }}>💚</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, color: COLORS.primary, marginBottom: 12 }}>Thank You, {form.name}!</div>
                    <div style={{ color: COLORS.textMuted, fontSize: 16, lineHeight: 1.7, marginBottom: 24 }}>
                        Your donation of <strong style={{ color: COLORS.primary }}>{fmtFull(parseInt(finalAmount))}</strong> to <strong>{form.cause}</strong> has been received. An 80G receipt will be sent to {form.email}.
                    </div>
                    <div style={{ background: "#f5f9f6", borderRadius: 12, padding: "16px 24px", marginBottom: 32, fontSize: 14, color: COLORS.textMuted }}>
                        🔖 Transaction Ref: SB{Date.now().toString().slice(-8)}
                    </div>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <button className="btn-primary" onClick={() => { setSubmitted(false); navigate("home"); }}>Back to Home</button>
                        <button className="btn-outline" onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", amount: "", custom: "", cause: "All Causes" }); }}>Donate Again</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fade-in" style={{ maxWidth: 1000, margin: "40px auto", padding: "0 20px" }}>
            <div className="section-title" style={{ marginBottom: 8 }}>Make a Donation</div>
            <div className="section-sub" style={{ marginBottom: 32 }}>100% of your donation reaches the cause. Zero platform fee.</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 28, alignItems: "start" }}>
                <div>
                    {/* Cause selection */}
                    <div className="card" style={{ padding: 24, marginBottom: 24 }}>
                        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Donating To</div>
                        <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
                            <button onClick={() => setForm(f => ({ ...f, cause: "All Causes" }))}
                                style={{ padding: "10px 16px", borderRadius: 10, border: `2px solid ${form.cause === "All Causes" ? COLORS.primary : "#e0e0e0"}`, background: form.cause === "All Causes" ? "#e8f5ee" : "white", color: form.cause === "All Causes" ? COLORS.primary : "#888", fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>
                                🌐 All Causes
                            </button>
                            {CAUSES.map(c => (
                                <button key={c.id} onClick={() => setForm(f => ({ ...f, cause: c.title }))}
                                    style={{ padding: "10px 16px", borderRadius: 10, border: `2px solid ${form.cause === c.title ? COLORS.primary : "#e0e0e0"}`, background: form.cause === c.title ? "#e8f5ee" : "white", color: form.cause === c.title ? COLORS.primary : "#888", fontWeight: 500, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
                                    {c.title}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Amount */}
                    <div className="card" style={{ padding: 24, marginBottom: 24 }}>
                        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Choose Amount</div>
                        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
                            {presets.map(p => (
                                <button key={p} onClick={() => setForm(f => ({ ...f, amount: p.toString(), custom: "" }))}
                                    style={{ padding: "12px 20px", borderRadius: 10, border: `2px solid ${form.amount === p.toString() ? COLORS.primary : "#e0e0e0"}`, background: form.amount === p.toString() ? "#e8f5ee" : "white", color: form.amount === p.toString() ? COLORS.primary : COLORS.text, fontWeight: 600, fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}>
                                    ₹{p.toLocaleString("en-IN")}
                                </button>
                            ))}
                        </div>
                        <input className="input-field" type="number" placeholder="Enter custom amount (₹)"
                            value={form.custom}
                            onChange={e => setForm(f => ({ ...f, custom: e.target.value, amount: "" }))} />
                        {finalAmount && (
                            <div style={{ marginTop: 12, fontSize: 14, color: COLORS.primary, fontWeight: 600 }}>
                                Selected: {fmtFull(parseInt(finalAmount))}
                                <span style={{ color: COLORS.textMuted, fontWeight: 400 }}> — approx. tax benefit: {fmtFull(Math.round(parseInt(finalAmount) * 0.5))} (50% of donation u/s 80G)</span>
                            </div>
                        )}
                    </div>

                    {/* Personal Details */}
                    <div className="card" style={{ padding: 24, marginBottom: 24 }}>
                        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Your Details</div>
                        <div style={{ display: "grid", gap: 14 }}>
                            <input className="input-field" placeholder="Full Name *" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                            <input className="input-field" type="email" placeholder="Email Address *" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                            <input className="input-field" type="tel" placeholder="Mobile Number (10 digits) *" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value.replace(/\D/g, "").slice(0, 10) }))} />
                        </div>
                    </div>

                    <button className="btn-primary" onClick={handleSubmit} disabled={loading}
                        style={{ width: "100%", padding: 16, fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                        {loading ? (
                            <>
                                <div style={{ width: 20, height: 20, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "white", animation: "spin 0.8s linear infinite" }} />
                                Processing…
                            </>
                        ) : (
                            `💚 Donate ${finalAmount ? fmtFull(parseInt(finalAmount)) : "Now"}`
                        )}
                    </button>
                    <div style={{ textAlign: "center", marginTop: 12, fontSize: 12, color: COLORS.textMuted }}>🔒 SSL Secured · RBI Compliant · 80G Tax Receipt</div>
                </div>

                {/* Sidebar */}
                <div>
                    {causeData && (
                        <div className="card" style={{ overflow: "hidden", marginBottom: 20 }}>
                            <img src={causeData.image} alt={causeData.title} style={{ width: "100%", height: 160, objectFit: "cover" }} loading="lazy" />
                            <div style={{ padding: 20 }}>
                                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{causeData.title}</div>
                                <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 10 }}>{causeData.ngo} · {causeData.location}</div>
                                <div className="progress-bar" style={{ marginBottom: 8 }}>
                                    <div className="progress-fill" style={{ width: `${pct(causeData.raised, causeData.goal)}%` }} />
                                </div>
                                <div style={{ fontSize: 13, display: "flex", justifyContent: "space-between" }}>
                                    <span style={{ fontWeight: 700, color: COLORS.primary }}>{fmt(causeData.raised)} raised</span>
                                    <span style={{ color: COLORS.textMuted }}>{pct(causeData.raised, causeData.goal)}%</span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="card" style={{ padding: 20 }}>
                        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Why Trust Us</div>
                        {[
                            { icon: "✅", text: "All NGOs verified by GuideStar India" },
                            { icon: "📊", text: "Real-time fund tracking dashboard" },
                            { icon: "🏛️", text: "FCRA registered & 80G certified" },
                            { icon: "📸", text: "Photo & video proof of impact" },
                            { icon: "🔒", text: "Bank-grade data encryption" },
                        ].map(t => (
                            <div key={t.text} style={{ display: "flex", gap: 10, marginBottom: 12, fontSize: 13 }}>
                                <span>{t.icon}</span>
                                <span style={{ color: COLORS.textMuted, lineHeight: 1.5 }}>{t.text}</span>
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

                {/* Team */}
                <div>
                    <div className="section-title" style={{ textAlign: "center", marginBottom: 8 }}>Meet the Team</div>
                    <div className="section-sub" style={{ textAlign: "center", marginBottom: 40 }}>Passionate people committed to India's transformation</div>
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 24 }}>
                        {TEAM.map(t => (
                            <div key={t.name} className="card hover-lift" style={{ padding: 28, textAlign: "center" }}>
                                <div style={{ width: 70, height: 70, borderRadius: "50%", background: `${t.color}22`, border: `3px solid ${t.color}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontWeight: 700, fontSize: 22, color: t.color }}>
                                    {t.initials}
                                </div>
                                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{t.name}</div>
                                <div style={{ fontSize: 13, color: COLORS.textMuted }}>{t.role}</div>
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

function AdminLogin({ adminForm, setAdminForm, adminError, setAdminError, setAdminAuth, navigate }) {
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setLoading(true);
        setTimeout(() => {
            if (adminForm.u === "admin" && adminForm.p === "seva@2025") {
                setAdminAuth(true);
                navigate("admin");
                setAdminError("");
            } else {
                setAdminError("Invalid credentials. Hint: admin / seva@2025");
            }
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="fade-in" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
            <div className="card" style={{ width: "100%", maxWidth: 400, padding: 40 }}>
                <div style={{ textAlign: "center", marginBottom: 32 }}>
                    <div style={{ width: 60, height: 60, borderRadius: 16, background: "linear-gradient(135deg,#1a7a4a,#2ecc71)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 16px" }}>🔐</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, marginBottom: 6 }}>Admin Portal</div>
                    <div style={{ fontSize: 14, color: COLORS.textMuted }}>SevaBharat Management Console</div>
                </div>
                <div style={{ display: "grid", gap: 14 }}>
                    <input className="input-field" placeholder="Username" value={adminForm.u}
                        onChange={e => setAdminForm(f => ({ ...f, u: e.target.value }))}
                        onKeyDown={e => e.key === "Enter" && handleLogin()} />
                    <input className="input-field" type="password" placeholder="Password" value={adminForm.p}
                        onChange={e => setAdminForm(f => ({ ...f, p: e.target.value }))}
                        onKeyDown={e => e.key === "Enter" && handleLogin()} />
                    {adminError && <div style={{ background: "#fef0ef", border: "1px solid #f5c6c2", borderRadius: 8, padding: "10px 14px", color: "#c0392b", fontSize: 13 }}>{adminError}</div>}
                    <button className="btn-primary" onClick={handleLogin} disabled={loading} style={{ padding: 14, fontSize: 16 }}>
                        {loading ? "Verifying…" : "Sign In to Dashboard"}
                    </button>
                </div>
                <div style={{ textAlign: "center", marginTop: 20, fontSize: 12, color: COLORS.textMuted }}>
                    JWT Authentication · Secure Session · Role-Based Access
                </div>
            </div>
        </div>
    );
}

function AdminDashboard({ donations, setDonations, navigate, showNotif }) {
    const [activeTab, setActiveTab] = useState("overview");
    const [campaigns, setCampaigns] = useState(CAUSES);
    const [newCampaign, setNewCampaign] = useState({ title: "", category: "Education", goal: "", description: "" });
    const [showAddCampaign, setShowAddCampaign] = useState(false);

    const totalAmount = donations.reduce((s, d) => s + d.amount, 0);
    const uniqueDonors = new Set(donations.map(d => d.email)).size;

    const tabs = ["overview", "donors", "campaigns", "analytics"];

    return (
        <div className="fade-in" style={{ minHeight: "80vh" }}>
            <div style={{ background: "linear-gradient(135deg, #0d1f15, #1a3d26)", padding: "24px 20px" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: "white" }}>Admin Dashboard</div>
                        <div style={{ fontSize: 13, color: "#7a9e87" }}>SevaBharat Management Portal</div>
                    </div>
                    <button onClick={() => navigate("home")}
                        style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "white", padding: "9px 18px", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontSize: 14 }}>
                        ← Back to Site
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div style={{ background: "#f5f9f6", padding: "24px 20px 0" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 24 }}>
                        {[
                            { label: "Total Donations", value: fmtFull(totalAmount), icon: "💰", color: "#1a7a4a" },
                            { label: "Total Donors", value: donations.length, icon: "👥", color: "#2980b9" },
                            { label: "Unique Donors", value: uniqueDonors, icon: "🌟", color: "#8e44ad" },
                            { label: "Active Campaigns", value: campaigns.length, icon: "📋", color: "#e67e22" },
                        ].map(c => (
                            <div key={c.label} className="card" style={{ padding: "20px 22px", display: "flex", alignItems: "center", gap: 14 }}>
                                <div style={{ fontSize: 28 }}>{c.icon}</div>
                                <div>
                                    <div style={{ fontSize: 22, fontWeight: 700, color: c.color }}>{c.value}</div>
                                    <div style={{ fontSize: 12, color: COLORS.textMuted, fontWeight: 500 }}>{c.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Tabs */}
                    <div style={{ display: "flex", gap: 4, borderBottom: "1px solid #e0e0e0" }}>
                        {tabs.map(t => (
                            <button key={t} onClick={() => setActiveTab(t)}
                                style={{ padding: "12px 20px", background: "none", border: "none", borderBottom: `3px solid ${activeTab === t ? COLORS.primary : "transparent"}`, color: activeTab === t ? COLORS.primary : COLORS.textMuted, fontWeight: activeTab === t ? 700 : 400, cursor: "pointer", fontFamily: "inherit", fontSize: 14, textTransform: "capitalize" }}>
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 20px" }}>
                {/* Overview */}
                {activeTab === "overview" && (
                    <div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
                            <div className="card" style={{ padding: 24 }}>
                                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16, color: COLORS.primaryDark }}>Recent Donations</div>
                                {donations.slice(0, 5).map((d, i) => (
                                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f0f4f2" }}>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: 14 }}>{d.name}</div>
                                            <div style={{ fontSize: 12, color: COLORS.textMuted }}>{d.cause}</div>
                                        </div>
                                        <div style={{ fontWeight: 700, color: COLORS.primary }}>₹{d.amount.toLocaleString("en-IN")}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="card" style={{ padding: 24 }}>
                                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16, color: COLORS.primaryDark }}>Category Distribution</div>
                                {CATEGORY_DATA.map(c => (
                                    <div key={c.cat} style={{ marginBottom: 14 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 5 }}>
                                            <span style={{ fontWeight: 500 }}>{c.cat}</span>
                                            <span style={{ color: COLORS.textMuted }}>{c.pct}%</span>
                                        </div>
                                        <div className="progress-bar">
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
                    <div className="card" style={{ overflow: "auto" }}>
                        <div style={{ padding: "20px 24px", borderBottom: "1px solid #f0f4f2", fontWeight: 700, fontSize: 15 }}>
                            All Donors ({donations.length})
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th><th>Email</th><th>Phone</th><th>Amount</th><th>Cause</th><th>Date</th><th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donations.map((d, i) => (
                                    <tr key={i}>
                                        <td style={{ fontWeight: 600 }}>{d.name}</td>
                                        <td style={{ color: COLORS.textMuted }}>{d.email}</td>
                                        <td>{d.phone}</td>
                                        <td style={{ fontWeight: 700, color: COLORS.primary }}>₹{d.amount.toLocaleString("en-IN")}</td>
                                        <td><span className="tag" style={{ background: "#e8f5ee", color: COLORS.primary, fontSize: 12 }}>{d.cause}</span></td>
                                        <td style={{ color: COLORS.textMuted }}>{d.date}</td>
                                        <td>
                                            <button onClick={() => { setDonations(prev => prev.filter((_, idx) => idx !== i)); showNotif("Donor record removed."); }}
                                                style={{ background: "#fef0ef", color: "#c0392b", border: "none", padding: "5px 12px", borderRadius: 6, cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: 600 }}>
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Campaigns */}
                {activeTab === "campaigns" && (
                    <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                            <div style={{ fontWeight: 700, fontSize: 16 }}>NGO Campaigns ({campaigns.length})</div>
                            <button className="btn-primary" onClick={() => setShowAddCampaign(!showAddCampaign)} style={{ padding: "10px 20px", fontSize: 14 }}>
                                + Add Campaign
                            </button>
                        </div>

                        {showAddCampaign && (
                            <div className="card" style={{ padding: 24, marginBottom: 24, border: `2px solid ${COLORS.primary}` }}>
                                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>Add New Campaign</div>
                                <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
                                    <input className="input-field" placeholder="Campaign Title" value={newCampaign.title} onChange={e => setNewCampaign(f => ({ ...f, title: e.target.value }))} style={{ gridColumn: "1 / -1" }} />
                                    <select className="input-field" value={newCampaign.category} onChange={e => setNewCampaign(f => ({ ...f, category: e.target.value }))}>
                                        {Object.keys(catColors).map(c => <option key={c}>{c}</option>)}
                                    </select>
                                    <input className="input-field" type="number" placeholder="Goal Amount (₹)" value={newCampaign.goal} onChange={e => setNewCampaign(f => ({ ...f, goal: e.target.value }))} />
                                    <textarea className="input-field" placeholder="Campaign description..." value={newCampaign.description} onChange={e => setNewCampaign(f => ({ ...f, description: e.target.value }))} style={{ gridColumn: "1 / -1", height: 80, resize: "vertical" }} />
                                </div>
                                <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                                    <button className="btn-primary" onClick={() => {
                                        if (!newCampaign.title || !newCampaign.goal) { showNotif("Please fill title and goal.", "error"); return; }
                                        const nc = { ...newCampaign, id: Date.now(), raised: 0, goal: parseInt(newCampaign.goal), donors: 0, urgent: false, ngo: "New NGO", location: "India", image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80", description: newCampaign.description || "New campaign" };
                                        setCampaigns(prev => [nc, ...prev]);
                                        setNewCampaign({ title: "", category: "Education", goal: "", description: "" });
                                        setShowAddCampaign(false);
                                        showNotif("Campaign added successfully!");
                                    }} style={{ fontSize: 14, padding: "10px 20px" }}>Save Campaign</button>
                                    <button className="btn-outline" onClick={() => setShowAddCampaign(false)} style={{ fontSize: 14, padding: "10px 20px" }}>Cancel</button>
                                </div>
                            </div>
                        )}

                        <div style={{ display: "grid", gap: 16 }}>
                            {campaigns.map(c => (
                                <div key={c.id} className="card" style={{ padding: 20, display: "flex", gap: 16, alignItems: "center" }}>
                                    <img src={c.image} alt={c.title} style={{ width: 80, height: 60, objectFit: "cover", borderRadius: 8 }} loading="lazy" />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 700, marginBottom: 2 }}>{c.title}</div>
                                        <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 8 }}>{c.ngo} · {c.category}</div>
                                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                            <div className="progress-bar" style={{ flex: 1 }}>
                                                <div className="progress-fill" style={{ width: `${pct(c.raised, c.goal)}%` }} />
                                            </div>
                                            <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.primary, whiteSpace: "nowrap" }}>
                                                {fmt(c.raised)} / {fmt(c.goal)}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", gap: 8 }}>
                                        <button onClick={() => { showNotif(`Editing "${c.title}" — (edit UI coming soon)`); }}
                                            style={{ background: "#e8f5ee", color: COLORS.primary, border: "none", padding: "7px 14px", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 600 }}>
                                            Edit
                                        </button>
                                        <button onClick={() => { setCampaigns(prev => prev.filter(x => x.id !== c.id)); showNotif("Campaign deleted."); }}
                                            style={{ background: "#fef0ef", color: "#c0392b", border: "none", padding: "7px 14px", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 600 }}>
                                            Delete
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
