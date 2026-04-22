import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Hero from "../components/home/Hero";
import WhyChoose from "../components/home/WhyChoose";
import HowItWorks from "../components/home/HowItWorks";
import Testimonials from "../components/home/Testimonials";
import { useAuth } from "../context/AuthContext";

/* ─── DATA ─────────────────────────────────────────────── */
const LOGOS = ["▲","R7","✦","ƒ","◆","Ⓢ","⬡","♫","abbc","▽","⊕","⊘","≋","◉","⬡","☟","⬡","☁","🎵","≡","✦","⬡","✦"];

const PORTFOLIO = [
  { name:"Floyd Miles",    role:"Graphics Designer",  bg:"#c8956c" },
  { name:"Brooklyn Simmons", role:"UIUX Designer",    bg:"#8b7bb5" },
  { name:"Wade Warren",    role:"Software Developer", bg:"#4a6fa5" },
  { name:"Esther Howard",  role:"Product Manager",    bg:"#5a8a6a" },
];

const CATEGORIES = ["Developer","UI Designer","Project Manager","Designer","Accountant","Human Resource","Marketing"];

const EXPERTS = {
  technical: [
    { name:"Zrand Hobs",  role:"Developer", rating:"4.8", tags:["Gimp","Wordpress"], online:false },
    { name:"Dorothy Wood",role:"Teacher",   rating:"4.8", tags:["Elementor","Wix","Illustrator"], online:true, featured:true },
    { name:"Frances Washing", role:"Developer",   rating:"4.8", tags:["Wordpress","Wix","Illustrator"], online:false },
    { name:"Jason Bell",  role:"Web Designer",rating:"4.8", tags:["Elementor","Wordpress"], online:true },
  ],
  hr: [
    { name:"Timothy Baker",   role:"Teacher",      rating:"4.8", tags:["Figma","Elementor","Wordpress"], online:true },
    { name:"Shane Pratt",     role:"Developer",    rating:"4.8", tags:["Figma","Wordpress","Gimp"], online:false },
    { name:"Kathryn Sanchez", role:"Teacher",      rating:"4.8", tags:["Framer","Webflow","Wix"], online:false },
    { name:"Jaime Strickland",role:"Web Designer", rating:"4.8", tags:["Gimp","Figma","Webflow"], online:false },
  ],
};

const FAQS = [
  { q:"How do I create an account on the job board?", a:"Use the search bar on the homepage to enter keywords related to your skills, job title, or preferred location. You can also use the advanced search filters to narrow down results by industry, job type (full-time, part-time, freelance), and experience level." },
  { q:"How do I apply for a job through the platform?", a:"Browse available positions, click on any listing that interests you, and hit 'Apply Now'. You'll be asked to submit your profile and optionally a cover letter." },
  { q:"How can I track the status of my job applications?", a:"Navigate to 'My Applications' in your dashboard to see real-time updates on every application you've submitted." },
  { q:"How do I create an account on the job board?", a:"Simply click 'Login / Sign Up' in the top navigation bar and follow the registration steps. It takes less than 2 minutes." },
  { q:"Is there a cost to use the job board, and what features are free?", a:"Basic browsing and applying is completely free. Premium features like priority placement and advanced analytics are available with Pro plans." },
];

/* ─── COMPONENT ─────────────────────────────────────────── */
export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
const [showPopup, setShowPopup] = useState(false);
  const [activeCategory, setActiveCategory] = useState("UI Designer");
  const [openFaq, setOpenFaq] = useState(3);
  const [email, setEmail] = useState("");
  const [portfolioIdx, setPortfolioIdx] = useState(0);
  const [searchRole, setSearchRole] = useState("");
  const [searchCompany, setSearchCompany] = useState("");
