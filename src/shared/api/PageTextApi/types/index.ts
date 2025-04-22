export interface PageTextBlock {
  content: string;
}

export interface PageTextResponse {
  id: number;
  name: string;
  slug: string;
  text: PageTextBlock[];
  created_at: string;
  updated_at: string;
}