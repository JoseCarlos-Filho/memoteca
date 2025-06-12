const URL_BASE = "http://localhost:3000";


const api = {
    async buscarPensamentos() {
        try {
            const response = await axios.get(`${URL_BASE}/pensamentos`)
            return await response.data;
            // const response = await fetch(`${URL_BASE}/pensamentos`);
            // return await response.json()

        } catch {
            alert("Erro na requisição dos dados");
            throw error;
            
        }
    },

    async salvarPensamento(pensamento) {
        try {
            const response = await axios.post(`${URL_BASE}/pensamentos`, pensamento)
            // const response = await fetch(`${URL_BASE}/pensamentos`, {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify(pensamento)
            // })
            return await response.data;
        } catch {
            alert("Erro ao buscar pensamentos");
            throw error;
            
        }
    },

    async buscarPensamentoPorId(id) {
        try {
            const response = await axios.get(`${URL_BASE}/pensamentos/${id}`)
            return await response.data;
            // const response = await fetch(`${URL_BASE}/pensamentos/${id}`);
            // return response.json()
        } catch {
            alert("Erro na requisição dos dados");
            throw error;
            
        }
    },

    async alterarPensamento(pensamento) {
        try {
            const response = await axios.put(`${URL_BASE}/pensamentos/${pensamento.id}`, pensamento)
            return await response.data;
            // const response = await fetch(`${URL_BASE}/pensamentos/${pensamento.id}`, {
            //     method: "PUT",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify(pensamento)
            // })
            // return await response.json()
        } catch {
            alert("Erro ao alterar pensamento");
            throw error;
            
        }
    },

    async excluirPensamento(id) {
        try {
            const response = await axios.delete(`${URL_BASE}/pensamentos/${id}`, id)
            // const response = await fetch(`${URL_BASE}/pensamentos/${id}`, {
            //     method: "DELETE"
            // })
        } catch {
            alert("Erro ao excluir um pensamento");
            throw error;
        }
    },
}

export default api;