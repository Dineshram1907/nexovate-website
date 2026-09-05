/**
 * imageRegistry.ts
 *
 * Centralized Semantic Image Registry ensuring zero image repetition across the landing page.
 * Every major section gets its own distinct, authentic photograph.
 */

import {
  realStudentsGroup,
  brandCreatorImage,
  fullStackImage,
  dataScienceImage,
  cloudDevopsImage,
  heroCinematicPortal,
  aiMlImage,
  arjunAvatar,
  hariniAvatar,
  priyaAvatar,
  rahulAvatar,
  vishalAvatar,
} from "@/assets";

export const IMAGE_REGISTRY = {
  // Hero: Anchored primary human studio composition (Real authentic student photograph)
  hero: {
    anchoredStudentStudio: realStudentsGroup,
  },

  // Experience: Hands-on active laboratory & creator studio
  experience: {
    activeCohortCollaboration: brandCreatorImage,
  },

  // Programs: Specialized technical curriculum imagery
  programs: {
    cloudInfrastructure: cloudDevopsImage,
  },

  // Projects: Capstone software artifacts & systems
  projects: {
    aiPlatform: heroCinematicPortal,
    fullStackWorkspace: fullStackImage,
    dataAnalytics: dataScienceImage,
  },

  // Institutions: Academic leadership, CoE labs & university partnership
  institutions: {
    innovationWorkshop: aiMlImage,
  },

  // Student Reviews: Authentic student graduate portraits
  reviews: {
    priya: priyaAvatar,
    arjun: arjunAvatar,
    rahul: rahulAvatar,
    harini: hariniAvatar,
    vishal: vishalAvatar,
  },
} as const;
