const functions = require("./functions");

// beforeEach(() => initDataBase());
// afterEach(() => closeDataBase());

// beforeAll(() => initDataBase());
// afterAll(() => closeDataBase());

const nameCheck = () => console.log('checking name....');

describe('Checking Names', () => {
    beforeEach(() => nameCheck());

    test('User is Jeff', () => {
        const user = 'Jeff';
        expect(user).toBe('Jeff');
    });

    test('User is Karen', () => {
        const user = 'Karen';
        expect(user).toBe('Karen');
    });
});

const initDataBase = () => console.log('Database initialized...');
const closeDataBase = () => console.log('Database closed...');

test('Adds 2+2 to equal 4', () => {
    expect(functions.add(2, 2)).toBe(4);
});

test('Adds 2+2 to NOT equal 4', () => {
    expect(functions.add(2, 2)).not.toBe(5);
});

test('Should be null', () => {
    expect(functions.isNull()).toBeNull();
});

test('Should be falsy', () => {
    expect(functions.checkValue(undefined)).toBeFalsy();
});

test('User should be Brad Traversy object', () => {
    expect(functions.createUser()).toEqual({
        firstName: 'Brad',
        lastName: 'Traversy'
    });
});

test('Should be under 1600', () => {
    const load1 = 800;
    const load2 = 750;
    expect(load1 + load2).toBeLessThan(1600);
});

test('There is no I in team', () => {
    expect('team').not.toMatch(/I/i);
});

test('Admin should be in usernames', () => {
    usernames = ['john', 'karen'];
    expect(usernames).toContain('karen');
});

// Working with async data
test('User fetched name should be Leanne Graham', () => {
    expect.assertions(1);
    return functions.fetchUser()
    .then(data => {
        expect(data.name).toEqual('Leanne Graham');
    });
});

// Async/Await

test('User fetched name should be Leanne Graham', async () => {
    expect.assertions(1);
    const data = await functions.fetchUser();
    expect(data.name).toEqual('Leanne Graham');
});

/*
    CHECK FOR TRUTHY & FALSY VALUES
    toBeNull only null
    toBeUndefined only undefined
    toBeDefined oposite of undefined
    toBeTruthy the return of if statement as true
    toBeFalsy same of toBeTruthy but the returning false
    toEqual compares obj and array
    toMatch if finds regex
    toContain if contains in array
*/