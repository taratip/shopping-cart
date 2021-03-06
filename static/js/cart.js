let cart = [];

// hide when no items in cart
if (cart.length === 0) {
  $("#cart-table").css("display", "none");
}

// add item to cart
function addToCart(id) {
  $.get('./data/products.json', function(res) {
    let products = res.products;

    // check if product already exists in cart
    let item = cart.find(obj => { return obj.id === id});

    // if product not exist in cart
    if (typeof item === "undefined") {
      let product = products.find(obj => { return obj.id === id });

      let new_item = {
        "id" : product.id,
        "name" : product.name,
        "price" : product.price,
        "quantity" : 1
      }

      cart.push(new_item);
    } else { // add quanity if product already exists
      item.quantity += 1;
    }
  });

  // call showCart to update table
  // Usage!
  sleep(50).then(() => {
    showCart();
  });
}

// remove item from cart
function removeFromCart(id) {
  let item = cart.find(obj => { return obj.id === id});
  item.quantity -= 1;

  if (item.quantity === 0) {
    cart = cart.filter(obj => { return obj.id !== id});
  }

  showCart();
}

// show current items in cart
function showCart() {
  // hide if no item in cart
  if (cart.length === 0) {
    $("#cart-table").css("display", "none");
  } else {
    $("#cart-table").css("display", "");
  }

  let cart_html = '';
  let total = 0;
  let total_quantity = 0;

  // create row for each item in cart
  for (let item of cart) {
    cart_html += `<tr><th scope="row">${item.name}</th>`;
    cart_html += `<td>${item.quantity}</td>`;
    cart_html += `<td>$${(item.price * item.quantity).toFixed(2)}</td>`;
    cart_html += `<td><i data-id="${item.id}" class="fas fa-times-circle"></i></td></tr>`;
    total += item.price * item.quantity;
    total_quantity += item.quantity;
  }

  // create total row
  cart_html += '<tr class="table-info"><th colspan="2" scope="row">Total Amount</th>';
  cart_html += `<td>$${total.toFixed(2)}</td><td></td></tr>`;

  // update elements
  $("#cart-body").html(cart_html);
  $("#nav-total").text(total.toFixed(2));
  $("#quantity").text(total_quantity);
}

// when button 'Add to Cart' clicked
$("#product-card").on("click", "button", function() {
  let id = Number($(this).attr("data-id"));

  // show cart information
  $("#cart-table").css("display", "");

  addToCart(id);
});

// when icon 'Remove' clicked
$("#cart-table").on("click", "i.fas.fa-times-circle", function() {
  let id = Number($(this).attr("data-id"));
  removeFromCart(id);
});

// https://zeit.co/blog/async-and-await
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
