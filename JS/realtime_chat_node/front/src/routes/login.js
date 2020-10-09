import React, {Component} from "react";
import {Redirect, Link} from "react-router-dom";

import {signin} from "../controllers/user";
import {storeToken, isAuthenticated} from "../auth/user";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            error: "",
            access: false
        };
        this.handleChange = this.handleChange.bind(this);
    };

    isValid = () => {
        const {username, password} = this.state;
        if(username.length < 4 || username.length > 10 || !username) {
            this.setState({
                error: "Nome de usuário deve estar entre 4 e 10 letras."
            });
            return false;
        };
        if(password.length < 4 || password.length > 10 || !password) {
            this.setState({
                error: "Senha deve ter entre 4 e 10 letras."
            });
            return false;
        };
        return true;
    };

    handleSubmit = ev => {
        ev.preventDefault();
        const {username, password} = this.state;
        if(this.isValid()) {
            signin(username, password)
            .then(data => {
                storeToken(process.env.REACT_APP_USER_OBJ, data);
                this.setState({access: true});
            });
        };
    };

    handleChange = ev => {
        this.setState({
            [ev.currentTarget.name ]: ev.currentTarget.value,
            error: ""
        });
    };

    loginForm = (username, password, error) => (
        <form
            onSubmit={this.handleSubmit}
            className="card mt-50"
            style={{padding: "20px 20px"}}
        >
            <h3 className="lead text-center mb-5">Login</h3>
            <p 
                className="alert alert-warning text-warning"
                style={{display: error ? "block" : "none"}}
            >
                {error}
            </p>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Nome de Usuário"
                    value={username}
                    id="input-username"
                    name="username"
                    onChange={this.handleChange}
                    style={{padding: "20px 20px"}}
                />
            </div>

            <div className="form-group">
                <input
                    type="password"
                    className="form-control"
                    placeholder="Senha"
                    value={password}
                    id="input-password"
                    name="password"
                    onChange={this.handleChange}
                    style={{ padding: "20px 20px" }}
                />
            </div>
            <button className="btn btn-raised btn-sm btn-primary">
                Enviar
            </button>
            <div 
                className="mt-3 font-weight-bold text-center"
                style={{ fontSize: "0.85em" }} 
            >
                <Link to="/signup" className="text-danger">
                    Criar uma nova conta
                </Link>
            </div>
            <div 
                className="font-weight-bold text-center"
                style={{ fontSize: "0.85em" }} 
            >
                <Link to="/forgot" className="text-danger">
                    Esqueci minha senha
                </Link>
            </div>
        </form>
    );

    render() {
        const {username, password, error, access} = this.state;

        if (access && isAuthenticated()) return <Redirect to={`/menu/${isAuthenticated().user._id}`} />;
        return (
            <div className="container">
                <div className="row">
                    <div 
                        className="col-md-6"
                        style={{margin: "0 auto", padding: "40px 40px"}}
                    >
                        {this.loginForm(username, password, error)}
                    </div>
                </div>
            </div>
        );
    };
};

export default Login;