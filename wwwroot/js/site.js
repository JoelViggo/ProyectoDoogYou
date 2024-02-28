var users = JSON.parse(localStorage.getItem('users')) || [{
    user: "user",
    pass: "pass"
}];
var products = [];


function showSection(section) {
    if (section === "login") {
        document.getElementById('login').style.display = 'block';
        document.getElementById('register').style.display = 'none';
        document.getElementById('products').style.display = 'none';
        document.getElementById('buy').style.display = 'none';

        document.getElementById('cart').style.display = 'none';
    }
    if (section === "products") {
        document.getElementById('buy').style.display = 'none';

        document.getElementById('login').style.display = 'none';
        document.getElementById('register').style.display = 'none';
        document.getElementById('products').style.display = 'block';
        document.getElementById('cart').style.display = 'block';

    } 
    if (section === "register") {
        document.getElementById('buy').style.display = 'none';

        document.getElementById('login').style.display = 'none';
        document.getElementById('register').style.display = 'block';
        document.getElementById('products').style.display = 'none';
        document.getElementById('cart').style.display = 'block';
    }

    if (section === "buy") {
        document.getElementById('login').style.display = 'none';
        document.getElementById('register').style.display = 'none';
        document.getElementById('products').style.display = 'none';
        document.getElementById('buy').style.display = 'block';
        document.getElementById('cart').style.display = 'block';
    }
}


function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginMessage = document.getElementById('loginMessage');

    users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(u => u.user === username && u.pass === password);

    if (user) {
        loginMessage.textContent = 'Inicio de sesión exitoso.';
        setTimeout(() => {
            showSection("products");
            swal.fire(`Bienvenido ${username}`,"Ingreso Exitoso","success")
        }, 1000);
    } else {
        loginMessage.textContent = 'Nombre de usuario o contraseña incorrectos.';
        swal.fire(`${loginMessage.textContent}`, "Ingreso Fallido", "error");
        
        
    }
}

function register() {
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    const registerMessage = document.getElementById('registerMessage');

    users = JSON.parse(localStorage.getItem('users')) || [];

    const userExists = users.some(u => u.user === newUsername);

    if (userExists) {
        registerMessage.textContent = 'El nombre de usuario ya está en uso.';
        swal.fire(registerMessage.textContent,"Error","error")
    } else {
        // Agregar el nuevo usuario al arreglo y actualizar localStorage
        users.push({ user: newUsername, pass: newPassword });
        localStorage.setItem('users', JSON.stringify(users));
        registerMessage.textContent = `Usuario ${newUsername} registrado exitosamente.`;

        // Opcionalmente, iniciar sesión automáticamente después del registro
        // Simulamos un inicio de sesión exitoso
        setTimeout(() => {
            swal.fire(`Bienvenido ${newUsername}`, "Ingreso Exitoso", "success")
            showSection("products");
        }, 1000);
    }
}
async function loadProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json();
        

        const productsSection = document.getElementById('products');
        const productsContainer = productsSection.querySelector('.products');

        // Crear el carrusel
        const carouselContainer = document.createElement('div');
        carouselContainer.classList.add('carousel', 'slide', 'c-slide');
        carouselContainer.setAttribute('data-ride', 'carousel');

        const carouselInner = document.createElement('div');
        carouselInner.classList.add('carousel-inner');

        products.forEach((product, index) => {
            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            if (index === 0) {
                carouselItem.classList.add('active');
            }

            const card = document.createElement('div');
            card.classList.add('card');

            const imgElement = document.createElement('img');
            imgElement.classList.add('card-img-top');
            imgElement.src = product.image;

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const titleElement = document.createElement('h5');
            titleElement.classList.add('card-title');
            titleElement.textContent = product.title;

            const priceElement = document.createElement('p');
            priceElement.classList.add('card-text', 'text-card');
            priceElement.textContent = `$${product.price}`;

            cardBody.appendChild(titleElement);
            cardBody.appendChild(priceElement);

            card.appendChild(imgElement);
            card.appendChild(cardBody);

            carouselItem.appendChild(card);
            carouselInner.appendChild(carouselItem);
        });

        carouselContainer.appendChild(carouselInner);
        productsContainer.appendChild(carouselContainer);

        // Agregar controles de navegación al carrusel
        addCarouselNavigation(carouselContainer);

        // Iniciar el carrusel
        new bootstrap.Carousel(carouselContainer);
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

