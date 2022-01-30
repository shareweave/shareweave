import type { BasicProfile, ImageMetadata } from '@datamodels/identity-profile-basic'

export default function newGetImageFunction(image: BasicProfile['image']) {
    const images = [image?.original, ...image?.alternatives || []]
    return (targetWidth: number, targetHeight: number) => {
        let closestMatch: { image?: ImageMetadata, score?: number } = {}
        images.forEach(image => {
            if (!image) return
            const score = Math.abs(image.width - targetWidth) + Math.abs(image.height - targetHeight)
            if (!closestMatch.score) return closestMatch = { score, image }
            if (closestMatch.score > score) closestMatch = { score, image }
        })
        return closestMatch.image
    }
}
