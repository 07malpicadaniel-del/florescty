export type DifficultyLevel = 'Principiante' | 'Intermedio' | 'Experto';

export type PostCategory = 
  | 'Flores y Cuidados'
  | 'Plantas de Casa'
  | 'Suculentas'
  | 'Consejos de Riego'
  | 'Diario de Jardín';

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
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role?: string;
    isCurator?: boolean;
  };
  category: string;
  imageUrl?: string;
  createdAt: string;
  fortnightTag: string;
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
  dateRange: string;
  nextEditionDate: string;
  editorialMessage: string;
  active: boolean;
  featuredPlant: PlantProfile;
  highlights: string[];
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  welcomeText: string;
  aboutStory: string;
  manifesto: string[];
  contactEmail: string;
  instagram: string;
}

export interface AppContentState {
  currentEdition: BiweeklyEdition;
  archivedEditions: BiweeklyEdition[];
  posts: ForumPost[];
  plantsEncyclopedia: PlantProfile[];
  siteSettings: SiteSettings;
  lastAIPostDate?: string;
  lastUpdated: string;
}
