import { useEffect, useRef, useState } from 'react';
import './UsuarioModal.css';

const FORM_VAZIO = { nome: '', email: '', senha: '' };

function UsuarioModal({ usuario, onFechar, onSalvar }) {
    const emModoEdicao = Boolean(usuario);
    const [form, setForm] = useState(
        emModoEdicao ? { nome: usuario.nome, email: usuario.email, senha: '' } : FORM_VAZIO
    );
    const [erro, setErro] = useState('');
    const [salvando, setSalvando] = useState(false);
    const primeiroCampoRef = useRef(null);

    useEffect(() => {
        primeiroCampoRef.current?.focus();

        const aoPressionarTecla = (e) => {
            if (e.key === 'Escape') {
                onFechar();
            }
        };
        document.addEventListener('keydown', aoPressionarTecla);
        return () => document.removeEventListener('keydown', aoPressionarTecla);
    }, [onFechar]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSalvar = async (e) => {
        e.preventDefault();
        setErro('');

        if (form.nome.trim().length < 2) {
            setErro('Informe um nome com ao menos 2 caracteres.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            setErro('Informe um e-mail válido.');
            return;
        }
        if (!emModoEdicao && form.senha.length < 4) {
            setErro('Informe uma senha com ao menos 4 caracteres.');
            return;
        }
        if (emModoEdicao && form.senha && form.senha.length < 4) {
            setErro('A nova senha deve ter ao menos 4 caracteres.');
            return;
        }

        const payload = { nome: form.nome.trim(), email: form.email.trim() };
        if (form.senha) {
            payload.senha = form.senha;
        }

        setSalvando(true);
        try {
            await onSalvar(payload);
        } catch (erroRequisicao) {
            setErro(erroRequisicao.response?.data?.error || 'Não foi possível salvar o usuário.');
        } finally {
            setSalvando(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onFechar}>
            <div
                className="modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-titulo"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-cabecalho">
                    <h2 id="modal-titulo">{emModoEdicao ? 'Editar usuário' : 'Novo usuário'}</h2>
                    <button
                        type="button"
                        className="modal-fechar"
                        onClick={onFechar}
                        aria-label="Fechar"
                    >
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSalvar} className="modal-form">
                    <label htmlFor="nome">Nome</label>
                    <input
                        ref={primeiroCampoRef}
                        id="nome"
                        name="nome"
                        type="text"
                        value={form.nome}
                        onChange={handleChange}
                        placeholder="Nome completo"
                        disabled={salvando}
                    />

                    <label htmlFor="email">E-mail</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="email@exemplo.com"
                        disabled={salvando}
                    />

                    <label htmlFor="senha">
                        Senha {emModoEdicao && <span className="modal-dica">(deixe em branco para manter)</span>}
                    </label>
                    <input
                        id="senha"
                        name="senha"
                        type="password"
                        value={form.senha}
                        onChange={handleChange}
                        placeholder={emModoEdicao ? 'Nova senha' : 'Senha'}
                        disabled={salvando}
                    />

                    {erro && <p className="modal-erro">{erro}</p>}

                    <div className="modal-acoes">
                        <button type="button" className="botao botao-secundario" onClick={onFechar} disabled={salvando}>
                            Cancelar
                        </button>
                        <button type="submit" className="botao botao-primario" disabled={salvando}>
                            {salvando ? 'Salvando...' : 'Salvar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UsuarioModal;
