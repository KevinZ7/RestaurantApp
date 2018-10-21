
exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('liked_items', function(likedItems){
    likedItems.increments('id').primary();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTable('liked_items')
};
