const { response } = require("express");

const Ciudad = require('../models/Ciudad');
const { capitalize } = require("../helpers/capitalizeStr");

const createCiudad = async(req, res = response) => {
    try {
        const name = capitalize(req.body.name);
        const pais_id = (req.body.pais_id);
        
        const ciudad = new Ciudad({name, pais_id});
    
        await ciudad.save();
    
        res.json(ciudad);
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log(error.message);
    }
}

const VerCiudad = async(req, res = response) => {
    try {
        const ciudad = await Ciudad.find();
    
        res.json(ciudad);
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log(error.message);
    }
}

const VerCiudadID = async(req, res = response) => {
    try {
        const id = req.params.id
        const ciudad = await Ciudad.findOne({id});
    
        res.json(ciudad);
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log(error.message);
    }
}

const updateCiudad = async(req, res = response) => {
    try {
        const id = (req.params.id);
        const name = capitalize(req.body.name);
        const pais_id = (req.body.pais_id);
        
        const ciudad = await Ciudad.findByIdAndUpdate(id,{name,pais_id},{new:true});
        
        res.json(ciudad);
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log(error.message);
    }
}

const DeleteCiudad = async(req, res = response) => {
    try {
        const id = (req.params.id);
        
        const ciudad = await Ciudad.findByIdAndDelete(id);
        
        res.json(ciudad);
    } catch (error) {
        res.status(500).json({error: error.message});
        console.log(error.message);
    }
}


module.exports = {
    createCiudad,
    VerCiudad,
    VerCiudadID,
    updateCiudad,
    DeleteCiudad
}