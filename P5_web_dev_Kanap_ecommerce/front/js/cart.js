// Import local storage products
let storedCartProduct = localStorage.getItem('addToCart');

const apiUrl = "http://localhost:3000/api/products/";

let tmp = JSON.parse(localStorage.getItem('addToCart'));

let selectedCartProduct = tmp || [];

//For every object create a HTML <a> with dynamically data
selectedCartProduct.map(el => {
  // const products = document.createElement('a');
  const product = document.createElement('article')
  let elementPrice;


  fetch(apiUrl + el.id, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(res => {
    return res.json()
  }).then(data => {

    elementPrice = data.price;

    // Add class name to the product HTML element article
    product.classList.add("cart__item");

    // Set product data-id 
    product.setAttribute("data-id", `${el.key}`);
    // Set product data-color
    product.setAttribute("data-color", `${el.color}`);

    // For every product insert HTML element with variable data based on local store data
    product.innerHTML = `<div class="cart__item__img">
                <img src="${el.imageUrl}" alt="Photo of ${el.name}">
              </div>
              <div class="cart__item__content">
                <div class="cart__item__content__description">
                  <h2>${el.name}</h2>
                  <p>${el.color}</p>
                  <p>€ <string id="price">${elementPrice}</string></p>
                </div>
                <div class="cart__item__content__settings">
                  <div class="cart__item__content__settings__quantity">
                    <p>Quantity : </p>
                    <input type="number" id="itemQuantity" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${el.quantity}">
                  </div>
            <div class="cart__item__content__settings__delete">
              <p id="deleteItem" class="deleteItem" type="submit">Delete</p>
            </div>
      </div>
    </div>`
    document.getElementById('cart__items').appendChild(product);
  })
    .catch(error => {
      console.log('Error:', error);
    });
});


// A calculator for the total quantity of the items from my cart
let quantityCalculator = () => {
  let totalQuantity = document.getElementById("totalQuantity");
  totalQuantity.innerHTML = selectedCartProduct.map((el) => el.quantity).reduce((x, y) => x + y, 0);
};

const quantityInput = document.getElementById("cart__items");


//  Add an event listener that will look for input elements
quantityInput.addEventListener("input", (event) => {
  event.preventDefault;

  // import data from local store
  let readCartLs = JSON.parse(localStorage.getItem("addToCart"));
  let item = readCartLs.find((el) => el.key === event.target.parentNode.parentNode.parentNode.parentNode.getAttribute("data-id"));
  // let test = readCartLs.find((el) => el.key);


  // replace the item quantity with the inputed value
  item.quantity = event.target.value;
  //  store the new value into local storage
  localStorage.setItem("addToCart", JSON.stringify(readCartLs));


  // After task was finished update the grand total
  autoUpdatePage();
});

// function to update the Total Quantity of the cart and the total price
let autoUpdatePage = () => {
  // import the data from local storage
  let readCartLs = JSON.parse(localStorage.getItem("addToCart"));

  const itemQuantity = document.getElementById("itemQuantity");
  let individualQuantity = 0;

  // if the cart is empty then show the value 0
  if (itemQuantity === null || itemQuantity === "" || itemQuantity === undefined) {
    individualQuantity = 0;
  } else {
    individualQuantity = itemQuantity.value;
  };


  const totalQuantity = document.getElementById("totalQuantity");

  // if the cart is empty just return
  if (readCartLs == null || readCartLs?.length === 0) return;
  // if we have 0 products add the input value
  if (!localStorage.getItem("addToCart") === null || readCartLs === undefined || readCartLs.length === undefined) {
    // Set a default value if readCartLs is null or undefined
    let individualQuantity = 0;
    if (readCartLs && Array.isArray(readCartLs)) {
      individualQuantity = readCartLs.length;
    }
    totalQuantity.innerHTML = individualQuantity;
    // handle quantity if you have only one product in the cart
  } else if (readCartLs.length <= 1) {
    // let individualQuantity = itemQuantity.value;
    totalQuantity.innerHTML = individualQuantity;

    // for more products calculate the total quantity
  } else {
    let cartProductsQuantity = readCartLs.map(item => item.quantity);
    individualQuantity = cartProductsQuantity.reduce((x, y) => {
      const cartQuantity = (Number(x) + Number(y));
      return cartQuantity;
    });
    // import the total quantity
    totalQuantity.innerHTML = individualQuantity;
  };

  // Function to calculate the total price
  const calculateTotalPrice = () => {
    // Get the products from the local storage
    const products = JSON.parse(localStorage.getItem('addToCart'));

    // Initialize the total price
    let totalPrice = 0;

    // Iterate over each product
    products.forEach(product => {
      // Fetch the price from the backend API
      fetch(apiUrl + product.id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(res => res.json())
        .then(data => {
          // Multiply the quantity with the price and add it to the total price
          totalPrice += product.quantity * data.price;

          const priceInput = document.getElementById("totalPrice");

          // Convert the number and add a thousands separator
          const formatTotalPrice = totalPrice.toLocaleString('en-GB');

          // add the total price 
          priceInput.innerHTML = formatTotalPrice;

        })
        .catch(error => {
          console.log('Error:', error);
        });
    });

  };

  // Call the calculateTotalPrice function
  calculateTotalPrice();

};

// run the function to update the correct quantity and price
autoUpdatePage();

// delete button that remove the product from local store
function deleteButton() {
  const deleteItem = document.querySelectorAll("#deleteItem");

  // find the correct item to delete from local storage
  deleteItem.forEach((deleteItem) => {

    deleteItem.addEventListener("click", (event) => {
      let readCartLs = JSON.parse(localStorage.getItem("addToCart"));
      let itemIndex = readCartLs.findIndex((el) => el.key === deleteItem.parentElement.parentElement.parentElement.parentElement.getAttribute("data-id"));

      readCartLs.splice(itemIndex, 1);
      localStorage.setItem('addToCart', JSON.stringify(readCartLs));
      document.location.reload();
    });
  });
};
deleteButton();


// // FORM // // 

// get referance for form
const form = document.getElementById("form");
// get referance for First name input
const firstName = document.getElementById("firstName");
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
// get referance for last name input
const lastName = document.getElementById("lastName");
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
// get referance for address
const address = document.getElementById("address");
const addressErrorMsg = document.getElementById("addressErrorMsg");
// get referance for City
const city = document.getElementById("city");
const cityErrorMsg = document.getElementById("cityErrorMsg");
// get referance for Email
const email = document.getElementById("email");
const emailErrorMsg = document.getElementById("emailErrorMsg");


// event listener to watch changes in the form
form.addEventListener("change", (event) => {
  event.preventDefault();

  // remove white spaces from input
  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const cityValue = city.value.trim();
  const emailValue = email.value.trim();

  // expression to allow only letters and whitespace
  function validateText(input) {
    const regex = /^[A-Za-z\s]+$/;

    return regex.test(input);
  }

  // condition format for First name if input value have numbers show error message
  if (validateText(firstNameValue)) {
    firstNameErrorMsg.style.display = "none";
    firstName.style.border = "none";
  } else {
    firstNameErrorMsg.innerText = "Please enter a valid First name!";
    firstNameErrorMsg.style.display = "inline";
    firstName.style.border = "2px solid red"
  };

  // condition format for Last Name if input value have numbers show error message
  if (validateText(lastNameValue)) {
    lastNameErrorMsg.style.display = "none";
    lastName.style.border = "none";
  } else {
    lastNameErrorMsg.innerText = "Please enter a valid Last name!";
    lastNameErrorMsg.style.display = "inline";
    lastName.style.border = "2px solid red"
  };

  // condition format for City input if input value have numbers show error message
  if (validateText(cityValue)) {
    cityErrorMsg.style.display = "none";
    city.style.border = "none";
  } else {
    cityErrorMsg.innerText = "Please enter a valid City name!";
    cityErrorMsg.style.display = "inline";
    city.style.border = "2px solid red"
  };

  // condition format for email input if input value does't have an email format
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

  if (!regex.test(emailValue)) {
    emailErrorMsg.innerText = "Email did not match format - test@example.com";
    emailErrorMsg.style.display = "inline";
    email.style.border = "2px solid red"
  } else {
    emailErrorMsg.style.display = "none";
    email.style.border = "none";
  };


});

// Array with Form inputs
const submitedForm = [];


// event listener to form submit and prevent default
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const addressValue = address.value.trim();
  const cityValue = city.value.trim();
  const emailValue = email.value.trim();
  const orderButton = document.getElementById("order");

  // if the cart is empty disable the order button
  if (itemQuantity === null) {
    orderButton.setAttribute("disable", "true");

    // else send the form inputs and create a new object
  } else {
    orderButton.removeAttribute("disable");

    const submitedForm = {
      firstName: firstNameValue,
      lastName: lastNameValue,
      address: addressValue,
      city: cityValue,
      email: emailValue,
    };

    // Create a new Array called OrderForm with the Form input values
    localStorage.setItem("orderForm", JSON.stringify(submitedForm));

  };
});

const orderButton = document.getElementById("order");


form.addEventListener("submit", (event) => {
  event.preventDefault();

  const apiUrl = "http://localhost:3000/api/products/order";

  const orderForm = JSON.parse(localStorage.getItem('orderForm'));
  const products = JSON.parse(localStorage.getItem('addToCart'));


  fetch(apiUrl, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "contact": {
        "firstName": String(orderForm["firstName"]),
        "lastName": String(orderForm["lastName"]),
        "address": String(orderForm["address"]),
        "city": String(orderForm["city"]),
        "email": String(orderForm["email"])
      },
      "products": products.map(el => el.id)
    })
  }).then(res => res.json())

    .then(data => {
      const orderId = data.orderId;
      const confirmationUrl = `http://127.0.0.1:5500/front/html/confirmation.html?orderId=${orderId}`;
      window.location.href = confirmationUrl;

      localStorage.clear();
    });
});