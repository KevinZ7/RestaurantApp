$(document).ready(function () {

  function createMenuBody(menuItem) {
    return $('<article>').addClass("donut-card")
      .append($('<header>').append(($('<div>').addClass('donut-card__iconContainer').append($('<i>').addClass('fas fa-heart').attr('id',`like_button_${menuItem.id}`)).append($('<img>').attr({
        src: menuItem.avatar
      }).addClass('donut-card__img')))))
      .append($('<section>').addClass('donut-card__body-text')
        .append($('<h3>').text(menuItem.name).addClass('donut-card__name'))
        .append($('<p>').text(menuItem.description).addClass('donut-card__description'))
        .append($('<p>').text(`$${(Number(menuItem.price)/100).toFixed(2)}`).addClass('donut-card__price'))
        .append($('<a>').addClass('donut-card__btn').attr({
          id: menuItem.id,
          href: '#',
          'data-toggle': 'modal',
          'data-target': '#cartModal',
          'target': '_blank'
        }).text('Add to Cart')))
  }

  function renderMenu(data) {
    data.forEach((menuItem) => {
      $('.card-layout').append(createMenuBody(menuItem))
    })
  }

  function loadMenu() {
    $.ajax('/items').then((response) => {
      renderMenu(response.menu);
    })
  }

  loadMenu();


  $('.card-layout').on('click', '.donut-card__btn', (event) => {
    let itemId = event.target.id;

    $.ajax('/addToCart', {
      method: "POST",
      data: {
        item_id: itemId
      },
      success: (val) => {
        $('tr').remove();
        $('footer').remove();
        var cart = val.cart;
        var total = 0;
        cart.forEach((cartItem, i) => {
          total += Number(cartItem.sum) / 100;

          $("#modal-table").append($('<tr>')
            .append($('<td>').text(cartItem.name))
            .append($('<td>').text(cartItem.count))
            .append($('<td><button></td>').attr('id', `minus_${cartItem.id}`).addClass('deleteOne').text("-"))
            .append($('<td><button></td>').attr('id', `plus_${cartItem.id}`).addClass('addOne').text("+"))
            .append($('<td>').text(`$${((Number(cartItem.price))/100).toFixed(2)}`))

          )
        })

        $('.modal-body').append($('<footer>').text(`Total $${(total).toFixed(2)}`).addClass('modal-content__footer'));

      }
    })
  });

  $('.user__card-layout').on('click', '.donut-card__btn', (event) => {
    let itemId = event.target.id;

    $.ajax('/addToCart', {
      method: "POST",
      data: {
        item_id: itemId
      },
      success: (val) => {
        $('tr').remove();
        $('footer').remove();
        var cart = val.cart;
        var total = 0;
        cart.forEach((cartItem, i) => {
          total += Number(cartItem.sum) / 100;

          $("#modal-table").append($('<tr>')
            .append($('<td>').text(cartItem.name))
            .append($('<td>').text(cartItem.count))
            .append($('<td><button></td>').attr('id', `minus_${cartItem.id}`).addClass('deleteOne').text("-"))
            .append($('<td><button></td>').attr('id', `plus_${cartItem.id}`).addClass('addOne').text("+"))
            .append($('<td>').text(`$${((Number(cartItem.price))/100).toFixed(2)}`))

          )
        })

        $('.modal-body').append($('<footer>').text(`Total $${(total).toFixed(2)}`).addClass('modal-content__footer'));

      }
    })
  });

  $('.modal-body').on('click', '.deleteOne', function (event) {
    let itemId = event.target.id.slice(6);

    $.ajax('/removeFromCart', {
      method: "POST",
      data: {
        item_id: itemId
      },
      success: (val) => {

        $('tr').remove();
        $('footer').remove();
        var cart = val.cart;
        var total = 0;

        cart.forEach((cartItem, i) => {
          total += Number(cartItem.sum) / 100;

          $("#modal-table").append($('<tr>')
            .append($('<td>').text(cartItem.name))
            .append($('<td>').text(cartItem.count))
            .append($('<td><button></td>').attr('id', `minus_${cartItem.id}`).addClass('deleteOne').text("-"))
            .append($('<td><button></td>').attr('id', `plus_${cartItem.id}`).addClass('addOne').text("+"))
            .append($('<td>').text(`$${((Number(cartItem.price))/100).toFixed(2)}`))
          )
        })
        $('.modal-body').append($('<footer>').text(`Total $${(total).toFixed(2)}`).addClass('modal-content__footer'));
      }
    })
  });

  $('.modal-body').on('click', '.addOne', function (event) {
    let itemId = event.target.id.slice(5);

    $.ajax('/addToCart', {
      method: "POST",
      data: {
        item_id: itemId
      },
      success: (val) => {

        $('tr').remove();
        $('footer').remove();
        var cart = val.cart;
        var total = 0;

        cart.forEach((cartItem, i) => {
          total += Number(cartItem.sum) / 100;

          $("#modal-table").append($('<tr>')
            .append($('<td>').text(cartItem.name))
            .append($('<td>').text(cartItem.count))
            .append($('<td><button></td>').attr('id', `minus_${cartItem.id}`).addClass('deleteOne').text("-"))
            .append($('<td><button></td>').attr('id', `plus_${cartItem.id}`).addClass('addOne').text("+"))
            .append($('<td>').text(`$${((Number(cartItem.price))/100).toFixed(2)}`))
          )
        })
        $('.modal-body').append($('<footer>').text(`Total $${(total).toFixed(2)}`).addClass('modal-content__footer'));
      }
    })
  });



  $(".modal-content__btn").click((event) => {

    $('tr').remove();
    $('#cartModal').slideToggle(0)
    $('footer').remove().append($('<p>').text('your order has been placed'));
    $.ajax('/addToOrder', {
      method: "POST",
    })
  })







  function renderOrderBody(orderInfo) {
    return $('<tr>')
      .append($('<td>').addClass('order-card__name').text(orderInfo.name))
      .append($('<td>').addClass('order-card__qty').text(orderInfo.count))

  }


  function renderOrderOutline(orderIdent, orderInfo) {
    return $('<section>').addClass('orders').attr('id', `order_${orderIdent.id}`)
      .append($('<article>').addClass('order-card')
        .append($('<table>').addClass('table').attr('id', `table_${orderIdent.id}`)
          .append($('<thead>').append($('<th>').addClass('order-card__orderNum').attr({
            'colspan': 2
          }).text(`Order # ${orderIdent.id}`)))
          .append($('<tr>').attr('id', `tr_${orderIdent.id}`)
            .append($('<td>').addClass('order-card__label').text('Donut Type'))
            .append($('<td>').addClass('order-card__label center').text('Quantity'))))
        .append($('<footer>').addClass('order-card__footer')
        .append($('<form>').addClass('order-card__form')
        .append($('<label>').text('Estimated Time'))
        .append($('<input>').attr('id', 'order-card__etaValue').addClass('order-card__etaValue'))
          .append($('<button>').addClass('order-card__btn').attr('id', `orderButton_${orderIdent.id}`).text('Confirm Order'))))
      )
  }


  function orderBody(data) {
    return data.forEach((orderBody) => {
      $('.orderContainer').append(renderOrderOutline(orderBody))
    })
  }




  function renderOrderData(data) {
    data.forEach((orderItem) => {
      let trId = orderItem.customer_orders_id;
      $(`#table_${trId}`).append(renderOrderBody(orderItem))
    })
  }



  function orderPlaced() {
    $.ajax('/orderPlaced').then((data) => {
        orderBody(data.orderIdents)
        return data;
      })
      .then((result) => {
        renderOrderData(result.order)
      })

  }

  orderPlaced();



  $('.orderContainer').on('click', '.order-card__btn', (event) => {
    let orderId = event.target.id.slice(12);
    let orderTime = $('.order-card__etaValue').val();

    $.ajax('/confirmOrder', {
      method: 'POST',
      data: {
        order_id: orderId,
        order_eta: orderTime
      },
      success: (val) => {
        $('.orders').remove();
        orderBody(val.orderIdents)
        renderOrderData(val.order);
      }

    })
  })


  $('.card-layout').on('click','.fa-heart', (event) => {
    let itemId = event.target.id.slice(12);

    $.ajax('/addLikedItem', {
      method: 'POST',
      data: {
        item_id: itemId
      },
      success: (val) => {
        console.log(val.items);

      }
    })
  })

  function createLikedBody(menuItem) {
    return $('<article>').addClass("donut-card")
      .append($('<header>').append(($('<div>').addClass('donut-card__iconContainer').append($('<i>').addClass("fas fa-minus-circle").attr('id',`unlike_button_${menuItem.id}`)).append($('<img>').attr({
        src: `.${menuItem.avatar}`
      }).addClass('donut-card__img')))))
      .append($('<section>').addClass('donut-card__body-text')
        .append($('<h3>').text(menuItem.name).addClass('donut-card__name'))
        .append($('<p>').text(menuItem.description).addClass('donut-card__description'))
        .append($('<p>').text(`$${(Number(menuItem.price)/100).toFixed(2)}`).addClass('donut-card__price'))
        .append($('<a>').addClass('donut-card__btn').attr({
          id: menuItem.id,
          href: '#',
          'data-toggle': 'modal',
          'data-target': '#cartModal',
          'target': '_blank'
        }).text('Add to Cart')))
  }

  function renderLiked(data) {
    $('.user__card-layout .donut-card').remove();
    data.forEach((menuItem) => {
      $('.user__card-layout').append(createLikedBody(menuItem))
    })
  }

  function favouriteD(){
    $.ajax('/favourite')
    .then((data)=>{
      renderLiked(data.favouriteInfo);
    })
  }

  favouriteD();




  $('.user__card-layout').on('click','.fa-minus-circle' , (event) => {
    let itemId = event.target.id.slice(14);

    $.ajax('/removeLikedItem', {
      method: 'POST',
      data: {
        item_id: itemId
      },
      success: (val) => {
        favouriteD();
      }
     }
    )
  })





});