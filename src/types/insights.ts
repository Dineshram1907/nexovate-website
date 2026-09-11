export interface InsightPost {
  id: string;
  type: "featured" | "standard";
  badge?: string;
  title: string;
  description?: string;
  author?: string;
  category: string;
  category_color: string;
  media_url: string;
  poster_url?: string;
  display_order: number;
  published?: boolean;
  created_at?: string;
}

export const FALLBACK_INSIGHTS: InsightPost[] = [
  {
    id: "featured-learning-careers",
    type: "featured",
    badge: "FEATURED",
    title: "From Learning to Building: How Nexovate Turns Skills Into Real-World Careers",
    description:
      "Discover how Nexovate combines practical technology training, career guidance, project-based learning, and placement preparation to help learners move from knowing the fundamentals to confidently building in the real world.",
    author: "By Nexovate",
    category: "Learning",
    category_color: "#12B8C9",
    media_url: "/assets/landing-hero-video.mp4",
    display_order: 1,
    published: true,
  },
  {
    id: "standard-project-based-learning",
    type: "standard",
    title: "Why Project-Based Learning Changes the Way You Build",
    category: "Learning",
    category_color: "#12B8C9",
    media_url: "/assets/mp4.mp4",
    display_order: 2,
    published: true,
  },
  {
    id: "standard-skills-to-portfolio",
    type: "standard",
    title: "From Skills to Portfolio: Building Work That Gets Noticed",
    category: "Projects",
    category_color: "#E5A923",
    media_url: "/assets/nexovate-hero-loop.mp4",
    display_order: 3,
    published: true,
  },
  {
    id: "standard-breaking-into-tech",
    type: "standard",
    title: "Breaking Into Tech: What Actually Matters Beyond the Resume",
    category: "Career",
    category_color: "#1D5C8F",
    media_url: "/assets/gratitude-hero.mp4",
    display_order: 4,
    published: true,
  },
];
