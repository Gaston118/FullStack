import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
    const object = { content, votes:0 }
    const response = await axios.post(baseUrl, object)
    return response.data
  }

  const vote = async (id) => {
    try {
      // Obtener la anecdota actual
      const response = await axios.get(`${baseUrl}/${id}`);
      const anecdoteToVote = response.data;
  
      // Actualizar el número de votos
      anecdoteToVote.votes += 1;
  
      // Realizar la solicitud PATCH con el cuerpo actualizado
      const patchResponse = await axios.patch(`${baseUrl}/${id}`, anecdoteToVote);
  
      console.log(patchResponse.data);
      return patchResponse.data;
    } catch (error) {
      console.error('Error in vote request:', error);
      throw error;
    }
  };

export default { getAll, createNew, vote }