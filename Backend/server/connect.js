const mongoose = require('mongoose');

async function connectToMongoDB() {
    try {
        await mongoose.connect("mongodb+srv://hasanamaz2002:hasan.amaz2002@cluster0.pxffyvl.mongodb.net/MOUNEH", {
            useNewUrlParser: true,
        });
        console.log('MongoDB Connection Succeeded.');
    } catch (error) {
        console.log('Error in DB connection: ' + error);
    }
}



module.exports = connectToMongoDB;