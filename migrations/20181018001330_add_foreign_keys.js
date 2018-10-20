
exports.up = function(knex, Promise) {
  return knex.schema
  .table('order_line_items',(listItem) => {
    listItem.integer('menu_items_id');
    listItem.integer('customer_orders_id');
    listItem.foreign('menu_items_id').references('menu_items.id');
    listItem.foreign('customer_orders_id').references('customer_orders.id');
  })
  .table('cart_line_items',(cart) => {
    cart.integer('users_id');
    cart.integer('menu_items_id');
    cart.foreign('menu_items_id').references('menu_items.id');
    cart.foreign('users_id').references('users.id');
  })
  .table('customer_orders',(order) => {
    order.integer('users_id');
    order.foreign('users_id').references('users.id');
  })

};

exports.down = function(knex, Promise) {
  return knex.schema
 .table('order_line_items',(listItem) => {
    listItem.dropColumn('menu_items_id');
    listItem.dropColumn('customer_orders_id');
  })
  .table('cart_line_items',(cart) => {
    cart.dropColumn('users_id');
    cart.dropColumn('menu_items_id');
  })
  .table('customer_orders',(order) => {
    order.dropColumn('users_id');
  })
};
