import ui from "./services/ui.js";
import api from "./services/api.js";

const regexConteudo = /^[A-Za-z\s]{10,}$/

function validarConteudo(conteudo) {
  return regexConteudo.test(conteudo)
}

document.addEventListener("DOMContentLoaded", () => {
    
    ui.renderizarPensamentos();

    const botaoCancelar = document.getElementById("botao-cancelar");
    const formularioPensamento = document.getElementById("pensamento-form");
    const inputBusca = document.getElementById("campo-busca");

    formularioPensamento.addEventListener("submit", manipularSubmissaoFormulario);
    botaoCancelar.addEventListener("click", cancelarPensamento);
    inputBusca.addEventListener("input", manipularBusca);
    
});

async function manipularSubmissaoFormulario(evento) {
    evento.preventDefault();
    const id = document.getElementById("pensamento-id").value;
    const conteudo = document.getElementById("pensamento-conteudo").value;
    const autoria = document.getElementById("pensamento-autoria").value;
    const data = document.getElementById("pensamento-data").value;

    if (!validarConteudo(conteudo)) {
        alert("O conteúdo deve ter pelo menos 10 caracteres e não pode conter números ou caracteres especiais.");
        return;
    }

    if (!validarData(data)) {
        alert("Não é permitido inserir uma data futura.");
        return;
    }

    try {
        if (id) {
            await api.alterarPensamento({id, conteudo, autoria, data});
        } else { 
            await api.salvarPensamento({conteudo, autoria, data});
        } 
        ui.renderizarPensamentos();
    } catch {
        alert("Erro ao salvar pensamento");
    }
}

function cancelarPensamento() {
    ui.limparFormularioPensamento();
}

async function manipularBusca() {
    const termoBusca = document.getElementById("campo-busca").value;

    try {
        const pensamentosFiltrados = await api.buscarPensamentosPorTermo(termoBusca);
        ui.renderizarPensamentos(pensamentosFiltrados);
    } catch (error) {
        alert("Erro ao realizar busca");
    }
}

function validarData(data) {
    const dataAtual = new Date();
    const dataInserida = new Date(data);
    return dataInserida <= dataAtual;
}