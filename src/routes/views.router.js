import express from "express";

const router = express.Router()

const constante = [
    {
        name:'Gordito',
        specie:'conejito',
        favorite:'acelga'
    }
]

router.get('/',(req, res)=>{
    res.render('index',{
        constante,
        style:'index.css',
        tittle:'Zeucito',
    })
})

export default router