const fetch = require('node-fetch');

const functions = {
    add: (num1, num2) => num1 + num2,
    isNull: () => null,
    checkValue: x => x,
    createUser: () => {
        const user = {firstName: 'Brad'};
        user['lastName'] = 'Traversy';
        return user;
    },
    fetchUser: () => fetch('https://jsonplaceholder.typicode.com/users/1')
    .then(res => res.json())
};

module.exports = functions;