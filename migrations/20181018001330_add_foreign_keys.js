
exports.up = function(knex, Promise) {
  return knex.schema
  .table('order',(order) => {
    order.integer('user_id');
    order.foreign('user_id').references('users.id');
  })
  .table('list_item',(listItem) => {
    listItem.integer('order_id');
    listItem.integer('menu_item_id');
    listItem.foreign('order_id').references('order.id');
    listItem.foreign('menu_item_id').references('menu_item.id');
  })

};

exports.down = function(knex, Promise) {
  return knex.schema
  .table('order',(order) => {
    order.dropColumn('user_id');
  })
  .table('list_item',(listItem) => {
    listItem.dropColumn('order_id');
    listItem.dropColumn('menu_item_id');
  })
};
