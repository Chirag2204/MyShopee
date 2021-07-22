import bcrypyt from 'bcryptjs';

const users = [
    {
        name: "Admin User",
        email: "admin@example.com",
        password: bcrypyt.hashSync("123456", 10),
        isAdmin: true
    },
    {
        name: "Chirag Chandak",
        email: "chirag@example.com",
        password: bcrypyt.hashSync("123456", 10)
    },
    {
        name: "Anjali Chandak",
        email: "anjali@example.com",
        password: bcrypyt.hashSync("123456", 10)
    },
]

export default users;