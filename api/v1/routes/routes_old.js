const db = require('../../../models') // requerimos los modelos
const {Router} = require('express') // Requerimos Router del Framework
const router = new Router() // Creamos instancia

router.get('/',(req, res)=>{
    console.log("get ruta principal")
    res.send({Title:'Saludos ADSO!'})
})
router.post('/new',async (req,res)=>{
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
    let password = req.body.password;
    try{
        await db.User.create({
            name,
            email,
            phone,
            password
        });
        res.status(200).send({status:'OK',message:"User created!"})
    }catch(error){
        res.status(400).send('User could not be created!')
    }
})
// Ruta o endpoint para traer todos los usuarios
router.get('/all', async(req,res)=>{
    try{
        let users = await db.User.findAll();
        res.status(200).send({status:'OK',message:"Users listed!",data:users});
    }catch(error){
        res.status(400).send({status:'FAIL',message:"Users error!",data:null});
    }
})
module.exports = router