// Fetch product data asynchronously using async/await
async function fetchProducts() {
  try {
    // Replace this URL with your actual API endpoint if you're fetching from a server
    const response = await fetch("https://api.restful-api.dev/objects");

    // Check if the response is ok (status in the range 200–299)
    if (!response.ok) {
      console.log("response ok" + response);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const products = await response.json(); // Parse the JSON response
    displayProducts(products); // Call the display function with the data
    console.log(products);
  } catch (error) {
    console.error("Error fetching products:", error); // Handle any errors
  }
}

// Function to render the products
function displayProducts(products) {
    const productList = document.getElementById('product-list');
 let product2 = 2;
    // Clear previous content
    productList.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('bg-white', 'p-6', 'rounded-lg', 'shadow-lg', 'hover:shadow-xl', 'transition', 'duration-300');

        // Add product name
        let productHTML = `<h3 class="text-lg font-semibold mb-2">${product.name}</h3>`;

        // Check if product has data and display the relevant information
        if (product.data) {
            if (product.data.price) {
                productHTML += `<p class="text-xl text-red-500 font-bold mb-2">$${product.data.price}</p>`;
            }

            // Display any other available data
            for (const key in product.data) {
                if (key !== 'price') {
                    productHTML += `<p class="text-sm text-gray-600 capitalize">${key}: ${product.data[key]}</p>`;
                }
            }
        } else {
            productHTML += `<p class="text-sm text-gray-500">No additional data available.</p>`;
        }

        // Append to the product div and to the main list
        productDiv.innerHTML = productHTML;
        productList.appendChild(productDiv);
    });
}

// Call the fetchProducts function to get and display the products
fetchProducts();
// function displayProducts(products) {
//   const productList = document.getElementById("product-list");

//   // Clear previous content
//   productList.innerHTML = "";

//   products.forEach((product) => {
//     const productDiv = document.createElement("div");
//     productDiv.classList.add(
//       "bg-white",
//       "p-6",
//       "rounded-lg",
//       "shadow-lg",
//       "hover:shadow-xl",
//       "transition",
//       "duration-300"
//     );
//     productDiv.innerHTML = `
         

//    <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
//         <h3 class="text-lg font-semibold mb-2">`${product.name}`</h3>
//         <p class="text-xl text-red-500 font-bold mb-2">`${product.price}`</p>
//         <p class="text-sm text-gray-600 capitalize">`${product.HardDisk}`</p>
    
//    </div>
         
         
         
         
         
//          `;

//     // Add product name
//     let productHTML = `<h3 class="text-lg font-semibold mb-2">${product.name}</h3>`;

//     // Check if product has data and display the relevant information
//     if (product.data) {
//       if (product.data.price) {
//         productHTML += `<p class="text-xl text-red-500 font-bold mb-2">$${product.data.price}</p>`;
//       }

//       // Display any other available data
//       for (const key in product.data) {
//         if (key !== "price") {
//           productHTML += `<p class="text-sm text-gray-600 capitalize">${key}: ${product.data[key]}</p>`;
//         }
//       }
//     } else {
//       productHTML += `<p class="text-sm text-gray-500">No additional data available.</p>`;
//     }

//     // Append to the product div and to the main list
//     productDiv.innerHTML = productHTML;
//     productList.appendChild(productDiv);
//   });
// }

//post data using API POST Method....



const submitBtn = document.getElementById("submit-btn");

submitBtn.addEventListener("click", async function (event) {
  event.preventDefault();
  // Get form data
  const name = document.getElementById("ProductName").value;
  const year = document.getElementById("year").value;
  const price = document.getElementById("price").value;
  const cpu = document.getElementById("CPU").value;
  const hardDisk = document.getElementById("HardDisk").value;

  if (name.length == 0 && year.length == 0 && price.length == 0) {
    alert("Please add name fillup the Form and then submitted this");
    return name;
  }

  // Data to be sent
  const data = {
    name: name,
    date: year,
    price: price,
    CPU: cpu,
    HardDisk: hardDisk,
  };
  console.log(data);

  try {
    const response = await fetch("https://api.restful-api.dev/objects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      console.log("Success:", jsonResponse);
      alert("Product Add successfully!");
    } else {
      console.error("Error:", response.statusText);
      alert("Failed to register .");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while registering the user.");
  }

  displayProducts();
});

// <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
//   <h3 class="text-lg font-semibold mb-2">Apple AirPods ---11</h3>
//   <p class="text-xl text-red-500 font-bold mb-2">$120</p>
//   <p class="text-sm text-gray-600 capitalize">generation: 3rd</p>
// </div>;
