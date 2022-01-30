export default function newGetImageFunction(image) {
    const images = [image === null || image === void 0 ? void 0 : image.original, ...(image === null || image === void 0 ? void 0 : image.alternatives) || []];
    return (targetWidth, targetHeight) => {
        let closestMatch = {};
        images.forEach(image => {
            if (!image)
                return;
            const score = Math.abs(image.width - targetWidth) + Math.abs(image.height - targetHeight);
            if (!closestMatch.score)
                return closestMatch = { score, image };
            if (closestMatch.score > score)
                closestMatch = { score, image };
        });
        return closestMatch.image;
    };
}
