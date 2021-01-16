const mongoose = require('mongoose');
let pageSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Description: {
      type: String,
    },
    Usage: {
      type: String,
    },
    Contraindications: {
      type: String,
    },
    Weight: {
        type: String,
    },
    Strikethrough: {
        type: Number,
    },
    Price: {
        type: Number,
        required: true,
    },
    Image: {
      type: String,
      required: true,
    },
    SoldOut: {
      type: Boolean,
    },
    Type: {
        type: String,
        required: true,
    },
    Count: {
        type: Number,
    }

});
mongoose.model('items', pageSchema);