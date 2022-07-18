import { createCanvas, loadImage } from 'canvas';
import drawMultilineText from 'canvas-multiline-text';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { getImageURL } from '../../lib/image-server';
import path from 'path';

export const generateImagePath = hash => {
    const dir = path.resolve('public', 'og');
    const filename = generateImageName(hash)
    return {filepath: path.resolve(dir, filename), dir, filename};
}

export const generateImageName = hash => {
    return `${hash}.png`
}

// our function will receive, in this case, the title of the blog post
// as a parameter
export const createImage = async ({ title, query }) => {
    // dimension of our image
    const width = 1024;
    const height = 1024;

    // create an empty canvas
    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');

    // fill our frame with a white background
    context.fillStyle = '#fff';
    context.fillRect(0, 0, width, height);

    // load and draw our background image
    const image = await loadImage(getImageURL("", query.hash));
    context.drawImage(image, 0, 0);

    // some format/styles for our text
    context.textAlign = 'center';
    context.textBaseline = 'top';
    context.fillStyle = '#000';

    // draw our title
    drawMultilineText(context, query.name, {
        rect: {
            x: 600,
            y: 380,
            width: canvas.width - 20,
            height: canvas.height - 170,
        },
        font: 'sans-serif',
        verbose: false,
        lineHeight: 1.4,
        minFontSize: 15,
        maxFontSize: 56,
    });

    // add our hostname at the bottom of the image
    context.fillStyle = '#044AFD';
    context.font = '22px sans-serif';
    context.fillText('Big Eyes', 600, 580);

    return canvas.toBuffer('image/png');
};

export const generateOgImage = async ({ slug, title, query }) => {
    // the path where our image is going to be saved.
    const { filepath, dir } = generateImagePath(query.hash)

    // check if directory doesn't exist, if it doesn't, we create it
    if (!existsSync(dir)) {
        mkdirSync(dir);
    }

    // check if the image already exists, if it does we don't need to generate it again
    if (!existsSync(filepath)) {
        const imgBuffer = await createImage({ title, query });

        writeFileSync(filepath, imgBuffer);
    }
    return filepath
};