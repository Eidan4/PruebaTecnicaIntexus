const mongoose = require('mongoose');
 
const dbConnection = async() => {

    try {
        await mongoose.set("strictQuery", false);
        await mongoose.connect( process.env.MONGODB_ATLAS );

        console.log('Online database');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error starting database')
        
    }

}

module.exports = {
    dbConnection,
}