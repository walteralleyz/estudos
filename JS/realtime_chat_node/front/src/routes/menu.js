import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {signout} from "../controllers/user";
import ChatBox from "./chatbox";

class Menu extends Component {
    constructor() {
        super();
        this.state = {
            isLogged: true,
			isNavbarVisible: false,
			contactList: [],
			isSelected: false,
			contactSelected: ""
        };
    };

    logout = () => {
        signout().then(data => {
            if(!data.error) this.setState({isLogged: false});
            return false;
        });
    };

	getUsers = link => {
		return fetch(link)
		.then(res => res.json())
		.then(data => {
			let users = [...data].map(user => {
				return {name: user.name, _id: user.id};
			});
			return users;
		})
		.catch(err => console.log(err));
	};

	handleButtonContactClick = id => {
		this.setState({
			contactSelected: id,
			isSelected: true
		});
	};

	navBarAppear = () => {
		let navbar = document.querySelector("#navbarNav");
		let visible = this.state.isNavbarVisible ? "block" : "none";
		navbar.style.display = visible;
	};

	handleNavbar = ev => {
		this.setState({isNavbarVisible: !this.state.isNavbarVisible});
	};

    Navbar = () => (
        <div className="col-lg-12 card bg-info">
            <div 
                className="col-md-12"
                style={{
                    padding: "10px 10px"
                }}    
            >
                <p 
                    className="lead font-weight-bold col-lg-6 col-sm-12 d-inline-block"
                    style={{
                        margin: "0 0 0 0"
                    }}
                >
                    SocketChat
                </p>
                <p 
                    className="col-lg-6 col-sm-12 d-inline-block text-danger text-right"
                    onClick={this.logout}
                    style={{
                        margin: "0 0 0 0",
                        cursor: "pointer"
                    }}    
                >
                    Sair
                </p>
            </div>
        </div>
    );

    ContactMenu = () => (
        <nav 
			className="navbar navbar-expand-lg navbar-light bg-light col-lg-2 col-sm-12"
			style={{
				padding: "10px 10px"
			}}
		>
			<span 
				className="navbar-toggler"
				style={{
					color: "#000",
					border: "none",
					cursor: "unset"
				}}
			>
				Contatos
			</span>
			<button 
				className="navbar-toggler" 
				type="button" 
				data-toggle="collapse" 
				data-target="#navbarNav" 
				aria-controls="navbarNav" 
				aria-expanded="true" 
				aria-label="Toggle navigation"
				onClick={this.handleNavbar}
			>
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarNav">
				<ul className="nav flex-column">
					<li className="nav-item">
						<div className="input-group mb-3">
							<div className="input-group-prepend">
								<span className="input-group-text" id="basic-addon1">@</span>
							</div>
							<input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
						</div>
					</li>
					{this.state.contactList.map((user, i) => 
						<li className="nav-item" key={i}>
							<button 
								className="btn btn-danger"
								style={{
									padding: "5px 0",
									wordWrap: "break-word",
									textTransform: "unset"									
								}}
								onClick={() => this.handleButtonContactClick(user._id)}
							>
								{user.name}
							</button>
					    </li>
					)}
				</ul>
			</div>
		</nav>
    );

    Chat = props => (
        <div
            className="col-lg-10 sm-12"
            style={{ padding: "35px 35px" }}
        >
            <div
                className="card"
                id="box"
                style={{
                    minHeight: `${window.innerHeight * 0.73}px`,
                    maxHeight: `${window.innerHeight * 0.73}px`,
                    overflow: "hidden"
                }}
            >
                <ChatBox _id={props._id}/>
            </div>
        </div>
    );

	fakeChat = () => (
		<div
            className="col-lg-10 sm-12"
            style={{ 
				padding: "35px 35px"
			}}
        >
            <div
                style={{
                    minHeight: `${window.innerHeight * 0.73}px`,
                    maxHeight: `${window.innerHeight * 0.73}px`,
                    overflow: "hidden",
					border: "2px dotted #fff",
					borderRadius: "5px"
                }}
            >
            </div>
        </div>
	);

    Footer = () => (
        <div className="card-footer text-muted text-center col-lg-12">
            SocketChat criado por Walter Alleyz
        </div>
    );

	componentDidMount() {
		this.getUsers("https://jsonplaceholder.typicode.com/users")
		.then(resp => this.setState({
			contactList: resp
		}));
	};

	componentDidUpdate() {
		this.navBarAppear();
	};

    render() {
        const {isLogged, isSelected, contactSelected} = this.state;
        if(!isLogged) return <Redirect to="/" />;

        return (
            <div 
                className="container-fluid"
                style={{background: "gray"}}    
            >
                <div className="row">
                    <this.Navbar />
                </div>
                <div className="row">
                    <this.ContactMenu />
					{isSelected ? <this.Chat _id={contactSelected} /> : <this.fakeChat />}
                </div>
                <div className="row">
                    <this.Footer />
                </div>
            </div>
        );
    };
}

export default Menu;
