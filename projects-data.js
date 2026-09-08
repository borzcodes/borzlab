/* =========================================================
   PROJECT DATA — the single source of truth for both pages.
   Add / edit projects here only.

   Images: drop files in /assets/projects/ and set the paths below.
   Any image left as "" falls back to a generated placeholder.
   ========================================================= */
window.PROJECTS = [
  {
    id: 1,
    title: "Atelier HM",
    tag: "Architecture studio",
    client: "Haytham Mribah Architects — Tangier",
    year: "2026",
    short: "A single-page site for a Tangier architecture studio — 24 projects in one drag-through deck.",
    summary: "Haytham Mribah runs a small architecture practice in Tangier, working from Tétouan to Brussels on hospitals, mixed-use towers and interiors. He needed one page that could carry the weight of a 24-project portfolio without turning into a gallery: something closer to a drawing set than a website. The result is a four-chapter scroll built on a burgundy-and-bone palette, a stroke-drawn monogram, and a deck of projects you pull through by hand.",
    url: "https://atelierhm.vercel.app/",
    cover: "assets/projects/atelierhm/hero.jpg",
    poster: {
      top:    "assets/projects/atelierhm/poster-top.jpg",
      bottom: "assets/projects/atelierhm/poster-bottom.jpg"
    },
    theme: { accent: "#7A2438", accentDeep: "#47131F", ink: "#1A1014", tint: "#F8F3F4" },
    preview: {
      url: "atelierhm.vercel.app",
      video: {
        webm: "assets/projects/atelierhm/motion/card.webm",
        mp4:  "assets/projects/atelierhm/motion/card.mp4",
        poster: "assets/projects/atelierhm/sm-hero.jpg"
      }
    },
    sections: [
      { title: "A monogram that arrives from nothing",
        text: "The site holds you on a bone-white preloader while the renders come down the wire, then cuts to an aerial night view of the Tétouan hospital. The HMA monogram grows out of the centre of it — hairline thin, scaling up as the wordmark and the French standfirst fade in beneath. Nothing is on screen at second zero; by second four the whole title block has assembled itself.",
        image: "assets/projects/atelierhm/hero.jpg",
        video: { webm: "assets/projects/atelierhm/motion/hero.webm", mp4: "assets/projects/atelierhm/motion/hero.mp4" } },
      { title: "The menu as a full-page index",
        text: "There is no navigation bar. A single + MENU in the corner drops the whole index over the page in deep burgundy — the only moment the brand colour takes the full screen — with the four chapters set in Archivo Black, numbered 00 to 04, and the studio's address, email and site coordinates ruled off along the bottom. Pressing it again folds everything back to exactly where you were.",
        image: "assets/projects/atelierhm/menu.jpg",
        video: { webm: "assets/projects/atelierhm/motion/menu.webm", mp4: "assets/projects/atelierhm/motion/menu.mp4" } },
      { title: "The founder, on the record",
        text: "Chapter one puts a face to the practice. As it comes into view the rules draw themselves across the page and the type rises into place — a black-and-white portrait against a full-height slab of Archivo Black, with the studio's facts running down the side as a mono spec list. The pull quote and signature close it out, which is what a client actually reads before making contact.",
        image: "assets/projects/atelierhm/founder.jpg",
        video: { webm: "assets/projects/atelierhm/motion/founder.webm", mp4: "assets/projects/atelierhm/motion/founder.mp4" } },
      { title: "Twenty-four projects you pull through by hand",
        text: "Rather than a grid, the work section is a physical deck: the active project stands upright and the remaining twenty-three fan off to the right, fading into the paper. Grab it and it follows your hand, then settles onto the next card; the arrows do the same thing with a click. Filtering by public, mixed-use, interiors or residential re-deals the whole deck in place, and the counter and hairline rail keep count.",
        image: "assets/projects/atelierhm/work.jpg",
        video: { webm: "assets/projects/atelierhm/motion/deck.webm", mp4: "assets/projects/atelierhm/motion/deck.mp4" } },
      { title: "Capability as a drawing register",
        text: "The services list is set as a register of sheets — A-01 through A-05, each row a discipline, each with a one-line scope note. Move down the rows and each one washes in burgundy tint as the cursor reaches it, the only colour on an otherwise bone-white page. It gives a five-item list the authority of a document.",
        image: "assets/projects/atelierhm/capability.jpg",
        video: { webm: "assets/projects/atelierhm/motion/capability.webm", mp4: "assets/projects/atelierhm/motion/capability.mp4" } },
      { title: "An enquiry that behaves like a brief",
        text: "The contact chapter pairs the studio's address, hours and direct line with a form that asks the four questions a practice needs before a first call: who, where, what kind of project, and a sentence or two about it. Fields are hairline-ruled rather than boxed, the label lifts and the rule turns burgundy as you enter each one, and the availability note — currently taking work for 2027 — stays pinned in the header while you type.",
        image: "assets/projects/atelierhm/contact.jpg",
        video: { webm: "assets/projects/atelierhm/motion/contact.webm", mp4: "assets/projects/atelierhm/motion/contact.mp4" } }
    ],
    screens: [
      { src: "assets/projects/atelierhm/mobile.jpg", kind: "mobile",
        caption: "The same arrival at 430px — loader, then the monogram",
        video: { webm: "assets/projects/atelierhm/motion/mobile-hero.webm",
                 mp4:  "assets/projects/atelierhm/motion/mobile-hero.mp4" } },
      { src: "assets/projects/atelierhm/mobile-work.jpg", kind: "mobile",
        caption: "The deck keeps its fan on touch — swiped through by thumb",
        video: { webm: "assets/projects/atelierhm/motion/mobile-deck.webm",
                 mp4:  "assets/projects/atelierhm/motion/mobile-deck.mp4" } }
    ]
  },
  {
    id: 2,
    title: "Azylis",
    tag: "Eyewear store",
    client: "Azylis Eyewear — Casablanca",
    year: "2026",
    short: "An eyewear shop that opens like a film, then gets out of the way and sells.",
    summary: "Azylis sells frames in Casablanca and ships worldwide. Glasses are a face-shape problem before they are a shopping problem, so the storefront opens with a pinned sequence of real people wearing the product — no packshots — and only then puts you in front of the shelves. The rest of the page answers the three questions that stop people buying online: will it fit, what does it cost to send back, and has anyone else been happy.",
    url: "https://azylis.vercel.app/",
    cover: "assets/projects/azylis/hero.jpg",
    theme: { accent: "#332A21", accentDeep: "#14110E", ink: "#14110E", tint: "#F4F2EF" },
    poster: {
      top:    "assets/projects/azylis/poster-top.jpg",
      bottom: "assets/projects/azylis/poster-bottom.jpg"
    },
    preview: {
      url: "azylis.vercel.app",
      video: {
        webm: "assets/projects/azylis/motion/card.webm",
        mp4:  "assets/projects/azylis/motion/card.mp4",
        poster: "assets/projects/azylis/card-poster.jpg"
      }
    },
    sections: [
      { title: "One screen that holds three chapters",
        text: "The opening does not scroll away — it stays pinned while you do. A portrait pushes slowly in behind the headline, then the type gives way to 'Built for Clarity' with a stack of photographs fanning out beside it, and finally to a wall of customers wearing the frames under 'Seen in Azylis'. Three arguments delivered in the height of one screen, before a single product is shown.",
        image: "assets/projects/azylis/hero.jpg",
        video: { webm: "assets/projects/azylis/motion/stage.webm", mp4: "assets/projects/azylis/motion/stage.mp4" } },
      { title: "The two questions that stop a sale",
        text: "Straight after the opening, a yellow block and a blush block sit side by side: one says the shop exists in Casablanca as well as online, the other walks through the three checks that tell you whether a frame will fit your face. It is the objection-handling a client usually buries in a help page, put where people actually hesitate.",
        image: "assets/projects/azylis/fit.jpg",
        video: { webm: "assets/projects/azylis/motion/fit.webm", mp4: "assets/projects/azylis/motion/fit.mp4" } },
      { title: "Shelves that come up to meet you",
        text: "Products arrive as the shelf scrolls into view, each frame photographed on warm paper with the reference, the colourway and the price. Hovering lifts a card off the page and brings up its try-on control, so the whole row stays quiet until you show interest in one of them.",
        image: "assets/projects/azylis/rails.jpg",
        video: { webm: "assets/projects/azylis/motion/rails.webm", mp4: "assets/projects/azylis/motion/rails.mp4" } },
      { title: "Categories you pull sideways",
        text: "Below the shelves the page switches from product to person: four full-bleed portraits — sunglasses and lenses, men and women — that slide along under the arrows and push in slightly as the cursor crosses them. It is the only colour photography on the page, which is what makes it read as the way in.",
        image: "assets/projects/azylis/cats.jpg",
        video: { webm: "assets/projects/azylis/motion/cats.webm", mp4: "assets/projects/azylis/motion/cats.mp4" } },
      { title: "Six customers, in their own words",
        text: "Reviews are set as a two-panel slider with named buyers and their city — Casablanca, Rabat, Marrakech, Tangier, Fès, Agadir — so the proof reads as a country rather than a rating out of five. The dots move between panels without moving the page.",
        image: "assets/projects/azylis/voices.jpg",
        video: { webm: "assets/projects/azylis/motion/voices.webm", mp4: "assets/projects/azylis/motion/voices.mp4" } },
      { title: "Questions answered where they are asked",
        text: "Fit, delivery, returns and prescriptions open in place at the foot of the page, one at a time, each answer written the way the shop would say it out loud. Nobody has to leave for a policy page, and the answer that matters most — thirty days, adjusted or exchanged free — is the first thing under the fold.",
        image: "assets/projects/azylis/faq.jpg",
        video: { webm: "assets/projects/azylis/motion/faq.webm", mp4: "assets/projects/azylis/motion/faq.mp4" } }
    ],
    screens: [
      { src: "assets/projects/azylis/mobile.jpg", kind: "mobile",
        caption: "The pinned opening holds its shape on a phone",
        video: { webm: "assets/projects/azylis/motion/mobile-hero.webm",
                 mp4:  "assets/projects/azylis/motion/mobile-hero.mp4" } },
      { src: "assets/projects/azylis/mobile-rail.jpg", kind: "mobile",
        caption: "Shelves become a thumb-swiped row",
        video: { webm: "assets/projects/azylis/motion/mobile-rail.webm",
                 mp4:  "assets/projects/azylis/motion/mobile-rail.mp4" } }
    ]
  },

  { id: 3, title: "Lumen", tag: "Dashboard", client: "Lumen Systems", year: "2025",
    short: "Short description of this project goes here.",
    summary: "Complete UI/UX design and development for Lumen. Replace this paragraph with the real brief for the project.",
    url: "#", cover: "",
    sections: [
      { title: "Data-First Interface", text: "Replace this copy with the real story of the design decisions behind the build.", image: "" },
      { title: "Built for Daily Use", text: "Replace this copy with how the product holds up under real usage.", image: "" }
    ] },

  { id: 4, title: "Northwind", tag: "E-commerce", client: "Northwind Goods", year: "2025",
    short: "Short description of this project goes here.",
    summary: "Complete UI/UX design and development for Northwind. Replace this paragraph with the real brief for the project.",
    url: "#", cover: "",
    sections: [
      { title: "Storefront & Identity", text: "Replace this copy with the real story of the design decisions behind the build.", image: "" },
      { title: "Checkout That Converts", text: "Replace this copy with how the purchase flow was simplified.", image: "" }
    ] },

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
  p.summary = p.summary || `Complete UI/UX design and development for ${p.title}. Replace this paragraph with the real brief — who the client is, what they needed, and the objective of the build.`;
  p.url     = p.url     || "#";
  p.cover   = p.cover   || "";
  p.sections = p.sections || [
    { title: "Interface & Positioning", text: "Replace this copy with the real story of the design decisions behind the build.", image: "" },
    { title: "High-Converting Experience", text: "Replace this copy with how the site was structured to convert visitors into leads.", image: "" }
  ];
});