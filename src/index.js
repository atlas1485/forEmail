import express from 'express';
import email from './api/email';
import cors from 'cors';

const app = express()
const port = process.env.PORT || 3000

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.use(cors());
app.use(express.json());

app.use('/api/email', email);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))