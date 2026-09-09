import api from './api';

export const getUsuarios = async () => {
    const { data } = await api.get('/usuarios');
    return data.data;
};

export const getUsuarioPorId = async (id) => {
    const { data } = await api.get(`/usuarios/${id}`);
    return data.data;
};

export const addUsuario = async (usuario) => {
    const { data } = await api.post('/usuarios', usuario);
    return data.data;
};

export const editarUsuario = async (id, usuario) => {
    const { data } = await api.put(`/usuarios/${id}`, usuario);
    return data.data;
};

export const excluirUsuario = async (id) => {
    const { data } = await api.delete(`/usuarios/${id}`);
    return data;
};
