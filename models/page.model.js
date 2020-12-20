const mongoose = require('mongoose');
let pageSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Weight: {
        type: String,
    },
    Price: {
        type: Number,
        required: true,
    },
    Image: {
      type: String,
      required: true,
    }

});
mongoose.model('fruits', pageSchema);