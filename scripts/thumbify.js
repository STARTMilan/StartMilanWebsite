const fs = require("node:fs/promises");
const path = require("node:path");
const sharp = require("sharp");

const inputDir = process.argv[2] || "photos_starties/originali";
const fallbackDir = "photos_starties";
const outDir = "photos_starties/thumbs";
const sizes = [128, 256, 512];

const exists = async (dir) => {
    try {
        await fs.access(dir);
        return true;
    } catch {
        return false;
    }
};

(async () => {
    const sourceDir = (await exists(inputDir)) ? inputDir : fallbackDir;
    await fs.mkdir(outDir, { recursive: true });

    const files = (await fs.readdir(sourceDir)).filter((file) => /\.(jpe?g|png|webp)$/i.test(file));

    for (const file of files) {
        const inputPath = path.join(sourceDir, file);
        const base = path.parse(file).name;

        for (const size of sizes) {
            const outPath = path.join(outDir, `${base}-${size}.webp`);
            await sharp(inputPath)
                .resize(size, size, { fit: "cover", position: "center" })
                .sharpen(0.8, 0.6, 0.2)
                .webp({ quality: 82 })
                .toFile(outPath);
        }
    }

    console.log(`Thumbnails generated in ${outDir}`);
})().catch((error) => {
    console.error("Thumbnail generation failed:", error);
    process.exit(1);
});
