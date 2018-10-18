
exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('user', function(user){
    user.string('username').primary();
    user.string('name');
    user.string('phone');
    user.string('password');
  })
  .createTable('order', function(order){
    order.serial('id').primary();
  })
  .createTable('list_item', function(orderList){
    orderList.serial('id').primary();
    orderList.integer('quantity');
  })
  .createTable('menu_item', function(menuItem){
    menuItem.serial('id').primary();
    menuItem.string('name');
    menuItem.string('description');
    menuItem.money('price');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTable('menu_item')
  .dropTable('list_item')
  .dropTable('order')
  .dropTable('user')
};
