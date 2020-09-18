import { Request, Response } from 'express';
import db from '../database/connection';

export default class CategoriaController {
    async create(request: Request, response: Response) {
        const { nome, tipo } = request.body;

        const trx = await db.transaction();

        try {
            await trx('categorias').insert({
                nome,
                tipo
            });

            await trx.commit();

            return response.status(201).json({
                sucess: "Categoria cadastrada com sucesso!!!"
            });
        }
        catch (err) {
            trx.rollback();

            return response.status(400).json({
                error: "Erro ao cadastrar a categoria"

            });
        }
    }

    async index(request: Request, response: Response) {
        try {
            const categorias = await db.column('id_categoria', 'nome', 'tipo')
                .select()
                .from('categorias');

            return response.json(categorias);
        } catch (err) {
            return response.status(400).json({
                error: "Erro ao listar as categorias"
            });
        }
    }
}