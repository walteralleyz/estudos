export const data_name = process.env.REACT_APP_USER_OBJ;

export const getToken = dataName => {
    const data = localStorage.getItem(dataName);
    return data;
};

export const storeToken = (dataName, value) => {
    return localStorage.setItem(dataName, JSON.stringify(value));
};

export const removeToken = dataName => {
    return localStorage.removeItem(dataName);
};

export const isAuthenticated = () => {
    if(!getToken(data_name)) return false;
    const user = getToken(data_name);
    return JSON.parse(user);
};