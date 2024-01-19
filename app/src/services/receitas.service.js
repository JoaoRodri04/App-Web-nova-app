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

const createORupdate = (id, nome, tempo, graus, categoriaId) => {
if(id == null){
    return create( nome, tempo, graus, categoriaId);
}
else {
    return update(id, nome, tempo, graus, categoriaId);
}
};

const create = ( nome, tempo, graus,categoriaId) => {
return axios.post(API_URL + "create", {  nome, tempo, graus,categoriaId: Number(categoriaId)});
};

const update = (id, nome, tempo, graus,categoriaId) => {
return axios.put(API_URL + "update", { id, nome, tempo, graus, categoriaId: Number(categoriaId) });
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