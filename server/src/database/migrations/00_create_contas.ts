import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('contas', table => {
        table.increments('id_conta').primary();
        table.string('nome').notNullable();
        table.decimal('saldo', 12, 2).defaultTo(0.00).notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('contas');
}