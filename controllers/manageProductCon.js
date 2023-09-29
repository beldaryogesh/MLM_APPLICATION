const Product = require("../model/productModel");
const baseURL = require("../constant/baseURL");

const createProduct = async function(req, res){
    try{
        let baseUrl = baseURL.generateBaseUrl(req);
        let { productName, productPrice, description} = req.body;
        let obj = {
            productName : productName ? productName : undefined,
            productPrice : productPrice ? productPrice : undefined,
            description : description ? description : undefined
        }
        if(req.files.length > 0){
            obj['productImage'] = baseUrl + "/uploads/" + req.files[0].filename;
        }
        await Product.create(obj);
        return res.status(200).json({error_code : 200, message : 'product added successfully..!'})
    }catch(error){
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside create product api in manage product controller..!'})
    }
}

const getProduct = async function(req, res){
    try {
        let product = await Product.find({})
        if(product.length == 0){
            return res.status(200).json({error_code : 404, message : 'product not exist..!'})
        }
        let result = [];
        let sr = 1;
        for(let i = 0; i<product.length; i++){
            result.push({
                SrNo : sr++,
                ProductName : product[i].productName,
                ProductPrice : product[i].productPrice,
                ProductImage : product[i].productImage,
                Description : product[i].description,
                Status : product[i].status,
                productId : product[i]._id
            })
        }
        return res.status(200).json({error_code : 200, result})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside get product api in manage product controller..!'})
    }
}


const updateProduct = async function(req, res){
    try {
        let baseUrl = baseURL.generateBaseUrl(req);
        let productId = req.body.productId;
        let { productName, productPrice, description} = req.body;
        let obj = {
            productName : productName ? productName : undefined,
            productPrice : productPrice ? productPrice : undefined,
            description : description ? description : undefined
        }
        if(req.files.length > 0){
            obj['productImage'] = baseUrl + "/uploads/" + req.files[0].filename;
        }
        await Product.findByIdAndUpdate({_id : productId}, {$set : obj}, {new : true});
        return res.status(200).json({error_code : 200, message : 'product update successfully..!'})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside update product api in manage product controller..!'})
    }
}

const deleteProduct = async function(req, res){
    try {
        let productId = req.body.productId;
        let product = await Product.findByIdAndDelete(productId);
        if(!product){
            return res.status(200).json({error_code : 404, message : 'product not exist..!'})
        }
        return res.status(200).json({error_code : 200, message : 'product deleted successfully..!'})
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error_code : 500, message : 'error inside update product api in manage product controller..!'})
    }
}

module.exports = {
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
}