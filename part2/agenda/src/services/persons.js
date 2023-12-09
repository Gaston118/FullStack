import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const borrar = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
  }

  const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
  }

const personsService = {
    getAll: getAll,
    create: create,
    borrar: borrar,
    update: update
  };
  
  export default personsService;