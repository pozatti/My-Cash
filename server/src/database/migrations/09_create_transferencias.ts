import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('transferencia', table => {
        table.increments('id_transferencia').primary();
        table.decimal('valor', 12, 2).notNullable();
        table.integer('id_conta_creditada')
            .notNullable()
            .references('id_conta')
            .inTable('contas')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        table.integer('id_conta_debitada')
            .notNullable()
            .references('id_conta')
            .inTable('contas')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('transferencia');
}