function addCarouselNavigation(carouselContainer) {
    const prevButton = navButton('prev');
    const nextButton = navButton('next');

    carouselContainer.appendChild(prevButton);
    carouselContainer.appendChild(nextButton);

    carouselContainer.addEventListener('click', function (event) {
        const target = event.target;
        const carousel = bootstrap.Carousel.getInstance(carouselContainer);

        if (target.closest('.carousel-control-prev')) {
            carousel.prev();
        } else if (target.closest('.carousel-control-next')) {
            carousel.next();
        }
    });
}

//Para navegar entre los productos
function navButton(direction) {
    const button = document.createElement('a');
    button.classList.add(`carousel-control-${direction}`);
    button.setAttribute('role', 'button');
    button.setAttribute('data-slide', direction);
    button.innerHTML = `
        <span class="carousel-control-${direction}-icon" aria-hidden="true"></span>
        <span class="sr-only">${direction === 'prev' ? 'Previous' : 'Next'}</span>
    `;
    return button;
}
function addToCart(product) {
    let cart;
    const cartData = localStorage.getItem('cart');

    if (cartData) {
        try {
            cart = JSON.parse(cartData);
        } catch (error) {
            console.error('Error parsing cart from localStorage:', error);
            cart = [];
        }
    } else {
        cart = [];
    }

    // Guarda el carrito actualizado de nuevo en localStorage
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));

    // Actualiza la cuenta del carrito en la UI
    updateCartCount();

    // Mostrar mensaje de confirmación
    const confirmationMessage = document.createElement('div');
    confirmationMessage.textContent = `${product.title} agregado al carrito.`;
    confirmationMessage.classList.add('confirmation-message');
    document.body.appendChild(confirmationMessage);

    // Desvanecer el mensaje después de 2 segundos
    setTimeout(() => {
        confirmationMessage.remove();
    }, 2000);
}

function buyProducts() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartBuyContainer = document.getElementById('cartBuy');
    const totalCart = document.getElementById('TotalCart');
    totalCart.classList.add('bg-white', 'm-2');

    // Limpiar el contenedor antes de añadir nuevos productos y resetear el total
    cartBuyContainer.innerHTML = '';
    totalCart.innerHTML = 'Total: ';

    // Crear un contenedor para la lista de productos
    let totalItems = 0;
    let totalPrice = 0;


    const productList = document.createElement('ul');
    productList.classList.add('list-group', 'm-2');

    if (cart.length > 0) {
        cart.forEach((product, index) => {
            const productItem = document.createElement('li');
            productItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'm-3');

            const productInfo = document.createElement('div');
            productInfo.innerHTML = `<strong>${product.title}</strong> - $${product.price}`;

            const productImage = document.createElement('img');
            productImage.src = product.image;
            productImage.alt = product.title;
            productImage.style.width = '50px';
            productImage.style.height = '50px';
            productImage.classList.add('img-thumbnail');

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.classList.add('btn', 'btn-danger');
            deleteButton.onclick = function () { removeProductFromCart(index); };
            
            productItem.appendChild(productImage);
            productItem.appendChild(productInfo);
            productItem.appendChild(deleteButton); 
            productList.appendChild(productItem);

            totalItems += 1;
            totalPrice += parseFloat(product.price);
        });

        cartBuyContainer.appendChild(productList);
    } else {
        totalItems = 0;
        totalPrice = 0;
        cartBuyContainer.innerHTML = '<p class="text-white text-center">No hay productos en el carrito.</p>';
    }

    totalCart.innerHTML += `${cart.length} ítem(s) - $${totalPrice.toFixed(2)}`;

    showSection('buy');
}

function removeProductFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Elimina el producto en el índice dado
    localStorage.setItem('cart', JSON.stringify(cart)); // Actualiza el carrito en localStorage
    buyProducts(); // Refresca la interfaz de usuario del carrito para mostrar el carrito actualizado
    updateCartCount();
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cartItemCount').textContent = cart.length;

}
// Arreglo que almacenará todos los productos obtenidos de la API
var allProducts = [];

// Función para cargar todos los productos desde la API de FakeStoreAPI
function loadAllProducts() {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            allProducts = products;
        })
        .catch(error => console.error('Error al cargar productos:', error));
}

