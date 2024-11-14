// Navbar y Menu Hamburguesa

const hamburger = document.querySelector(".hamburger")
const navMenu= document.querySelector(".navbar__list")
const navItems = document.querySelectorAll(".navbar__list-a")



// almacenado de variables en el carrito
const cartIcon = document.querySelector(".cart__icon")
const cartMenu = document.querySelector(".cart")
const cartContainer = document.querySelector(".cart__container")
const overlay = document.querySelector(".overlay")
const total = document.querySelector(".cart__buy-span")
const modal = document.querySelector(".modal")
const deleteButton = document.querySelector(".delete__button")
const buyButton = document.querySelector(".buy__button")
const cartBubble = document.querySelector(".cart__bubble")




// !! MODAL !! //

const showModal = (msg) => {
        modal.classList.add("active__modal")
        modal.innerHTML = msg
        setTimeout(() => {
            modal.classList.remove("active__modal")
        }, 2000)
} 


// !! SECCION DE LOGICA DE NAVBAR
// !! SECCION DE LOGICA DE NAVBAR
// !! SECCION DE LOGICA DE NAVBAR

// Funcion para poder acceder al navbar y su contenido
const toggleNavbar = (input) => {
    input.classList.toggle("active");
    if(cartMenu.classList.contains("open__cart")){
        cartMenu.classList.remove("open__cart")
        return
    }
}


// funcion para poder cerrar el navbar haciendo click en un link
const removeNavbar = () =>{
navItems.forEach( n => n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
}))
}


// !! SECCION DE LOGICA TOGGLE CARRITO
// !! SECCION DE LOGICA TOGGLE CARRITO
// !! SECCION DE LOGICA TOGGLE CARRITO

const toggleCart = () => {
    cartMenu.classList.toggle("open__cart")


    if(hamburger.classList.contains("active") && navMenu.classList.contains("active")){
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
        return
    }
    overlay.classList.toggle("active")
}

const closeOverlays = () => {
    if(cartMenu.classList.contains("open__cart")){
        cartMenu.classList.remove("open__cart")
        overlay.classList.remove("active")
    }
}



// !! SECCION DE LOGICA CARRITO
// !! SECCION DE LOGICA CARRITO
// !! SECCION DE LOGICA CARRITO


// Primera stage, carrito vacio
let cart = JSON.parse(localStorage.getItem("cart"))|| [];


// almacenando en local storage

const cartLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart))
}

// Funcion para crear un producto
const createProduct = (product) => {
    const {id, name, category, price, rarity, img} = product

    return {id, name, category, price, rarity, img}
}

// funcion para sumar los totales del valor de precio
const newCartAmount = () => {
    const total = cart.reduce((acc, cur) => acc + Number(cur.price) * cur.quantity, 0)
    return total
}

//Funcion para renderizar el valor total del carrito
const renderCartAmount = () => {
    total.innerHTML = `${newCartAmount()} de oro`
}


// Funcion para actualizar el estado del carro (local storage, renderizado de carrito, cantidad y burbuja)
const updateCartState = () => {
    cartLocalStorage()
    renderCart()
    renderCartAmount()
    renderCartBubble()
}
// Agregando producto
const addProduct = ({target}) => {
   if(!target.classList.contains("add__cart-btn"))return
   const product = createProduct(target.dataset)

   // condicional para encontrar duplicados y sumarle la cantidad
    if(findProductId(product)){
        addUnitProduct(product)
        showModal(`se sumo una unidad de "${product.name}" al carrito`)
    }
        else{
            cart = [...cart, {...product, quantity: 1}]
            showModal(`se agrego "${product.name}" al carrito`)
        }
        updateCartState()
}


// Funcion para agregar una unidad al carrito (Map)
const addUnitProduct = (product) => {
    cart = cart.map((cartProduct) => cartProduct.id === product.id
?{...cartProduct, quantity: cartProduct.quantity + 1}
: cartProduct)
}
// validador para encontrar ID de duplica
const findProductId = (product) => {
    const findedProduct = cart.find((item) => item.id === product.id)
    return findedProduct
}


// * Logica para suma y resta de objetos en el carrito *



// logica maestra de suma y resta
const handleQuantity = (e) => {
    if(e.target.classList.contains("down")){
        handleMinus(e.target.dataset.id)
    }
    else if (e.target.classList.contains("up")){
        handlePlus(e.target.dataset.id)
    }

    updateCartState()
}


// suma de producto
const handlePlus = (id) => {
    const existingProduct = cart.find(item => item.id === id)
    addUnitProduct(existingProduct)
}

// Resta de producto
const handleMinus = (id) => {
    const existingProduct = cart.find(item => item.id === id)

    if(existingProduct.quantity === 1){
        deleteUnit(existingProduct)
        return
    }

    substractUnit(existingProduct)

}
// Funcion auxiliar de resta de producto
const substractUnit = (existingProduct) => {
    cart = cart.map((cartProduct) => cartProduct.id === existingProduct.id
    ?{...cartProduct, quantity: Number(cartProduct.quantity) -1}
    : cartProduct)
} 


// Eliminar producto
const deleteUnit = (existingProduct) => {
cart = cart.filter((product) => product.id !== existingProduct.id);
updateCartState();
}


const resetCartItems = () => {
    cart = []
    updateCartState()
}

