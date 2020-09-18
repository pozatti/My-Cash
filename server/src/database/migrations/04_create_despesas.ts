import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('despesas', table => {
        table.increments('id_despesa').primary();
        table.string('nome').notNullable();
        table.decimal('valor', 12, 2).notNullable();
        table.integer('id_conta')
            .notNullable()
            .references('id_conta')
            .inTable('contas')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        table.integer('id_categoria')
            .notNullable()
            .references('id_categoria')
            .inTable('categoria')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('despesas');
}