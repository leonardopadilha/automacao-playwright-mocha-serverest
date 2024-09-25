
createUser = (user) => {
   const  userData = {
        nome: user.nome,
        email: user.email,
        password: user.password,
        administrador: user.administrador
    }

    return userData
}

module.exports = {
    createUser
}