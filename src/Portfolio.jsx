import { useEffect, useRef, useState } from "react";

// ─── Data ───────────────────────────────────────────────────────────
const EXPERIENCES = [
  {
    title: "ASU Bermuda Institute of Ocean Sciences (BIOS)",
    slug: "asu-bios",
    year: "2026",
    month: 6,
    duration: 2,
    category: ["Dev", "Data"],
    role: "Incoming Database Development Intern",
    technologies: ["Python", "PostgreSQL"], // update
    url: "https://bios.asu.edu/"
  },
  {
    title: "Hoagie.io (Princeton Application System)",
    slug: "hoagie-io",
    year: "2025",
    month: 9,
    duration: "present",
    category: ["Dev", "Design"],
    role: "HoagieMeal PM & Full-Stack Developer",
    technologies: ["Django", "Next.js", "PostgreSQL", "Figma"],
    url: "https://hoagie.io/"
  },
  {
    title: "Princeton AI Review",
    slug: "pair",
    year: "2026",
    month: 1,
    duration: "present",
    category: ["Dev", "Data"],
    role: "Data & Archives Lead",
    technologies: ["Django", "Railway", "SupaBase",],
    url: "https://not_yet_made/"  // update
  },
  {
    title: "Princeton Vision and Learning Lab",
    slug: "pvl",
    year: "2025",
    month: 12,
    duration: "present",
    category: ["Research", "ML/AI", "Dev"],
    role: "Undergraduate Computer Vision Researcher",
    technologies: ["Python", "Blender", "Newton"],
    url: "https://pvl.cs.princeton.edu/"
  },
  {
    title: "SIMA Princeton Research Team",
    slug: "sima",
    year: "2026",
    month: 1,
    duration: "present",
    category: ["Quant", "Research"],
    role: "Quantitative Research Associate, Real Estate Team",
    technologies: ["GEE", "Python", "Jupyter/Colab"],
    url: "https://www.simainsights.com/" // update?
  },
  {
    title: "Princeton Quantitative Traders",
    slug: "pqt",
    year: "2025",
    month: 9,
    duration: "present",
    category: ["Quant", "ML/AI"],
    role: "Competitor",
    technologies: ["Kaggle", "Jupyter/Colab"],
    url: "https://princeton-quant.com/"
  },
  {
    title: "Princeton ACM",
    slug: "princeton-acm",
    year: "2025",
    month: 9,
    duration: "present",
    category: ["ML/AI", "Research"],
    role: "NLP & CV & QFE Reading Group Member",
    technologies: ["arXiv"],
    url: "https://princetonacm.github.io/"
  }
].sort((a, b) => b.month - a.month).sort((a, b) => b.year - a.year);

const toMonths = (year, month) => parseInt(year) * 12 + month;
const NOW_MONTHS = toMonths(new Date().getFullYear(), new Date().getMonth() + 1);
const NUMERIC_MAX = Math.max(...EXPERIENCES.filter(p => typeof p.duration === "number").map(p => toMonths(p.year, p.month) + p.duration));
const PRESENT_MAX = Math.max(NUMERIC_MAX, NOW_MONTHS);
const effectiveDuration = (p) => p.duration === "present" ? PRESENT_MAX - toMonths(p.year, p.month) : p.duration;
const TIMELINE_MIN = Math.min(...EXPERIENCES.map(p => toMonths(p.year, p.month)));
const TIMELINE_MAX = Math.max(...EXPERIENCES.map(p => toMonths(p.year, p.month) + effectiveDuration(p)));
const TIMELINE_SPAN = TIMELINE_MAX - TIMELINE_MIN;

const MONTH_ABBR = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const fmtMonths = (m) => `${MONTH_ABBR[(m - 1) % 12]} ${Math.floor((m - 1) / 12)}`;

const COLOR_MAP = {
  "category-dev": "#6495ed",
  "category-ml/ai": "tomato",
  "category-quant": "#daedf3",
  "category-research": "#eeb7ee",
  "category-data": "#87ceeb",
  "category-design": "khaki",

  "technologies-blender": "#bdb76b",
  "technologies-postgresql": "#fbf4b5",
  "technologies-arxiv": "#ff98cb",
  "technologies-newton": "#f3add0",
  "technologies-nextjs": "#deb887",
  "technologies-gee": "#91b3f2",
  "technologies-supabase": "#ebdac5",
  "technologies-railway": "#dfcaae",
  "technologies-jupyter/colab": "#ffe4e1",
  "technologies-kaggle": "#fffacd",
  "technologies-figma": "plum",
  "technologies-python": "#ff69b4",
  "technologies-django": "#b0e0e6",

  "color1": "#ffdab9",
  "color2": "olive",
  "color3": "tan",
  "color4": "#add8e6",
  "color5": "#d8bfd8",
  "color6": "#fafad2",
};

