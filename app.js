const express = require('express');
const { sequelize,product, carts,history } = require('./models');

const app=express()
app.use(express.json())
//add product
app.post('/products',async(req,res)=>{
    const{name,description,category,subcategory,price}=req.body
    try{
        const productu= await product.create({name,description,category,subcategory,price})
        return res.json(productu)
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})
//delete one product
app.delete('/products/:id',async(req,res)=>{
    const id= req.params.id
    try{
        const producta=await product.destroy({
            where:{id:id}
        })
        return res.json(producta)
    }catch(err){
        console.log(err)
        return res.status(500).json({error:"Something went wrong"})
    }
})


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
//get one product
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
//get products by category
app.get('/products/category/:cat',async(req,res)=>{
    const cat= req.params.cat
    try{
        const producta=await product.findAll({
            where:{category: cat}
        })
        return res.json(producta)
    }catch(err){
        console.log(err)
        return res.status(500).json({error:"Something went wrong"})
    }
})
//connection
app.listen({port:5000}, async ()=>{
    console.log('Server up on http://localhost:5000')
    await sequelize.sync({force:true})
    console.log('Database connected!')
})
// app.listen({port:5000}, async ()=>{
//     console.log('Server up on http://localhost:5000')
//     await sequelize.sync({force:true})
//     console.log('Database connected!')
// })
    

