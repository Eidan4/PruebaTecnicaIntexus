const { response } = require("express");

const Pais = require('../models/Pais');
const { capitalize } = require("../helpers/capitalizeStr");

const createPais = async(req, res = response) => {
    try {
        const name = capitalize(req.body.name);
        const capital = capitalize(req.body.capital);

        const pais = new Pais({name, capital});


        await pais.save();

        res.json(pais);
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log(error.message);
    }
}

const VerPais = async(req, res = response) => {
    try {
        const pais = await Pais.find();
    
        res.json(pais);
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log(error.message);
    }
}

const VerPaisID = async(req, res = response) => {
    try {
        const id = req.params.id
        const pais = await Pais.findOne({id});
    
        res.json(pais);
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log(error.message);
    }
}

const updatePais = async(req, res = response) => {
    try {
        const id = (req.params.id);
        const name = capitalize(req.body.name);
        const capital = capitalize(req.body.capital);
        
        const pais = await Pais.findByIdAndUpdate(id,{name,capital},{new:true});
        
        res.json(pais);
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log(error.message);
    }
}

const DeletePais = async(req, res = response) => {
    try {
        const id = (req.params.id);
        
        const pais = await Pais.findByIdAndDelete(id);
        
        res.json(pais);
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log(error.message);
    }
}



module.exports = {
    createPais,
    VerPais,
    VerPaisID,
    updatePais,
    DeletePais
}