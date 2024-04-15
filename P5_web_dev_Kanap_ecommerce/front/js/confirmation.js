
const productId = document.getElementsByTagName("link")[0].baseURI.replace('http://127.0.0.1:5500/front/html/confirmation.html?orderId=', '');
// Get the orderId element
const orderIdElement = document.getElementById('orderId');

orderIdElement.textContent = productId;