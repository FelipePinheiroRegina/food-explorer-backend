exports.up = knex => knex.schema.createTable('favorites', table => {
    table.increments('id')
    
    table.integer('id_user').references('id').inTable('users').onDelete('CASCADE')
    table.integer('id_dishe').references('id').inTable('dishes').onDelete('CASCADE')
    
    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('updated_at').default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable('favorites')
