import axios from "axios";

const API_URL = "http://localhost:4242/api/receitas/";

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

const createORupdate = (id, nome, tempo, graus) => {
if(id == null){
    return create( nome, tempo, graus);
}
else {
    return update(id, nome, tempo, graus);
}
};

const create = ( nome, tempo, graus) => {
return axios.post(API_URL + "create", {  nome, tempo, graus });
};

const update = (id, nome, tempo, graus) => {
return axios.put(API_URL + "update", { id, nome, tempo, graus });
};

const deleteUser = (id) => {
return axios.delete(API_URL + "delete/" + id);
};

const ReceitasService = {
getAll,
getById,
createORupdate,
create,
update,
deleteUser
}

export default ReceitasService;