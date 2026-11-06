const lista = document.getElementById("resumoPedido");
const totalEl = document.getElementById("totalPedido");

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// ==========================
// PEGAR CARRINHO
// ==========================
function getCarrinho() {
    return JSON.parse(localStorage.getItem("carrinho")) || [];
}

// ==========================
// SALVAR CARRINHO
// ==========================
function salvarCarrinho(carrinho) {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// ==========================
// RENDERIZAR CHECKOUT
// ==========================
function carregarCheckout() {

    const carrinho = getCarrinho();

    lista.innerHTML = "";

    let total = 0;

    if (carrinho.length === 0) {
        lista.innerHTML = "<li>Seu carrinho está vazio 🛒</li>";
        totalEl.textContent = formatarMoeda(0);
        return;
    }

    carrinho.forEach((item, index) => {

        const subtotal = item.preco * item.quantidade;
        total += subtotal;

        const li = document.createElement("li");

        li.innerHTML = `
            <div>
                <strong>${item.nome}</strong><br>
                <small>${formatarMoeda(item.preco)} cada</small>
            </div>

            <div class="item-controle">

                <button onclick="diminuir(${index})">-</button>

                <span>${item.quantidade}</span>

                <button onclick="aumentar(${index})">+</button>

                <strong>${formatarMoeda(subtotal)}</strong>

                <button class="remover" onclick="removerItem(${index})">
                    🗑
                </button>

            </div>
        `;

        lista.appendChild(li);
    });

    totalEl.textContent = formatarMoeda(total);
}

// ==========================
// AUMENTAR QUANTIDADE
// ==========================
function aumentar(index) {
    const carrinho = getCarrinho();

    carrinho[index].quantidade++;

    salvarCarrinho(carrinho);
    carregarCheckout();
}

// ==========================
// DIMINUIR QUANTIDADE
// ==========================
function diminuir(index) {
    const carrinho = getCarrinho();

    carrinho[index].quantidade--;

    if (carrinho[index].quantidade <= 0) {
        carrinho.splice(index, 1);
    }

    salvarCarrinho(carrinho);
    carregarCheckout();
}

// ==========================
// REMOVER ITEM
// ==========================
function removerItem(index) {
    const carrinho = getCarrinho();

    carrinho.splice(index, 1);

    salvarCarrinho(carrinho);
    carregarCheckout();
}

// ==========================
// FINALIZAR PEDIDO
// ==========================
document.getElementById("formPedido").addEventListener("submit", (e) => {

    e.preventDefault();

    const carrinho = getCarrinho();

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    alert("Pedido enviado com sucesso! 🍕");

    localStorage.removeItem("carrinho");

    window.location.href = "index.html";
});

// inicializa
carregarCheckout();