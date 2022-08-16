const {connect, connection} = require('mongoose');

const dbConnection = async () => {
    const connectionConfig = {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }

    connection.on('connected', () =>{
        console.log('MongoDB connection established successfully');
    })
    connection.on('reconnected', () =>{
        console.log('MongoDB reconnected successfully');
    })
    connection.on('close', () =>{
        console.log('MongoDB close successfully');
    })
    connection.on('error', error =>{
        console.log('MongoDB error');
        console.error(error);
    })

    return {
        connect: () => connect(process.env.MONGO_URI, connectionConfig),
        disconnect: () => connection.close()
    }
}

module.exports = dbConnection;