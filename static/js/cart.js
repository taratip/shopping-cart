let cart = [];
let products = [];

// hide cart on load
if (cart.length === 0) {
  $("#cart-table").css("display", "none");
}

// get product list
function getProd(response) {
  products = response.products;
}

// add item to cart
function addToCart(id) {
  // check if product already exists in cart
  let item = cart.find(obj => { return obj.id === id});

  if (typeof item === "undefined") {
    let product = products.find(obj => { return obj.id === id });

    let new_item = {
      "id" : product.id,
      "name" : product.name,
      "price" : product.price,
      "quantity" : 1
    }
    cart.push(new_item);
  } else {
    item.quantity += 1;
  }
}

// remove item from cart
function removeFromCart(id) {
  let item = cart.find(obj => { return obj.id === id});
  item.quantity -= 1;

  if (item.quantity === 0) {
    cart = cart.filter(obj => { return obj.id !== id});
  }
}

// show current items in cart
function showCart() {
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
  showCart();
});

// when icon 'Remove' clicked
$("#cart-table").on("click", "i.fas.fa-times-circle", function() {
  let id = Number($(this).attr("data-id"));
  removeFromCart(id);
  showCart();
});


url = '../data/products.json';

$.get(url, getProd);
