$(document).ready(function(){

  var cart = [];

  $(".orderButtons").click((event) => {
    let itemId = event.target.id;

    $.ajax('/addToCart', {
      method: "POST",
      data: {
        item_id: itemId
      },
      success: (val) => {
        $('p').remove();
        $('footer').remove();
        var cart = val.cart;
        var total = 0;

        cart.forEach((cartItem, i) =>{
          total += Number(cartItem.sum)/100;
          $('div').append($('<p>').text(cartItem.id).append($('<button>').addClass("deleteButton").attr('id','delete_'+cartItem.id).text("delete"))
            .append($('<p>').text(cartItem.name)).append($('<p>').text(cartItem.count)))
        })

        $('div').append($('<footer>').text(`price: $ ${total}`));

      }
    })
  });

  $('.cart').on('click','.deleteButton',function(event){
    let itemId = event.target.id.slice(7);


    $.ajax('/removeFromCart', {
      method: "POST",
      data: {
        item_id: itemId
      },
      success:(val) => {

        console.log(val);
        $('p').remove();
        $('footer').remove();
        var cart = val.cart;
        var total = 0;

        cart.forEach((cartItem, i) =>{
          total += Number(cartItem.sum)/100;
          $('div').append($('<p>').text(cartItem.id).append($('<button>').addClass("deleteButton").attr('id','delete_'+cartItem.id).text("delete"))
            .append($('<p>').text(cartItem.name)).append($('<p>').text(cartItem.count)))
        })



        $('div').append($('<footer>').text(`price: $ ${total}`));
      }
    })
  });




  $(".submitOrder").click((event) =>{

    $.ajax('/addToOrder', {
      method: "POST"
    })

  })


});


