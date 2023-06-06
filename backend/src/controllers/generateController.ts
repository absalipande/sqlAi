import { Request, Response } from 'express';
import generate from '../services/generate';

export const generateQuery = async (req: Request, res: Response) => {
  const { queryDescription } = req.body;

  try {
    const sqlQuery = await generate(queryDescription);
    res.json({ sqlQuery });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
