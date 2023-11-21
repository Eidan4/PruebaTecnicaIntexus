const { Schema, model } = require('mongoose');

const CiudadSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    pais_id: {
        type: Schema.Types.ObjectId,
        ref: "Pais",
        autopopulate:true,
        required: [true, 'Pais is required']
    }
});

CiudadSchema.plugin(require('mongoose-autopopulate'));

CiudadSchema.methods.toJSON = function() {
    const { __v, password, _id, ...ciudad } = this.toObject();
    ciudad.uid = _id;
    
    return ciudad;
}

module.exports = model('Ciudad', CiudadSchema);