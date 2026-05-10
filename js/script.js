// Mock de produtos
const produtos = [
    { id: 1, nome: "Açaí 300ml", preco: 12.0 },
    { id: 2, nome: "Coxinha", preco: 5.0 },
    { id: 3, nome: "Suco Natural", preco: 7.0 }
];

let carrinho = [];
let historico = [];
let usuarios = [];
let usuarioLogado = null;

// Exibir produtos
const produtosContainer = document.getElementById('produtos');
produtos.forEach(prod => {
    const div = document.createElement('div');
    div.innerHTML = `<strong>${prod.nome}</strong> - R$ ${prod.preco.toFixed(2)} <button onclick="adicionarCarrinho(${prod.id})">Adicionar</button>`;
    produtosContainer.appendChild(div);
});

// Carrinho
function adicionarCarrinho(id) {
    const produto = produtos.find(p => p.id === id);
    carrinho.push(produto);
    atualizarCarrinho();
}

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

// Cupom
document.getElementById('aplicarCupom').addEventListener('click', () => {
    const cupom = document.getElementById('cupom').value.trim();
    const resultado = document.getElementById('resultadoCupom');
    if(cupom === "RAIZES10") {
        resultado.style.color = "green";
        resultado.textContent = "Cupom aplicado! 10% de desconto.";
    } else {
        resultado.style.color = "#e91e63";
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
    const pagamentoAprovado = Math.random() > 0.2;
    const mensagemPedido = document.getElementById('mensagemPedido');
    const statusAtual = document.getElementById('statusAtual');

    if(pagamentoAprovado) {
        mensagemPedido.style.color = "green";
        mensagemPedido.textContent = "Pedido confirmado! Enviado para a cozinha.";
        statusAtual.textContent = "Pedido em preparo";
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
        mensagemPedido.style.color = "#e91e63";
        mensagemPedido.textContent = "Pagamento recusado. Tente novamente.";
        statusAtual.textContent = "Pedido não realizado"; 
    }
});

function atualizarHistorico() {
    const lista = document.getElementById('listaHistorico');
    lista.innerHTML = '';
    historico.forEach(p => {
        const li = document.createElement('li');
        li.textContent = `${p.data} - Total: R$${p.total} - Status: ${p.status}`;
        lista.appendChild(li);
    });
}

// Login / Cadastro
document.getElementById('btnCadastro').addEventListener('click', () => {
    const nome = document.getElementById('nomeCadastro').value.trim();
    const email = document.getElementById('emailCadastro').value.trim();
    const telefone = document.getElementById('telCadastro').value.trim();
    const senha = document.getElementById('senhaCadastro').value.trim();
    const lgpd = document.getElementById('lgpd').checked;
    const msg = document.getElementById('msgCadastro');

    if(!nome || !email || !senha || !lgpd){
        msg.style.color = "#e91e63";
        msg.textContent = "Preencha todos os campos e aceite a LGPD.";
        return;
    }

    if(usuarios.find(u => u.email === email)){
        msg.style.color = "#e91e63";
        msg.textContent = "Email já cadastrado.";
        return;
    }

    usuarios.push({nome, email, telefone, senha});
    msg.style.color = "green";
    msg.textContent = "Cadastro realizado! Faça login.";
    document.getElementById('cadastroForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
});

document.getElementById('btnLogin').addEventListener('click', () => {
    const email = document.getElementById('loginEmail').value.trim();
    const senha = document.getElementById('loginSenha').value.trim();
    const msg = document.getElementById('msgLogin');

    const user = usuarios.find(u => u.email === email && u.senha === senha);
    if(user){
        usuarioLogado = user;
        msg.style.color = "green";
        msg.textContent = `Bem-vindo, ${user.nome}!`;
        mostrarAreaPedido();
    } else {
        msg.style.color = "#e91e63";
        msg.textContent = "Email ou senha inválidos.";
    }
});

// Alternar entre login e cadastro
document.getElementById('mostrarCadastro').addEventListener('click', () => {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('cadastroForm').style.display = 'block';
});

document.getElementById('mostrarLogin').addEventListener('click', () => {
    document.getElementById('cadastroForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
});

// Mostrar áreas após login
function mostrarAreaPedido(){
    document.getElementById('auth').style.display = 'none';
    document.getElementById('cardapio').style.display = 'block';
    document.getElementById('carrinho').style.display = 'block';
    document.getElementById('cupomSection').style.display = 'block';
    document.getElementById('statusPedido').style.display = 'block';
    document.getElementById('historico').style.display = 'block';
    document.getElementById('perfil').style.display = 'block';

    document.getElementById('perfilNome').value = usuarioLogado.nome;
    document.getElementById('perfilEmail').value = usuarioLogado.email;
    document.getElementById('perfilTelefone').value = usuarioLogado.telefone;
}

// Atualizar perfil
document.getElementById('btnAtualizarPerfil').addEventListener('click', () => {
    usuarioLogado.nome = document.getElementById('perfilNome').value.trim();
    usuarioLogado.email = document.getElementById('perfilEmail').value.trim();
    usuarioLogado.telefone = document.getElementById('perfilTelefone').value.trim();
    const msg = document.getElementById('msgPerfil');
    msg.style.color = "green";
    msg.textContent = "Perfil atualizado com sucesso!";
});