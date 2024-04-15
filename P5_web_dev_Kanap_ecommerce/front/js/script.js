//Try code and catch errors
try {
    //Fetch the products and convert in to a json format
    const products = async () => {
        const response = await fetch('http://localhost:3000/api/products');
        const parsedData = await response.json();
        console.log('parsedData', parsedData)

        //For every object create a HTML <a> with dynamically data
        parsedData.map(el => {
            const product = document.createElement('a')
            product.innerHTML = `<a id="productID" href='./product.html?id=${el._id}'>
                <article id="${el._id}">
                    <img src="${el.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1" />
                    <h3 class="productName">${el.name}</h3>
                    <p class="productDescription">${el.description}</p>
                </article>
            </a>`
            document.getElementById('items').appendChild(product);

            // Add event listener to each product
            // product.addEventListener('click', function () {
            //     // Store the product details in local storage and convert to js
            //     localStorage.setItem('selectedProduct', JSON.stringify(el));
            // });
        });
    };

    products();
} catch (error) {
    console.error(`Importing products Error Status: ${response.status} `);
};