function displayProducts(products) {
    const searchResultsContainer = document.getElementById('searchResults');

    // Limpiar el contenedor de resultados de búsqueda
    searchResultsContainer.innerHTML = '';

    // Mostrar los productos buscados como tarjetas
    if (products.length > 0) {
        products.forEach(product => {
            // Crear tarjeta para cada producto
            const card = document.createElement('div');
            card.classList.add('card', 'm-2');

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const imgElement = document.createElement('img');
            imgElement.classList.add('card-img-top');
            imgElement.src = product.image;

            const titleElement = document.createElement('h5');
            titleElement.classList.add('card-title');
            titleElement.textContent = product.title;

            const priceElement = document.createElement('p');
            priceElement.classList.add('card-text');
            priceElement.textContent = `$${product.price}`;

            const addToCartButton = document.createElement('button');
            addToCartButton.classList.add('btn', 'btn-primary');
            addToCartButton.textContent = 'Comprar';
            // Agregar evento click para agregar el producto al carrito
            addToCartButton.addEventListener('click', function () {
                addToCart(product);
            });

            cardBody.appendChild(imgElement);
            cardBody.appendChild(titleElement);
            cardBody.appendChild(priceElement);
            cardBody.appendChild(addToCartButton);

            card.appendChild(cardBody);

            // Agregar la tarjeta al contenedor de resultados de búsqueda
            searchResultsContainer.appendChild(card);
        });
    } else {
        // Mostrar un mensaje si no se encontraron productos
        searchResultsContainer.innerHTML = '<p>No se encontraron productos que coincidan con la búsqueda.</p>';
    }
}



// Llamar a la función para cargar todos los productos al inicio
loadAllProducts();









document.getElementById('searchInput').addEventListener('input', function() {
    const searchValue = this.value.toLowerCase().trim();
    const filteredProducts = allProducts.filter(product => product.title.toLowerCase().includes(searchValue));
    displayProducts(filteredProducts);
});

function displayProducts(products) {
    const searchResultsContainer = document.getElementById('searchResults');

    if (products.length > 0) {
        products.forEach(product => {
            // Crear tarjeta para cada producto
            const card = document.createElement('div');
            card.classList.add('card', 'm-2');

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const imgElement = document.createElement('img');
            imgElement.classList.add('card-img-top');
            imgElement.src = product.image;

            const titleElement = document.createElement('h5');
            titleElement.classList.add('card-title');
            titleElement.textContent = product.title;

            const priceElement = document.createElement('p');
            priceElement.classList.add('card-text');
            priceElement.textContent = `$${product.price}`;

            const addToCartButton = document.createElement('button');
            addToCartButton.classList.add('btn', 'btn-primary');
            addToCartButton.textContent = 'Comprar';
            // Agregar evento click para agregar el producto al carrito
            addToCartButton.addEventListener('click', function () {
                addToCart(product);
            });

            cardBody.appendChild(imgElement);
            cardBody.appendChild(titleElement);
            cardBody.appendChild(priceElement);
            cardBody.appendChild(addToCartButton);

            card.appendChild(cardBody);

            // Agregar la tarjeta al contenedor de resultados de búsqueda
            searchResultsContainer.appendChild(card);
        });
    } else {
        searchResultsContainer.innerHTML = '<p>No se encontraron productos que coincidan con la búsqueda.</p>';
    }
}



function calculateTotal(cart) {
    cart.forEach(item => {
        item.price = Number(item.price);
        item.quantity = Number(item.quantity || 1); 
    });

    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}
function displayPaymentSummary() {
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = calculateTotal(cart);
    let productNamesHtml = `<ul style="text-align: left;">${cart.map(item => `<li>${item.title} - $${item.price}</li>`).join('')}</ul>`;


    // Usando SweetAlert para mostrar el resumen del pago
    swal.fire({
        title: 'Confirmación de Pago',
        html: `<p>Estás a punto de pagar $${total} por los siguientes productos:</p>${productNamesHtml}`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Pagar Ahora'
    }).then((result) => {
        if (result.isConfirmed) {
            swal.fire(
                'Pago Realizado',
                'Tu pago ha sido completado exitosamente.',
                'success'
            );
            
            localStorage.setItem('cart', JSON.stringify([]));
            cart.forEach((product, index) => {
                removeProductFromCart(index)
            })

        }
    });

    updateCartCount();
}



window.onload = function () {
    loadProducts();
    localStorage.setItem('cart', products);
    document.getElementById('PagarCart').addEventListener('click', () => {
        displayPaymentSummary();
    })
}