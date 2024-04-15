const addToCartButton = document.getElementById("addToCart");


const productId = document.getElementsByTagName("link")[0].baseURI.replace('http://127.0.0.1:5500/front/html/product.html?id=', '');
const apiUrl = "http://localhost:3000/api/products/";

fetch(apiUrl + productId, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json'
    },
}).then(res => {
    return res.json()
})

    .then(data => {
        //Add dynamically images
        document.getElementById('item_img').innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;

        //Add dynamically title
        document.getElementById('title').textContent = data.name;

        //Add dynamically description
        document.getElementById('description').textContent = data.description;

        //Add dynamically colors
        document.getElementById('colors').innerHTML = data.colors.map((item) => `<option value="${item}">${item}</option>`);

        //Add dynamically price
        document.getElementById('price').textContent = data.price;

        // Get the items selection and add it to the cart
        function handleAddToCart() {

            let tmp = JSON.parse(localStorage.getItem('addToCart'));

            let addToCart = tmp == {} ? [] : tmp || [];

            //Get reference to my elements
            const productId = data._id;
            const productColor = document.getElementById('colors').value;
            const productQuantity = parseInt(document.getElementById('quantity').value);
            const productImageUrl = data.imageUrl;
            const productName = document.getElementById('title').innerText;
            const productPrice = document.getElementById('price').innerText;
            const productKey = `${productId}-${productColor}`;


            // Find all the objects from the cart that have the same key
            let existingProduct = addToCart.find((el) => el.key === productKey);

            // If the product is not defined into the cart create a new one
            if (existingProduct === undefined) {
                // Product with the same ID and color exists, update the quantity
                addToCart.push({
                    key: `${productId}-${productColor}`,
                    id: productId,
                    color: productColor,
                    quantity: productQuantity,
                    imageUrl: productImageUrl,
                    name: productName,
                    // price: productPrice,
                });
                // if the product have the same color change/add only the quantity
            } else if (existingProduct.color === productColor) {
                existingProduct.quantity += Number(productQuantity);

            } else {
                // Product with the same ID and color doesn't exist, create a new object and push it to addToCart
                addToCart.push({
                    key: `${productId}-${productColor}`,
                    id: productId,
                    color: productColor,
                    quantity: productQuantity,
                    imageUrl: productImageUrl,
                    name: productName,
                    // price: productPrice,
                });
            };

            // Save the updated addToCart array to local storage
            localStorage.setItem("addToCart", JSON.stringify(addToCart));

        };
        // Add click event listener to the addToCart button
        addToCartButton.addEventListener("click", () => {
            handleAddToCart();

            document.location.href = "http://127.0.0.1:5500/front/html/cart.html";
        });
    })

    .catch(error => console.log("Error"))