const handleProtectedClick = (path) => {
  console.log("CLICKED, user:", user);

  if (!user) {
    console.log("SETTING POPUP TRUE");
    setShowPopup(true);
  } else {
    navigate(path);
  }
};
  return (
    <div style={g.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: #fff; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f5f6fa; }
        ::-webkit-scrollbar-thumb { background: #c5c8d6; border-radius: 99px; }
        a { text-decoration: none; }
        button { font-family: inherit; cursor: pointer; }
        input { font-family: inherit; }
        .nav-link:hover { color: #0f1117 !important; }
        .expert-card:hover { box-shadow: 0 8px 32px rgba(79,132,247,0.15) !important; transform: translateY(-2px); }
        .portfolio-card:hover .play-btn { opacity: 1 !important; transform: scale(1) !important; }
        .how-step:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.08) !important; }
        .feature-card:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.12) !important; transform: translateY(-3px); }
        .faq-row:hover { background: #f8f9ff !important; }
        .rec-tag { transition: all 0.2s; }
        .rec-tag:hover { background: #e8eeff !important; color: #4f84f7 !important; }
        .search-input:focus { outline: none; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }
        .hero-content > * { animation: fadeUp 0.6s ease both; }
        .hero-content > *:nth-child(1) { animation-delay: 0.1s; }
        .hero-content > *:nth-child(2) { animation-delay: 0.2s; }
        .hero-content > *:nth-child(3) { animation-delay: 0.3s; }
        .hero-content > *:nth-child(4) { animation-delay: 0.4s; }
        .float-card { animation: float 4s ease-in-out infinite; }
        .float-card2 { animation: float 5s ease-in-out infinite 1s; }
      `}</style>

    <Navbar setShowPopup={setShowPopup} />
      <Hero searchRole={searchRole} setSearchRole={setSearchRole} searchCompany={searchCompany} setSearchCompany={setSearchCompany} />
      <WhyChoose />
      <ClientLogos />
      <HowItWorks />
      <Testimonials />

     <TopTalentPortfolio 
  portfolioIdx={portfolioIdx} 
  setPortfolioIdx={setPortfolioIdx}
  handleProtectedClick={handleProtectedClick}
/>
     <DiscoverMasters 
  activeCategory={activeCategory} 
  setActiveCategory={setActiveCategory} 
  handleProtectedClick={handleProtectedClick}
  showPopup={showPopup}
  setShowPopup={setShowPopup}
/>
      <NewsletterCta email={email} setEmail={setEmail} />
      <Footer />

{/* Popup */}
{showPopup && (
  <div style={popupStyles.overlay}>
    <div style={popupStyles.box}>
      <h3 style={{ marginBottom: 10 }}>Login Required</h3>
      <p style={{ fontSize: 14, color: "#555", marginBottom: 20 }}>
        Please login or sign up to access this feature.
      </p>

      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <button
          onClick={() => navigate("/login")}
          style={popupStyles.primaryBtn}
        >
          Login
        </button>

        <button
          onClick={() => setShowPopup(false)}
          style={popupStyles.secondaryBtn}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

  </div>
);
  
}

/* ─── CLIENT LOGOS COMPONENT ─────────────────────────────────────── */
function ClientLogos() {
  return (
    <section style={{ ...g.section, background: "#f8f9fc", paddingTop: 60, paddingBottom: 60 }}>
      <div style={g.sectionCenter}>
        <h2 style={{ ...g.sectionTitle, fontSize: 36 }}>Trusted by aspiring professionals<br />and top recruiters</h2>
        <p style={g.sectionSub}>Practice real interview scenarios, get AI-powered feedback,<br />and improve your chances of landing your dream job.</p>
      </div>
      <div style={g.logosGrid}>
        {["▲", "◈", "✦", "ƒ", "◆", "S", "⬡", "♪", "abbc", "▽", "⊕", "⊘", "≋", "◉", "⬡", "⊙", "⬡", "☁", "TT", "≡", "☁", "⬡", "✦", "✦"].map((l, i) => (
          <div key={i} style={g.logoChip}>
            <span style={{ fontSize: 20, color: ["#1a73e8", "#e8650a", "#22c55e", "#f43f5e", "#8b5cf6", "#06b6d4", "#f59e0b", "#10b981"][i % 8] }}>{l}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── TOP TALENT PORTFOLIO COMPONENT ─────────────────────────────────────── */
function TopTalentPortfolio({ portfolioIdx, setPortfolioIdx, handleProtectedClick }) {
  const visiblePortfolio = PORTFOLIO.slice(portfolioIdx, portfolioIdx + 3);

  return (
    <section style={{ ...g.section, paddingTop: 60 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, maxWidth: 1100, margin: "0 auto 28px" }}>
        <h2 style={{ ...g.sectionTitle, textAlign: "left", marginBottom: 0 }}>Top Talent portfolio Showcase</h2>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => setPortfolioIdx(Math.max(0, portfolioIdx - 1))} style={{ ...g.navArrow, background: "#f5f6fa", color: "#0f1117" }}>←</button>
          <button onClick={() => setPortfolioIdx(Math.min(PORTFOLIO.length - 3, portfolioIdx + 1))} style={{ ...g.navArrow, background: "#1a73e8", color: "#fff" }}>→</button>
        </div>
      </div>

      <div style={g.portfolioGrid}>
        {visiblePortfolio.map((p, i) => (
         <div 
  key={i} 
  className="portfolio-card" 
  style={
    {...g.portfolioCard}}
  onClick={() => handleProtectedClick("/interviews")}
>
            <div style={g.portfolioAvatar}>{p.name.charAt(0)}</div>
            <div style={g.portfolioInfo}>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>{p.name}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>{p.role}</div>
            </div>
            <div className="play-btn" style={{ ...g.playBtn, opacity: 0, transform: "scale(0.8)", transition: "all 0.25s" }}>▶</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── DISCOVER MASTERS COMPONENT ─────────────────────────────────────── */
function DiscoverMasters({ 
  activeCategory, 
  setActiveCategory, 
  handleProtectedClick,
  showPopup,
  setShowPopup
}) {
  return (
    <section style={{ ...g.section, background: "#f8f9fc" }}>
      <div style={g.sectionCenter}>
        <div style={g.mastersBox}>
          <h2 style={{ fontSize: 36, fontWeight: 800, color: "#0f1117", lineHeight: 1.2 }}>Discover the<br />Emerging Masters</h2>
          <p style={{ ...g.sectionSub, marginTop: 10 }}>Find the best master for your company and boosts<br />your interview skills 10x!</p>
        </div>
      </div>

      {/* Category tabs */}
      <div style={g.catTabs}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{ ...g.catTab, ...(activeCategory === cat ? g.catTabActive : {}) }}
          >
            {cat === "Developer" && "⊞ "}{cat === "UI Designer" && "◧ "}{cat === "Project Manager" && "≡ "}{cat === "Designer" && "✦ "}{cat === "Accountant" && "$ "}{cat === "Human Resource" && "👤 "}{cat === "Marketing" && "📢 "}
            {cat}
          </button>
        ))}
      </div>

      {/* Expert grid */}
      <div style={g.expertsWrap}>
<ExpertSection 
  title="Technical Evaluator" 
  experts={EXPERTS.technical} 
  handleProtectedClick={handleProtectedClick}
  showPopup={showPopup}
  setShowPopup={setShowPopup}
/>

<ExpertSection 
  title="HR Evaluator" 
  experts={EXPERTS.hr} 
  handleProtectedClick={handleProtectedClick}
  showPopup={showPopup}
  setShowPopup={setShowPopup}
/>
      </div>

      <div style={{ textAlign: "center", marginTop: 32 }}>
       <button 
  style={g.viewAllBtn}
  onClick={() => handleProtectedClick("/interviews")}
>View All <span style={g.viewAllIcon}>↗</span></button>
      </div>
    </section>
  );
}

/* ─── FAQ COMPONENT ─────────────────────────────────────── */
function Faqs({ openFaq, setOpenFaq }) {
  return (
    <section style={g.section}>
      <h2 style={{ ...g.sectionTitle, textAlign: "left", maxWidth: 1100, margin: "0 auto 32px" }}>Frequently asked Questions</h2>
      <div style={g.faqGrid}>
        {FAQS.map((faq, i) => (
          <div
            key={i}
            className="faq-row"
            onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
            style={{ ...g.faqItem, ...(openFaq === i ? g.faqItemOpen : {}), transition: "all 0.2s" }}
          >
            <div style={g.faqHeader}>
              <span style={g.faqNum}>{String(i + 1).padStart(2, "0")}</span>
              <span style={g.faqQ}>{faq.q}</span>
              <span style={g.faqToggle}>{openFaq === i ? "✕" : "+"}</span>
            </div>
            {openFaq === i && <p style={g.faqA}>{faq.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
function NewsletterCta({ email, setEmail }) {
  const [status, setStatus] = useState({ msg: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !email.includes("@")) {
      setStatus({ msg: "Please enter a valid email.", type: "error" });
      return;
    }

    setLoading(true);
    setStatus({ msg: "", type: "" });

    try {
      const res = await fetch("http://localhost:5000/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus({ msg: "🎉 Successfully registered! Check your inbox.", type: "success" });
        setEmail("");
      } else {
        setStatus({ msg: data.message, type: "error" });
      }
    } catch (err) {
      setStatus({ msg: "Server error. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={g.ctaSection}>
      <h2>Join ambitious professionals...</h2>

      <div style={g.ctaForm}>
        <div style={g.ctaInput}>
          <span>✉</span>
          <input
            placeholder="Your mail address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            style={{ outline: "none", border: "none", background: "transparent", flex: 1 }}
          />
        </div>

        <button onClick={handleSubmit} disabled={loading} style={{ ...g.ctaBtn, opacity: loading ? 0.7 : 1 }}>
          {loading ? "Joining..." : "Join Us"}
        </button>
      </div>

      {status.msg && (
        <p style={{ marginTop: 14, fontSize: 14, fontWeight: 600, color: status.type === "success" ? "#16a34a" : "#dc2626" }}>
          {status.msg}
        </p>
      )}
    </section>
  );
}
/* ─── FOOTER COMPONENT ─────────────────────────────────────── */
function Footer() {
  return (
    <footer style={g.footer}>
      <div style={g.footerTop}>
        <div style={g.footerBrand}>
          <div style={g.footerLogo}><span style={{ color: "#4f84f7" }}>IX</span> InterviewX</div>
          <p style={g.footerAddr}>Bennett University, Greater Noida,201310</p>
          <p style={g.footerContact}><strong>Phone:</strong> 7986692544</p>
          <p style={g.footerContact}><strong>Email:</strong> info@interviewx.com</p>
        </div>
        {[
          { title: "Quick Links", links: ["Pricing", "Jobs", "Employer", "Careers", "Contact Us"] },
          { title: "Others", links: ["How it works", "Terms and condition", "Privacy Policy", "About Us"] },
          { title: "About us", links: ["Company milestone", "Web mail", "Board of Directors", "Senior Management"] },
        ].map(col => (
          <div key={col.title}>
            <div style={g.footerColTitle}>{col.title}</div>
            {col.links.map(l => <div key={l} style={g.footerLink}>{l}</div>)}
          </div>
        ))}
      </div>
      <div style={g.footerBottom}>
        <span style={{ color: "#aaa", fontSize: 13 }}>©2026 All rights reserved</span>
        <div style={{ display: "flex", gap: 14 }}>
          {["📸", "✈", "🎵", "▶"].map((icon, i) => (
            <div key={i} style={g.socialIcon}>{icon}</div>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ─── Expert Section Sub-component ─────────────────────── */
function ExpertSection({ title, experts, handleProtectedClick, showPopup, setShowPopup }) {
  const navigate = useNavigate();
  return (
    <div style={{ flex:1 }}>
      <div style={es.header}>{title}</div>
      <div style={es.grid}>
        {experts.map((e, i) => (
          <div 
  key={i} 
  className="expert-card" 
  style={es.card}
  onClick={() => handleProtectedClick("/interviews")}
>
            <div style={es.avatarWrap}>
              <div style={{ ...es.avatar, background: ["#b8c8e8","#d4b0c0","#c8b8d8","#b0c8d0"][i%4] }}>
                {e.name.charAt(0)}
                {e.online && <div style={es.dot} />}
              </div>
            </div>
            <div style={es.ratingRow}>
              <span style={{ color:"#f59e0b", fontSize:13 }}>★</span>
              <span style={es.rating}>{e.rating}</span>
              <span style={es.ratingCount}>(6)</span>
            </div>
            <div style={es.name}>{e.name}</div>
            <div style={es.role}>{e.role}</div>
            <div style={es.tags}>
              {e.tags.map(t => (
                <span key={t} className="rec-tag" style={es.tag}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    
    </div>
  );
}

/* ─── STYLES ────────────────────────────────────────────── */
const g = {
  root: { fontFamily:"'Plus Jakarta Sans', sans-serif", background:"#f5f6fa" , color:"#0f1117", overflowX:"hidden" },

  /* NAV */
  nav: { position:"sticky", top:0, zIndex:100, background:"rgba(255,255,255,0.97)", backdropFilter:"blur(8px)", borderBottom:"1px solid #ebebf0", height:64, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 40px" },
  logo: { fontFamily:"'Manrope', sans-serif", fontWeight:900, fontSize:20, letterSpacing:"-0.5px", color:"#0f1117" },
  navLinks: { display:"flex", gap:32, listStyle:"none", padding:0 },
  navLink: { fontSize:14, fontWeight:500, color:"#555", textDecoration:"none", transition:"color 0.2s" },
  feedbackBtn: { background:"#f0ecff", color:"#7c5af6", border:"none", padding:"8px 18px", borderRadius:100, fontSize:13, fontWeight:700, cursor:"pointer" },
  navCta: { background:"#fff", border:"1.5px solid #0f1117", color:"#0f1117", padding:"8px 18px", borderRadius:100, fontSize:13, fontWeight:700, display:"flex", alignItems:"center", gap:6 },
  navCtaIcon: { background:"#0f1117", color:"#fff", borderRadius:"50%", width:20, height:20, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10 },

  /* HERO */
  hero: { background:"linear-gradient(180deg, #c8b8f0 0%, #b8c8f8 30%, #e8eeff 65%, #f5f6fa 100%)", minHeight:680, display:"flex", flexDirection:"column", alignItems:"center", paddingTop:60, position:"relative", overflow:"hidden" },
  heroBadge: { background:"rgba(255,255,255,0.9)", border:"1px solid rgba(255,255,255,0.8)", borderRadius:100, padding:"8px 18px", fontSize:13, fontWeight:600, color:"#444", display:"flex", alignItems:"center", gap:8, backdropFilter:"blur(8px)" },
  heroTitle: { fontFamily:"'Manrope', sans-serif", fontSize:58, fontWeight:900, color:"#0f1117", letterSpacing:"-2px", textAlign:"center", lineHeight:1.1 },
  heroSubBold: { fontFamily:"'Manrope', sans-serif", fontSize:22, fontWeight:700, color:"#0f1117", textAlign:"center" },
  heroSub: { fontSize:14, color:"#555", textAlign:"center" },
  searchBar: { background:"#fff", borderRadius:100, padding:"6px 6px 6px 20px", display:"flex", alignItems:"center", gap:0, boxShadow:"0 4px 24px rgba(0,0,0,0.12)", maxWidth:540, width:"100%" },
  searchField: { display:"flex", alignItems:"center", gap:8, flex:1, padding:"4px 0" },
  searchInputEl: { border:"none", outline:"none", fontSize:14, color:"#0f1117", background:"transparent", width:"100%" },
  searchDivider: { width:1, height:24, background:"#e8e9f0", margin:"0 8px", flexShrink:0 },
  searchBtn: { background:"#1a73e8", color:"#fff", border:"none", borderRadius:100, padding:"10px 24px", fontSize:14, fontWeight:700, flexShrink:0 },
  photoStrip: { display:"flex", gap:12, marginTop:48, paddingBottom:0, width:"100%", justifyContent:"center" },
  photoCard: { width:160, height:200, borderRadius:16, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"flex-end", padding:"0 0 12px", overflow:"hidden", position:"relative", flexShrink:0 },
  photoAvatar: { width:80, height:80, borderRadius:"50%", background:"rgba(255,255,255,0.3)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, fontWeight:700, color:"#fff", marginBottom:40 },
  photoLabel: { position:"absolute", bottom:10, left:"50%", transform:"translateX(-50%)", background:"rgba(0,0,0,0.6)", color:"#fff", fontSize:11, fontWeight:600, padding:"4px 10px", borderRadius:100, whiteSpace:"nowrap" },

  /* SECTIONS */
  section: { padding:"80px 40px", maxWidth:"100%", overflow:"hidden" },
  sectionCenter: { textAlign:"center", marginBottom:48 },
  sectionTitle: { fontFamily:"'Manrope', sans-serif", fontSize:40, fontWeight:800, color:"#0f1117", letterSpacing:"-1px", marginBottom:12 },
  sectionSub: { color:"#666", fontSize:15, lineHeight:1.6 },

  /* WHY CHOOSE US */
  whyLayout: { display:"flex", justifyContent:"center", alignItems:"center", gap:32, maxWidth:900, margin:"0 auto" },
  featureCard: { background:"#fff", borderRadius:16, padding:"22px", boxShadow:"0 4px 20px rgba(0,0,0,0.08)", display:"flex", flexDirection:"column", gap:8, transition:"all 0.25s" },
  featureIcon: { fontSize:24, marginBottom:4 },
  featureTitle: { fontFamily:"'Manrope', sans-serif", fontSize:15, fontWeight:700, color:"#0f1117" },
  featureSub: { fontSize:12, color:"#888", lineHeight:1.5 },
  featureBtn: { background:"#1a73e8", color:"#fff", border:"none", borderRadius:100, padding:"7px 18px", fontSize:12, fontWeight:700, alignSelf:"flex-start", marginTop:4 },
  hrCard: { width:220, height:320, borderRadius:20, background:"linear-gradient(180deg, #d4a882 0%, #c8956c 100%)", position:"relative", flexShrink:0, display:"flex", alignItems:"flex-end", justifyContent:"center", overflow:"visible" },
  hrCardInner: { width:"100%", padding:"0 0 14px" },
  hrCardLabel: { textAlign:"center", background:"rgba(0,0,0,0.5)", color:"#fff", fontSize:13, fontWeight:700, padding:"6px 16px", borderRadius:100, margin:"0 auto", width:"fit-content" },
  orbitRing: { position:"absolute", width:340, height:340, border:"2px solid #dbeaff", borderRadius:"50%", top:"50%", left:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none", zIndex:-1 },

  /* LOGOS */
  logosGrid: { display:"grid", gridTemplateColumns:"repeat(8, 1fr)", gap:12, maxWidth:700, margin:"0 auto", padding:"0 20px" },
  logoChip: { background:"#fff", borderRadius:12, width:60, height:60, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 2px 8px rgba(0,0,0,0.07)", fontSize:20 },

  /* HOW IT WORKS */
  howLayout: { display:"flex", gap:60, alignItems:"flex-start", maxWidth:1000, margin:"0 auto" },
  howStep: { background:"#fff", borderRadius:14, padding:"18px 20px", display:"flex", alignItems:"center", gap:14, boxShadow:"0 2px 12px rgba(0,0,0,0.06)", cursor:"default" },
  howNum: { fontFamily:"'Manrope', sans-serif", fontSize:36, fontWeight:900, lineHeight:1, flexShrink:0, minWidth:50 },
  howIcon: { width:40, height:40, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 },
  howTitle: { fontFamily:"'Manrope', sans-serif", fontSize:15, fontWeight:700, color:"#0f1117" },
  howDesc: { fontSize:12, color:"#888", marginTop:3 },
  howImages: { display:"flex", gap:12, flex:1 },
  howImg1: { width:200, height:280, borderRadius:16, overflow:"hidden", flexShrink:0 },
  howImg2: { width:180, height:200, borderRadius:16, overflow:"hidden" },
  howImgPlaceholder1: { width:"100%", height:"100%", background:"linear-gradient(135deg, #4a6fa5, #2d4a7a)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" },
  howImgPlaceholder2: { width:"100%", height:"100%", background:"linear-gradient(135deg, #6a8a5a, #4a6a3a)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" },
  avatarLg: { fontSize:40 },
  howBadge: { background:"#fff", borderRadius:12, padding:"12px 16px", display:"flex", flexDirection:"column", gap:2, boxShadow:"0 2px 12px rgba(0,0,0,0.08)" },

  /* PORTFOLIO */
  portfolioGrid: { display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, maxWidth:1100, margin:"0 auto" },
  portfolioCard: { borderRadius:20, height:320, position:"relative", overflow:"hidden", cursor:"pointer" },
  portfolioAvatar: { position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:80, height:80, borderRadius:"50%", background:"rgba(255,255,255,0.3)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32, color:"#fff", fontWeight:700 },
  portfolioInfo: { position:"absolute", bottom:20, left:20 },
  playBtn: { position:"absolute", bottom:16, right:16, width:44, height:44, background:"#1a73e8", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:14 },

  /* TESTIMONIALS */
  testimGrid: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, maxWidth:1100, margin:"0 auto" },
  testimCard: { borderRadius:20, padding:"28px 30px" },
  stars: { marginTop:16, color:"#f59e0b", fontSize:20, letterSpacing:2 },

  /* MASTERS */
  mastersBox: { border:"2px dashed #c8d8ff", borderRadius:16, padding:"28px 48px", display:"inline-block", textAlign:"center" },
  catTabs: { display:"flex", gap:4, background:"#f5f6fa", borderRadius:100, padding:5, width:"fit-content", margin:"0 auto 36px", flexWrap:"wrap", justifyContent:"center" },
  catTab: { padding:"8px 18px", borderRadius:100, border:"none", background:"transparent", fontSize:13, fontWeight:500, color:"#666", cursor:"pointer", whiteSpace:"nowrap", transition:"all 0.2s" },
  catTabActive: { background:"#fff", color:"#0f1117", fontWeight:700, boxShadow:"0 2px 8px rgba(0,0,0,0.1)" },
  expertsWrap: { display:"flex", gap:0, maxWidth:1100, margin:"0 auto", background:"#fff", borderRadius:20, overflow:"hidden", border:"1.5px dashed #c8d8ff" },

  /* FAQ */
  faqGrid: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, maxWidth:1100, margin:"0 auto" },
  faqItem: { background:"#fff", border:"1.5px solid #e8e9f0", borderRadius:14, padding:"18px 20px", cursor:"pointer" },
  faqItemOpen: { background:"#f0f6ff", borderColor:"#c8dcff" },
  faqHeader: { display:"flex", alignItems:"flex-start", gap:14 },
  faqNum: { fontSize:13, fontWeight:700, color:"#1a73e8", flexShrink:0 },
  faqQ: { fontSize:14, fontWeight:600, color:"#0f1117", flex:1, lineHeight:1.5 },
  faqToggle: { fontSize:18, color:"#aaa", flexShrink:0, lineHeight:1 },
  faqA: { fontSize:13, color:"#666", lineHeight:1.7, marginTop:12, paddingLeft:28 },

  /* CTA */
  ctaSection: { background:"linear-gradient(135deg, #e8e0ff 0%, #dbeaff 100%)", padding:"72px 40px", display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center" },
  ctaForm: { display:"flex", gap:0, background:"#fff", borderRadius:100, overflow:"hidden", boxShadow:"0 4px 20px rgba(0,0,0,0.1)", width:"100%", maxWidth:440 },
  ctaInput: { display:"flex", alignItems:"center", gap:8, padding:"12px 18px", flex:1 },
  ctaBtn: { background:"#1a73e8", color:"#fff", border:"none", padding:"12px 24px", fontSize:14, fontWeight:700, cursor:"pointer" },

  /* FOOTER */
  footer: { background:"#fff", borderTop:"1px solid #f0f1f5", padding:"48px 60px 24px" },
  footerTop: { display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:40, marginBottom:40 },
  footerBrand: {},
  footerLogo: { fontFamily:"'Manrope', sans-serif", fontSize:18, fontWeight:800, color:"#0f1117", marginBottom:14 },
  footerAddr: { fontSize:13, color:"#666", lineHeight:1.6, marginBottom:12, maxWidth:260 },
  footerContact: { fontSize:13, color:"#666", marginBottom:4 },
  footerColTitle: { fontFamily:"'Manrope', sans-serif", fontSize:14, fontWeight:700, color:"#0f1117", marginBottom:14 },
  footerLink: { fontSize:13, color:"#888", marginBottom:10, cursor:"pointer" },
  footerBottom: { borderTop:"1px solid #f0f1f5", paddingTop:20, display:"flex", justifyContent:"space-between", alignItems:"center" },
  socialIcon: { width:32, height:32, background:"#f5f6fa", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, cursor:"pointer" },
  navArrow: { width:40, height:40, borderRadius:"50%", border:"1px solid #e8e9f0", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" },
  viewAllBtn: { background:"transparent", border:"2px dashed #1a73e8", color:"#1a73e8", padding:"12px 28px", borderRadius:100, fontSize:14, fontWeight:700, display:"inline-flex", alignItems:"center", gap:8 },
  viewAllIcon: { background:"#1a73e8", color:"#fff", borderRadius:"50%", width:24, height:24, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:11 },
};

const es = {
  header: { textAlign:"center", padding:"14px", fontSize:13, fontWeight:700, color:"#555", background:"#f8f9fc", borderBottom:"1px solid #f0f1f5", letterSpacing:0.3 },
  grid: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:1, background:"#f0f1f5" },
  card: { background:"#fff", padding:"20px 16px", display:"flex", flexDirection:"column", alignItems:"center", gap:4, cursor:"pointer" },
  cardFeatured: { background:"#f0f4ff" },
  avatarWrap: { position:"relative", marginBottom:6 },
  avatar: { width:52, height:52, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, fontWeight:700, color:"#fff" },
  dot: { position:"absolute", bottom:2, right:2, width:12, height:12, background:"#22c55e", borderRadius:"50%", border:"2px solid #fff" },
  ratingRow: { display:"flex", alignItems:"center", gap:3 },
  rating: { fontSize:13, fontWeight:700, color:"#0f1117" },
  ratingCount: { fontSize:11, color:"#aaa" },
  name: { fontFamily:"'Manrope', sans-serif", fontSize:14, fontWeight:700, color:"#0f1117", textAlign:"center" },
  role: { fontSize:12, color:"#888" },
  tags: { display:"flex", flexWrap:"wrap", gap:4, justifyContent:"center", marginTop:4 },
  tag: { fontSize:11, color:"#666", background:"#f5f6fa", padding:"3px 8px", borderRadius:100, border:"1px solid #e8e9f0", cursor:"pointer" },
};
const popupStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },

  box: {
    background: "#fff",
    padding: "30px",
    borderRadius: 12,
    width: 320,
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },

  primaryBtn: {
    background: "#1a73e8",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
  },

  secondaryBtn: {
    background: "#eee",
    border: "none",
    padding: "10px 20px",
    borderRadius: 8,
    cursor: "pointer",
  },
};