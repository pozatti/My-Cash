import { Request, Response } from 'express';
import db from '../database/connection';

export default class TransferenciaController {
    async create(request: Request, response: Response) {
        const {
            valor,
            id_conta_debitada,
            id_conta_creditada
        } = request.body;

        const trx = await db.transaction();

        try {
            await trx('transferencia').insert({
                valor,
                id_conta_creditada,
                id_conta_debitada
            });

            await trx('contas')
                .where('id_conta', id_conta_creditada)
                .increment('saldo', valor)


            await trx('contas')
                .where('id_conta', id_conta_debitada)
                .decrement('saldo', valor)

            await trx.commit();

            return response.status(201).json({
                sucess: "Transferencia realizada com sucesso!!!"
            });
        } catch (err) {
            return response.status(400).json({
                erro: "Erro ao realizar uma tranferencia!!!"
            });
        }
    }

    async index(request: Request, response: Response) {
        /*   try {
              
          } catch (err) {
              return response.status(400).json({
                  erro: "Erro ao listar as tranferencias!!!"
              });
          } */

        var contaDebitada = await db.select('contas.nome as Conta Debitada')
            .from('transferencia')
            .join('contas', 'transferencia.id_conta_debitada', '=', 'contas.id_conta')

        const trasnfs = await db.select(
            'transferencia.valor',
            'contas.nome as Conta Creditada')
            .from('transferencia')
            .join('contas', 'transferencia.id_conta_creditada', '=', 'contas.id_conta')


        console.log(trasnfs, contaDebitada);
        return response.status(201).json(trasnfs);
    }
}