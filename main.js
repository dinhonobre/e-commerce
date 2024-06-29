// Definição dos produtos disponíveis na loja
const products = [
    { id: 1, name: 'Produto 1', price: 49.99, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Produto 2', price: 79.99, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Produto 3', price: 99.99, image: 'https://via.placeholder.com/150' }
];

// Inicialização do carrinho de compras vazio
let cart = [];

// Função que é executada quando o documento é completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(); // Exibe os produtos no catálogo
    updateCart();      // Atualiza a visualização do carrinho
});

// Função para exibir os produtos no catálogo
function displayProducts() {
    const productContainer = document.querySelector('.products'); // Seleciona o container dos produtos
    products.forEach(product => {
        const productElement = document.createElement('div');     // Cria um novo elemento div para cada produto
        productElement.classList.add('product');                  // Adiciona a classe 'product' ao elemento
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>R$ ${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
        `; // Define o conteúdo HTML do elemento
        productContainer.appendChild(productElement); // Adiciona o elemento ao container de produtos
    });
}

// Função para adicionar um produto ao carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId); // Encontra o produto pelo ID
    const cartItem = cart.find(item => item.id === productId); // Verifica se o produto já está no carrinho

    if (cartItem) {
        cartItem.quantity += 1; // Incrementa a quantidade se o produto já estiver no carrinho
    } else {
        cart.push({ ...product, quantity: 1 }); // Adiciona o produto ao carrinho com quantidade 1
    }

    updateCart(); // Atualiza a visualização do carrinho
}

// Função para atualizar a visualização do carrinho
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items'); // Seleciona o container dos itens do carrinho
    cartItemsContainer.innerHTML = ''; // Limpa o conteúdo atual do container
    let total = 0; // Inicializa o total do carrinho

    cart.forEach(item => {
        const cartItemElement = document.createElement('li'); // Cria um novo elemento li para cada item do carrinho
        cartItemElement.classList.add('cart-item'); // Adiciona a classe 'cart-item' ao elemento
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>R$ ${item.price.toFixed(2)} x ${item.quantity} = R$ ${(item.price * item.quantity).toFixed(2)}</p>
            <button onclick="removeFromCart(${item.id})">Remover</button>
        `; // Define o conteúdo HTML do elemento
        cartItemsContainer.appendChild(cartItemElement); // Adiciona o elemento ao container de itens do carrinho
        total += item.price * item.quantity; // Atualiza o total do carrinho
    });

    document.querySelector('#cart-total span').textContent = total.toFixed(2); // Atualiza o total exibido no carrinho
}

// Função para remover um produto do carrinho
function removeFromCart(productId) {
    const cartItemIndex = cart.findIndex(item => item.id === productId); // Encontra o índice do item no carrinho

    if (cartItemIndex > -1) {
        cart[cartItemIndex].quantity -= 1; // Decrementa a quantidade do item
        if (cart[cartItemIndex].quantity === 0) {
            cart.splice(cartItemIndex, 1); // Remove o item do carrinho se a quantidade for 0
        }
    }

    updateCart(); // Atualiza a visualização do carrinho
}

// Função para finalizar a compra
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!'); // Alerta se o carrinho estiver vazio
    } else {
        alert('Compra finalizada com sucesso!'); // Alerta de sucesso na finalização da compra
        cart = []; // Esvazia o carrinho
        updateCart(); // Atualiza a visualização do carrinho
    }
});
