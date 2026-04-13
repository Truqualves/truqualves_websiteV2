export interface Blog {
  id: number;
  title: string;
  description: string;
  author: string;
  date: string;
  image: string;
  category?: string[];
  featured?: boolean;
  contentBody?: {
    introduction?: string;
    keyTakeaways?: string[];
    elaborated?: string;
    quote?: string;
    conclusion?: string;
  };
}
