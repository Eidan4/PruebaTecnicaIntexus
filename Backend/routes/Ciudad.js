const { Router } = require('express');
const { check } = require('express-validator');

const { 
    createCiudad,
    VerCiudad,
    VerCiudadID,
    updateCiudad,
    DeleteCiudad
 } = require('../controllers/Ciudad');

const { validateFields } = require('../middlewares');

const router = Router();

router.post('/crearciudad', [
    check('name', 'Nombre es requerido'),
    validateFields
], createCiudad);

router.get('/', [
    validateFields
], VerCiudad);

router.get('/:id', [
    validateFields
], VerCiudadID);

router.put('/actualizarciudad/:id', [
    validateFields
], updateCiudad);

router.delete('/borrarciudad/:id', [
    validateFields
], DeleteCiudad);

module.exports = router;