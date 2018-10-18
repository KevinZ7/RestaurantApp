exports.seed = function(knex) {

  const deleteAllMenuitems = knex('menu_item').del();
  const deleteAllUsers = deleteAllMenuitems
  .then(() => {
    return knex('users').del()

  });

  const createNewMenuItems = deleteAllUsers
  .then(()=>{
    return knex('menu_item')
    .returning('*')
    .insert([{
      name: 'Triple Chocolate Glaze',
      description:'A straight up 55% Belgian chocolate ganache glaze, done proper.',
      avatar: '/images/donut1.jpg',
      price: 450
    }, {
      name:'Apricot & Lavender',
      description:'Exactly as it sounds, this tasty cake donut is infused with an organic earl grey tea, topped with earl grey glaze and a sprinkling of rose petals!',
      avatar:'/images/donut2.jpg',
      price: 450
    }, {
      name:'Lemon Citrus Glaze',
      description:'Our vanilla donut glazed with organic vanilla bean. Enough said.',
      avatar:'/images/donut3.jpg',
      price: 450
    }, {
      name:'Salted Caramel',
      description:'Chocolate base with caramel drizzles.',
      avatar:'/images/donut4.jpg',
      price: 450
    }, {
      name:'Toasted Coconut',
      description:'Honey glazed donut tossed in coconut sprinkles.',
      avatar:'/images/donut5.jpg',
      price: 450
    }, {
      name:'Birthday Cake Sprinkles',
      description:'Classic honey glazed donut with birthday cake sprinkles.',
      avatar:'/images/donut6.jpg',
      price: 450
    }]);

  });

  const newUsres = createNewMenuItems
  .then(() => {
    return knex('users')
    .returning('*')
    .insert([{
      name:'Andrea Hirji',
      phone:'7809944398',
      password:'andrea12',
      username:'AndreaLovesDoughnuts'
    }, {
      name: 'David Khayutin',
      phone: '6044410372',
      password:'doughnuts',
      username:'Doughnut-King'
    }

    ]);
  });
  return newUsres;
};