const URL_BASE = "http://localhost:3000";

const converterStringParaData = (dataString) => {
    const [ano, mes, dia] = dataString.split("-");
    return new Date(Date.UTC(ano, mes, dia));
}


const api = {
    async buscarPensamentos() {
        try {
            const response = await axios.get(`${URL_BASE}/pensamentos`)
            const pensamentos = await response.data;
            return pensamentos.map(pensamento => {
                return {
                    ...pensamento,
                    data: new Date(pensamento.data)
                }
            })
            // const response = await fetch(`${URL_BASE}/pensamentos`);
            // return await response.json()

        } catch {
            alert("Erro na requisição dos dados");
            throw error;
            
        }
    },

    async salvarPensamento(pensamento) {
        try {
            const data = converterStringParaData(pensamento.data);
            const response = await axios.post(`${URL_BASE}/pensamentos`, {
                ...pensamento,
                data: data.toISOString()
            })
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
            const pensamento = await response.data;
            return {
                ...pensamento,
                data: new Date(pensamento.data)
            }
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

    async buscarPensamentosPorTermo(termo) {
        try {
            const pensamentos = await this.buscarPensamentos();
            const termoEmMinusculas = termo.toLowerCase();

            const pensamentosFiltrados = pensamentos.filter(pensamento => {
                return (pensamento.conteudo.toLowerCase().includes(termoEmMinusculas)) ||
                pensamento.autoria.toLowerCase().includes(termoEmMinusculas); 
            });
            return pensamentosFiltrados
        } catch(error) {
            alert("Erro ao filtrar pensamentos");
            throw error;
        }
        
    },

    async atualizarFavorito(id, favorito) {
        try {
            const response = await axios.patch(`${URL_BASE}/pensamentos/${id}`, {favorito: favorito}) 
            return await response.data;
        } catch (error) {
            alert("Erro ao atualizar favorito");
            throw error;
        }
    },
}

export default api;