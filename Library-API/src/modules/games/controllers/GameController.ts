import { Request, Response } from 'express';
import { GameService } from '../services/GameService';

const gameService = new GameService();

export class GameController {

    public async createGame(req: Request, res: Response): Promise<Response> {

        try {
            const gameData = req.body;
            
            const newGame = await gameService.createGame(gameData);
            
            return res.status(201).json({ 
                message: 'Jogo cadastrado com sucesso!', 
                game: newGame 
            });

        } catch (error: any) {

            return res.status(500).json({ 
                error: 'Erro ao processar a requisição.', 
                details: error.message 
            });
        }
    }
}