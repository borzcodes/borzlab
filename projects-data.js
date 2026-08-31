/* =========================================================
   PROJECT DATA — the single source of truth for both pages.
   Add / edit projects here only.

   Images: drop files in /assets/projects/ and set the paths below.
   Any image left as "" falls back to a generated placeholder.
   ========================================================= */
window.PROJECTS = [
  {
    id: 1,
    title: "Aurora",
    tag: "Web app",
    client: "Aurora Labs",
    year: "2026",
    scope: "Branding • UI/UX Design • Development",
    short: "Short description of this project goes here.",
    summary: "Complete UI/UX design and development for Aurora. Replace this paragraph with the real brief — who the client is, what they needed, and what the objective of the build was.",
    url: "#",
    cover: "",
    sections: [
      { title: "Interface & Positioning",
        text: "A clean, structured interface designed to reflect the client's expertise and reinforce credibility from the first interaction. Replace this copy with the real story of the design decisions.",
        image: "" },
      { title: "High-Converting Experience",
        text: "Strategic trust elements, key indicators, and clear calls to action were implemented to support lead generation while positioning the brand as a rigorous, results-driven expert.",
        image: "" }
    ],
    typography: "Inter Display",
    palette: ["#2FA5D3", "#8DC050", "#234000", "#FFFFFF", "#000000"]
  },
  { id: 2, title: "Vertex", tag: "Landing page", client: "Vertex Studio", year: "2026",
    scope: "UI/UX Design • Development", short: "Short description of this project goes here.",
    summary: "Complete UI/UX design and development for Vertex. Replace this paragraph with the real brief for the project.",
    url: "#", cover: "",
    sections: [
      { title: "Interface & Positioning", text: "Replace this copy with the real story of the design decisions behind the build.", image: "" },
      { title: "High-Converting Experience", text: "Replace this copy with how the page was structured to convert visitors into leads.", image: "" }
    ],
    typography: "Inter Display", palette: ["#1D1D1F", "#6E6E73", "#F5F5F7", "#FFFFFF", "#000000"] },

  { id: 3, title: "Lumen", tag: "Dashboard", client: "Lumen Systems", year: "2025",
    scope: "UI/UX Design • Development", short: "Short description of this project goes here.",
    summary: "Complete UI/UX design and development for Lumen. Replace this paragraph with the real brief for the project.",
    url: "#", cover: "",
    sections: [
      { title: "Data-First Interface", text: "Replace this copy with the real story of the design decisions behind the build.", image: "" },
      { title: "Built for Daily Use", text: "Replace this copy with how the product holds up under real usage.", image: "" }
    ],
    typography: "Inter Display", palette: ["#2FA5D3", "#1D1D1F", "#F5F5F7", "#FFFFFF", "#000000"] },

  { id: 4, title: "Northwind", tag: "E-commerce", client: "Northwind Goods", year: "2025",
    scope: "Branding • UI/UX Design • Development", short: "Short description of this project goes here.",
    summary: "Complete UI/UX design and development for Northwind. Replace this paragraph with the real brief for the project.",
    url: "#", cover: "",
    sections: [
      { title: "Storefront & Identity", text: "Replace this copy with the real story of the design decisions behind the build.", image: "" },
      { title: "Checkout That Converts", text: "Replace this copy with how the purchase flow was simplified.", image: "" }
    ],
    typography: "Inter Display", palette: ["#8DC050", "#234000", "#F5F5F7", "#FFFFFF", "#000000"] },

  { id: 5,  title: "Cobalt",    tag: "Web app",          client: "Cobalt Co.",      year: "2025" },
  { id: 6,  title: "Halo",      tag: "Booking platform", client: "Halo Group",      year: "2025" },
  { id: 7,  title: "Sable",     tag: "Portfolio",        client: "Sable Studio",    year: "2025" },
  { id: 8,  title: "Quill",     tag: "CMS build",        client: "Quill Media",     year: "2024" },
  { id: 9,  title: "Ridge",     tag: "Web app",          client: "Ridge Analytics", year: "2024" },
  { id: 10, title: "Onyx",      tag: "Landing page",     client: "Onyx Digital",    year: "2024" },
  { id: 11, title: "Vela",      tag: "Dashboard",        client: "Vela Systems",    year: "2024" },
  { id: 12, title: "Drift",     tag: "Mobile web",       client: "Drift App",       year: "2024" },
  { id: 13, title: "Meridian",  tag: "Web app",          client: "Meridian Ltd",    year: "2024" },
  { id: 14, title: "Solace",    tag: "Landing page",     client: "Solace Health",   year: "2023" },
  { id: 15, title: "Kestrel",   tag: "Dashboard",        client: "Kestrel Data",    year: "2023" },
  { id: 16, title: "Harbor",    tag: "E-commerce",       client: "Harbor Supply",   year: "2023" },
  { id: 17, title: "Pillar",    tag: "CMS build",        client: "Pillar Group",    year: "2023" },
  { id: 18, title: "Tessa",     tag: "Portfolio",        client: "Tessa Rey",       year: "2023" }
];

/* fill in sensible defaults so every project has a complete page */
window.PROJECTS.forEach(p => {
  p.short   = p.short   || "Short description of this project goes here.";
  p.scope   = p.scope   || "UI/UX Design • Development";
  p.summary = p.summary || `Complete UI/UX design and development for ${p.title}. Replace this paragraph with the real brief — who the client is, what they needed, and the objective of the build.`;
  p.url     = p.url     || "#";
  p.cover   = p.cover   || "";
  p.typography = p.typography || "Inter Display";
  p.palette = p.palette || ["#1D1D1F", "#6E6E73", "#F5F5F7", "#FFFFFF", "#000000"];
  p.sections = p.sections || [
    { title: "Interface & Positioning", text: "Replace this copy with the real story of the design decisions behind the build.", image: "" },
    { title: "High-Converting Experience", text: "Replace this copy with how the site was structured to convert visitors into leads.", image: "" }
  ];
});