import { Request, Response } from 'express';
import db from '../database/connection';

export default class ContaController {
    async create(request: Request, response: Response) {
        const { nome, saldo } = request.body;

        const trx = await db.transaction();

        try {
            await trx('contas').insert({
                nome,
                saldo
            });

            await trx.commit();

            return response.status(201).json({
                sucess: "Conta cadastrada com sucesso!!!"
            });
        }
        catch (err) {
            trx.rollback();

            return response.status(400).json({
                error: "Erro ao cadastrar a conta"

            });
        }
    }

    async index(request: Request, response: Response) {
        try {
            const contas = await db.column('id_conta', 'nome')
                .select()
                .from('contas');

            return response.json(contas);
        } catch (err) {
            return response.status(400).json({
                error: "Erro ao listar as contas"
            });
        }
    }
}