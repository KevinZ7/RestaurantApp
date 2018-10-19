
exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('users', function(user){
    user.increments('id').primary();
    user.string('name');
    user.string('phone');
    user.string('username');
    user.string('password');
  })
  .createTable('order', function(order){
    order.increments('id').primary();
  })
  .createTable('list_item', function(orderList){
    orderList.increments('id').primary();
    orderList.integer('quantity');
  })
  .createTable('menu_item', function(menuItem){
    menuItem.increments('id').primary();
    menuItem.string('name');
    menuItem.string('description');
    menuItem.integer('price');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTable('menu_item')
  .dropTable('list_item')
  .dropTable('order')
  .dropTable('users')
};
