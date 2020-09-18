import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('cartoes', table => {
        table.increments('id_cartao').primary();
        table.string('nome').notNullable();
        table.decimal('limite', 12, 2).defaultTo(0.00).notNullable();
        table.dateTime('fechamento').notNullable();
        table.dateTime('vencimento').notNullable();
        table.decimal('valor_fatura').notNullable();
        table.integer('id_conta')
            .notNullable()
            .references('id_conta')
            .inTable('contas')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('cartoes');
}