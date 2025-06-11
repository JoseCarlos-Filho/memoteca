import ui from "./services/ui.js";
import api from "./services/api.js";

document.addEventListener("DOMContentLoaded", () => {
    ui.renderizarPensamentos();

    const botaoCancelar = document.getElementById("botao-cancelar");
    const formularioPensamento = document.getElementById("pensamento-form");
    formularioPensamento.addEventListener("submit", manipularSubmissaoFormulario);
    botaoCancelar.addEventListener("click", cancelarPensamento);
    
});

async function manipularSubmissaoFormulario(evento) {
    evento.preventDefault();
    const id = document.getElementById("pensamento-id").value;
    const conteudo = document.getElementById("pensamento-conteudo").value;
    const autoria = document.getElementById("pensamento-autoria").value;

    try {
        if (conteudo.trim() === "" || autoria.trim() === "") {
            evento.preventDefault();
            alert("Preencha todos os campos antes de salvar o pensamento");
            return;
        } else {
            await api.salvarPensamento({conteudo, autoria})
            ui.renderizarPensamentos();
        }
    } catch {
        alert("Erro ao salvar pensamento");
    }
}

function cancelarPensamento() {
    ui.limparFormularioPensamento();
}