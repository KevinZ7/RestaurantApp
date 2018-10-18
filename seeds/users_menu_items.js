exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: "sam123", name: 'sam',password: 'iamnotdeleting',phone: '7788888888'},
        {username: "kev123", name: 'kevin',password: 'iamreallynotdeleting',phone: '6044444444'}
      ]);
    });
};