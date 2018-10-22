
exports.up = function(knex, Promise) {
  return knex.schema
  .table('liked_items',(likedItems) => {
    likedItems.integer('users_id');
    likedItems.integer('menu_items_id');
    likedItems.foreign('users_id').references('users.id');
    likedItems.foreign('menu_items_id').references('menu_items.id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema
  .table('liked_items',(likedItems) => {
    likedItems.dropColumn('users_id');
    likedItems.dropColumn('menu_items_id');
  })
};
