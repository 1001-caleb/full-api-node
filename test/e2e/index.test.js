const { server } = require('../../../src/expressExample/expressExample')
const axios = require('axios')

const URL = `https://localhost:${process.env.PORT || 2000}/`

describe('E2E test: Use cases from UserService', () => {
    beforeAll(async ( ) => {
        await server.start()
    })

    afterAll (async () => {
        await server.stop()
    })

    test('Ping server', async () => {
        try {
            await axios.get(URL)
        }catch (error) {
            console.error('error message',error)
        }  
    })
})