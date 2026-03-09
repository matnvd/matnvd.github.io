import { useEffect, useRef, useState } from "react";

// ─── Data ───────────────────────────────────────────────────────────
const EXPERIENCES_DATA = [
  {
    title: "ASU Bermuda Institute of Ocean Sciences (BIOS)",
    slug: "asu-bios",
    year: "2026",
    month: 6,
    duration: 2,
    category: ["Dev", "Data"],
    description: "Incoming Database Development Intern",
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
    description: "HoagieMeal PM & Full-Stack Developer",
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
    description: "Data & Archives Lead",
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
    description: "Undergraduate Computer Vision Researcher",
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
    description: "Quantitative Research Associate, Real Estate Team",
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
    description: "Competitor",
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
    description: "NLP & CV & QFE Reading Group Member",
    technologies: ["arXiv"],
    url: "https://princetonacm.github.io/"
  }
].sort((a, b) => b.month - a.month).sort((a, b) => b.year - a.year);

// uses end date as month instead of start like experiences
const PROJECTS_DATA = [
  {
    "title": "Project R.I.P. (Roleplay Inference Pipeline)",
    "slug": "project-rip",
    "year": "2026",
    "month": 2,
    "duration": 3,
    "category": ["ML/AI", "RAG", "Data", "Scraping"],
    "description": "Modular RAG pipeline for high-fidelity persona agent revival using Gradio.",
    "technologies": ["Python", "LangChain", "Pinecone", /*"Gradio"*/],
    "url": "https://github.com/matnvd/roleplay-inference-pipeline"
  },
  {
    "title": "Swappa Listing Alerts",
    "slug": "swappa-listing-alerts",
    "year": "2024",
    "month": 7,
    "duration": 2,
    "category": ["Cloud Automation"],
    "description": "Automated GCP pipeline for real-time marketplace listing notifications.",
    "technologies": ["GCP", "REST APIs", "Regex"],
    "url": "https://www.macrodroidforum.com/index.php?threads/swappa-alerts.7631/"
  },
  {
    "title": "InfoBand",
    "slug": "infoband",
    "year": "2025",
    "month": 6,
    "duration": 16,
    "category": ["Mobile App", "Production"],
    "description": "NFC-enabled mobile app for 3D-printed digitalized medical ID bracelets.",
    "technologies": ["Dart/Flutter", "NFC", "Git", "CAD"],
    "url": "https://github.com/matnvd/infoband"
  },
  {
    "title": "RHS Student App",
    "slug": "rhs-student-app",
    "year": "2025",
    "month": 6,
    "duration": 24,
    "category": ["Mobile App", "Production"],
    "description": "Official high school app serving over 1,000 students.",
    "technologies": ["Git", "Dart/Flutter", "Firebase", ],
    "url": "https://apps.apple.com/us/app/rhs-student-app/id6466660622"
  },
  {
    "title": "Row City",
    "slug": "row-city",
    "year": "2024",
    "month": 6,
    "duration": 3,
    "category": ["Mobile App", "Scraping"],
    "description": "Scraping-based mobile app for live regatta results aggregation.",
    "technologies": ["Dart/Flutter", "Git"],
    "url": "https://github.com/matnvd/Row-City"
  }
].sort((a, b) => b.month - a.month).sort((a, b) => b.year - a.year);

