import type { BasicProfile } from '@datamodels/identity-profile-basic';
export default class UserAPI {
    #private;
    login(): Promise<void>;
    logout(): void;
    auth(): Promise<void>;
    get profile(): {
        address: string;
        getImage: (targetWidth: number, targetHeight: number) => import("@datamodels/identity-profile-basic").ImageMetadata | undefined;
        getBackground: (targetWidth: number, targetHeight: number) => import("@datamodels/identity-profile-basic").ImageMetadata | undefined;
        name?: string | undefined;
        image?: import("@datamodels/identity-profile-basic").ImageSources | undefined;
        description?: string | undefined;
        emoji?: string | undefined;
        background?: import("@datamodels/identity-profile-basic").ImageSources | undefined;
        birthDate?: string | undefined;
        url?: string | undefined;
        gender?: string | undefined;
        homeLocation?: string | undefined;
        residenceCountry?: string | undefined;
        nationalities?: [string, ...string[]] | undefined;
        affiliations?: string[] | undefined;
    };
    get isLoggedIn(): boolean;
    setProfile(data: BasicProfile): Promise<import("@ceramicnetwork/streamid").StreamID | undefined>;
    get did(): import("dids").DID | undefined;
    sign(data: string): Promise<any>;
    verify(data: string, signature: string): string;
}
