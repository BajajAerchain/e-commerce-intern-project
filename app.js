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
//get one product specific product
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
// app.get('/products/category/:cat',async(req,res)=>{
//     const cat= req.params.cat
//     try{
//         const producta=await product.findAll({
//             where:{category: cat}
//         })
//         return res.json(producta)
//     }catch(err){
//         console.log(err)
//         return res.status(500).json({error:"Something went wrong"})
//     }
// })
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
    

