const Modal = ({ show, close, msg, send }) => (
    <div className="modal" tabIndex="-1" role="dialog" style={{ display: show ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Formulário para contato</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" className='text-danger' onClick={() => close(false)}>&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Nome</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="name" 
                                placeholder="Ex.: João"
                                value={msg.data.name}
                                onChange={el => msg.setter({...msg.data, name: el.currentTarget.value})}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Endereço de Email</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                id="email" 
                                placeholder="Seu Email"
                                value={msg.data.email}
                                onChange={el => msg.setter({...msg.data, email: el.currentTarget.value})}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="msg">Mensagem</label>
                            <textarea 
                                id='msg' 
                                placeholder='Escreva sua mensagem aqui!'
                                className='form-control'
                                value={msg.data.msg}
                                onChange={el => msg.setter({...msg.data, msg: el.currentTarget.value})}
                            />
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-success" onClick={send}>Enviar</button>
                </div>
            </div>
        </div>
    </div>
);

export default Modal;