const COURSEWORK_DATA = [
  {
    "title": "Introduction to Machine Learning",
    "slug": "cos324",
    "year": "Spring 2026",
    "month": 1,
    "duration": 4,
    "category": ["Computer Science"],
    "description": "COS324",
    "technologies": ["Python", "Jupyter", "LaTeX"],
    "url": ""
  },
  {
    "title": "Algorithms and Data Structures",
    "slug": "cos226",
    "year": "Fall 2025",
    "month": 9,
    "duration": 4,
    "category": ["Computer Science"],
    "description": "COS226",
    "technologies": ["Java"],
    "url": ""
  },
  {
    "title": "Fundamentals of Statistics",
    "slug": "orf245",
    "year": "Fall 2025",
    "month": 9,
    "duration": 4,
    "category": ["Operations Research & Financial Engineering"],
    "description": "ORF245",
    "technologies": ["R"],
    "url": ""
  },
  {
    "title": "Linear Algebra with Applications",
    "slug": "mat202",
    "year": "Spring 2026",
    "month": 1,
    "duration": 4,
    "category": ["Mathematics"],
    "description": "MAT202",
    "technologies": ["LaTeX"],
    "url": ""
  },
  {
    "title": "Multivariable Calculus",
    "slug": "mat201",
    "year": "Fall 2025",
    "month": 9,
    "duration": 4,
    "category": ["Mathematics"],
    "description": "MAT201",
    "technologies": ["LaTeX"],
    "url": ""
  },
  {
    "title": "Foundations of Engineering: Electricity, Magnetism, and Photonics",
    "slug": "egr153",
    "year": "Spring 2026",
    "month": 1,
    "duration": 4,
    "category": ["Physics"],
    "description": "EGR153",
    "technologies": ["MATLAB"],
    "url": ""
  },
  {
    "title": "Foundations of Engineering: Mechanics, Energy, and Waves",
    "slug": "egr151",
    "year": "Fall 2025",
    "month": 9,
    "duration": 4,
    "category": ["Physics"],
    "description": "EGR151",
    "technologies": ["MATLAB", "SolidWorks", "LaTeX"],
    "url": ""
  },
  {
    "title": "Priceless (Measuring Value)",
    "slug": "wri143",
    "year": "Spring 2026",
    "month": 1,
    "duration": 4,
    "category": ["Seminar"],
    "description": "WRI143",
    "technologies": ["Research"],
    "url": ""
  },
  {
    "title": "Families and History",
    "slug": "frs102",
    "year": "Spring 2026",
    "month": 1,
    "duration": 4,
    "category": ["Seminar"],
    "description": "FRS102",
    "technologies": ["Research"],
    "url": ""
  }
].sort((a, b) => {
  const yearA = parseInt(a.year.split(" ")[1]);
  const yearB = parseInt(b.year.split(" ")[1]);
  return yearB - yearA || b.month - a.month;
});

const toMonths = (year, month) => parseInt(year) * 12 + month;
const NOW_MONTHS = toMonths(new Date().getFullYear(), new Date().getMonth() + 1);

function computeTimeline(data) {
  const numericEntries = data.filter(p => typeof p.duration === "number");
  const numericMax = numericEntries.length
    ? Math.max(...numericEntries.map(p => toMonths(p.year, p.month) + p.duration))
    : NOW_MONTHS;
  const presentMax = Math.max(numericMax, NOW_MONTHS);
  const effDur = (p) => p.duration === "present" ? presentMax - toMonths(p.year, p.month) : p.duration;
  const min = Math.min(...data.map(p => toMonths(p.year, p.month)));
  const max = Math.max(...data.map(p => toMonths(p.year, p.month) + effDur(p)));
  return { effectiveDuration: effDur, TIMELINE_MIN: min, TIMELINE_MAX: max, TIMELINE_SPAN: max - min };
}

const MONTH_ABBR = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const fmtMonths = (m) => `${MONTH_ABBR[(m - 1) % 12]} ${Math.floor((m - 1) / 12)}`;

