// Mock de produtos
const produtos = [
    { id: 1, nome: "Açaí 300ml", preco: 12.0 },
    { id: 2, nome: "Coxinha", preco: 5.0 },
    { id: 3, nome: "Suco Natural", preco: 7.0 }
];

// Carrinho e histórico
let carrinho = [];
let historico = [];

// Exibir produtos no cardápio
const produtosContainer = document.getElementById('produtos');
produtos.forEach(prod => {
    const div = document.createElement('div');
    div.innerHTML = `<strong>${prod.nome}</strong> - R$ ${prod.preco.toFixed(2)} <button onclick="adicionarCarrinho(${prod.id})">Adicionar</button>`;
    produtosContainer.appendChild(div);
});

// Adicionar ao carrinho
function adicionarCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    carrinho.push(produto);
    alert(`${produto.nome} adicionado ao carrinho!`);
    atualizarCarrinho();
}

// Atualizar carrinho na tela
function atualizarCarrinho() {
    const container = document.getElementById('itensCarrinho');
    container.innerHTML = '';
    let total = 0;
    carrinho.forEach((item, index) => {
        total += item.preco;
        const div = document.createElement('div');
        div.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'Remover';
        btnRemover.onclick = () => {
            carrinho.splice(index, 1);
            atualizarCarrinho();
        };
        div.appendChild(btnRemover);
        container.appendChild(div);
    });
    document.getElementById('total').textContent = total.toFixed(2);
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

// Finalizar pedido
document.getElementById('finalizarPedido').addEventListener('click', () => {
    if(carrinho.length === 0) {
        alert("O carrinho está vazio!");
        return;
    }

    const total = carrinho.reduce((acc, item) => acc + item.preco, 0);

    // Simulação de pagamento aprovado ou recusado
    const pagamentoAprovado = Math.random() > 0.2; // 80% de chance de aprovar

    const mensagemPedido = document.getElementById('mensagemPedido');
    const statusAtual = document.getElementById('statusAtual');

    if(pagamentoAprovado) {
        mensagemPedido.textContent = "Pedido confirmado! Enviado para a cozinha.";
        statusAtual.textContent = "Pedido em preparo";
        // Salvar no histórico
        historico.push({
            id: historico.length + 1,
            itens: [...carrinho],
            total: total.toFixed(2),
            status: "Em preparo",
            data: new Date().toLocaleString()
        });
        carrinho = [];
        atualizarCarrinho();
        atualizarHistorico();
    } else {
        mensagemPedido.textContent = "Pagamento recusado. Tente novamente.";
        statusAtual.textContent = "Pedido não realizado";
    }
});

// Atualizar histórico
function atualizarHistorico() {
    const lista = document.getElementById('listaHistorico');
    lista.innerHTML = '';
    historico.forEach(pedido => {
        const li = document.createElement('li');
        li.textContent = `Pedido #${pedido.id} - ${pedido.itens.map(i => i.nome).join(", ")} - R$ ${pedido.total} - Status: ${pedido.status} - ${pedido.data}`;
        lista.appendChild(li);
    });
}