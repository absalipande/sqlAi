import express, { Request, Response } from 'express';
import cors from 'cors';
import generateRoute from './routes/generateRoute';

const app = express();
const port = process.env.PORT || 3060;

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Test');
});

app.use('/generate', generateRoute);

app.listen(port, () => {
  console.log(`Server is up and running on Port: ${port}`);
});
