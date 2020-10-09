import React, {Component} from "react";
import io from "socket.io-client";
import {Navbar, Content, Footer} from "../components/chatbox";

const socket = io(process.env.REACT_APP_API_URI, { path: "/messages" });

class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                nome: "User",
                photo: "",
                _id: props._id
            },
            headHeight: "",
            bodyHeight: "",
            footHeight: "",
            currentMessage: "",
            listMessage: []
        };
    };

    socketWorks() {
        socket.on("received", async (data) => {
            let json_data = await JSON.parse(data);
            this.setState({
                listMessage: [...this.state.listMessage, { _id: json_data._id, message: json_data.message }]
            })
        });
    };

    componentDidMount() {
        let box = document.querySelector("#box");
        let box_height = box.getBoundingClientRect().height;
        this.setState({
            headHeight: `${(box_height * 0.2)}px`,
            bodyHeight: `${(box_height * 0.7)}px`,
            footHeight: `${(box_height * 0.1)}px`
        });

        this.socketWorks();
    };

    render() {
        const {
            _id, 
            nome, 
            photo
        } = this.state.user;
        
        return (
            <div className="container-fluid">
                <div className="row">
                    <Navbar 
                        photo={photo} 
                        nome={nome} 
                        _id={`/userprofile/${_id}`}
                        headHeight={this.state.headHeight}
                    />
                </div>
                <div className="row">
                    <Content
                        bodyHeight={this.state.bodyHeight}
                        message={this.state.listMessage}               
                    />
                </div>
                <div className="row">
                    <Footer 
                        footHeight={this.state.footHeight}
                    />
                </div>
            </div>
        );
    };
};

export default ChatBox;
