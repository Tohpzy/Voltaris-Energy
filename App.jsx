import React, { useState } from "react";
import "./styles.css";

/* ---------- Icon helper (inline SVGs, no icon library needed) ---------- */
const Icon = ({ path, viewBox = "0 0 24 24" }) => (
  <svg viewBox={viewBox} fill="none" strokeWidth="2" strokeLinecap="round">
    {path}
  </svg>
);

/* ---------- Data ---------- */
const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Us" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "products", label: "Products" },
  { id: "blog", label: "Blog" },
  { id: "faqs", label: "FAQs" },
  { id: "contact", label: "Contact" },
];

const HOME_SERVICES = [
  {
    title: "Solar Energy Solutions",
    desc: "Solar panels, inverters, battery storage, street lighting and solar-powered water pumps engineered for Nigerian conditions.",
    path: <><rect x="3" y="4" width="18" height="12" rx="1" /><path d="M7 20h10M12 16v4" /></>,
  },
  {
    title: "Electrical Services",
    desc: "Building and industrial wiring, generator integration, electrical maintenance and certified safety inspections.",
    path: <path d="M13 2 L4 14h7l-1 8 9-12h-7l1-8Z" />,
  },
  {
    title: "Energy Solutions",
    desc: "Energy audits, smart energy management, backup power design and independent power consultation.",
    path: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></>,
  },
];

const SERVICES = [
  {
    title: "Solar Installation",
    desc: "Full solar system design and installation, sized to your load.",
    path: <><rect x="3" y="4" width="18" height="12" rx="1" /><path d="M7 20h10M12 16v4" /></>,
    items: ["Solar panel installation", "Inverter installation", "Battery storage systems", "Solar street lighting", "Solar water pump installation"],
  },
  {
    title: "Electrical Installation",
    desc: "Wiring and electrical infrastructure for every building type.",
    path: <path d="M13 2 L4 14h7l-1 8 9-12h-7l1-8Z" />,
    items: ["Building electrical wiring", "Industrial electrical installation", "Generator integration", "Electrical safety inspection"],
  },
  {
    title: "Maintenance & Support",
    desc: "Ongoing care to keep systems running at peak performance.",
    path: <><path d="M12 20l-1-4h2l-1 4Z" /><path d="M12 2v4M4.9 4.9l2.8 2.8M2 12h4M4.9 19.1l2.8-2.8M19.1 4.9l-2.8 2.8M22 12h-4M19.1 19.1l-2.8-2.8" /></>,
    items: ["Scheduled preventive maintenance", "Emergency repairs", "System health checks", "Spare parts & replacements"],
  },
  {
    title: "Energy Consultation",
    desc: "Independent guidance on the right system for your budget and goals.",
    path: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></>,
    items: ["Energy audits", "Smart energy management", "Backup power system design", "Power consultation"],
  },
  {
    title: "Backup Power Systems",
    desc: "Seamless battery and generator backup so power never stops.",
    path: <><rect x="4" y="8" width="16" height="10" rx="2" /><path d="M8 8V6a4 4 0 0 1 8 0v2" /></>,
    items: ["Automatic transfer switching", "Hybrid solar-generator setups", "Load prioritisation"],
  },
  {
    title: "Smart Energy Management",
    desc: "Monitoring and controls that cut waste and reduce running costs.",
    path: <path d="M3 12h4l3 8 4-16 3 8h4" />,
    items: ["Real-time consumption monitoring", "Remote system control", "Usage reporting"],
  },
];

const PROJECTS = {
  residential: [
    { title: "Lekki Family Home — 5kW Hybrid", desc: "Rooftop solar with battery backup for a duplex in Lekki, reducing generator use by 90%." },
    { title: "Estate Development, Ibeju-Lekki", desc: "Standardised solar wiring for 40 housing units, delivered on a phased rollout." },
    { title: "Landlord Retrofit, Abuja", desc: "Full electrical rewiring and inverter upgrade for a multi-tenant property." },
  ],
  commercial: [
    { title: "Corporate Office, Victoria Island", desc: "30kW solar-grid hybrid system cutting energy costs by 45%." },
    { title: "Private School, Ogun State", desc: "Solar street lighting and classroom electrical upgrade across 3 blocks." },
    { title: "Hospital Backup Power, Port Harcourt", desc: "Critical-load backup system ensuring zero downtime for essential equipment." },
  ],
  industrial: [
    { title: "Manufacturing Plant, Ogun", desc: "150kW industrial solar-diesel hybrid supply for a production facility." },
    { title: "Construction Site Power, Lagos", desc: "Temporary and permanent electrical supply across a multi-year build." },
    { title: "Agro-processing Facility, Kaduna", desc: "Solar water pumping and cold-storage power for an agricultural business." },
  ],
};

