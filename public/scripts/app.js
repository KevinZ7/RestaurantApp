$(document).ready(function(){

  function createMenuBody(menuItem){

    let $headerContent = $('<header>');
    let $donutImg = $('<img>').attr("src", menuItem.avatar).addClass('donut-card__img');
    let $donutContent = $('<section>').addClass('donut-card__body-text');
    let $donutName = $('<h3>').text(menuItem.name).addClass('donut-card__name');
    let $donutDescription = $('<p>').text(menuItem.description).addClass('donut-card__description');
    let $donutPrice = $('<span>').text(menuItem.price).addClass('donut-card__price');
    let $donutCard = $('<article>').addClass('donut-card');

    $headerContent.append($donutImg);
    $donutContent.append($donutName, $donutDescription, $donutPrice);
    $donutCard.append($donutImg, $donutContent);

    return $donutCard;
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

function orderPlaced(){
   $.ajax('/orderPlaced').then((data) =>{
    console.log(data)
  })
 }

orderPlaced();

});


