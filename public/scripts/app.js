$(document).ready(function(){

  function createMenuBody(menuItem){
   return $('<p>').text(menuItem.name).append($("<p>").text(menuItem.description))
   .append($('<p>').text(menuItem.price))
  }



  function renderMenu(data){
    data.forEach((menuItem) =>{
      $('.itemsInMenu').append(createMenuBody(menuItem))
    })
  }

  function loadMenu(){
    $.ajax('/items').then((response) =>{
      renderMenu(response.menu);
    })
  }

  loadMenu();




  $(".orderButtons").click((event) => {
    let itemId = event.target.id;

    $.ajax('/addToCart', {
      method: "POST",
      data: {
        item_id: itemId
      },
      success: (val) => {
        console.log(val);
        $('p').remove();
        $('footer').remove();
        var cart = val.cart;
        var total = 0;
        cart.forEach((cartItem, i) =>{
          total += Number(cartItem.sum)/100;
          $(".modal-body").append($('<table>').addClass('table')
            .append($('<tr>')
              .append($('<td>').addClass('name').text(cartItem.name))
              .append($('<td>').addClass('qty').text(`QTY:${cartItem.count}`))
              .append($('<td>').addClass('price').text(`Price: $${cartItem.price}`))
              ))
           })
        $('.modal-body').append($('<footer>').text(`price: $ ${total}`));
        }
      })
  });


  $(".submitOrder").click((event) =>{
    $.ajax('/addToOrder', {
      method: "POST",
    })
  })


  $.ajax('/admin').then((data) =>{
    console.log(data)

  })

















});


