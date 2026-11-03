export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  address?: string;
  city?: string;
  service: string;
  message: string;
  source?: string;
  status: 'New' | 'Contacted' | 'Estimate Scheduled' | 'Estimate Sent' | 'Won' | 'Lost';
  notes: { id: string; date: string; text: string; author: string }[];
  createdAt: string;
}

export interface EstimateRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  propertyType: 'Residential' | 'Commercial';
  serviceNeeded: string;
  photos: string[];
  contactMethod: 'Phone' | 'SMS' | 'Email';
  preferredDate: string;
  status: 'New' | 'Inspection Scheduled' | 'Estimate Sent' | 'Approved' | 'Declined' | 'Completed';
  estimateAmount?: number;
  internalNotes: string;
  createdAt: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  priceRange: string;
  image: string;
  active: boolean;
  category: 'residential' | 'commercial' | 'emergency';
}

export interface RoofingMaterial {
  id: string;
  name: string;
  category: string;
  lifespan: string;
  durability: string;
  maintenance: string;
  benefits: string[];
  description: string;
  image: string;
  idealFor: string;
}

export interface GalleryProject {
  id: string;
  title: string;
  location: string;
  category: 'Roof Repair' | 'Roof Replacement' | 'Shingle Roofing' | 'Metal Roofing' | 'Storm Damage' | 'Commercial Roofing';
  beforeImage: string;
  afterImage: string;
  completionDate: string;
  description: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  reviewText: string;
  date: string;
  serviceType: string;
  approved: boolean;
  isSample: boolean;
  photo?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export interface ServiceArea {
  id: string;
  name: string;
  slug: string;
  zipCodes: string[];
  headline: string;
  description: string;
  landmarks: string[];
  phone: string;
  active: boolean;
}

export interface WebsiteSettings {
  companyName: string;
  tagline: string;
  location: string;
  address: string;
  phone: string;
  rawPhone: string;
  smsPhone: string;
  email: string;
  businessHours: string;
  emergencyService: string;
  emergencyPhone: string;
  licenseNumber: string;
  insuranceCoverage: string;
  googleMapsQuery: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    linkedin: string;
    yelp: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
  isDemoMode: boolean;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
  role: 'superadmin' | 'admin' | 'estimator';
  profileImage?: string;
}
