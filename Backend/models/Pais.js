const { Schema, model } = require('mongoose');

const PaisSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    capital: {
        type: String,
        required: [true, 'Capital is required']
    }
});

PaisSchema.methods.toJSON = function() {
    const { __v, password, _id, ...pais } = this.toObject();
    pais.uid = _id;
    
    return pais;
}

module.exports = model('Pais', PaisSchema);