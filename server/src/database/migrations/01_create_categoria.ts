import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('categorias', table => {
        table.increments('id_categoria').primary();
        table.string('nome').notNullable();
        table.integer('tipo').notNullable()
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('categorias');
}