import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import dbPool from './config/database';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    return res.json({ message: 'API da Biblioteca'});
})

app.listen(PORT, () => {
    console.log('Servidor rodando em http://localhost:${PORT}')
})