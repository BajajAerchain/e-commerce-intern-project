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
//get all categories, or get one specific category details by categoryId
app.get('/products/category',async(req,res)=>{
    const {categoryId}= req.query
    try{
        let options = { where: {} };
        if(categoryId){
            options.where.id=categoryId
        }
        const categ=await category.findAll(options)
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
// app.get('/products',async(req,res)=>{
//     try{
//         const producta=await product.findAll()
//         return res.json(producta)
//     }catch(err){
//         console.log(err)
//         return res.status(500).json({error:"Something went wrong"})
//     }
// })

//get one product specific product by id
// app.get('/products/:id',async(req,res)=>{
//     const id= req.params.id
//     try{
//         const producta=await product.findOne({
//             where:{id}
//         })
//         return res.json(producta)
//     }catch(err){
//         console.log(err)
//         return res.status(500).json({error:"Something went wrong"})
//     }
// })

//search
// app.get('/search',async(req,res)=>{
//     const { Op } = require("sequelize");
//     const {name}= req.body
//     try{
//         const filter={
//             where:{ 
//                 name:{
//                 [Op.substring]: name
//                 },
//             }
//         }
//         const producta=await product.findAll(filter)
//         return res.json(producta)
//     }catch(err){
//         console.log(err)
//         return res.status(500).json({error:"Something went wrong"})
//     }
// })
//raw sql query test, returns one product id from each category
app.get('/suggestion',async(req,res)=>{
    try{
        const { QueryTypes } = require('sequelize');
        const results = await product.sequelize.query('SELECT "categoryId",min("id") FROM "products" GROUP BY "categoryId" order by "categoryId"', { type: sequelize.QueryTypes.SELECT })
        return res.json(results)
    }catch(err){
        console.log(err)
        return res.status(500).json({error:"Something went wrong"})
    }
})
//get one product from each category
// app.get('/suggestions',async(req,res)=>{
//     try{
//         const producta=await product.findAll({
//             Attributes: ['name'], group: ['categoryId']
//         })
//         return res.json(producta)
//     }catch(err){
//         console.log(err)
//         return res.status(500).json({error:"Something went wrong"})
//     }
// })
//get products by category
// app.get('/products/category/:cat',async(req,res)=>{
//     const cat= req.params.cat
//     try{
//         const producta=await product.findAll({
//             where:{categoryId: cat}
//         })
//         return res.json(producta)
//     }catch(err){
//         console.log(err)
//         return res.status(500).json({error:"Something went wrong"})
//     }
// })
//get products by price filter less than upper value
// app.get('/products/priceFilter/:priceUpper',async(req,res)=>{
//     const { Op } = require("sequelize");
//     const priceUpper= req.params.priceUpper
//     try{
//         const producta=await product.findAll({
//             where:{price: {
//                 [Op.lte]: priceUpper
//               }}
//         })
//         return res.json(producta)
//     }catch(err){
//         console.log(err)
//         return res.status(500).json({error:"Something went wrong"})
//     }
// })
//get products filtered by lower and upper values
// app.get('/filterPrice',async(req,res)=>{
//     const { Op } = require("sequelize");
//     const {priceUpper,priceLower}= req.body
//     try{
//         const filter={
//             where:{ 
//                 price:{
//                 [Op.and]: {
//                         [Op.lt]: priceUpper,
//                         [Op.gt]: priceLower
//                 },
//             },
//         }
//         }
//         const producta=await product.findAll(filter)
//         return res.json(producta)
//     }catch(err){
//         console.log(err)
//         return res.status(500).json({error:"Something went wrong"})
//     }
// })


//product listing page
app.get('/products',async(req,res)=>{
        const { Op } = require("sequelize");
        const {id,name,categoryId,priceUpper,priceLower,description}= req.query
        //console.log(categoryId,priceUpper,priceLower)
        try{
            let options = { where: {} };
            if(id){
                options.where.id=id
            }
            if(categoryId){
                options.where.categoryId=categoryId
            }
            if(priceUpper && priceLower){
                options.where.price={
                    //$between : {priceLower,priceUpper}
                    [Op.and]: {
                       [Op.lte]: priceUpper,
                       [Op.gte]: priceLower
                    }
                }
            }
            if(name){
                options.where.name={
                    [Op.or]: {
                        [Op.substring]:name,
                        [Op.iLike]:name
                     }
                }
            }
            if(description){
                options.where.description={
                    [Op.substring]:description
                }
            }

            const producta=await product.findAll(options)
            return res.json(producta)
        }catch(err){
            console.log(err)
            return res.status(500).json({error:"Something went wrong"})//json.error(err.message)
        }
    })

//add product to cart, now you can add quantity and don't have to add total 
app.post('/cart',async(req,res)=>{
    const{productId,product_name,price,quantity}=req.body
    try{
        const cartu= await carts.create({productId,product_name,price,quantity,total:price*quantity})
        return res.json(cartu)
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})

    //remove all items from cart, or one specific item
    app.delete('/cart',async(req,res)=>{
        const {id}=req.query
        try{
            let options={where:{}};
            if(id){
                options.where.id=id
            }
            const deleted=await carts.update(
                { active: false },
                options
              );
              return res.json("removed from cart")
        }catch(err){
            console.log(err)
            return res.status(500).json({error:"Something went wrong"})
        }
    })
    
     //remove one item from cart by id of cart item
    //  app.delete('/edit_cart/:id',async(req,res)=>{
    //     try{
    //         const id= req.params.id
    //         const removed=await carts.update(
    //             { active: false },
    //             {
    //               where: {
    //                 id: [id],
    //               },
    //             }
    //           );
    //           return res.json("removed one item")
    //     }catch(err){
    //         console.log(err)
    //         return res.status(500).json({error:"Something went wrong"})
    //     }
    // })

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

//cart total
app.get('/cart_total',async(req,res)=>{
    try{
        const { QueryTypes } = require('sequelize');
        const results = await carts.sequelize.query('SELECT sum("total") AS "total of cart" FROM "cart" WHERE "active"=true', { type: sequelize.QueryTypes.SELECT })
        return res.json(results)
    }catch(err){
        console.log(err)
        return res.status(500).json({error:"Something went wrong"})
    }
})

//add product to history
app.post('/history',async(req,res)=>{
    const{productId,product_name,price,quantity}=req.body
    try{
        const historyi= await history.create({productId,product_name,price,quantity,total:quantity*price})
        return res.json(historyi)
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
    

