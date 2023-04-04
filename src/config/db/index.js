const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27027/f8_edu_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to database!!');
    } catch (error) {
        console.log('Fail to connect to database!!');
    }
}

module.exports = { connect };
