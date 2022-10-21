const Reducer = (cart = [], action) => {
  console.log('Mycart is', cart);

  var cart1 = JSON.parse(localStorage.getItem('cart'));
 
  if (action.type === "ADD") {
    let tempcart = cart1.filter((product) => product?.menu_id === action.payload.menu_id);
    console.log('TEMP cart is', tempcart);
    if (tempcart < 1) {
      return [...cart, action.payload];
    } else {
      return cart1;
    }
  }

  if (action.type === "STORE_NAME_RESET") {
    return cart1 = [];
  }


  if (action.type === "REMOVE") {
    return cart1.filter((product) => product?.menu_id !== action.payload?.menu_id);
  }
  if (action.type === "INCREASE") {
    let tempcart = cart1.map((product) => {
      if (product?.menu_id === action.payload?.menu_id) {
        // console.log('ABC', product)
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    return tempcart;
  }
  if (action.type === "DECREASE") {
    let tempcart = cart1.map((product) => {
      if (product?.menu_id === action.payload?.menu_id) {
        return { ...product, quantity: product.quantity - 1 };
      }
      return product;
    });
    return tempcart;
  }
  return cart1;
};
export default Reducer;


// const Reducer = (cart = [], action) => {
//   console.log('Mycart is', cart);
  
//   var cart = JSON.parse(localStorage.getItem('cart'));

 
//   if (action.type === "ADD") {
//     let tempcart = cart.filter((product) => product?.menu_id === action.payload.menu_id);
//     console.log('TEMP cart is', tempcart);
//     if (tempcart < 1) {
//       return [...cart, action.payload];
//     } else {
//       return cart;
//     }
//   }

//   if (action.type === "STORE_NAME_RESET") {
//     return cart = [];
//   }


//   if (action.type === "REMOVE") {
//     return cart.filter((product) => product?.menu_id !== action.payload?.menu_id);
//   }
//   if (action.type === "INCREASE") {
//     let tempcart = cart.map((product) => {
//       if (product?.menu_id === action.payload?.menu_id) {
//         // console.log('ABC', product)
//         return { ...product, quantity: product.quantity + 1 };
//       }
//       return product;
//     });
//     return tempcart;
//   }
//   if (action.type === "DECREASE") {
//     let tempcart = cart.map((product) => {
//       if (product?.menu_id === action.payload?.menu_id) {
//         return { ...product, quantity: product.quantity - 1 };
//       }
//       return product;
//     });
//     return tempcart;
//   }
//   return cart;
// };
// export default Reducer;




