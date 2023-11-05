import { Actor } from './actor';

export interface User {
  name: string;
  email: string;
  isProfileComplete: boolean;
  signupMethod: string;
  signUpDate: Date;
  lastLogin: Date;
  password: string;
  role: string;
  basicInfo: {
    firstName: string;
    lastName: string;
    displayName: string;
    location: string;
    bio: string;
    profileImage: string;
    coverImage: string;
  };
  actors: Actor[];
  campaigns: string[]; // campaign ids
  subscription: {
    subscriptionType: 'free' | 'pro' | 'complete';
    subscriptionFirstDate: Date;
    subscriptionStartDate: Date;
    subscriptionEndDate: Date;
    subscriptionTotalMonthsSubscribed: number;
  };
}
