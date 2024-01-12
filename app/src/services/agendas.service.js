import axios from "axios";

const API_URL = "http://localhost:4242/api/agendas/";

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

const createORupdate = (id, dia, mes, ano, diasemana) => {
if(id == null){
    return create(dia, mes, ano, diasemana);
}
else {
    return update(id, dia, mes, ano, diasemana);
}
};

const create = (dia, mes, ano, diasemana) => {
return axios.post(API_URL + "create", { dia, mes, ano, diasemana });
};

const update = (id, dia, mes, ano, diasemana) => {
return axios.put(API_URL + "update", { id, dia, mes, ano, diasemana });
};

const deleteUser = (id) => {
return axios.delete(API_URL + "delete/" + id);
};

const AgendasService = {
getAll,
getById,
createORupdate,
create,
update,
deleteUser
}

export default AgendasService;