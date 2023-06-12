const randomNumber = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;

const credentials = {
    admin: {
        username: "admin",
        password: "password"
    },
    user: {
        username: "Test-id",
        surname: "1",
        email: "test@gmail.com",
        password: "Test@123"
    },
    newUser: {
        // username: `test${randomNumber}`,
        username: `verifiedUser`,
        email: `test${randomNumber}@gmail.com`,
        password: 'Test@123',
        newPassword: "Test@1234",
        newUserName: `test${randomNumber}12`,
        surname: `22`,
    },
    book: {
        name: "000Test1",
        newName: "000Test"
    }
}


module.exports = credentials;
