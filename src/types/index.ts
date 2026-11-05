export type DifficultyLevel = 'Principiante' | 'Intermedio' | 'Experto';

export type PostCategory = 
  | 'Cuidado y Riego'
  | 'Orquídeas y Flores'
  | 'Suculentas y Cactus'
  | 'Identificación de Especies'
  | 'Plagas y Soluciones Orgánicas'
  | 'Propagación y Esquejes'
  | 'Diario Botánico';

export interface PlantProfile {
  id: string;
  commonName: string;
  scientificName: string;
  category: string;
  imageUrl: string;
  summary: string;
  origin: string;
  light: string;
  watering: string;
  humidity: string;
  difficulty: DifficultyLevel;
  toxicity: string;
  curatorNotes: string;
  tags?: string[];
}

export interface ForumComment {
  id: string;
  author: string;
  avatar: string;
  createdAt: string;
  content: string;
  isCurator?: boolean;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    isCurator: boolean;
  };
  category: PostCategory;
  imageUrl?: string;
  createdAt: string;
  fortnightTag: string; // e.g. "Quincena Nov-1"
  likes: number;
  views: number;
  pinned?: boolean;
  plantDetails?: {
    scientificName?: string;
    light?: string;
    watering?: string;
    difficulty?: DifficultyLevel;
  };
  comments: ForumComment[];
}

export interface BiweeklyEdition {
  id: string;
  editionNumber: number;
  cycleTitle: string;
  subtitle: string;
  dateRange: string; // "1 - 15 Noviembre 2026"
  nextEditionDate: string; // "16 Noviembre 2026"
  editorialMessage: string;
  active: boolean;
  featuredPlant: PlantProfile;
  highlights: string[];
}

export interface SiteSettings {
  siteName: string;
  curatorName: string;
  curatorRole: string;
  curatorBio: string;
  curatorAvatar: string;
  tagline: string;
  welcomeText: string;
  aboutStory: string;
  manifesto: string[];
  contactEmail: string;
  instagram: string;
  adminPin: string;
}

export interface AppContentState {
  currentEdition: BiweeklyEdition;
  archivedEditions: BiweeklyEdition[];
  posts: ForumPost[];
  plantsEncyclopedia: PlantProfile[];
  siteSettings: SiteSettings;
  lastUpdated: string;
}
