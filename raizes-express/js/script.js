// Mock de produtos
const produtos = [
    { id: 1, nome: "Açaí 300ml", preco: 12.0 },
    { id: 2, nome: "Coxinha", preco: 5.0 },
    { id: 3, nome: "Suco Natural", preco: 7.0 }
];

// Exibir produtos no cardápio
const produtosContainer = document.getElementById('produtos');
produtos.forEach(prod => {
    const div = document.createElement('div');
    div.innerHTML = `<strong>${prod.nome}</strong> - R$ ${prod.preco.toFixed(2)} <button onclick="adicionarCarrinho(${prod.id})">Adicionar</button>`;
    produtosContainer.appendChild(div);
});

const carrinho = [];

function adicionarCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    carrinho.push(produto);
    alert(`${produto.nome} adicionado ao carrinho!`);
}

// Simulação de cupom
document.getElementById('aplicarCupom').addEventListener('click', () => {
    const cupom = document.getElementById('cupom').value.trim();
    const resultado = document.getElementById('resultadoCupom');
    if(cupom === "RAIZES10") {
        resultado.textContent = "Cupom aplicado! 10% de desconto.";
    } else {
        resultado.textContent = "Cupom inválido.";
    }
});