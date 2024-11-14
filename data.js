const PRODUCT_SIZE = 4;

// Array de productos
const productsData = [
    {
        name: "Pocion de curacion menor",
        id: 1,
        category: "pocion",
        rarity: "comun",
        price: "50",
        cardImg: "/Assets/Card-items/Pocion-vida-1.png"
    },

    {
        name: "Pocion de curacion",
        id: 2,
        category: "pocion",
        rarity: "rara",
        price: "100",
        cardImg: "/Assets/Card-items/pocion-vida-2.png"
    },

    {
        name: "Pocion de curacion mayor",
        id: 3,
        category: "pocion",
        rarity: "epica",
        price: "50",
        cardImg: "/Assets/Card-items/Pocion-vida-3.png"
    },

    {
        name: "Pocion de mana menor",
        id: 4,
        category: "pocion",
        rarity: "comun",
        price: "25",
        cardImg: "/Assets/Card-items/pocion-mana-1.png"
    },

    {
        name: "Pocion de mana",
        id: 5,
        category: "pocion",
        rarity: "rara",
        price: "50",
        cardImg: "/Assets/Card-items/pocion-mana-2.png"
    },

    {
        name: "Pocion de mana mayor",
        id: 6,
        category: "pocion",
        rarity: "epica",
        price: "150",
        cardImg: "/Assets/Card-items/pocion-mana-3.png"
    },

    {
        name: "Espada común",
        id: 7,
        category: "arma",
        rarity: "comun",
        price: "25",
        cardImg: "/Assets/Card-items/espada1.png"
    },

    {
        name: "Espada de calidad",
        id: 8,
        category: "arma",
        rarity: "rara",
        price: "100",
        cardImg: "/Assets/Card-items/espada2.png"
    },

    {
        name: "Espada Magica",
        id: 9,
        category: "arma",
        rarity: "Epica",
        price: "500",
        cardImg: "/Assets/Card-items/espada3.png"
    },

    {
        name: "Flamigera",
        id: 10,
        category: "arma",
        rarity: "legendaria",
        price: "2500",
        cardImg: "/Assets/Card-items/espada4.png"
    },

    {
        name: "Escudo común",
        id: 11,
        category: "armadura",
        rarity: "comun",
        price: "25",
        cardImg: "/Assets/Card-items/escudo1.png"
    },

    {
        name: "Escudo de calidad",
        id: 12,
        category: "armadura",
        rarity: "rara",
        price: "100",
        cardImg: "/Assets/Card-items/escudo2.png"
    },

    {
        name: "Escudo magico",
        id: 13,
        category: "armadura",
        rarity: "rara",
        price: "500",
        cardImg: "/Assets/Card-items/escudo3.png"
    },

    {
        name: "Antiguo escudo del Dragon",
        id: 14,
        category: "armadura",
        rarity: "legendaria",
        price: "2500",
        cardImg: "/Assets/Card-items/escudo4.png"
    },
    
    {
        name: "Tomo de principiante",
        id: 15,
        category: "libro",
        rarity: "comun",
        price: "100",
        cardImg: "/Assets/Card-items/libro1.png"
    },

    {
        name: "Tomo de adepto",
        id: 16,
        category: "libro",
        rarity: "raro",
        price: "250",
        cardImg: "/Assets/Card-items/libro2.png"
    },

    {
        name: "Tomo de maestro",
        id: 17,
        category: "libro",
        rarity: "epico",
        price: "500",
        cardImg: "/Assets/Card-items/libro3.png"
    },

    {
        name: "Necronomicon",
        id: 18,
        category: "libro",
        rarity: "legendaria",
        price: "2500",
        cardImg: "/Assets/Card-items/libro4.png"
    },
]





const divideProducts = (size) => {
    let productList = []

    for(let i = 0; i < productsData.length; i += size){
        productList.push(productsData.slice(i, i + size))
    }

    return productList;
}

const appState = {
    products:divideProducts(PRODUCT_SIZE),
    productLimit:divideProducts(PRODUCT_SIZE).length,
    currentProductsIndex: 0,
    activeFilterCategory: null,
}
