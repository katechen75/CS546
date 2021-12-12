const mongoose = require('mongoose');
const settings = require('./settings');
const mongoConfig = settings.mongoConfig;
const Grid = require('gridfs-stream');

module.exports = async function connection() {
    try {
         const connectionParams = {
             useNewUrlParser: true,
             useCreateIndex: true,
             useUnifiedTopology: true
         }
         await mongoose.connect(mongoConfig.imageURL, connectionParams);
         let gfs;
        const conn = mongoose.createConnection(mongoConfig.serverURL);
        console.log('Connected to database.');
        return conn;
        
         conn.once('open', () => {
             gfs = Grid(conn.db, mongoose.mongo);
             gfs.collection('uploads');
         });
        
    } catch (error) {
        console.log(error);
        console.log('Could not connect to database.')
    }
}