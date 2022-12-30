const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const User = require('../models/user.models');
const verifyToken = require('./verifyToken');
require('dotenv').config();


router.post('/registrar', async (req, res) => {
    const { username} = req.body;

    // const salt = await bcrypt.genSalt(10)
    // const password = await bcrypt.hash(req.body.password, salt);
    const password = req.body.password
    const user = new User({ username, password});

    user.save((err)=>{
        if(err){
            res.status(400).send('Error al registrar el usuario')
        } else{
            res.status(200).send('Usuario registrado');
        }
    })
});

router.post('/login', async (req, res) =>{
    const {username, password} = req.body;
    User.findOne({ username }, (err, user) => {
        if (err) {
            res.status(500).send('Error en el servidor');
        } else if (!user) {
            res.send('El usuario no existe');
        } else {
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    res.status(500).send('Error en el servidor');
                } else if (!isMatch) {
                    res.send('Usuario o contraseña incorrecta');
                } else {
                    jwt.sign({ user: user.username}, process.env.JWT_KEY, (err, token) => {
                        console.log(err);
                        if (err) throw (err);
                        console.log("token: " + token)
                        res.send({
                            message: 'Sesion iniciada con exito',
                            userId: user._id,
                            token: token
                        })
                    })
                }
            });
        }
    })
})

router.get('/verify', verifyToken, async (req, res) => {
    console.log('you have permisions');
});

module.exports = router;