const slugify = (s) =>
  s.toLowerCase().replace("-", "").replace(".", "").replace(" & ", " ").replace(/ /g, "-");

const colorKey = (type, value) => `${type}-${slugify(value)}`;
const getColor = (type, value) => COLOR_MAP[colorKey(type, value)] || "#ddd";

const ACCENT_COLORS = [
  "tomato", "hotpink", "plum", "powderblue",
  "khaki", "thistle", "mistyrose", "cornflowerblue",
];

const accentFontFamily = '"Marist", Georgia, "Times New Roman", serif';

// ─── Components ─────────────────────────────────────────────────────

function MetaButton({ type, value, isActive, isHovered, hasActive, onClick, onMouseEnter, onMouseLeave, revealed }) {
  const bg = isActive || isHovered || !hasActive ? getColor(type, value) : "transparent";
  const showLabel = !hasActive || isActive || isHovered;

  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        fontWeight: 700,
        textAlign: "left",
        padding: "4px",
        width: "100%",
        cursor: "pointer",
        height: "100%",
        transition: "background-color 0.15s, opacity 0.15s",
        backgroundColor: bg,
        overflow: "hidden",
        whiteSpace: "nowrap",
        opacity: revealed ? 1 : 0,
        fontSize: "inherit",
      }}
    >
      <p
        style={{
          opacity: showLabel ? 1 : 0,
          transition: "opacity 0.15s",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: "#000",
        }}
      >
        {value}
      </p>
    </button>
  );
}

