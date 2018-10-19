$(document).ready(function(){

  var cart = [];

  $(".orderButtons").click((event) => {
    let itemId = event.target.id;

    $.ajax('/addToCart', {
      method: "POST",
      data: {
        item_id: itemId
      }
    })

    // var found = false;
    // cart.forEach(function(item){
    //   if(item.id === event.target.id){
    //     item.quantity += 1;
    //     found = true;
    //   }
    // })

    // if(found === false){
    //   cart.push({
    //     id: event.target.id,
    //     quantity: 1
    //   });
    // }
  });



  $(".submitOrder").click((event) =>{

    $.ajax('/orders', {
      method: "POST",
      data: {
        cart: cart
      }
    })

  })










// $(".orderButtons").on("click", ()=>{

//   i

//   cart.forEach(function(item){
//     if(item.id === 1){
//       item.quantity += 1;
//       found = true;
//     }
//   })

//   if(found === false){
//     cart.push({
//       id: 1,
//       quantity: 1
//     });
//   }


//   // cart.push({
//   //   id: 1,
//   //   quantity: 1
//   // });

//   console.log(cart);
// })

// $("#2").on("click", ()=>{

//   var found = false;

//   cart.forEach(function(item){
//     if(item.id === 2){
//       item.quantity += 1;
//       found = true;
//     }
//   })

//   if(found === false){
//     cart.push({
//       id: 2,
//       quantity: 1
//     });
//   }


  // cart.push({
  //   id: 1,
  //   quantity: 1
  // });

//   console.log(cart);
// })






  // alert("i am on the page!")







});





