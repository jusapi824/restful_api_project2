const userService = require('../services/userService')

const getAllUsers = async(req, res)=>{
    const allUsers = await userService.getAllUsers();
    if(allUsers){
        res.status(200).send({status:'OK', data: allUsers})
    }else{
        res.status(400).send({status:'FAILED', data:null})
    }
}

const getUser = async(req,res)=>{
    try {
        let id = req.params.userId
        const user = await userService.getUser(id)
        res.status(200).send({status:'OK', data:user})
    } catch (error) {
        res.status(error.status || 500).send({status:'FAILED', data:error.message})
        //res.status(400).send({status:'FAILED', data:null})
    }    
}

const createUser = async (req, res)=>{
    // name, email, phone, password
    const {body} = req
    console.log(body.name)
    const createUser = await userService.createUser(body.name, body.email, body.phone, body.password)
    if(createUser)
        res.status(201).send({status:'OK',data:createUser})
    else
        res.status(400).send({status:'FAILED',data:null})
}

const updateUser = async(req,res)=>{
    const id = req.params.userId
    let {name,email,phone,password} = req.body;
    const updateUser = userService.updateUser(id,name,email,phone,password)
    if(updateUser)
        res.status(200).send({status:'OK',data: updateUser})
    else
        res.status(400).send({status:'FAILED',data: null})
}

const deleteUser = async (req,res)=>{
    const id = req.params.userId
    const deleteUser = userService.deleteUser(id)
    if(deleteUser)
        res.status(200).send({status:'OK',data:deleteUser})
    else
        res.status(400).send({status:'FAILED',data:null})
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}