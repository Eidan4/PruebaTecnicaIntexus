const { Router } = require('express');
const { check } = require('express-validator');

const {     
    createPais,
    VerPais,
    VerPaisID,
    updatePais,
    DeletePais 
} = require('../controllers/Pais');

const { validateFields } = require('../middlewares');

const router = Router();

router.post('/crearpais', [
    check('name', 'Nombre es requerido'),
    check('capital', 'Capital es requerido'),
    validateFields
], createPais);

router.get('/', [
    validateFields
], VerPais);

router.get('/:id', [
    validateFields
], VerPaisID);

router.put('/actualizarpais/:id', [
    validateFields
], updatePais);

router.delete('/borrarpais/:id', [
    validateFields
], DeletePais);


module.exports = router;