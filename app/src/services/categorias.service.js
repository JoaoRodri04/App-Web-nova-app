import axios from "axios";

const API_URL = "http://localhost:4242/api/categorias/";

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

const createORupdate = (id, descricao) => {
if(id == null){
    return create(descricao);
}
else {
    return update(id, descricao);
}
};

const create = (descricao) => {
return axios.post(API_URL + "create", { descricao });
};

const update = (id, descricao) => {
return axios.put(API_URL + "update", { id, descricao });
};

const deleteUser = (id) => {
return axios.delete(API_URL + "delete/" + id);
};

const CategoriasService = {
getAll,
getById,
createORupdate,
create,
update,
deleteUser
}

export default CategoriasService;