const api = {
    async buscarPensamentos() {
        try {
            const response = await fetch("http://localhost:3000/pensamentos")
            return response.json()
        } catch {
            alert("Erro na requisição dos dados");
            throw error;
            
        }
    },

    async salvarPensamento(pensamento) {
        try {
            const response = await fetch("http://localhost:3000/pensamentos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pensamento)
            })
            return await response.json()
        } catch {
            alert("Erro ao buscar pensamentos");
            throw error;
            
        }
    },

    async buscarPensamentoPorId(id) {
        try {
            const response = await fetch(`http://localhost:3000/pensamentos/${id}`);
            return response.json()
        } catch {
            alert("Erro na requisição dos dados");
            throw error;
            
        }
    },

    async alterarPensamento(pensamento) {
        try {
            const response = await fetch(`http://localhost:3000/pensamentos/${pensamento.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pensamento)
            })
            return await response.json()
        } catch {
            alert("Erro ao alterar pensamento");
            throw error;
            
        }
    },

    async excluirPensamento(id) {
        try {
            const response = await fetch(`http://localhost:3000/pensamentos/${id}`, {
                method: "DELETE"
            })
        } catch {
            alert("Erro ao excluir um pensamento");
            throw error;
        }
    },
}

export default api;