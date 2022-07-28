const express = require('express');
const { sequelize,product, carts,history,category } = require('./models');

const app=express()
app.use(express.json())

//add category
app.post('/products/category',async(req,res)=>{
    const{categoryName}=req.body
    try{
        const cate= await category.create({categoryName})
        return res.json(cate)
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})
//get all categories
app.get('/products/category',async(req,res)=>{
    try{
        const categ=await category.findAll()
        return res.json(categ)
    }catch(err){
        console.log(err)
        return res.status(500).json({error:"Something went wrong"})
    }
})

//add product
app.post('/products',async(req,res)=>{
    const{name,description,categoryId,price}=req.body
    try{
        const productu= await product.create({name,description,categoryId,price})
        return res.json(productu)
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})
//delete one product
// app.delete('/products/:id',async(req,res)=>{
//     const id= req.params.id
//     try{
//         const producta=await product.destroy({
//             where:{id:id}
//         })
//         return res.json(producta)
//     }catch(err){
//         console.log(err)
//         return res.status(500).json({error:"Something went wrong"})
//     }
// })


//get all products
app.get('/products',async(req,res)=>{
    try{
        const producta=await product.findAll()
        return res.json(producta)
    }catch(err){
        console.log(err)
        return res.status(500).json({error:"Something went wrong"})
    }
})
//get one product specific product by id
app.get('/products/:id',async(req,res)=>{
    const id= req.params.id
    try{
        const producta=await product.findOne({
            where:{id}
        })
        return res.json(producta)
    }catch(err){
        console.log(err)
        return res.status(500).json({error:"Something went wrong"})
    }
})
//get one product from each category
// app.get('/products/suggestions',async(req,res)=>{
//     try{
//         const producta=await product.findAll({
//             where:{categoryId:distinct}
//         })
//         return res.json(producta)
//     }catch(err){
//         console.log(err)
//         return res.status(500).json({error:"Something went wrong"})
//     }
// })
//get products by category
app.get('/products/category/:cat',async(req,res)=>{
    const cat= req.params.cat
    try{
        const producta=await product.findAll({
            where:{categoryId: cat}
        })
        return res.json(producta)
    }catch(err){
        console.log(err)
        return res.status(500).json({error:"Something went wrong"})
    }
})
//get products by price filter
app.get('/products/priceFilter/:priceUpper',async(req,res)=>{
    const { Op } = require("sequelize");
    const priceUpper= req.params.priceUpper
    try{
        const producta=await product.findAll({
            where:{price: {
                [Op.lte]: priceUpper
              }}
        })
        return res.json(producta)
    }catch(err){
        console.log(err)
        return res.status(500).json({error:"Something went wrong"})
    }
})
//add product to cart
app.post('/cart',async(req,res)=>{
    const{productId,product_name,price,total}=req.body
    try{
        const cartu= await carts.create({productId,product_name,price,total})
        return res.json(cartu)
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})
//remove items from cart, not functioning yet
app.put('/cart/:pId',async(req,res)=>{
    const pId= req.params.pId
    try{
        const producta=await product.update({
                active:false
                ,where:{productId:pId}
        })
        return res.json(producta)
        // const {id}= req.params;
        // const {description}= req.body;
        // const updateTodo= await pool.query(
        //     "UPDATE cart SET active=false WHERE productId=$1",[pId]
        // );
        // res.json("Todo was updated!");
    } catch(err){
        console.log(err)
        return res.status(500).json({error:"Something went wrong"})
    }
})
//get all products in cart
app.get('/cart',async(req,res)=>{
    try{
        const carta=await carts.findAll({
            where:{active: true}
        })
        return res.json(carta)
    }catch(err){
        console.log(err)
        return res.status(500).json({error:"Something went wrong"})
    }
})

//add product to history
app.post('/cart',async(req,res)=>{
    const{productId,product_name,price,quantity,total}=req.body
    try{
        const historyi= await history.create({productId,product_name,price,quantity,total})
        return res.json(hitsoryi)
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})

//get all products from history
app.get('/history',async(req,res)=>{
    try{
        const historyi=await history.findAll()
        return res.json(historyi)
    }catch(err){
        console.log(err)
        return res.status(500).json({error:"Something went wrong"})
    }
})

//connection
app.listen({port:5000}, async ()=>{
    console.log('Server up on http://localhost:5000')
    await sequelize.authenticate({force:true})
    console.log('Database connected!')
})
// app.listen({port:5000}, async ()=>{
//     console.log('Server up on http://localhost:5000')
//     await sequelize.sync({force:true})
//     console.log('Database connected!')
// })
    

