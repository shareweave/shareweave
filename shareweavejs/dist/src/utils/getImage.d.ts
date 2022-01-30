import type { BasicProfile, ImageMetadata } from '@datamodels/identity-profile-basic';
export default function newGetImageFunction(image: BasicProfile['image']): (targetWidth: number, targetHeight: number) => ImageMetadata | undefined;
