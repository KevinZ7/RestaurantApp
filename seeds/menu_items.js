exports.seed = function(knex, Promise) {
  return knex('menu_item').del()
  .then(function(){
    return knex('menu_item').insert([
      {name: "Steak Frites", description: "Flat iron steak with rosemaryfrites", price : 1900},
      {name: "Angus Burger", description: "Burger with rosemaryfrites", price : 2100},
      {name: "Salmon ", description: "Salmon with rice and veg", price : 2700},
      {name: "pizza", description: "pepperon pizza", price : 1400}
    ])
  })

};