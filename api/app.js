import express from 'express';
import cors from 'cors';

import indexRouter from './routes/index.js';
import imagesRouter from './routes/images.js';

const app = express();

// Init cors
app.use(cors());

//Setup routes
app.use('/', indexRouter);
app.use('/images', imagesRouter);

const port = process.env.PORT || 3000;
app.listen(port, _ => console.log(`Server started on port ${port}`));