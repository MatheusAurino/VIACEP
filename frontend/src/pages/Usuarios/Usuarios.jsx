import { useEffect, useState } from 'react';
import {
    getUsuarios,
    getUsuarioPorId,
    addUsuario,
    editarUsuario,
    excluirUsuario
} from '../../services/usuarioService';
import UsuarioModal from '../../components/UsuarioModal/UsuarioModal';
import './Usuarios.css';

function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [mensagem, setMensagem] = useState('');
    const [erroLista, setErroLista] = useState('');

    const [modalAberto, setModalAberto] = useState(false);
    const [usuarioEmEdicao, setUsuarioEmEdicao] = useState(null);

    const [idBusca, setIdBusca] = useState('');
    const [usuarioBuscado, setUsuarioBuscado] = useState(null);
    const [erroBusca, setErroBusca] = useState('');

    const carregarUsuarios = async () => {
        setCarregando(true);
        setErroLista('');
        try {
            const dados = await getUsuarios();
            setUsuarios(dados);
        } catch {
            setErroLista('Não foi possível carregar os usuários.');
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        carregarUsuarios();
    }, []);

    useEffect(() => {
        if (!mensagem) return;
        const timer = setTimeout(() => setMensagem(''), 3000);
        return () => clearTimeout(timer);
    }, [mensagem]);

    const abrirModalCriar = () => {
        setUsuarioEmEdicao(null);
        setModalAberto(true);
    };

    const abrirModalEditar = (usuario) => {
        setUsuarioEmEdicao(usuario);
        setModalAberto(true);
    };

    const fecharModal = () => {
        setModalAberto(false);
        setUsuarioEmEdicao(null);
    };

    const handleSalvar = async (payload) => {
        if (usuarioEmEdicao) {
            await editarUsuario(usuarioEmEdicao.id, payload);
            setMensagem('Usuário editado com sucesso!');
        } else {
            await addUsuario(payload);
            setMensagem('Usuário criado com sucesso!');
        }
        fecharModal();
        await carregarUsuarios();
        if (usuarioBuscado) {
            handleBuscarPorId();
        }
    };

    const handleExcluir = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir este usuário?')) {
            return;
        }
        try {
            await excluirUsuario(id);
            setMensagem('Usuário excluído com sucesso!');
            if (usuarioBuscado?.id === id) {
                setUsuarioBuscado(null);
                setIdBusca('');
            }
            await carregarUsuarios();
        } catch {
            setMensagem('Não foi possível excluir o usuário.');
        }
    };

    const handleBuscarPorId = async (e) => {
        e?.preventDefault();
        setErroBusca('');
        setUsuarioBuscado(null);

        if (!idBusca.trim()) {
            setErroBusca('Digite um ID para buscar.');
            return;
        }

        try {
            const usuario = await getUsuarioPorId(idBusca.trim());
            setUsuarioBuscado(usuario);
        } catch (erro) {
            setErroBusca(erro.response?.data?.error || 'Usuário não encontrado.');
        }
    };

    const limparBusca = () => {
        setIdBusca('');
        setUsuarioBuscado(null);
        setErroBusca('');
    };

    return (
        <div className="usuarios-pagina">
            <div className="usuarios-cabecalho">
                <h1>Lista de Usuários</h1>
                <button type="button" className="botao botao-primario" onClick={abrirModalCriar}>
                    + Novo usuário
                </button>
            </div>

            {mensagem && <p className="usuarios-mensagem">{mensagem}</p>}

            <section className="usuarios-card">
                <h2>Buscar usuário por ID</h2>
                <form className="usuarios-busca" onSubmit={handleBuscarPorId}>
                    <input
                        type="text"
                        value={idBusca}
                        onChange={(e) => setIdBusca(e.target.value)}
                        placeholder="Digite o ID do usuário"
                    />
                    <button type="submit" className="botao botao-primario">
                        Buscar
                    </button>
                    <button type="button" className="botao botao-secundario" onClick={limparBusca}>
                        Limpar
                    </button>
                </form>

                {erroBusca && <p className="usuarios-erro">{erroBusca}</p>}

                {usuarioBuscado && (
                    <div className="usuario-item">
                        <div>
                            <strong>{usuarioBuscado.nome}</strong>
                            <p>{usuarioBuscado.email}</p>
                        </div>
                        <span className="usuario-id">ID #{usuarioBuscado.id}</span>
                    </div>
                )}
            </section>

            <section className="usuarios-card">
                <h2>Todos os usuários</h2>

                {carregando && <p>Carregando...</p>}
                {erroLista && <p className="usuarios-erro">{erroLista}</p>}
                {!carregando && !erroLista && usuarios.length === 0 && (
                    <p>Nenhum usuário encontrado no momento.</p>
                )}

                <ul className="usuarios-lista">
                    {usuarios.map((usuario) => (
                        <li key={usuario.id} className="usuario-item">
                            <div>
                                <strong>{usuario.nome}</strong>
                                <p>{usuario.email}</p>
                            </div>
                            <div className="usuario-acoes">
                                <span className="usuario-id">ID #{usuario.id}</span>
                                <button
                                    type="button"
                                    className="botao botao-primario"
                                    onClick={() => abrirModalEditar(usuario)}
                                >
                                    Editar
                                </button>
                                <button
                                    type="button"
                                    className="botao botao-perigo"
                                    onClick={() => handleExcluir(usuario.id)}
                                >
                                    Excluir
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

            {modalAberto && (
                <UsuarioModal usuario={usuarioEmEdicao} onFechar={fecharModal} onSalvar={handleSalvar} />
            )}
        </div>
    );
}

export default Usuarios;
