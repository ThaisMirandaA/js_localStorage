const form = document.querySelector('#novoItem');
const lista = document.querySelector('#lista');
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach((elemento) => {
    criaElemento(elemento)
})

form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];
    const existe = itens.find(elemento => elemento.nome === nome.value);
    const itemIndividual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe) {
        itemIndividual.id = existe.id;
        atualizaElemento(itemIndividual);
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemIndividual;
    } else {
        itemIndividual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;
        criaElemento(itemIndividual);
        itens.push(itemIndividual);
    }

    localStorage.setItem('itens', JSON.stringify(itens));
    nome.value = "";
    quantidade.value = "";
})


function criaElemento(item) {
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id;

    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;
    novoItem.appendChild(botaoDeleta(item.id)); 
    lista.appendChild(novoItem);
}

function atualizaElemento(itemIndividual) {
    document.querySelector("[data-id='" + itemIndividual.id + "']").innerHTML = itemIndividual.quantidade;
}

function botaoDeleta (id) {
    const botao = document.createElement('button'); 
    botao.textContent = 'x';
    botao.addEventListener('click', function () {
        deletaElemento (this.parentNode, id);
    }); 
    return botao; 
}

function deletaElemento (elemento, id) {
    elemento.remove(); 
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);
    localStorage.setItem("itens", JSON.stringify(itens)); 
}
