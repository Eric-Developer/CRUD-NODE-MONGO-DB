const { default: mongoose } = require("mongoose")

    const Usuario = mongoose.model('Usuario',{
        email:{
            type:String,
            requerid:true
        },
        nome:{
            type:String,
            requerid:true
        },
        senha:{
            type:String,
            requerid:true

        }
    })

    module.exports = Usuario
