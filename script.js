let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const contador = document.querySelector(".contador");

// ==========================
// FORMATAR MOEDA
// ==========================
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// ==========================
// SALVAR NO LOCALSTORAGE
// ==========================
function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// ==========================
// ATUALIZAR CONTADOR
// ==========================
function atualizarContador() {
    const total = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

    if (contador) {
        contador.textContent = total;
    }
}

atualizarContador();

// ==========================
// ATUALIZAR CARRINHO
// ==========================
function atualizarCarrinho() {
    salvarCarrinho();
    atualizarContador();
}

// ==========================
// ADICIONAR AO CARRINHO
// ==========================
document.querySelectorAll(".btn-comprar").forEach(botao => {

    botao.addEventListener("click", () => {

        const nome = botao.dataset.nome;
        const preco = parseFloat(botao.dataset.preco.replace(",", "."));

        const itemExiste = carrinho.find(item => item.nome === nome);

        if (itemExiste) {
            itemExiste.quantidade++;
        } else {
            carrinho.push({
                nome,
                preco,
                quantidade: 1
            });
        }

        atualizarCarrinho();

        alert(`${nome} adicionado ao carrinho! 🛒`);
    });
});

// ==========================
// ABRIR CARRINHO
// ==========================
function abrirCarrinho() {

    carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    const lista = document.getElementById("listaCarrinho");
    const totalEl = document.getElementById("totalCarrinho");
    const carrinhoLateral = document.getElementById("carrinhoLateral");

    if (!lista || !totalEl || !carrinhoLateral) return;

    lista.innerHTML = "";

    let total = 0;

    if (carrinho.length === 0) {
        lista.innerHTML = "<li>Seu carrinho está vazio 🛒</li>";
        totalEl.textContent = "Total: " + formatarMoeda(0);
        carrinhoLateral.classList.add("ativo");
        return;
    }

    carrinho.forEach((item, index) => {

        const subtotal = item.preco * item.quantidade;
        total += subtotal;

        lista.innerHTML += `
            <li style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                margin-bottom:12px;
            ">
                <div>
                    <strong>${item.nome}</strong><br>

                    <small>${formatarMoeda(item.preco)}</small><br>

                    <button onclick="diminuir(${index})">-</button>

                    <span style="margin:0 8px;">
                        ${item.quantidade}
                    </span>

                    <button onclick="aumentar(${index})">+</button>
                </div>

                <div style="text-align:right;">
                    <strong>${formatarMoeda(subtotal)}</strong><br>

                    <button
                        onclick="removerItem(${index})"
                        style="
                            background:#d62828;
                            color:white;
                            border:none;
                            padding:4px 8px;
                            border-radius:6px;
                            cursor:pointer;
                            font-size:12px;
                        "
                    >
                        ✕
                    </button>
                </div>
            </li>
        `;
    });

    totalEl.textContent = "Total: " + formatarMoeda(total);

    carrinhoLateral.classList.add("ativo");
}

// ==========================
// FECHAR CARRINHO
// ==========================
function fecharCarrinho() {
    const carrinhoLateral = document.getElementById("carrinhoLateral");

    if (carrinhoLateral) {
        carrinhoLateral.classList.remove("ativo");
    }
}

// ==========================
// AUMENTAR QUANTIDADE
// ==========================
function aumentar(index) {

    if (!carrinho[index]) return;

    carrinho[index].quantidade++;

    atualizarCarrinho();
    abrirCarrinho();
}

// ==========================
// DIMINUIR QUANTIDADE
// ==========================
function diminuir(index) {

    if (!carrinho[index]) return;

    carrinho[index].quantidade--;

    if (carrinho[index].quantidade <= 0) {
        carrinho.splice(index, 1);
    }

    atualizarCarrinho();
    abrirCarrinho();
}

// ==========================
// REMOVER ITEM
// ==========================
function removerItem(index) {

    if (!carrinho[index]) return;

    carrinho.splice(index, 1);

    atualizarCarrinho();
    abrirCarrinho();
}

// ==========================
// IR PARA CHECKOUT
// ==========================
function irParaCheckout() {

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio! 🛒");
        return;
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    window.location.href = "checkout.html";
}

// ==========================
// CLIQUE NO ÍCONE CARRINHO
// ==========================
const cartIcon = document.querySelector(".cart-icon");

if (cartIcon) {
    cartIcon.addEventListener("click", abrirCarrinho);
}