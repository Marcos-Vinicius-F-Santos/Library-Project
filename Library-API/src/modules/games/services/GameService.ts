import pool from '../../../config/database';
import { IGameCreationData } from '../interfaces/IGame';

export class GameService {
    
    public async createGame(data: IGameCreationData): Promise<IGame> {

        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            const mediaQuery = `
                INSERT INTO Media (media_type, title, release_year)
                VALUES ($1, $2, $3)
                RETURNING media_id;
            `;

            const mediaResult = await client.query(mediaQuery, [
                'GAME',
                data.title,
                data.releaseYear
            ]);

            const mediaId = mediaResult.rows[0].media_id;

            const gameQuery = `
                INSERT INTO Game (media_id, developer, publisher_id, saga_franchise)
                VALUES ($1, $2, $3, $4);
            `;

            await client.query(gameQuery, [
                mediaId,
                data.developer,
                data.publisherId,
                data.sagaFranchise
            ]);

            for (const platformId of data.platformIds) {
                const platformQuery = `
                    INSERT INTO Game_Platforms (game_id, platform_id)
                    VALUES ($1, $2);
                `;
                await client.query(platformQuery, [mediaId, platformId]);
            }

            for (const genreId of data.genreIds) {
                const genreQuery = `
                    INSERT INTO Game_Genres (game_id, genre_id)
                    VALUES ($1, $2);
                `;
                await client.query(genreQuery, [mediaId, genreId]);
            }

            await client.query('COMMIT');

            return {
                mediaId: mediaId,
                title: data.title,
                developer: data.developer,
                publisherName: `Publisher ID: ${data.publisherId}`
            } as IGame;
        
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Erro na criacao do jogo:', error);
            throw new Error('Falha ao cadastrar o jogo no banco de dados.');
        } finally {
            client.release();
        }
    }
}