const PRODUCTS = [
  { title: "Solar Panels", desc: "Monocrystalline & polycrystalline panels, 250W–600W, built for high-heat performance.", path: <><rect x="3" y="4" width="18" height="16" rx="1" /><path d="M3 10h18M9 4v16M15 4v16" /></> },
  { title: "Inverters", desc: "Pure sine wave and hybrid inverters from 1kVA to 100kVA capacity.", path: <><rect x="4" y="5" width="16" height="14" rx="2" /><path d="M8 12h8M12 8v8" /></> },
  { title: "Batteries", desc: "Lithium (LiFePO4) and deep-cycle batteries built for long service life.", path: <><rect x="6" y="4" width="10" height="16" rx="2" /><path d="M10 2h2v2h-2z" /></> },
  { title: "Accessories", desc: "Mounting structures, cables, charge controllers and monitoring kits.", path: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></> },
];

const BLOG_POSTS = [
  { tag: "Solar", title: "Benefits of Solar Energy in Nigeria", desc: "Why more homes and businesses are switching to solar power." },
  { tag: "Guide", title: "How to Size a Solar System", desc: "A practical framework for matching system size to your energy load." },
  { tag: "Comparison", title: "Solar vs Generator Costs", desc: "Comparing long-term running costs of solar against petrol and diesel generators." },
  { tag: "Tips", title: "Energy Saving Tips", desc: "Simple habits and upgrades that lower your monthly power costs." },
];

const FAQS = [
  { q: "How long does solar installation take?", a: "Most residential systems are installed within 3–7 days depending on size and site readiness. Commercial and industrial systems are scoped individually." },
  { q: "Do you offer maintenance after installation?", a: "Yes. Every installation comes with a maintenance plan option, plus a workmanship warranty and rapid-response support." },
  { q: "Can solar power run my whole building?", a: "In most cases, yes — we design hybrid systems that combine solar, battery storage and grid or generator backup based on your energy audit." },
  { q: "Do you serve locations outside Lagos?", a: "Yes, we've delivered projects across multiple Nigerian states for residential, commercial and industrial clients." },
  { q: "How do I get a quote?", a: 'Use the "Get a Quote" button anywhere on the site, or contact us directly by phone, email or WhatsApp.' },
];

/* ---------- Small reusable components ---------- */
const Logo = ({ dark }) => (
  <div className="logo" style={dark ? { color: "#0A2540" } : undefined}>
    <svg className="logo-mark" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="21" stroke="#F5B700" strokeWidth="2.4" />
      <path d="M26 8 L15 27 H22 L20 40 L33 20 H26 L26 8Z" fill="#F5B700" />
    </svg>
    <span className="logo-word">VOLTARIS <span>ENERGY</span></span>
  </div>
);

