const { response } = require('express');
const jwt = require('jsonwebtoken');
 


// const User = require('../models/user');

//Codigo utilizable para hacer verificar el token de la persona, este se necesito usuarios como esta esta aplicación no la tiene entonces se deshabilitar

const validateJWT = async(req, res = response, next ) => {

    // const token = req.header('x-token');
    
    // if ( !token ) {
    //     return res.status(401).json({
    //         msg: 'Token must be sent'
    //     });
    // }

    // try {

    //     const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

    //     const user = await User.findById(uid);

    //     req.userAuth = user; 

    //     next();

    // } catch (error) {

    //     console.log(error);
    //     res.status(401).json({
    //         msg: 'Invalid Token'
    //     });
    // }
}

module.exports = {
    validateJWT
}