import express from 'express';
import serverless from 'serverless-http';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { Request, Response } from 'express';
import { authMiddleware } from './middleware/auth.middleware';
import { upload } from './services/upload/upload.service';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(authMiddleware());

app.get('/health', async (_req: Request, res: Response) => {
    res.status(200).send({ status: 'ok' });
});

app.post('/upload-file', async (req: Request, res: Response) => {
    const { text } = req.body;

    if (!text || typeof text !== 'string') {
        return res.status(400).send({
            status: 'error',
            message: 'Invalid request body. "text" field is required.'
        });
    }

    await upload(text);

    res.status(200).send({ status: 'ok', message: 'File uploaded successfully.' });
});

const handler = serverless(app);
export { handler };

if (process.env.ENV === 'local') {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server is running locally on port ${PORT}`);
    });
}
