const { UserService } = require('../src/expressExample/services')

const users = []
const roles = []
const urls = []

jest.mock('../src/expressExample/database/mongo/queries', () => {
    return {
        url: {
            saveUrl: jest.fn( async url => urls.push(url)),
            getOneUrl: jest.fn( async id => id.filter(url => url._id === id)),
        },
        user: {
            saveUser: jest.fn( async user => users.push(user)),
            getUserById: jest.fn( async id => users.filter(user => user._id === id)),
            getAllUsers: jest.fn( async () => users),
            removeUserById: jest.fn( async id => {
                const index = users.findIndex(user => user.id === id)
                
                const userToBeDeleted = users[index]

                users.splice(index, 1)
            }),
            updateOneUser: jest.fn( async user => {
                const { id, name, lastname, email, password, salt, hash } = user
                const index = users.findIndex(user => user._id === id)

                if (index === -1) throw new Error('User not found')

                const usersUpdated = {
                    ...users[index],
                    ...(name && { name }),
                    ...(lastname && { lastname }),
                    ...(email && { email }),
                    ...(salt &&
                        hash && {
                        salt,
                        hash
                    })
                }

                users.splice(index, 1, usersUpdated)

                return usersUpdated
            }),
            query: jest.fn( async query => {
                const { id, name, lastname, email, password, salt, hash } = query
                return users.find(user => {
                    let aux = true

                    id && (aux = aux && user.id === id)
                    aux && name && (aux = aux && user.name === name)
                    aux && lastname && (aux = aux && user.lastname === lastname)
                    aux && email && (aux = aux && user.email === email)
                    aux && password && (aux = aux && user.password === password)
                    aux && salt && (aux = aux && user.salt === salt)
                    aux && hash && (aux = aux && user.hash === hash)

                    return aux
                })[0]
            })
        },
        roles: {
            saveRole: jest.fn( async role => roles.push(role)),
            getRoleById: jest.fn( async id => (roles = roles.filter(role => role._id === id))),
            getRoleByName: jest.fn( async name => (roles = roles.filter(role => role.name === name))),
        }
    }
})

describe('Use cases from UserService', () => {
    test('Add user ', async () => {
        const user = {
            name: 'John',
            lastname: 'Doe',
            email: 'jhon@gmail.com'
        }

        await UserService.saveUser(user)
        expect(users.length).toBe(1)
    })

    test('Get all users', async () => {
        const allUsers = await UserService().getAllUsers()

        expect(allUsers.length).toBe(users.length)
    })
})