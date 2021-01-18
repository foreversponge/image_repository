import express from 'express';

const router = express();
const now = new Date();


//Test database connection
router.get('/', (req, res) => {
    res.json({
        name: "imagebank-api",
        version: "1.0",
        date: now.toLocaleString()
    });
});

export default router;