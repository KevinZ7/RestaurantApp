
exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('users', function(user){
    user.increments('id').primary();
    user.string('name');
    user.string('phone');
    user.string('username');
    user.string('password');
  })
  .createTable('customer_orders', function(order){
    order.increments('id').primary();
    order.date('date');
    order.time('time');
  })
  .createTable('order_line_items', function(orderList){
    orderList.increments('id').primary();
  })
  .createTable('menu_items', function(menuItem){
    menuItem.increments('id').primary();
    menuItem.string('name');
    menuItem.string('description');
    menuItem.integer('price');
    menuItem.string('avatar');
  })
  .createTable('cart_line_items', function(cart){
    cart.increments('id').primary();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTable('menu_items')
  .dropTable('order_line_items')
  .dropTable('customer_orders')
  .dropTable('users')
  .dropTable('cart_line_items')
};
