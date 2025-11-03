// src/data/brandsData.js

import brand1Logo from "../assets/brand1.png";
import brand2Logo from "../assets/brand2.png";

import allinBanner from "../assets/allin-banner.png";
import allinCat1 from "../assets/poplar.png";
import allinCat2 from "../assets/gaboon.png";

export const brandsData = [
  {
    id: "allin-le-vanneau",
    name: "Allin Le Vanneau",
    logo: brand1Logo,
    banner: allinBanner,
    description:
      "Allin Le Vanneau is a leader in premium plywood products combining innovation and craftsmanship for superior performance.",
    categories: [
      {
        id: "poplar",
        name: "Poplar",
        image: allinCat1,
        description:
          "Lightweight and smooth, poplar plywood features a fine grain and uniform texture. Ideal for furniture, cabinetry, and decorative panelling where ease of finishing and painting is important.",
      },
      {
        id: "gaboon",
        name: "Gaboon",
        image: allinCat2,
        description:
          "Made from lightweight yet strong Gaboon hardwood veneers, this plywood offers a smooth finish and excellent workability.",
      },
    ],
  },
  {
    id: "brand-two",
    name: "Brand Two",
    logo: brand2Logo,
    banner: allinBanner,
    description:
      "Brand Two offers high-quality boards and materials for modern architectural and interior projects.",
    categories: [],
  },
];
