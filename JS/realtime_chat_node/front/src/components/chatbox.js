import React from "react";
import io from "socket.io-client";

import { Link } from "react-router-dom";
import {isAuthenticated} from "../auth/user";

import DefaultImage from "../images/user.png";
import Wallpaper from "../images/wallpaper.jpg";

const socket = io(process.env.REACT_APP_API_URI, { path: "/messages" });

export const handleClick = props => {
    let input = document.querySelector("#input-msg");
    let user = isAuthenticated().user;

    socket.emit("message", JSON.stringify({
        _id: user._id, message: input.value
    }));
    
    input.value = "";
    return false;
};

export const Navbar = props => (
    <div
        className="col col-lg-12 bg-primary"
        style={{
            padding: "15px 15px",
            minHeight: `${props.headHeight}`,
            maxHeight: `${props.headHeight}`
        }}
    >
        <img
            src={props.photo}
            alt={props.nome}
            className="mr-3 img-thumbnail"
            style={{
                maxHeight: "55px",
                maxWidth: "55px",
                borderRadius: "100%"
            }}
            onError={i => i.target.src = DefaultImage}
        />
        <Link to={props._id}
            className="text-light font-weight-bolder lead"
        >
            {props.nome}
        </Link>
    </div>
);

export const Content = props => (
    <div
        className="col col-lg-12"
        style={{
            backgroundImage: `url(${Wallpaper})`,
            backgroundPosition: "50% 50%",
            backgroundSize: "cover",
            minHeight: `${props.bodyHeight}`,
            maxHeight: `${props.bodyHeight}`,
            overflow: "auto"
        }}
    >
        <ul className="list-group">
            {props.message && [...props.message].map((x, i) => (
                <div
                    key={i}
                    style={{
                        padding: "10px 10px",
                        width: "100%",
                        textAlign: "left"
                    }}
                >
                    <li
                        className={`list-group-item 
                            ${x._id === isAuthenticated().user._id ? 'bg-success' : 'bg-info'}
                            float-right`}
                        style={{
                            borderRadius: "20px",
                            display: "block",
                            width: "50%"
                        }}
                    >
                        {x.message}
                    </li>
                </div>
            ))}
        </ul>
    </div>
);

export const Footer = props => (
    <div
        className="col input-group"
        style={{
            minHeight: `${props.footHeight}`,
            maxHeight: `${props.footHeight}`
        }}
    >
        <input
            type="text"
            className="form-control"
            placeholder="Digite uma mensagem"
            id="input-msg"
        />
        <div className="input-group-append">
            <button
                className="btn btn-danger"
                type="button"
                onClick={handleClick}
            >
                Enviar
            </button>
        </div>
    </div>
);
