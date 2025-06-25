import ui from "./services/ui.js";
import api from "./services/api.js";

const pensamentosSet = new Set();

async function adicionarChaveAoPensamento() {
    try {
        const pensamentos = await api.buscarPensamentos();
        pensamentos.forEach(pensamento => {
            const chavePensamento = 
            `${pensamento.conteudo.trim().toLowerCase()}-${pensamento.autoria.trim().toLowerCase()}`
            pensamentosSet.add(chavePensamento);
        })
    } catch (error) {
        alert("Erro ao adicionar chave ao pensamento");
    }
}

const regexConteudo = /^[\p{L}0-9\s.,;!?:-]{10,}$/u
const regexAutoria = /^[a-zA-Z]{2,15}$/

function validarConteudo(conteudo) {
  return regexConteudo.test(conteudo)
}

function validarAutoria(autoria) {
    return regexAutoria.test(autoria)
}

function removerEspacos(string) {
    return string.replaceAll(/\s+/g, '')
}

document.addEventListener("DOMContentLoaded", () => {
    
    ui.renderizarPensamentos();
    adicionarChaveAoPensamento();

    const botaoCancelar = document.getElementById("botao-cancelar");
    const formularioPensamento = document.getElementById("pensamento-form");
    const inputBusca = document.getElementById("campo-busca");
    document.getElementById("pensamento-conteudo").value = "";
    document.getElementById("pensamento-autoria").value = "";


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
    
    const conteudoSemEspacos = removerEspacos(conteudo)
    const autoriaSemEspacos = removerEspacos(autoria)

    if (!validarConteudo(conteudoSemEspacos)) {
        alert("O conteúdo deve ter pelo menos 10 caracteres e não pode conter números ou caracteres especiais.");
        return;
    }

    if (!validarAutoria(autoriaSemEspacos)) {
        alert("A autoria deve ter entre 3 e 15 caracteres, apenas letras.");
        return;
    }

    if (!validarData(data)) {
        alert("Não é permitido inserir uma data futura.");
        return;
    }

    const chaveNovoPensamento = `${conteudo.trim().toLowerCase()}-${autoria.trim().toLowerCase()}`

    if (pensamentosSet.has(chaveNovoPensamento)) {
        alert("Pensamento já existe.");
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