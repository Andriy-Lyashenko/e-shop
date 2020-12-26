import bcryptjs from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@exampl@gmail.com',
        password: bcryptjs.hashSync('123456',10),
        isAdmin: true
    },
    {
        name: 'Jhon Doe',
        email: 'jhonanatan@exampl@gmail.com',
        password: bcryptjs.hashSync('123456',10),
    },
    {
        name: 'Chris Dewasen',
        email: 'crhis@exampl@gmail.com',
        password: bcryptjs.hashSync('123456',10),
    },
]

export default users