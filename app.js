// Array para armazenar os nomes dos amigos
let amigos = [];

// Função para adicionar amigos à lista
function adicionarAmigo() {
    const nomeInput = document.getElementById('amigo');
    const nome = nomeInput.value.trim();

    if (!nome) {
        exibirNotificacao('Por favor, insira um nome válido');
        return;
    }

    if (amigos.includes(nome)) {
        exibirNotificacao('Este nome já foi adicionado');
        return;
    }

    amigos.push(nome);
    nomeInput.value = ''; // Limpa o campo de input

    // Atualiza a lista visível no HTML
    atualizarListaAmigos();
}

// Função para atualizar a lista de amigos no HTML
function atualizarListaAmigos() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = ''; // Limpa a lista atual

    amigos.forEach((amigo) => {
        const li = document.createElement('li');
        li.textContent = amigo;
        lista.appendChild(li);
    });
}

// Função para sortear os amigos secretos
function sortearAmigo() {
    if (amigos.length < 2) {
        exibirNotificacao('É necessário pelo menos 2 amigos para realizar o sorteio.');
        return;
    }

    // Embaralha a lista de amigos
    const amigosEmbaralhados = [...amigos];
    for (let i = amigosEmbaralhados.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [amigosEmbaralhados[i], amigosEmbaralhados[j]] = [amigosEmbaralhados[j], amigosEmbaralhados[i]];
    }

    // Sorteia os pares de amigos secretos
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = ''; // Limpa resultados anteriores

    amigosEmbaralhados.forEach((amigo, index) => {
        const amigoSecreto = amigosEmbaralhados[(index + 1) % amigosEmbaralhados.length];
        const li = document.createElement('li');
        li.textContent = `${amigo} sorteou ${amigoSecreto}`;
        resultado.appendChild(li);
    });

    // Bloqueia a possibilidade de sortear novamente sem reiniciar
    document.querySelector('.button-draw').disabled = true;
}

// Função para exibir a notificação
function exibirNotificacao(mensagem) {
    const resultado = document.getElementById('resultado');
    const notificacao = document.createElement('li');
    notificacao.classList.add('notificacao');
    notificacao.textContent = mensagem;
    resultado.innerHTML = ''; // Limpa resultados anteriores
    resultado.appendChild(notificacao);

    // Remove a notificação após 3 segundos
    setTimeout(() => {
        notificacao.remove();
    }, 3000);
}