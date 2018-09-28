$.get('./components/header.html', function(response) {
  $("#nav").html(response);
});

// callback function
function showProd(response) {
  // html variable to be inserted
  let card_html = '';
  let index = 1;
  let total_products = response.products.length;

  for (let product of response.products) {
    if (index === 1 || index % 3 === 1) {
      // create row
      card_html += '<div class="row extra-margin">';
    }

    // create card for each product
    card_html += '<div class="col-md card">';
    card_html += '<img src="http://placehold.it/150x150" alt="Placeholder Image" class="center card-img-top">';
    card_html += `<div class="card-title">${product.name}</div>`;
    card_html += `<div class="card-subtitle">$${product.price.toFixed(2)}</div>`;
    card_html += `<button data-id="${product.id}" class="btn btn-primary center">Add To Cart</button></div>`;

    // create empty box space
    if (index === total_products && index % 3 === 1) {
      card_html += '<div class="col-md no-box-space"></div>';
      card_html += '<div class="col-md no-box-space"></div>';
    } else if (index === total_products && index % 3 === 2) {
      card_html += '<div class="col-md no-box-space"></div>';
    }

    // add end div for row
    if (index % 3 === 0 || index === total_products) {
      card_html += '</div>'
    }

    index += 1;
  }

  // insert card_html into product-card id
  $("#product-card").html(card_html);
}

url = '../data/products.json';

$.get(url,showProd);
