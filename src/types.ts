export interface Service {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  iconName: string;
}

export interface Differential {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  tags: string[];
  features: string[];
}