function Header({ page, setPage }) {
  const [open, setOpen] = useState(false);
  const go = (id) => { setPage(id); setOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return (
    <header>
      <div className="wrap nav-row">
        <a href="#" className="logo" onClick={(e) => { e.preventDefault(); go("home"); }}>
          <Logo />
        </a>
        <button className="burger" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <nav className={"main-nav" + (open ? " open" : "")}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={"navlink" + (page === item.id ? " active" : "")}
              onClick={() => go(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="nav-cta">
          <button className="btn btn-primary" onClick={() => go("quote")}>Get a Quote</button>
        </div>
      </div>
    </header>
  );
}

function Hero({ setPage }) {
  return (
    <div className="hero">
      <div className="wrap hero-grid">
        <div>
          <span className="eyebrow" style={{ color: "var(--yellow)" }}>Solar &amp; Electrical Solutions · Nigeria</span>
          <h1>Reliable solar &amp; electrical solutions for <em>homes and businesses.</em></h1>
          <p className="lead">Powering Nigeria with clean, efficient, and dependable energy solutions — from solar installation to full electrical infrastructure and ongoing energy management.</p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => setPage("quote")}>Get a Free Quote</button>
            <button className="btn btn-ghost" onClick={() => setPage("contact")}>Contact Us</button>
          </div>
          <div className="hero-stats">
            <div><b>250+</b><span>Projects delivered</span></div>
            <div><b>15 MW+</b><span>Solar capacity installed</span></div>
            <div><b>24/7</b><span>Maintenance support</span></div>
          </div>
        </div>
        <div className="sun-wrap">
          <svg className="sun-svg" viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F5B700" />
                <stop offset="100%" stopColor="#00A86B" />
              </linearGradient>
            </defs>
            <circle className="arc-track" cx="210" cy="220" r="140" strokeWidth="10" fill="none" />
            <circle className="arc-progress" cx="210" cy="220" r="140" strokeWidth="10" fill="none" transform="rotate(-90 210 220)" />
            <g className="sun-core">
              <circle cx="210" cy="220" r="52" fill="#F5B700" opacity="0.15" />
              <circle cx="210" cy="220" r="34" fill="#F5B700" />
            </g>
            <path className="bolt-path" d="M222 190 L196 226 L214 226 L200 258 L236 216 L216 216 L222 190Z" fill="#0A2540" stroke="#0A2540" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function HomePage({ setPage }) {
  return (
    <>
      <Hero setPage={setPage} />
      <section className="block">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">What we do</span>
            <h2>End-to-end energy solutions, under one roof.</h2>
            <p>From the first energy audit to years of maintenance after installation, Voltaris Energy handles every stage of your power journey.</p>
          </div>
          <div className="grid grid-3">
            {HOME_SERVICES.map((s) => (
              <div className="card" key={s.title}>
                <div className="icon-tile"><Icon path={s.path} /></div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block navy">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow" style={{ color: "var(--yellow)" }}>Why Voltaris</span>
            <h2>Built for Nigeria's energy realities.</h2>
          </div>
          <div className="stat-strip">
            <div><b>9+ yrs</b><span>Combined field experience</span></div>
            <div><b>98%</b><span>Client satisfaction rate</span></div>
            <div><b>36</b><span>States served</span></div>
            <div><b>10-yr</b><span>Workmanship warranty</span></div>
          </div>
        </div>
      </section>

      <section className="block tint">
        <div className="wrap">
          <div className="cta-band">
            <div>
              <h3 style={{ color: "#fff", fontSize: 26, marginBottom: 8 }}>Ready for reliable power?</h3>
              <p style={{ color: "rgba(255,255,255,.75)", maxWidth: 480 }}>Tell us about your home, office, or facility — we'll size the right solar and electrical solution and send you a free, no-obligation quote.</p>
            </div>
            <button className="btn btn-primary" onClick={() => setPage("quote")}>Get a Free Quote</button>
          </div>
        </div>
      </section>
    </>
  );
}

function AboutPage() {
  return (
    <>
      <section className="block" style={{ paddingTop: 56 }}>
        <div className="wrap split">
          <div>
            <span className="eyebrow">Our Story</span>
            <h2 style={{ fontSize: 34, marginBottom: 18 }}>Empowering homes and businesses with intelligent, sustainable energy.</h2>
            <p style={{ color: "var(--grey)" }}>Voltaris Energy is a Nigerian renewable energy and electrical solutions company committed to delivering reliable, innovative, and sustainable power solutions for homes, businesses, and industries. We specialize in solar energy systems, electrical installations, energy management, and maintenance services designed to address Nigeria's growing energy challenges.</p>
            <div className="quote-highlight">Powering a Brighter Tomorrow.</div>
            <p style={{ color: "var(--grey)" }}>Our mission is to empower communities and businesses with clean, affordable, and dependable energy solutions while contributing to a greener, more sustainable future.</p>
          </div>
          <div>
            <div className="card" style={{ marginBottom: 20 }}>
              <div className="icon-tile"><Icon path={<><path d="M12 2 L2 7l10 5 10-5-10-5Z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" /></>} /></div>
              <h3>Our Vision</h3>
              <p>To become Nigeria's most trusted and innovative provider of renewable energy and electrical solutions, powering communities and businesses for a sustainable future.</p>
            </div>
            <div className="card">
              <div className="icon-tile"><Icon path={<><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></>} /></div>
              <h3>Our Mission</h3>
              <p>To provide reliable, affordable, and energy-efficient solar and electrical solutions through innovation, quality service, and customer satisfaction.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="block tint">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Why Choose Us</span>
            <h2>Five reasons clients stay with Voltaris.</h2>
          </div>
          <div className="grid grid-4">
            <div className="card"><h3 style={{ fontSize: 16 }}>Certified Engineers</h3><p>Every installation is led by qualified electrical and solar engineers.</p></div>
            <div className="card"><h3 style={{ fontSize: 16 }}>Quality Components</h3><p>We source Tier-1 panels, inverters and batteries built for durability.</p></div>
            <div className="card"><h3 style={{ fontSize: 16 }}>Transparent Pricing</h3><p>Detailed quotes with no hidden costs, ever.</p></div>
            <div className="card"><h3 style={{ fontSize: 16 }}>Ongoing Support</h3><p>Maintenance plans and rapid-response support after installation.</p></div>
          </div>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Core Values</span>
            <h2>What guides every project.</h2>
          </div>
          <div className="grid grid-3">
            <div className="card"><h3 style={{ fontSize: 16 }}>Excellence &amp; Integrity</h3><p>We hold every installation to the same rigorous standard, and do business honestly.</p></div>
            <div className="card"><h3 style={{ fontSize: 16 }}>Innovation &amp; Sustainability</h3><p>We bring forward-thinking energy technology that respects the environment.</p></div>
            <div className="card"><h3 style={{ fontSize: 16 }}>Safety &amp; Customer-Centricity</h3><p>Every job follows strict safety protocol, built around what the client actually needs.</p></div>
          </div>
        </div>
      </section>

      <section className="block tint">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Our Team</span>
            <h2>The people behind the power.</h2>
          </div>
          <div className="grid grid-4">
            {[["OA", "Lead Solar Engineer", "System design & installation"],
              ["CE", "Chief Electrical Engineer", "Wiring & safety compliance"],
              ["PM", "Projects Manager", "Site delivery & timelines"],
              ["CS", "Client Success Lead", "Support & maintenance"]].map(([initials, role, blurb]) => (
              <div key={initials}>
                <div className="team-avatar"><span>{initials}</span></div>
                <h3 style={{ fontSize: 15.5 }}>{role}</h3>
                <p style={{ color: "var(--grey)", fontSize: 13.5 }}>{blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ServicesPage() {
  return (
    <section className="block" style={{ paddingTop: 56 }}>
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Services</span>
          <h2>Solar, electrical, and energy management — done right.</h2>
          <p>Every service is delivered by trained engineers, backed by a workmanship warranty.</p>
        </div>
        <div className="grid grid-3">
          {SERVICES.map((s) => (
            <div className="card" key={s.title}>
              <div className="icon-tile"><Icon path={s.path} /></div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <ul>{s.items.map((it) => <li key={it}>{it}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsPage() {
  const [tab, setTab] = useState("residential");
  const tabs = [["residential", "Residential"], ["commercial", "Commercial"], ["industrial", "Industrial"]];
  return (
    <section className="block" style={{ paddingTop: 56 }}>
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Projects</span>
          <h2>Work across residential, commercial and industrial sites.</h2>
        </div>
        <div className="tabs">
          {tabs.map(([id, label]) => (
            <button key={id} className={"tab" + (tab === id ? " active" : "")} onClick={() => setTab(id)}>
              {label}
            </button>
          ))}
        </div>
        <div className="grid grid-3">
          {PROJECTS[tab].map((p) => (
            <div className="card" key={p.title}>
              <div className="blog-thumb">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6"><path d="M3 11l9-7 9 7" /><path d="M5 10v9h14v-9" /></svg>
              </div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductsPage() {
  return (
    <section className="block" style={{ paddingTop: 56 }}>
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Products</span>
          <h2>Tier-1 equipment, sized and supplied for you.</h2>
        </div>
        <div className="grid grid-4">
          {PRODUCTS.map((p) => (
            <div className="card" key={p.title}>
              <div className="icon-tile"><Icon path={p.path} /></div>
              <h3 style={{ fontSize: 16.5 }}>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogPage() {
  return (
    <section className="block" style={{ paddingTop: 56 }}>
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Blog</span>
          <h2>Guides on solar, energy and electrical safety in Nigeria.</h2>
        </div>
        <div className="grid grid-4">
          {BLOG_POSTS.map((post) => (
            <div className="card" key={post.title}>
              <div className="blog-thumb">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.6"><circle cx="12" cy="12" r="5" /></svg>
              </div>
              <span className="blog-tag">{post.tag}</span>
              <h3 style={{ fontSize: 16 }}>{post.title}</h3>
              <p style={{ fontSize: 13.5 }}>{post.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqsPage() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section className="block" style={{ paddingTop: 56 }}>
      <div className="wrap" style={{ maxWidth: 820 }}>
        <div className="section-head">
          <span className="eyebrow">FAQs</span>
          <h2>Common questions, answered.</h2>
        </div>
        <div>
          {FAQS.map((f, i) => (
            <div className={"faq-item" + (openIndex === i ? " open" : "")} key={f.q}>
              <div className="faq-q" onClick={() => setOpenIndex(openIndex === i ? -1 : i)}>
                {f.q}<span className="plus">+</span>
              </div>
              <div className="faq-a">{f.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  const submit = (e) => { e.preventDefault(); setSent(true); e.target.reset(); };
  return (
    <section className="block" style={{ paddingTop: 56 }}>
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Contact Us</span>
          <h2>Let's talk about your energy needs.</h2>
        </div>
        <div className="split" style={{ alignItems: "flex-start" }}>
          <div className="contact-info-card">
            <div className="row">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.8 2Z" /></svg>
              <div><b>Phone</b><span>+234 800 000 0000 · +234 800 000 0001</span></div>
            </div>
            <div className="row">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 6l10 7 10-7" /></svg>
              <div><b>Email</b><span>info@voltarisenergy.com</span></div>
            </div>
            <div className="row">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>
              <div><b>Office</b><span>Voltaris House, Victoria Island, Lagos, Nigeria</span></div>
            </div>
            <div className="row">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M21 11.5a8.4 8.4 0 0 1-8.9 8.4 8.5 8.5 0 0 1-4-.9L3 21l1.1-5a8.4 8.4 0 0 1-.9-4A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5Z" /></svg>
              <div><b>WhatsApp</b><span>Chat with us instantly — tap the button below</span></div>
            </div>
            <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 10 }}
              onClick={() => window.open("https://wa.me/2348000000000", "_blank")}>
              Chat on WhatsApp
            </button>
          </div>

          <form onSubmit={submit}>
            <div className="form-grid">
              <div className="field"><label htmlFor="cf-name">Full name</label><input id="cf-name" required placeholder="Your name" /></div>
              <div className="field"><label htmlFor="cf-phone">Phone number</label><input id="cf-phone" required placeholder="080..." /></div>
              <div className="field full"><label htmlFor="cf-email">Email address</label><input id="cf-email" type="email" required placeholder="you@example.com" /></div>
              <div className="field full">
                <label htmlFor="cf-service">Service interested in</label>
                <select id="cf-service">
                  <option>Solar Installation</option>
                  <option>Electrical Installation</option>
                  <option>Maintenance &amp; Support</option>
                  <option>Energy Consultation</option>
                </select>
              </div>
              <div className="field full"><label htmlFor="cf-msg">Message</label><textarea id="cf-msg" rows="5" placeholder="Tell us about your project..." /></div>
            </div>
            <button className="btn btn-primary" type="submit" style={{ marginTop: 6 }}>Send Message</button>
            {sent && <p style={{ color: "var(--green)", fontWeight: 600, marginTop: 14, fontSize: 14 }}>
              Thanks — your message has been received. We'll be in touch shortly.
            </p>}
          </form>
        </div>
      </div>
    </section>
  );
}

function QuotePage() {
  const [sent, setSent] = useState(false);
  const submit = (e) => { e.preventDefault(); setSent(true); e.target.reset(); };
  return (
    <section className="block" style={{ paddingTop: 56 }}>
      <div className="wrap" style={{ maxWidth: 720 }}>
        <div className="section-head">
          <span className="eyebrow">Get a Quote</span>
          <h2>Tell us about your project.</h2>
          <p>Fill this in and our engineering team will respond with a tailored quote within 24 hours.</p>
        </div>
        <form onSubmit={submit}>
          <div className="form-grid">
            <div className="field"><label htmlFor="q-name">Full name</label><input id="q-name" required /></div>
            <div className="field"><label htmlFor="q-phone">Phone number</label><input id="q-phone" required /></div>
            <div className="field">
              <label htmlFor="q-type">Property type</label>
              <select id="q-type"><option>Residential</option><option>Commercial</option><option>Industrial</option></select>
            </div>
            <div className="field">
              <label htmlFor="q-service">Service needed</label>
              <select id="q-service"><option>Solar Energy Solution</option><option>Electrical Service</option><option>Energy Consultation</option><option>Not sure yet</option></select>
            </div>
            <div className="field full"><label htmlFor="q-location">Location (state)</label><input id="q-location" placeholder="e.g. Lagos" /></div>
            <div className="field full"><label htmlFor="q-details">Project details</label><textarea id="q-details" rows="5" placeholder="Estimated load, current power source, timeline..." /></div>
          </div>
          <button className="btn btn-primary" type="submit">Request My Free Quote</button>
          {sent && <p style={{ color: "var(--green)", fontWeight: 600, marginTop: 14, fontSize: 14 }}>
            Thank you — your quote request has been received. Our team will reach out shortly.
          </p>}
        </form>
      </div>
    </section>
  );
}

function Footer({ setPage }) {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="logo" style={{ marginBottom: 14 }}>
              <svg className="logo-mark" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="21" stroke="#F5B700" strokeWidth="2.4" />
                <path d="M26 8 L15 27 H22 L20 40 L33 20 H26 L26 8Z" fill="#F5B700" />
              </svg>
              <span className="logo-word">VOLTARIS <span>ENERGY</span></span>
            </div>
            <p style={{ maxWidth: 320, fontSize: 14 }}>Empowering homes and businesses with intelligent, sustainable and reliable energy solutions across Nigeria.</p>
            <div className="badge-row">
              <span className="pill">Solar</span><span className="pill">Electrical</span><span className="pill">Energy Audits</span>
            </div>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setPage("about"); }}>About Us</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setPage("services"); }}>Services</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setPage("projects"); }}>Projects</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setPage("blog"); }}>Blog</a></li>
            </ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setPage("services"); }}>Solar Installation</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setPage("services"); }}>Electrical Installation</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setPage("services"); }}>Maintenance</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setPage("faqs"); }}>FAQs</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>+234 800 000 0000</li>
              <li>info@voltarisenergy.com</li>
              <li>Victoria Island, Lagos, Nigeria</li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Voltaris Energy. All rights reserved.</span>
          <span>Powering a Brighter Tomorrow.</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- App ---------- */
export default function App() {
  const [page, setPage] = useState("home");

  const pages = {
    home: <HomePage setPage={setPage} />,
    about: <AboutPage />,
    services: <ServicesPage />,
    projects: <ProjectsPage />,
    products: <ProductsPage />,
    blog: <BlogPage />,
    faqs: <FaqsPage />,
    contact: <ContactPage />,
    quote: <QuotePage />,
  };

  return (
    <>
      <Header page={page} setPage={setPage} />
      <main>{pages[page] || pages.home}</main>
      <Footer setPage={setPage} />
      <button className="whatsapp-fab" aria-label="Chat on WhatsApp"
        onClick={() => window.open("https://wa.me/2348000000000", "_blank")}>
        <svg viewBox="0 0 24 24"><path d="M21 11.5a8.4 8.4 0 0 1-8.9 8.4 8.5 8.5 0 0 1-4-.9L3 21l1.1-5a8.4 8.4 0 0 1-.9-4A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5Z" /></svg>
      </button>
    </>
  );
}
