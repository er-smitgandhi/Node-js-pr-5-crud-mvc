const mongoose = require('mongoose')

const crudSchema = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    director : {
        type : String,
        require : true
    },
    writer : {
        type : String,
        require : true
    },
    actor : {
        type : String,
        require : true
    },
    language : {
        type : Array,
        require : true
    },
    country : {
        type : String,
        require : true
    },
    movietype : {
        type : String,
        require : true
    },
    image : {
        type : String,
        require : true
    }
})

const crud = mongoose.model('crud',crudSchema);

module.exports = crud