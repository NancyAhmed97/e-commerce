const {Brand} = require('../Models/brand');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
router.get(`/`, async (req, res) =>{
    const brandList = await Brand.find();

    if(!brandList) {
        res.status(500).json({success: false})
    } 
    res.send(brandList);
})

router.get('/:id', async(req,res)=>{
    const brand = await Brand.findById(req.params.id);

    if(!brand) {
        res.status(500).json({message: 'The brand with the given ID was not found.'})
    } 
    res.status(200).send(brand);
})

router.post('/', async (req,res)=>{
    console.log(req);
    let brand = new Brand({
        name: req.body.name,
        copon: req.body.copon,
        logo: req.body.logo,
        Products: req.body.Products,
        offers: req.body.offers,
        headerImgs:req.body.headerImgs
     
    })
    res.send("jkjvjv1",req);

    brand = await Brand.save();
    res.send("jkjvjv2",brand);

    if(!brand)
    return res.status(400).send('the brand cannot be created!')
res.send("jkjvjv3",brand);

})

router.put('/:id',async (req, res)=> {

    const brandExist = await Brand.findById(req.params.id);
    let newPassword
    if(req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10)
    } else {
        newPassword = brandExist.passwordHash;
    }

    const brand = await Brand.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            passwordHash: newPassword,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            street: req.body.street,
            apartment: req.body.apartment,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country,
        },
        { new: true}
    )

    if(!brand)
    return res.status(400).send('the brand cannot be created!')

    res.send(brand);
})

router.post('/login', async (req,res) => {
    const brand = await Brand.findOne({email: req.body.email})
    const secret = process.env.secret;
    if(!brand) {
        return res.status(400).send('The brand not found');
    }

    if(brand && bcrypt.compareSync(req.body.password, brand.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin
            },
            secret,
            {expiresIn : '1d'}
        )
       
        res.status(200).send({brand: brand.email , token: token}) 
    } else {
       res.status(400).send('password is wrong!');
    }

    
})


router.post('/register', async (req,res)=>{
    let brand = new Brand({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    })
    brand = await brand.save();

    if(!brand)
    return res.status(400).send('the brand cannot be created!')

    res.send(brand);
})


router.delete('/:id', (req, res)=>{
    Brand.findByIdAndRemove(req.params.id).then(brand =>{
        if(brand) {
            return res.status(200).json({success: true, message: 'the brand is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "brand not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

router.get(`/get/count`, async (req, res) =>{
    const brandCount = await Brand.countDocuments((count) => count)

    if(!brandCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        brandCount: brandCount
    });
})


module.exports =router;