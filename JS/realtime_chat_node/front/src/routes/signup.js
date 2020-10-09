import React, { Component } from "react";
import { signup } from "../controllers/user";
import {Link, Redirect} from "react-router-dom";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: "",
            error: "",
            access: false
        };
    };

    isValid = () => {
        const { username, password, email } = this.state;
        const re = /\S+@\S+\.\S+/;

        if (username.length < 4 || username.length > 10 || !username) {
            this.setState({
                error: "Nome de usuário deve estar entre 4 e 10 letras."
            });
            return false;
        };

        if (password.length < 4 || password.length > 10 || !password) {
            this.setState({
                error: "Senha deve ter entre 4 e 10 letras."
            });
            return false;
        };

        if (email.length < 4 || email.length > 32 || !email || !email.match(re)) {
            this.setState({
                error: "Email deve ter entre 4 e 32 letras, e deve possuir um @."
            });
            return false;
        };

        return true;
    };

    handleSubmit = ev => {
        ev.preventDefault();
        const { username, password, email } = this.state;
        if (this.isValid()) {
            signup(username, password, email)
                .then(data => {
                    if(data.error) return this.setState({error: data.error});
                    this.setState({access: true});
                });
        };
    };

    handleChange = ev => {
        this.setState({
            [ev.currentTarget.name]: ev.currentTarget.value,
            error: ""
        });
    };

    loginForm = (username, password, email, error) => (
        <form
            onSubmit={this.handleSubmit}
            className="card mt-50"
            style={{ padding: "20px 20px" }}
        >
            <h3 className="lead text-center mb-5">Sign Up</h3>
            <p
                className="alert alert-warning text-warning"
                style={{ display: error ? "block" : "none" }}
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
                />
            </div>

            <div className="form-group">
                <input
                    type="email"
                    className="form-control mt-5"
                    placeholder="Email"
                    value={email}
                    id="input-email"
                    name="email"
                    onChange={this.handleChange}
                />
            </div>

            <div className="form-group">
                <input
                    type="password"
                    className="form-control mt-5"
                    placeholder="Senha"
                    value={password}
                    id="input-password"
                    name="password"
                    onChange={this.handleChange}
                />
            </div>
            <button className="btn btn-raised btn-sm btn-primary">
                Enviar
            </button>
            <div className="mt-3 text-center">
                <Link to="/"
                    className="font-weight-bold text-danger"
                    style={{ fontSize: "0.85em" }}
                >
                    Já possuo uma conta
                </Link>
            </div>
        </form>
    );

    render() {
        const { username, password, email, error, access } = this.state;
        if(access) return <Redirect to="/" />;
        return (
            <div className="container">
                <div className="row">
                    <div
                        className="col-md-6"
                        style={{ margin: "0 auto", padding: "40px 40px" }}
                    >
                        {this.loginForm(username, password, email, error)}
                    </div>
                </div>
            </div>
        );
    };
};

export default Signup;