export interface ServiceFaqItem {
  question: string;
  answer: string;
}

export interface Service {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  heroImage?: string;
  iconKey?: string;
  category?: string[];
  featured?: boolean;
  status?: "draft" | "published";
  displayOrder?: number;
  contentBody?: {
    overview?: string;
    scope?: string;
    methodology?: string;
    deliverables?: string[];
    faq?: ServiceFaqItem[];
    conclusion?: string;
  };
}
