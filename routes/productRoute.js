const express = require('express');
const Router = express.Router();
const productMidd = require('../middleware/manageProductMidd');
const productCon = require('../controllers/manageProductCon');

Router.post('/createProduct',[productMidd.checkProductBody], productCon.createProduct);
Router.get('/getProduct', productCon.getProduct);



// check
Router.put('/updateProduct',[productMidd.updateProduct], productCon.updateProduct);
Router.delete('/deleteProduct', productCon.deleteProduct);

module.exports = Router;

