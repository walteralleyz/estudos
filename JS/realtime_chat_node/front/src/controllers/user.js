export const signup = (username, password, email) => {
    return fetch(`${process.env.REACT_APP_API_URI}/signup`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ username, password, email })
    }).then(res => res.json())
    .catch(error => error.json());
};

export const signin = (username, password) => {
    return fetch(`${process.env.REACT_APP_API_URI}/signin`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({username, password})
    }).then(res => res.json())
    .catch(error => error);
};

export const signout = () => {
    localStorage.removeItem(process.env.REACT_APP_USER_OBJ);
    return fetch(`${process.env.REACT_APP_API_URI}/signout`, {
        headers: {
            Accept: "application/json"
        }
    }).then(res => res.json())
    .catch(error => error.json());
};