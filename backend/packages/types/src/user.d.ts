import { UserRole } from './enums';
export interface User {
    id: string;
    email: string;
    phoneNumber?: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    isVerified: boolean;
    isActive: boolean;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface AuthenticatedUser extends User {
    token: string;
    refreshToken?: string;
}
export interface UserProfile extends User {
    bio?: string;
    address?: string;
    dateOfBirth?: Date;
    preferences?: UserPreferences;
}
export interface UserPreferences {
    notifications: {
        email: boolean;
        sms: boolean;
        push: boolean;
    };
    language: string;
    currency: string;
}
export interface AgentProfile extends UserProfile {
    agencyName?: string;
    licenseNumber?: string;
    yearsOfExperience?: number;
    specializations?: string[];
    rating?: number;
    totalReviews?: number;
    isVerifiedAgent: boolean;
}
export interface LandlordProfile extends UserProfile {
    totalProperties?: number;
    rating?: number;
    totalReviews?: number;
}
//# sourceMappingURL=user.d.ts.map