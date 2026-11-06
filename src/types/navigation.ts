export type PageRoute = 
  | 'home'
  | 'programs'
  | 'ai-hub'
  | 'pitch'
  | 'matches'
  | 'store'
  | 'about'
  | 'contact';

export interface NavItem {
  id: PageRoute;
  label: string;
  badge?: string;
}
