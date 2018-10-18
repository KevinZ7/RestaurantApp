
exports.up = function(knex, Promise) {
  return knex.schema
  .table('list_item',(listItem) => {
    listItem.integer('menu_item_id');
    listItem.foreign('menu_item_id').references('menu_item.id');
  })
  .table('cart',(cart) => {
    cart.integer('users_id');
    cart.integer('list_item_id');
    cart.integer('order_id');
    cart.foreign('order_id').references('order.id');
    cart.foreign('list_item_id').references('list_item.id');
    cart.foreign('users_id').references('users.id');
  })

};

exports.down = function(knex, Promise) {
  return knex.schema
  .table('list_item',(listItem) => {
    order.dropColumn('menu_item_id');
  })
  .table('cart',(cart) => {
    cart.dropColumn('order_id');
    cart.dropColumn('list_item_id');
    cart.dropColumn('users_id');

  })
};
