import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('lancamentos_cartao', table => {
        table.increments('id_lanc_cartao').primary();
        table.decimal('valor', 12, 2).notNullable();
        table.dateTime('data_lancamento').notNullable();
        table.dateTime('data_vencimento').notNullable();
        table.dateTime('data_efetivacao').notNullable();
        table.string('tipo_recorrencia').notNullable();//Nenhuma, Fixa, Parcelado
        table.integer('qtd_parcelas').defaultTo(0).notNullable();
        table.integer('id_cartao')
            .notNullable()
            .references('id_cartao')
            .inTable('cartoes')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('lancamentos_cartao');
}