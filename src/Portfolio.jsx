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
    description: "HoagieMeal Team Lead, PM, and Developer",
    technologies: ["Django", "Next.js", "PostgreSQL", "Figma"],
    url: "https://meal.hoagie.io/"
  },
  {
    title: "Princeton AI Review",
    slug: "pair",
    year: "2026",
    month: 1,
    duration: "present",
    category: ["Dev", "Data"],
    description: "Backend Lead",
    technologies: ["Django", "Render", "SupaBase",],
    url: "https://pair-dj8z.onrender.com/"  // update
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
    technologies: ["Kaggle", "Jupyter/Colab", "NumPy/Pandas"],
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

// uses end date as month instead of start like experiences, adjusted some to re-order by priority
const PROJECTS_DATA = [
  {
    "title": "Project R.I.P. (Roleplay Inference Pipeline)",
    "slug": "project-rip",
    "year": "2026",
    "month": 3,
    "duration": 4,
    "category": ["ML/AI", "RAG", "Data", "Scraping"],
    "description": "Modular RAG pipeline for high-fidelity persona agent revival using Gradio.",
    "technologies": ["Python", "LangChain", "Pinecone", /*"Gradio"*/],
    "url": "https://github.com/matnvd/roleplay-inference-pipeline"
  },
  {
    "title": "Personal Website",
    "slug": "personal-website",
    "year": "2026",
    "month": 3,
    "duration": 1,
    "category": ["Web Development"],
    "description": "Designer-inspired archive featuring enhanced accessibility and structured project tables.",
    "technologies": ["ReactJS", "HTML/CSS", "Cloudflare"], // + Git + GitHub Pages
    "url": "https://github.com/matnvd/matnvd.github.io"
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
    "title": "Computer Vision",
    "slug": "cos429",
    "year": "Fall 2026",
    "month": 9,
    "duration": 4,
    "category": ["Computer Science"],
    "description": "COS429",
    "technologies": ["Python", "NumPy/Pandas/PyTorch", "Jupyter", ], // update?
    "url": ""
  },
  {
    "title": "Probability and Stochastic Systems",
    "slug": "orf309",
    "year": "Fall 2026",
    "month": 9,
    "duration": 4,
    "category": ["Operations Research & Financial Engineering", "Mathematics"],
    "description": "ORF309/MAT380",
    "technologies": ["LaTeX"], // add others?
    "url": ""
  },
  {
    "title": "Principles of Computer System Design",
    "slug": "cos316",
    "year": "Fall 2026",
    "month": 9,
    "duration": 4,
    "category": ["Computer Science"],
    "description": "COS316",
    "technologies": ["Git", "Unix"], // update?
    "url": ""
  },
  {
    "title": "Introduction to Programming Systems",
    "slug": "cos217",
    "year": "Fall 2026",
    "month": 9,
    "duration": 4,
    "category": ["Computer Science"],
    "description": "COS217",
    "technologies": ["C", "Assembly", "Linux"], // add machine?
    "url": ""
  },
  {
    "title": "Introduction to Macroeconomics",
    "slug": "eco101",
    "year": "Fall 2026",
    "month": 9,
    "duration": 4,
    "category": ["Economics"],
    "description": "ECO101",
    "technologies": ["N/A"], // add machine?
    "url": ""
  },
  {
    "title": "Introduction to Machine Learning",
    "slug": "cos324",
    "year": "Spring 2026",
    "month": 1,
    "duration": 4,
    "category": ["Computer Science"],
    "description": "COS324",
    "technologies": ["Python", "NumPy/Pandas/PyTorch", "Jupyter", ], // add latex? make pandas/pytorch visible?
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
    "category": ["Economics", "Seminar"],
    "description": "WRI143",
    "technologies": ["Research", "Data"],
    "url": ""
  },
  {
    "title": "Families and History",
    "slug": "frs102",
    "year": "Spring 2026",
    "month": 1,
    "duration": 4,
    "category": ["History", "Seminar"],
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
  "technologies-c": "#ff0000",
  "technologies-assembly": "#848484",
  "technologies-linux": "#bababa",
  "technologies-unix": "#bababa",
  "technologies-gee": "#91b3f2",
  "technologies-supabase": "#ebdac5",
  "technologies-render": "#dfcaae",
  "technologies-jupyter/colab": "#ffe4e1",
  "technologies-kaggle": "#fffacd",
  "technologies-figma": "plum",
  "technologies-python": "#ff69b4",
  "technologies-django": "#b0e0e6",
  "technologies-data": "#87ceeb",

  // project colors
  "category-mobile-app": "#6495ed", // same as dev
  "category-cloud-automation": "#00b953",
  "category-scraping": "tan",
  "category-production": "#ffe4e1", // same as jupyter/colab
  "category-rag": "#eeb7ee", // same as research
  "category-web-development": "#b0e0e6", // same as django

  "technologies-html/css": "#f3ecda",
  "technologies-pinecone": "#1ee477",
  "technologies-nfc": "#ebdac5", // same as supabase
  "technologies-regex": "#ffdab9",
  "technologies-cad": "#fafad2",
  "technologies-langchain": "#d8bfd8",
  "technologies-rest-apis": "khaki",
  "technologies-dart/flutter": "#5eb1cd",
  "technologies-reactjs": "#729aff",
  "technologies-gcp": "plum", // same as figma
  "technologies-firebase": "#deb887", // same as nextjs
  "technologies-gradio": "#f3add0", //same as newton
  "technologies-git": "#daedf3", // same as quant
  "technologies-numpy/pandas/pytorch": "#ff81c0",
  "technologies-numpy/pandas": "#ff81c0",

  // coursework colors
  "category-computer-science": "tomato", // same as ml/ai
  "category-operations-research-financial-engineering": "#87ceeb", // same as data
  "category-mathematics": "#6495ed", // same as dev
  "category-physics": "plum", // same as figma/gcp
  "category-seminar": "#daedf3", // same as figma
  "category-economics": "#228B22",
  "category-history": "#c6cd48",

  "technologies-research": "#eeb7ee", // same as research/rag
  "technologies-jupyter": "#ffe4e1", // same as jupyter/colab
  "technologies-matlab": "#b0e0e6", // same as django
  "technologies-latex": "#1ee477", // same as pinecone
  "technologies-java": "#ff98cb", // same as arxiv
  "technologies-r": "#deb887", // same as nextjs
  "technologies-cloudflare": "#ffb14b",
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
    <div data-tooltip={value} style={{ height: "100%", minWidth: 0 }}>
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
    </div>
  );
}

function ExperienceRow({ experience, hovered, setHovered, active, setActive, isMobile, revealed, setHoveredCol, isFirst, timeline, onHoverSound, onClickSound }) {
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
          gridTemplateColumns: isMobile ? "4rem 1fr" : GRID_EXPERIENCES,
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
            gridColumn: isMobile ? "2" : "2 / span 2",
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
            onClick={onClickSound}
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
          {isMobile && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "3px", marginTop: "5px" }}>
              {metaGroups.map(({ type, items }) =>
                items.map((val) => (
                  <button
                    key={`${slug}-${type}-${val}-pill`}
                    onClick={() => {
                      onClickSound();
                      setActive((prev) =>
                        prev?.[type] === val ? { ...prev, [type]: null } : { ...prev, [type]: val }
                      );
                    }}
                    style={{
                      padding: "2px 6px",
                      backgroundColor: getColor(type, val),
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      border: active?.[type] === val ? "1.5px solid var(--foreground)" : "1.5px solid transparent",
                      transition: "background-color 0.15s",
                      color: "#000",
                    }}
                  >
                    {val}
                  </button>
                ))
              )}
            </div>
          )}
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
                  onClick={() => {
                    onClickSound();
                    setActive((prev) =>
                      prev?.[type] === val ? { ...prev, [type]: null } : { ...prev, [type]: val }
                    );
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectRow({ project, prevYear, hovered, setHovered, active, setActive, isMobile, revealed, setHoveredCol, showComingSoon = true, onHoverSound, onClickSound }) {
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
          gridTemplateColumns: isMobile ? "4rem 1fr" : GRID_PROJECTS,
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
            gridColumn: isMobile ? "2" : "2 / span 2",
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
            onClick={onClickSound}
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
          {isMobile && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "3px", marginTop: "5px" }}>
              {metaGroups.map(({ type, items }) =>
                items.map((val) => (
                  <button
                    key={`${slug}-${type}-${val}-pill`}
                    onClick={() => {
                      onClickSound();
                      setActive((prev) =>
                        prev?.[type] === val ? { ...prev, [type]: null } : { ...prev, [type]: val }
                      );
                    }}
                    style={{
                      padding: "2px 6px",
                      backgroundColor: getColor(type, val),
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      border: active?.[type] === val ? "1.5px solid var(--foreground)" : "1.5px solid transparent",
                      transition: "background-color 0.15s",
                      color: "#000",
                    }}
                  >
                    {val}
                  </button>
                ))
              )}
            </div>
          )}
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
                  onClick={() => {
                    onClickSound();
                    setActive((prev) =>
                      prev?.[type] === val ? { ...prev, [type]: null } : { ...prev, [type]: val }
                    );
                  }}
                />
              ))}
            </div>
          ))}
        </div>
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
  const [dividerPos, setDividerPos] = useState(0.5);
  const dividerPosRef = useRef(0.5);
  const dividerContainerRef = useRef(null);
  const leftPanelRef = useRef(null);
  const dividerDragStart = useRef(null);

  const handleDividerTouchStart = (e) => {
    e.stopPropagation();
    dividerDragStart.current = e.touches[0].clientX;
  };
  const handleDividerTouchMove = (e) => {
    e.stopPropagation();
    if (dividerDragStart.current === null || !dividerContainerRef.current) return;
    const dx = e.touches[0].clientX - dividerDragStart.current;
    dividerDragStart.current = e.touches[0].clientX;
    const w = dividerContainerRef.current.offsetWidth;
    const next = Math.max(0.05, Math.min(0.95, dividerPosRef.current + dx / w));
    dividerPosRef.current = next;
    if (leftPanelRef.current) leftPanelRef.current.style.width = `${next * 100}%`;
  };
  const handleDividerTouchEnd = (e) => {
    e.stopPropagation();
    setDividerPos(dividerPosRef.current);
    dividerDragStart.current = null;
  };

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
  const contentRef = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const isDragging = useRef(false);
  const isVertical = useRef(false);
  const isAnimating = useRef(false);
  const swipeFromIndex = useRef(null);
  const hasMounted = useRef(false);
  const currentYear = new Date().getFullYear();
  const N = TABLE_NAMES.length;

  const carouselX = (index, offsetPx = 0) =>
    `translateX(calc(${-(index / N) * 100}% + ${offsetPx}px))`;

  const handleTouchStart = (e) => {
    if (isAnimating.current) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isDragging.current = false;
    isVertical.current = false;
  };

  const handleTouchMove = (e) => {
    if (touchStartX.current === null || isAnimating.current) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;
    if (!isDragging.current && !isVertical.current) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      if (Math.abs(dy) >= Math.abs(dx)) { isVertical.current = true; return; }
      isDragging.current = true;
    }
    if (isVertical.current) return;
    if (contentRef.current) {
      contentRef.current.style.transition = "none";
      contentRef.current.style.transform = carouselX(tableIndex, dx);
    }
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null || isAnimating.current) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    touchStartY.current = null;
    const wasDragging = isDragging.current;
    isDragging.current = false;
    isVertical.current = false;
    if (!wasDragging) return;
    const threshold = window.innerWidth * 0.25;
    if (Math.abs(dx) >= threshold) {
      const dir = dx < 0 ? -1 : 1;
      const nextIndex = (tableIndex - dir + N) % N;
      isAnimating.current = true;
      swipeFromIndex.current = tableIndex;
      if (contentRef.current) {
        contentRef.current.style.transition = "transform 0.25s ease";
        contentRef.current.style.transform = carouselX(nextIndex);
      }
      setTimeout(() => {
        playSwitch();
        setTableIndex(nextIndex);
      }, 250);
    } else {
      if (contentRef.current) {
        contentRef.current.style.transition = "transform 0.25s ease";
        contentRef.current.style.transform = carouselX(tableIndex);
        setTimeout(() => {
          if (contentRef.current) contentRef.current.style.transition = "";
        }, 250);
      }
    }
  };

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
    if (!isMobile || !dividerContainerRef.current) return;
    const W = dividerContainerRef.current.offsetWidth;
    if (W === 0) return;
    // bar sits 7.5px into the divider handle; subtract so bar lands at W/2
    const pos = Math.max(0.05, Math.min(0.95, (W / 2 - 7.5) / W));
    dividerPosRef.current = pos;
    setDividerPos(pos);
    if (leftPanelRef.current) leftPanelRef.current.style.width = `${pos * 100}%`;
  }, [isMobile]);

  useEffect(() => {
    if (!navRef.current) return;
    const measure = () => {
      const h = Math.floor(navRef.current.offsetHeight);
      document.documentElement.style.setProperty("--nav-height", `${h}px`);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [isMobile]);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!contentRef.current) return;
    if (!hasMounted.current) {
      hasMounted.current = true;
      contentRef.current.style.transform = carouselX(tableIndex);
      return;
    }
    if (swipeFromIndex.current !== null) {
      // Swipe already animated the carousel imperatively — just clean up.
      swipeFromIndex.current = null;
      contentRef.current.style.transition = "";
      isAnimating.current = false;
      return;
    }
    // Button / keyboard nav: animate to new position.
    isAnimating.current = true;
    contentRef.current.style.transition = "transform 0.25s ease";
    contentRef.current.style.transform = carouselX(tableIndex);
    setTimeout(() => {
      if (contentRef.current) contentRef.current.style.transition = "";
      isAnimating.current = false;
    }, 250);
  }, [tableIndex]);

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
    playSwitch();
    navigator.clipboard?.writeText("mathiasnvd07@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // in future, for experiences table add 3rd category "type"? for internships/research/co-curriculars? // update
  const colHeaders = [{ label: "Field", type: "category" }, { label: "Technologies", type: "technologies" }];

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        padding: "0 8px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        lineHeight: 1.2,
        fontSize: isMobile ? "0.9rem" : "1.00rem",
        touchAction: "pan-y",
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
          <div style={{ gridColumn: "span 2", fontWeight: 700, display: isMobile ? "none" : undefined }}>
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
                  <a href="/" onClick={playSwitch}>Mathias Nguyen-Van-Duong</a>
                </h1>
                <span>,</span>
                <p>Computer Science B.S.E. Student, Princeton</p>
                <p>Experiences, Projects, and Coursework: 2025–{currentYear}</p>
              </div>
            </div>
          </div>

          {/* Desktop: links centered */}
          <div
            className="nav-links"
            style={{
              gridColumn: "3 / span 2",
              fontWeight: 700,
              display: isMobile ? "none" : "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span onClick={copyEmail} style={{ cursor: "pointer" }} onMouseEnter={playHover}>
              {copied ? "Copied" : "Email"}
            </span>
            <span>, </span>
            <a href="https://linkedin.com/in/mathiasnvd" target="_blank" rel="noopener noreferrer" onClick={playSwitch} onMouseEnter={playHover}>LinkedIn</a>
            <span>, </span>
            <a href="https://github.com/matnvd" target="_blank" rel="noopener noreferrer" onClick={playSwitch} onMouseEnter={playHover}>GitHub</a>
          </div>

          {/* Desktop: updated + controls top-right */}
          <div
            style={{
              gridColumn: "5 / span 2",
              textAlign: "right",
              fontWeight: 700,
              display: isMobile ? "none" : "flex",
              flexDirection: "column",
            }}
          >
            <span>Updated {__BUILD_DATE__}</span>
            <span>Design inspired by <a href="https://www.nicoleho.net/" target="_blank" rel="noopener noreferrer" style={{ cursor: "pointer", transition: "color 0.15s" }} onMouseEnter={e => { e.currentTarget.style.color = "var(--gray-400)"; playHover(); }} onMouseLeave={e => e.currentTarget.style.color = "inherit"} onClick={playSwitch}>Nicole Ho</a></span>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <button onClick={() => { playSwitch(); setIsDarkMode(!isDarkMode); }} style={{ cursor: "pointer", fontWeight: 700, color: "inherit", transition: "color 0.15s" }} onMouseEnter={e => { e.currentTarget.style.color = "var(--gray-400)"; playHover(); }} onMouseLeave={e => e.currentTarget.style.color = "inherit"}>
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </button>
              <span style={{ opacity: 0.3 }}>|</span>
              <button onClick={() => { const s = !isSoundEnabled; setIsSoundEnabled(s); if (s && switchSound.current) { switchSound.current.currentTime = 0; switchSound.current.play().catch(() => {}); } }} style={{ cursor: "pointer", fontWeight: 700, color: "inherit", transition: "color 0.15s" }} onMouseEnter={e => { e.currentTarget.style.color = "var(--gray-400)"; playHover(); }} onMouseLeave={e => e.currentTarget.style.color = "inherit"}>
                Sound {isSoundEnabled ? "Off" : "On"}
              </button>
            </div>
          </div>

          {/* Mobile: split-panel reveal divider */}
          {isMobile && (
            <div
              ref={dividerContainerRef}
              style={{
                gridColumn: "1 / span 6",
                gridRow: 1,
                display: "flex",
                overflow: "hidden",
                fontWeight: 700,
                cursor: "ew-resize",
                userSelect: "none",
              }}
              onTouchStart={handleDividerTouchStart}
              onTouchMove={handleDividerTouchMove}
              onTouchEnd={handleDividerTouchEnd}
            >
              {/* Left panel: name + info — content fixed-width so it clips without reflowing */}
              <div ref={leftPanelRef} style={{ width: `${dividerPos * 100}%`, overflow: "hidden", flexShrink: 0 }}>
                <div style={{ width: "max-content", display: "flex", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "4px", marginTop: "3px", gap: "3px", flexShrink: 0 }}>
                    <a href="#" style={{ display: "block" }}>
                      <div style={{ width: "12px", height: "12px", backgroundColor: accentColor, transition: "background-color 0.3s" }} />
                    </a>
                    <button
                      onClick={() => { playSwitch(); setIsDarkMode(!isDarkMode); }}
                      style={{ cursor: "pointer", padding: 0, background: "none", border: "none", flexShrink: 0, display: "flex", alignItems: "center" }}
                    >
                      {isDarkMode ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--foreground)">
                          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                        </svg>
                      ) : (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--foreground)" stroke="var(--foreground)" strokeWidth="2" strokeLinecap="round">
                          <circle cx="12" cy="12" r="4" stroke="none"/>
                          <line x1="12" y1="2" x2="12" y2="5"/>
                          <line x1="12" y1="19" x2="12" y2="22"/>
                          <line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/>
                          <line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
                          <line x1="2" y1="12" x2="5" y2="12"/>
                          <line x1="19" y1="12" x2="22" y2="12"/>
                          <line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/>
                          <line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/>
                        </svg>
                      )}
                    </button>
                    <button
                      onClick={() => { const s = !isSoundEnabled; setIsSoundEnabled(s); if (s && switchSound.current) { switchSound.current.currentTime = 0; switchSound.current.play().catch(() => {}); } }}
                      style={{ cursor: "pointer", padding: 0, background: "none", border: "none", flexShrink: 0, display: "flex", alignItems: "center" }}
                    >
                      {isSoundEnabled ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--foreground)" stroke="var(--foreground)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="none"/>
                          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" fill="none"/>
                        </svg>
                      ) : (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--foreground)" stroke="var(--foreground)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="none"/>
                          <line x1="23" y1="9" x2="17" y2="15"/>
                          <line x1="17" y1="9" x2="23" y2="15"/>
                        </svg>
                      )}
                    </button>
                  </div>
                  <div style={{ whiteSpace: "nowrap" }}>
                    <h1 style={{ display: "inline", fontWeight: 700 }}>
                      <a href="/" onClick={playSwitch}>Mathias Nguyen-Van-Duong</a>
                    </h1>
                    <span>,</span>
                    <p>Computer Science B.S.E. Student, Princeton</p>
                    <p>Experiences, Projects, and Coursework: 2025–{currentYear}</p>
                  </div>
                </div>
              </div>
              {/* Divider handle: arrow · bar · arrow */}
              <div style={{ flexShrink: 0, display: "flex", alignItems: "center", cursor: "ew-resize", gap: "3px" }}>
                <div style={{ width: "4px", height: "6px", backgroundColor: "var(--gray-400)", clipPath: "polygon(100% 0%, 0% 50%, 100% 100%)", flexShrink: 0 }} />
                <div style={{ width: "1px", alignSelf: "stretch", backgroundColor: "var(--gray-300)" }} />
                <div style={{ width: "4px", height: "6px", backgroundColor: "var(--gray-400)", clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)", flexShrink: 0 }} />
              </div>
              {/* Right panel: links + controls — absolutely anchored to right edge, clips from left */}
              <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
                <div style={{ position: "absolute", right: 0, top: 0, display: "flex", flexDirection: "column", alignItems: "flex-end", whiteSpace: "nowrap" }}>
                  <div>
                    <span onClick={copyEmail} style={{ cursor: "pointer" }} onMouseEnter={playHover}>
                      {copied ? "Copied" : "Email"}
                    </span>
                    <span>, </span>
                    <a href="https://linkedin.com/in/mathiasnvd" target="_blank" rel="noopener noreferrer" onClick={playSwitch} onMouseEnter={playHover}>LinkedIn</a>
                    <span>, </span>
                    <a href="https://github.com/matnvd" target="_blank" rel="noopener noreferrer" onClick={playSwitch} onMouseEnter={playHover}>GitHub</a>
                  </div>
                  <span>Updated {__BUILD_DATE__}</span>
                  <span>Inspired by <a href="https://www.nicoleho.net/" target="_blank" rel="noopener noreferrer" style={{ cursor: "pointer", transition: "color 0.15s" }} onMouseEnter={e => { e.currentTarget.style.color = "var(--gray-400)"; playHover(); }} onMouseLeave={e => e.currentTarget.style.color = "inherit"} onClick={playSwitch}>Nicole Ho</a></span>
                </div>
              </div>
            </div>
          )}

          <div
            style={{
              gridRow: 2,
              gridColumn: "1 / -1",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              fontFamily: accentFontFamily,
              fontSize: isMobile ? "1.25rem" : "1.5rem",
              fontWeight: 700,
              paddingTop: isMobile ? "12px" : "80px",
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
              gridTemplateColumns: isMobile
                ? "4rem 1fr"
                : (tableIndex === 1 ? GRID_PROJECTS : GRID_EXPERIENCES),
              gap: "8px",
              paddingTop: isMobile ? "8px" : "28px",
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
              ) : tableIndex === 1 ? "Year" : "Semester"}
            </div>
            <div style={{ gridColumn: isMobile ? "2" : "span 2", paddingTop: "4px", borderTop: "1px solid var(--gray-300)" }}>
              {tableIndex === 0 ? "Experience" : tableIndex === 1 ? "Project" : "Course"}
            </div>
            {!isMobile && (
              colHeaders.map(({ label, type }) => (
                <div
                  key={type}
                  style={{ gridColumn: "span 1", paddingTop: "4px", borderTop: "1px solid var(--gray-300)" }}
                >
                  {hoveredCol === type ? <span style={{opacity: 0.4 }}>Click to filter</span> : label}
                </div>
              ))
            )}
          </div>

          {/* Rows — 3-panel carousel */}
          <div style={{ overflow: "hidden" }}>
            <div
              ref={contentRef}
              style={{ display: "flex", width: `${N * 100}%`, willChange: "transform" }}
            >
              {/* Panel 0: Experiences */}
              <div style={{ width: `${100 / N}%`, flexShrink: 0 }}>
                {EXPERIENCES_DATA.map((experience, i) => (
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
                    onClickSound={playSwitch}
                  />
                ))}
              </div>
              {/* Panel 1: Projects */}
              <div style={{ width: `${100 / N}%`, flexShrink: 0 }}>
                {PROJECTS_DATA.map((project, i) => (
                  <ProjectRow
                    key={project.slug}
                    project={project}
                    prevYear={PROJECTS_DATA[i - 1]?.year}
                    hovered={hovered}
                    setHovered={setHovered}
                    active={active}
                    setActive={setActive}
                    isMobile={isMobile}
                    revealed={revealed}
                    setHoveredCol={setHoveredCol}
                    showComingSoon={true}
                    onHoverSound={playHover}
                    onClickSound={playSwitch}
                  />
                ))}
              </div>
              {/* Panel 2: Coursework */}
              <div style={{ width: `${100 / N}%`, flexShrink: 0 }}>
                {COURSEWORK_DATA.map((course, i) => (
                  <ProjectRow
                    key={course.slug}
                    project={course}
                    prevYear={COURSEWORK_DATA[i - 1]?.year}
                    hovered={hovered}
                    setHovered={setHovered}
                    active={active}
                    setActive={setActive}
                    isMobile={isMobile}
                    revealed={revealed}
                    setHoveredCol={setHoveredCol}
                    showComingSoon={false}
                    onHoverSound={playHover}
                    onClickSound={playSwitch}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
}