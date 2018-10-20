$(document).ready(function(){

  function createMenuBody(menuItem){
    return $('<article>').addClass("donut-card")
      .append($('<header>').append($('<img>').attr({src: menuItem.avatar}).addClass('donut-card__img')))
      .append($('<section>').addClass('donut-card__body-text')
        .append($('<h3>').text(menuItem.name).addClass('donut-card__name'))
        .append($('<p>').text(menuItem.description).addClass('donut-card__description'))
        .append($('<span>').text(`$${(Number(menuItem.price)/100)}`).addClass('donut-card__price'))
        .append($('<br>')).append($('<a>').addClass('donut-card__btn').attr({
          id : menuItem.id,
          href: '#',
          'data-toggle' : 'modal',
          'data-target': '#cartModal',
          'target': '_blank'
        }).text('Add to Cart')))
  }

  function renderMenu(data){
    data.forEach((menuItem) =>{
      $('.card-layout').append(createMenuBody(menuItem))
    })
  }

  function loadMenu(){
    $.ajax('/items').then((response) =>{
      console.log(response)
      renderMenu(response.menu);
    })
  }

  loadMenu();




  $('.card-layout').on('click','.donut-card__btn',(event) => {
    let itemId = event.target.id;
    console.log(itemId);

    $.ajax('/addToCart', {
      method: "POST",
      data: {
        item_id: itemId
      },
      success: (val) => {
        $('.table').remove();
        $('footer').remove();
        var cart = val.cart;
        var total = 0;
         cart.forEach((cartItem, i) =>{
          total += Number(cartItem.sum)/100;

          $(".modal-body").append($('<table>').addClass('table')
            .append($('<tr>')
              .append($('<td>').addClass('name').text(cartItem.name))
              .append($('<td>').addClass('qty').text(`QTY:${cartItem.count}`))
              .append($('<td>').addClass('price').text(`Price: $${(Number(cartItem.price))/100}`))
              .append($('<button>').attr('id', `minus_${cartItem.id}`).addClass('deleteOne').text("delete"))
              .append($('<button>').attr('id', `plus_${cartItem.id}`).addClass('addOne').text("add"))
              ))
           })

        $('.modal-body').append($('<footer>').text(`price: $ ${total}`));

      }
    })
  });

  $('.modal-body').on('click','.deleteOne',function(event){
    let itemId = event.target.id.slice(6);

    $.ajax('/removeFromCart', {
      method: "POST",
      data: {
        item_id: itemId
      },
      success:(val) => {

        console.log(val);
        $('.table').remove();
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
              .append($('<button>').attr('id', `minus_${cartItem.id}`).addClass('deleteOne').text("delete"))
              .append($('<button>').attr('id', `plus_${cartItem.id}`).addClass('addOne').text("add"))
              ))
           })
        $('.modal-body').append($('<footer>').text(`price: $ ${total}`));
        }
      })
  });

   $('.modal-body').on('click','.addOne',function(event){
    let itemId = event.target.id.slice(5);

    $.ajax('/addToCart', {
      method: "POST",
      data: {
        item_id: itemId
      },
      success:(val) => {

        console.log(val);
        $('.table').remove();
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
              .append($('<button>').attr('id', `minus_${cartItem.id}`).addClass('deleteOne').text("delete"))
              .append($('<button>').attr('id', `plus_${cartItem.id}`).addClass('addOne').text("add"))
              ))
           })
        $('.modal-body').append($('<footer>').text(`price: $ ${total}`));
        }
      })
  });



  $("#submitOrder").click((event) =>{
    $('.table').remove();
    $('footer').remove();
    $.ajax('/addToOrder', {
      method: "POST",
    })
  })


  function renderOrderBody(orderInfo){
    return $('<div>').addClass('confirmOrder')
    .append($('<p>').text(orderInfo.name))
    .append($('<p>').text(orderInfo.phone))
    .append($('<p>').text(orderInfo.customer_orders_id))
    .append($('<p>').text(orderInfo.count))
  }

  function renderOrderData(data){
    data.forEach((orderItem)=>{
      $('section').append(renderOrderBody(orderItem))
    })
  }



function orderPlaced(){
   $.ajax('/orderPlaced').then((data) =>{
   renderOrderData(data.order)
  })
 }

orderPlaced();


  // $('#confirmOrder').click((event) =>{
  //   $.ajax('/confirmOrder', {
  //     method: 'POST',
  //     data:
  //   }
  //   })
  // })


});