const COLOR_MAP = {
  // experience colors
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

  // project colors
  "category-mobile-app": "#6495ed", // same as dev
  "category-cloud-automation": "#00b953",
  "category-scraping": "tan",
  "category-production": "#ffe4e1", // same as jupyter/colab
  "category-rag": "#eeb7ee", // same as research

  "technologies-pinecone": "#1ee477",
  "technologies-nfc": "#ebdac5", // same as supabase
  "technologies-regex": "#ffdab9",
  "technologies-cad": "#fafad2",
  "technologies-langchain": "#d8bfd8",
  "technologies-rest-apis": "khaki",
  "technologies-dart/flutter": "#add8e6",
  "technologies-gcp": "plum", // same as figma
  "technologies-firebase": "#deb887", // same as nextjs
  "technologies-gradio": "#f3add0", //same as newton
  "technologies-git": "#daedf3", // same as quant

  // coursework colors
  "category-computer-science": "tomato", // same as ml/ai
  "category-operations-research-financial-engineering": "#87ceeb", // same as data
  "category-mathematics": "#6495ed", // same as dev
  "category-physics": "plum", // same as figma/gcp
  "category-seminar": "#daedf3", // same as figma

  "technologies-research": "#eeb7ee", // same as research/rag
  "technologies-jupyter": "#ffe4e1", // same as jupyter/colab
  "technologies-matlab": "#b0e0e6", // same as django
  "technologies-latex": "#1ee477", // same as pinecone
  "technologies-java": "#ff98cb", // same as arxiv
  "technologies-r": "#deb887", // same as nextjs
  "technologies-solidworks": "#dfcaae", // same as railway
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
const GRID_EXPERIENCES = "repeat(5, 1fr)";
const GRID_PROJECTS = "repeat(5, 1fr)";

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

function ExperienceRow({ experience, hovered, setHovered, active, setActive, isMobile, revealed, setHoveredCol, isFirst, timeline, onHoverSound }) {
  const { title, year, month, slug, description, url, category, technologies } = experience;
  const barLeft = (toMonths(year, month) - timeline.TIMELINE_MIN) / timeline.TIMELINE_SPAN;
  const barWidth = timeline.effectiveDuration(experience) / timeline.TIMELINE_SPAN;
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
          gridTemplateColumns: GRID_EXPERIENCES,
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
          onMouseEnter={() => {
            if (!isMobile) {
                setHovered({ slug, year });
                onHoverSound();
            }
          }}
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
              {description}
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
                  onMouseEnter={onHoverSound}
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

function ProjectRow({ project, prevYear, hovered, setHovered, active, setActive, isMobile, revealed, setHoveredCol, showComingSoon = true, onHoverSound }) {
  const { title, year, slug, description, url, category, technologies } = project;
  const showYear = prevYear !== year;
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
          gridTemplateColumns: GRID_PROJECTS,
          gap: "8px",
          fontSize: "inherit",
        }}
      >
        {/* Year */}
        <div
          style={{
            fontWeight: 700,
            paddingTop: "8px",
            borderTop: showYear ? "1px solid var(--gray-300)" : "none",
            opacity: revealed ? 1 : 0,
            transition: "color 0.15s, opacity 0.6s",
            color: dimmed ? "var(--gray-500)" : "inherit",
          }}
        >
          {showYear ? year : ""}
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
          onMouseEnter={() => {
            if (!isMobile) {
                setHovered({ slug, year });
                onHoverSound();
            }
          }}
          onMouseLeave={() => setHovered(null)}
        >
          <a
            href={url || "#"}
            target={url ? "_blank" : undefined}
            rel="noopener noreferrer"
            title={url ? "View project" : "Coming soon"}
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
                  {url ? "↗" : showComingSoon ? "🔜" : ""}
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
              {description}
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
                  onMouseEnter={onHoverSound}
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

        {/* Mobile meta */}
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
  const allCategories = [...new Set(EXPERIENCES_DATA.flatMap((p) => p.category))].sort();
  const allTech = [...new Set(EXPERIENCES_DATA.flatMap((p) => p.technologies))].sort();
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
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);

  const hoverSound = useRef(null);
  const switchSound = useRef(null);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'light' ? false : true;
    }
    return true;
  });
  const TABLE_NAMES = ["Experiences", "Projects", "Coursework"];
  const TABLE_DATA = [EXPERIENCES_DATA, PROJECTS_DATA, COURSEWORK_DATA];
  const activeData = TABLE_DATA[tableIndex] ?? EXPERIENCES_DATA;
  const timeline = computeTimeline(activeData.length ? activeData : EXPERIENCES_DATA);
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
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  // Audio setup
  useEffect(() => {
    hoverSound.current = new Audio("https://res.cloudinary.com/dwrpq3bxp/video/upload/v1712244344/ES_Switch_Click_2_-_SFX_Producer_jwdojg.mp3");
    switchSound.current = new Audio("https://res.cloudinary.com/dwrpq3bxp/video/upload/v1712241843/click-button-131479_kgipia.mp3");
    hoverSound.current.volume = 0.4;
    switchSound.current.volume = 0.5;
  }, []);

  const playHover = () => {
    if (isSoundEnabled && hoverSound.current) {
      hoverSound.current.currentTime = 0;
      hoverSound.current.play().catch(() => {});
    }
  };

  const playSwitch = () => {
    if (isSoundEnabled && switchSound.current) {
      switchSound.current.currentTime = 0;
      switchSound.current.play().catch(() => {});
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        playSwitch();
        setTableIndex((tableIndex - 1 + TABLE_NAMES.length) % TABLE_NAMES.length);
      } else if (e.key === 'ArrowRight') {
        playSwitch();
        setTableIndex((tableIndex + 1) % TABLE_NAMES.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [tableIndex, TABLE_NAMES, isSoundEnabled]);

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

  // useEffect(() => {
  //   document.body.style.overflowY = 'scroll';
  //   return () => {
  //     document.body.style.overflowY = '';
  //   };
  // }, []);

  // for now hide scrollbar. once get more experiences/projects, // update so that u use code block above
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      ::-webkit-scrollbar {
        display: none;
      }
      * {
        scrollbar-width: none;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const copyEmail = () => {
    navigator.clipboard?.writeText("mathiasnvd07@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // in future, for experiences table add 3rd category "type"? for internships/research/co-curriculars? // update
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
            gridTemplateRows: "auto auto",
            gap: "0 8px",
            padding: "8px 0",
            background: "var(--background)",
          }}
        >
          <div style={{ gridColumn: isMobile ? "span 6" : "span 2", fontWeight: 700 }}>
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
              gridColumn: isMobile ? "2 / span 5" : "3 / span 2",
              fontWeight: 700,
              textAlign: "center",
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
              ...(isMobile ? { gridColumn: "4 / span 3" } : { gridColumn: "5 / span 2" }),
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Updated {__BUILD_DATE__}</span>
            <span>Design from <a href="https://www.nicoleho.net/" target="_blank" rel="noopener noreferrer" style={{ cursor: "pointer", transition: "color 0.15s" }} onMouseEnter={e => e.currentTarget.style.color = "var(--gray-400)"} onMouseLeave={e => e.currentTarget.style.color = "inherit"}>
              Nicole Ho
            </a>'s site</span>

            <div
              style={{
                textAlign: "right",
                fontWeight: 700,
                gridColumn: "6 / 7",
                display: isMobile ? "none" : "flex",
                justifyContent: "flex-end",
                gap: "8px"
              }}
            >
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                style={{
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  fontWeight: 700,
                  color: "inherit",
                  transition: "color 0.15s",
                  padding: "0",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--gray-400)"}
                onMouseLeave={e => e.currentTarget.style.color = "inherit"}
              >
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </button>
              <span style={{ opacity: 0.3 }}>|</span>
              <button
                onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                style={{
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  fontWeight: 700,
                  color: isSoundEnabled ? "inherit" : "var(--gray-400)",
                  transition: "color 0.15s",
                  padding: "0",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--gray-400)"}
                onMouseLeave={e => e.currentTarget.style.color = isSoundEnabled ? "inherit" : "var(--gray-400)"}
              >
                Sound {isSoundEnabled ? "On" : "Off"}
              </button>
            </div>
          </div>

          <div
            style={{
              gridRow: 2,
              gridColumn: "1 / -1",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              fontFamily: accentFontFamily,
              fontSize: "1.5rem",
              fontWeight: 700,
              paddingTop: "80px",
              paddingBottom: "8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button
                onClick={() => {
                    playSwitch();
                    setTableIndex((tableIndex - 1 + TABLE_NAMES.length) % TABLE_NAMES.length);
                }}
                style={{ cursor: "pointer", fontSize: "inherit", fontWeight: "inherit", color: "var(--gray-400)", transition: "color 0.15s", background: "none", border: "none" }}
                onMouseEnter={e => {
                    e.currentTarget.style.color = "var(--foreground)";
                    playHover();
                }}
                onMouseLeave={e => e.currentTarget.style.color = "var(--gray-400)"}
              >&lt;</button>
              <span style={{ display: "inline-block", textAlign: "center", width: "10ch" }}>{ TABLE_NAMES[tableIndex] }</span>
              <button
                onClick={() => {
                    playSwitch();
                    setTableIndex((tableIndex + 1) % TABLE_NAMES.length);
                }}
                style={{ cursor: "pointer", fontSize: "inherit", fontWeight: "inherit", color: "var(--gray-400)", transition: "color 0.15s", background: "none", border: "none" }}
                onMouseEnter={e => {
                    e.currentTarget.style.color = "var(--foreground)";
                    playHover();
                }}
                onMouseLeave={e => e.currentTarget.style.color = "var(--gray-400)"}
              >&gt;</button>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: "4px" }}>
              {TABLE_NAMES.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: i === tableIndex ? "var(--foreground)" : "var(--gray-400)",
                    transition: "background-color 0.15s",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Main Content ─── */}
      <main style={{ paddingTop: isMobile ? "20px" : "80px" }}>
        <section style={{ width: "100%", paddingBottom: isMobile ? "16px" : "8px" }}>
          {/* Column Headers */}
          <div
            style={{
              position: "sticky",
              top: "var(--nav-height)",
              display: "grid",
              gridTemplateColumns: tableIndex === 1 ? GRID_PROJECTS : GRID_EXPERIENCES,
              gap: "8px",
              paddingTop: "28px",
              paddingBottom: "4px",
              background: "var(--background)",
              zIndex: 10,
              fontSize: "0.9rem",
              fontFamily: accentFontFamily,
              color: "var(--foreground)",
            }}
          >
            <div style={{ gridColumn: "span 1", paddingTop: "4px", borderTop: "1px solid var(--gray-300)", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              {tableIndex === 0 ? (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>{fmtMonths(timeline.TIMELINE_MIN)}</span>
                  <span>{fmtMonths(timeline.TIMELINE_MAX)}</span>
                </div>
              ) : "Year"}
            </div>
            <div style={{ gridColumn: "span 2", paddingTop: "4px", borderTop: "1px solid var(--gray-300)" }}>
              {tableIndex === 0 ? "Experience" : tableIndex === 1 ? "Project" : "Course"}
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

          {/* Rows */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {tableIndex === 0
              ? activeData.map((experience, i) => (
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
                    timeline={timeline}
                    onHoverSound={playHover}
                  />
                ))
              : activeData.map((project, i) => (
                  <ProjectRow
                    key={project.slug}
                    project={project}
                    prevYear={activeData[i - 1]?.year}
                    hovered={hovered}
                    setHovered={setHovered}
                    active={active}
                    setActive={setActive}
                    isMobile={isMobile}
                    revealed={revealed}
                    setHoveredCol={setHoveredCol}
                    showComingSoon={tableIndex !== 2}
                    onHoverSound={playHover}
                  />
                ))
            }
          </div>
        </section>
      </main>

      {isMobile && <MobileKey active={active} setActive={setActive} visible={revealed} />}
    </div>
  );
}