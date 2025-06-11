import ui from "./services/ui.js";
import api from "./services/api.js";

document.addEventListener("DOMContentLoaded", () => {
    ui.renderizarPensamentos();

    const formularioPensamento = document.getElementById("pensamento-form");
    formularioPensamento.addEventListener("submit", manipularSubmissaoFormulario);
});

async function manipularSubmissaoFormulario(evento) {
    evento.preventDefault();
    const id = document.getElementById("pensamento-id").value;
    const conteudo = document.getElementById("pensamento-conteudo").value;
    const autoria = document.getElementById("pensamento-autoria").value;

    // const pensamento = {
    //     id,
    //     conteudo,
    //     autoria
    // }

    try {
        await api.salvarPensamento({conteudo, autoria})
        ui.renderizarPensamentos();
    } catch {
        alert("Erro ao salvar pensamento");
    }
}