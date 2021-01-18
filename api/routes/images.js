import express from 'express';
import formidable from 'formidable';
import fs from 'fs';
import db from '../helpers/db.js';
import path from 'path';

const __dirname = import.meta.url.slice(8, import.meta.url.lastIndexOf("/"));

const router = express();

router.get('/', async (req, res) => {
    const images = await db("imagebank").select();
    res.json(images);
});

//Upload metadata to database
router.post('/upload', (req, res) => {
    const form = formidable({multiples: true});
    form.parse(req, async (err, fields, files) => {
        const imagesList = Object.values(files);
        imagesList.map(file => {
            const ext = file.name.split('.');
            return ({name: file.name, size: file.size, ext: ext[ext.length-1]});
        }).forEach(async (image, index) => {
            const [imageID] = await db("imagebank").insert(image);
            fs.writeFileSync(path.join(__dirname, `./../images/${imageID}.${image.ext}`), fs.readFileSync(imagesList[index].path));
        });
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ fields, files }, null, 2));
    });
});

router.get('/:ID', async (req, res) => {
    const image = await db("imagebank").select('*').where('ID', req.params.ID).first();
    res.sendFile(path.join(__dirname,`../images/${image.ID}.${image.ext}`));
});

export default router;