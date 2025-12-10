import { Pool } from 'pg';
import 'dotenv/config';

// Configuracao do Pool de conexoes
const pool = new Pool({
    // Variaveis sao carregadas pelo 'dotenv/config' no server.ts
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    max: 20,
    idleTimeoutMillis: 30000,
});

// Listener para erros de conexao
pool.on('error', (err: Error) => {
    console.error('Erro inesperado no pool do PostegreSQL: ', err.stack);
    process.exit(1);
})

console.log(`[DB] Conexao bem-sucedida ao banco: ${process.env.DB_DATABASE}`);

pool.connect()
    .then(client=> {
        console.log(`[DB] Conexao bem-sucedida ao banco: ${process.env.DB_DATABASE}`);
        client.release();
    })
    .catch(err => {
        console.error('[DB] Erro fatal: Falha ao conectar ao PostgreSQL. Verifique o Docker e as credenciais no .env', err.message);
    });

export default pool;