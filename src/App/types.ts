export interface Data {
  pubRating:        number;
  _id:              string;
  user:             User;
  avatar:           string;
  about:            string;
  websites:         string[];
  areasOfExpertise: string[];
  jobPreferences:   string[];
  ratePerArticle:   number;
  credentials:      Credential[];
  publications:     Publication[];
  articles:         Article[];
  reviews:          Review[];
  __v:              number;
}

export interface Article {
  link:        string;
  date:        DateClass;
  title:       string;
  description: string;
  image:       string;
}

export interface DateClass {
  day:   number;
  month: number;
  year:  number;
}

export interface Credential {
  institution: string;
  degreeType:  string;
  areaOfStudy: string;
  _id:         string;
}

export interface Publication {
  citation: string;
  link:     string;
  _id:      string;
}

export interface Review {
  title:       string;
  description: string;
  rating:      Rating;
  date:        DateClass;
}

export interface Rating {
  overall:       number;
  communication: number;
  timeliness:    number;
  value:         number;
}

export interface User {
  _id:       string;
  firstName: string;
  lastName:  string;
  email:     string;
}