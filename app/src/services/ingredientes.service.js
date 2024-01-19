import axios from "axios";

const API_URL = "http://localhost:4242/api/ingredientes/";

axios.interceptors.request.use(
config => {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const getAll = () => {
return axios.get(API_URL);
};

const getById = (id) => {
return axios.get(API_URL + id);
};

const createORupdate = (id, nome,quantidade) => {
if(id == null){
    return create(nome, quantidade);
}
else {
    return update(id, nome, quantidade);
}
};

const create = (nome, quantidade) => {
return axios.post(API_URL + "create", { nome, quantidade });
};

const update = (id, quantidade) => {
return axios.put(API_URL + "update", { id, nome, quantidade });
};

const deleteUser = (id) => {
return axios.delete(API_URL + "delete/" + id);
};

const IngredientesService = {
getAll,
getById,
createORupdate,
create,
update,
deleteUser
}

export default IngredientesService;