function ExperienceRow({ experience, hovered, setHovered, active, setActive, isMobile, revealed, setHoveredCol, isFirst }) {
  const { title, year, month, slug, role, url, category, technologies } = experience;
  const barLeft = (toMonths(year, month) - TIMELINE_MIN) / TIMELINE_SPAN;
  const barWidth = effectiveDuration(experience) / TIMELINE_SPAN;
  const isHovered = hovered?.slug === slug;
  const anyHovered = !!hovered;
  const hasActive = !!(active?.category || active?.technologies);
  const dimmed = anyHovered && !isHovered;

  const metaGroups = [
    { type: "category", items: category },
    { type: "technologies", items: technologies },
  ];

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "8px",
          fontSize: "inherit",
        }}
      >
        {/* Timeline bar */}
        <div
          style={{
            paddingTop: "8px",
            paddingBottom: "8px",
            opacity: revealed ? 1 : 0,
            transition: "opacity 0.6s",
            display: "flex",
            alignItems: "center",
            borderTop: isFirst ? "1px solid var(--gray-300)" : undefined,
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "1px", backgroundColor: "var(--gray-300)" }}>
            <div
              style={{
                position: "absolute",
                top: "-2px",
                left: `${barLeft * 100}%`,
                width: `${barWidth * 100}%`,
                height: "5px",
                backgroundColor: dimmed ? "var(--gray-300)" : getColor("category", category[0]),
                transition: "background-color 0.15s",
              }}
            />
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            gridColumn: "2 / span 2",
            padding: "8px 0",
            borderTop: "1px solid var(--gray-300)",
            opacity: revealed ? 1 : 0,
            transition: "opacity 0.6s",
          }}
          onMouseEnter={() => !isMobile && setHovered({ slug, year })}
          onMouseLeave={() => setHovered(null)}
        >
          <a
            href={url || "#"}
            target={url ? "_blank" : undefined}
            rel="noopener noreferrer"
            title={url ? "View experience" : "Coming soon"}
            style={{
              display: "block",
              paddingRight: "10%",
              transition: "color 0.15s",
              color: dimmed ? "var(--gray-500)" : "inherit",
              cursor: url ? "pointer" : "default",
            }}
          >
            <h2 style={{ display: "inline", fontWeight: 700 }}>
              {title}
              {!isMobile && (
                <span
                  style={{
                    display: "inline-block",
                    marginLeft: "4px",
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.15s",
                  }}
                >
                  {url ? "↗" : "🔜"}
                </span>
              )}
            </h2>
            <p
              style={{
                marginTop: "2px",
                color: dimmed ? "var(--gray-400)" : "var(--gray-500)",
                fontFamily: accentFontFamily,
                fontSize: "0.9rem",
                transition: "color 0.15s",
              }}
            >
              {role}
            </p>
          </a>
        </div>

        {/* Meta columns (hidden on mobile) */}
        <div
          style={{
            gridColumn: "span 2",
            display: isMobile ? "none" : "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
          }}
          onMouseEnter={() => !isMobile && setHovered({ slug, year })}
          onMouseLeave={() => setHovered(null)}
        >
          {metaGroups.map(({ type, items }) => (
            <div
              key={`${slug}-${type}`}
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${items.length}, 1fr)`,
              }}
              onMouseEnter={() => setHoveredCol(type)}
              onMouseLeave={() => setHoveredCol(null)}
            >
              {items.map((val) => (
                <MetaButton
                  key={`${slug}-${type}-${val}`}
                  type={type}
                  value={val}
                  isActive={active?.[type] === val}
                  isHovered={isHovered}
                  hasActive={hasActive || anyHovered}
                  revealed={revealed}
                  onClick={() =>
                    setActive((prev) =>
                      prev?.[type] === val ? { ...prev, [type]: null } : { ...prev, [type]: val }
                    )
                  }
                />
              ))}
            </div>
          ))}
        </div>

        {/* Mobile meta (2 cols of colored buttons) */}
        {isMobile && (
          <div
            style={{
              gridColumn: "span 2",
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
            }}
          >
            {metaGroups.map(({ type, items }) => (
              <div key={`${slug}-${type}-m`} style={{ display: "flex", flexDirection: "column" }}>
                {items.map((val) => (
                  <MetaButton
                    key={`${slug}-${type}-${val}-m`}
                    type={type}
                    value={val}
                    isActive={active?.[type] === val}
                    isHovered={false}
                    hasActive={hasActive}
                    revealed={revealed}
                    onClick={() =>
                      setActive((prev) =>
                        prev?.[type] === val ? { ...prev, [type]: null } : { ...prev, [type]: val }
                      )
                    }
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MobileKey({ active, setActive, visible }) {
  const [expanded, setExpanded] = useState(false);
  const allCategories = [...new Set(EXPERIENCES.flatMap((p) => p.category))].sort();
  const allTech = [...new Set(EXPERIENCES.flatMap((p) => p.technologies))].sort();
  const hasActive = !!(active?.category || active?.technologies);

  const groups = [
    { type: "category", items: allCategories },
    { type: "technologies", items: allTech },
  ];

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "8px",
        left: "8px",
        right: "8px",
        background: "#e5e7eb",
        zIndex: 100,
        padding: "8px",
        fontSize: "0.85rem",
      }}
    >
      {expanded && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", marginBottom: "8px" }}>
          {groups.map(({ type, items }) => (
            <div key={type} style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  padding: "4px",
                  fontWeight: 700,
                  textTransform: "capitalize",
                  background: "#f3f4f6",
                  opacity: 0.5,
                }}
              >
                {type}
              </div>
              {items.map((val) => (
                <button
                  key={val}
                  onClick={() =>
                    setActive((prev) =>
                      prev?.[type] === val ? { ...prev, [type]: null } : { ...prev, [type]: val }
                    )
                  }
                  style={{
                    padding: "4px",
                    textAlign: "left",
                    fontWeight: 700,
                    cursor: "pointer",
                    backgroundColor: getColor(type, val),
                    border: active?.[type] === val ? "2px solid black" : "2px solid transparent",
                  }}
                >
                  {val}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "space-between", gap: "8px" }}>
        <button
          style={{
            fontWeight: 700,
            cursor: "pointer",
            opacity: hasActive ? 1 : 0,
            pointerEvents: hasActive ? "auto" : "none",
            transition: "opacity 0.15s",
          }}
          onClick={() => setActive(null)}
        >
          Reset filters
        </button>
        <button style={{ fontWeight: 700, cursor: "pointer" }} onClick={() => setExpanded(!expanded)}>
          {expanded ? "Hide" : "Show"} key
        </button>
      </div>
    </div>
  );
}

// ─── Main App ───────────────────────────────────────────────────────
export default function Portfolio() {
  const [accentColor, setAccentColor] = useState(ACCENT_COLORS[0]);
  const [copied, setCopied] = useState(false);
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [hoveredCol, setHoveredCol] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [tableIndex, setTableIndex] = useState(0);
  const TABLE_NAMES = ["Experiences", "Projects", "Coursework"];
  const navRef = useRef(null);
  const currentYear = new Date().getFullYear();

  // Cycle accent color
  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % ACCENT_COLORS.length;
      setAccentColor(ACCENT_COLORS[idx]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--color-accent", accentColor);
  }, [accentColor]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    const measure = () => {
      const h = Math.floor(navRef.current.offsetHeight);
      document.documentElement.style.setProperty("--nav-height", `${h}px`);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const copyEmail = () => {
    navigator.clipboard?.writeText("mathiasnvd07@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // in future, add 3rd category "type"? for internships/research/co-curriculars? // update
  const colHeaders = [{ label: "Foci", type: "category" }, { label: "Technologies", type: "technologies" }];

  return (
    <div
      style={{
        padding: "0 8px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        lineHeight: 1.2,
        fontSize: "1.00rem",
      }}
    >
      {/* ─── Sticky Nav ─── */}
      <div style={{ position: "sticky", top: 0, left: 0, right: 0, zIndex: 100 }}>
        <div
          ref={navRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "0 8px",
            padding: "8px 0",
            background: "var(--background)",
          }}
        >
          <div style={{ gridColumn: isMobile ? "span 6" : "span 3", fontWeight: 700 }}>
            <div style={{ display: "inline-flex", alignItems: "flex-start" }}>
              <a href="#" style={{ display: "block" }}>
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    marginRight: "4px",
                    marginTop: isMobile ? "3px" : "2px",
                    backgroundColor: accentColor,
                    transition: "background-color 0.3s",
                  }}
                />
              </a>
              <div>
                <h1 style={{ display: "inline", fontWeight: 700 }}>
                  <a href="/">Mathias Nguyen-Van-Duong</a>
                </h1>
                <span>,</span>
                <p>Computer Science B.S.E. Student, Princeton</p>
                <p>Experiences, Projects, and Coursework: 2025–{currentYear}</p>
              </div>
            </div>
          </div>

          <div
            className="nav-links"
            style={{
              gridColumn: isMobile ? "2 / span 5" : "4 / span 2",
              fontWeight: 700,
            }}
          >
            <span onClick={copyEmail} style={{ cursor: "pointer" }}>
              {copied ? "Copied" : "Email"}
            </span>
            <span>, </span>
            <a href="https://linkedin.com/in/mathiasnvd" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <span>, </span>
            <a href="https://github.com/matnvd" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>

          <div
            style={{
              textAlign: isMobile ? "left" : "right",
              fontWeight: 700,
              ...(isMobile ? { gridColumn: "4 / span 3" } : {}),
            }}
          >
            Updated {__BUILD_DATE__}
          </div>
        </div>
      </div>

      {/* ─── Main Content ─── */}
      <main style={{ paddingTop: isMobile ? "40px" : "160px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "32px", fontFamily: accentFontFamily, fontSize: "1.5rem", fontWeight: 700 }}>
          <button
            onClick={() => setTableIndex((tableIndex - 1 + TABLE_NAMES.length) % TABLE_NAMES.length)}
            style={{ cursor: "pointer", fontSize: "inherit", fontWeight: "inherit", color: "var(--gray-400)", transition: "color 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--foreground)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--gray-400)"}
          >&lt;</button>
          <span style={{ display: "inline-block", textAlign: "center", width: "10ch" }}>{ TABLE_NAMES[tableIndex] }</span>
          <button
            onClick={() => setTableIndex((tableIndex + 1) % TABLE_NAMES.length)}
            style={{ cursor: "pointer", fontSize: "inherit", fontWeight: "inherit", color: "var(--gray-400)", transition: "color 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--foreground)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--gray-400)"}
          >&gt;</button>
        </div>
        <section style={{ width: "100%", paddingBottom: isMobile ? "16px" : "8px" }}>
          {/* Column Headers */}
          <div
            style={{
              position: "sticky",
              top: "var(--nav-height)",
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "8px",
              paddingTop: "28px",
              paddingBottom: "4px",
              background: "var(--background)",
              zIndex: 10,
              fontSize: "0.9rem",
              fontFamily: accentFontFamily,
              color: "#fff",
            }}
          >
            <div style={{ gridColumn: "span 1", paddingTop: "4px", borderTop: "1px solid var(--gray-300)", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{fmtMonths(TIMELINE_MIN)}</span>
                <span>{fmtMonths(TIMELINE_MAX)}</span>
              </div>
              {/* <div style={{ width: "100%", height: "1px", backgroundColor: "var(--gray-300)", marginTop: "4px" }} /> */}
            </div>
            <div style={{ gridColumn: "span 2", paddingTop: "4px", borderTop: "1px solid var(--gray-300)" }}>
              Experience
            </div>
            {!isMobile ? (
              colHeaders.map(({ label, type }) => (
                <div
                  key={type}
                  style={{ gridColumn: "span 1", paddingTop: "4px", borderTop: "1px solid var(--gray-300)" }}
                >
                  {hoveredCol === type ? <span style={{opacity: 0.4 }}>Click to filter</span> : label}
                </div>
              ))
            ) : (
              <div style={{ gridColumn: "span 2", paddingTop: "4px", borderTop: "1px solid var(--gray-300)" }}>
                Click to filter
              </div>
            )}
          </div>

          {/* Experiences */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {EXPERIENCES.map((experience, i) => (
              <ExperienceRow
                key={experience.slug}
                experience={experience}
                hovered={hovered}
                setHovered={setHovered}
                active={active}
                setActive={setActive}
                isMobile={isMobile}
                revealed={revealed}
                setHoveredCol={setHoveredCol}
                isFirst={i === 0}
              />
            ))}
          </div>
        </section>
      </main>

      {isMobile && <MobileKey active={active} setActive={setActive} visible={revealed} />}
    </div>
  );
}