const completeCartAction = (confirmMsg, successMsg) => {
    if(!cart.length) return;
    if(window.confirm(confirmMsg)){
        resetCartItems()
        alert(successMsg)
    }
}
// Eliminar carrito
const deleteCart = () => {
completeCartAction(
    "¿Deseas vaciar el carrito?",
    "No hay productos en el carrito"
)
}

// Confirmar la compra
const confirmPurcharse = () => {
    completeCartAction(
        "¿Deseas terminar la compra?", "Gracias por tu compra"
    )
}

// renderizado de burbuja de carrito
const renderCartBubble = () => {
    cartBubble.textContent = cart.reduce((acc, cur) => acc + cur.quantity, 0)
}

// !! SECCION DE RENDER DE CARRITO
// !! SECCION DE RENDER DE CARRITO
// !! SECCION DE RENDER DE CARRITO

const createCartHTML = (cartProduct) =>{

    const {name, id, category, price, img, rarity, quantity} = cartProduct


    return `                    <div class="cart__item">
                        <img src="${img}" alt="">
    
                        <div class="item__info">
                            <h3 class="cart__item-title">${name}</h3>
                            <p><span>${category}</span>, <span>${rarity}</span></p>
                            <span class="cart__item-span">${price} de oro</span>
                        </div>
    
                        <div class="item__handler">
                            <span class="quantity__handler down" data-id="${id}">-</span>
                            <span class="item__quantity">${quantity}</span>
                            <span class="quantity__handler up" data-id="${id}">+</span>
                        </div>
                    </div>`
}

const renderCart = () => {
    if(!cart.length){
        cartContainer.innerHTML = `<p> no hay productos en el carrito actualmente</p>` 
        return
    }
    cartContainer.innerHTML = cart.map(createCartHTML).join("")
}







// !! SECCION DE CARDS DE PRODUCTOS 
// !! SECCION DE CARDS DE PRODUCTOS 
// !! SECCION DE CARDS DE PRODUCTOS 

const productContainer = document.querySelector(".cards__container")
const showMoreButton = document.querySelector(".product__btn")
const categoriesTypeContainer = document.querySelector(".categorie")
const categoryType = document.querySelectorAll(".category__type")


// Funcion para crear el template de las cards y sus atributos
 const createCardTemplate = (producto) =>{

   const {name, id, category, price, cardImg, rarity} = producto

    return `<div class="card">
                    <div class="card-top">
                         <h2>${name}</h2>
                        <img src="${cardImg}" alt="${name}" class="card-img">
                    </div>
                   <div class="card-mid">
                        <p>Categorias: ${category}, ${rarity}</p>
                        <p>Precio: $${price} Monedas de oro</p>
                    </div>
                     <div class="card-bottom">
                       <button class="add__cart-btn"
                       data-id="${id}"
                       data-name="${name}"
                       data-rarity="${rarity}"
                       data-category="${category}"
                       data-price="${price}"
                       data-img="${cardImg}"
                       >agregar al carrito</button>
                    </div>
                 </div>`
 }


 //Funcion para renderizar las Cards
const renderProducts = (products) => {
productContainer.innerHTML += products.map(createCardTemplate).join("");
}


// Funcion para cargar mas cards 

const showMoreProducts = () => {
    appState.currentProductsIndex += 1;
    let {products, productLimit, currentProductsIndex} = appState

    renderProducts(products[currentProductsIndex])


    if(currentProductsIndex === productLimit -1){
        showMoreButton.classList.add("hidden")
    }
}


// Funcion para Filtro

const isInactiveFilter = (element) => {
    return (element.classList.contains("category__type") && !element.classList.contains("active"));
}
const changeState = (activeFilter) => {
    const categories = [...categoryType]
    categories.forEach(
        categoryBtn => {
            if(categoryBtn.dataset.category !== activeFilter){
                categoryBtn.classList.remove("active")
                return
            }
            categoryBtn.classList.add("active")
            showMoreButton.classList.add("hidden")
        }
    )
}


const changeFilterState = (btn) => {
    appState.activeFilterCategory = btn.dataset.category
    changeState(appState.activeFilterCategory)
}

const applyFilter = (e) => {
     if(!isInactiveFilter(e.target)) return;
    changeFilterState(e.target)
    productContainer.innerHTML= ""

   if(appState.activeFilterCategory){
        const filteredProducts = productsData.filter(product => product.category === appState.activeFilterCategory)
    renderProducts(filteredProducts)
    appState.currentProductsIndex = 0;
         return
    }

    renderProducts(appState.products[0])
    showMoreButton.classList.remove("hidden")
}





const init = () => {
    //eventos y ejecuciones del Navbar
    hamburger.addEventListener("click", () => {
        toggleNavbar(hamburger)
        toggleNavbar(navMenu)
    })
    removeNavbar()

// eventos y ejecucion del Carrito
    document.addEventListener("DOMContentLoaded", renderCart)
    document.addEventListener("DOMContentLoaded", renderCartAmount)
    cartIcon.addEventListener("click", toggleCart)
    overlay.addEventListener("click", closeOverlays)
    cartContainer.addEventListener("click", handleQuantity)
    deleteButton.addEventListener("click", deleteCart)
    buyButton.addEventListener("click", confirmPurcharse)
    renderCartBubble(cart)
// eventos y ejecuciones del section products
renderProducts(appState.products[0])
showMoreButton.addEventListener("click", showMoreProducts)

//evento para escuchar los filtros de tipo de producto
categoriesTypeContainer.addEventListener("click", applyFilter)
productContainer.addEventListener("click", addProduct)

}

init()