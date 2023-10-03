const jwt = require("jsonwebtoken")
//const User = require("../models/user.model")

class Authorization{ 

    authorize(req, res, next) {
       const authHeader = req.headers["authorization"]
       if(!authHeader){
        return res.status(401).send({message: "Log in to continue"})
       }
       else{
        try{
            const codedInfo = jwt.verify(authHeader, process.env.SECRET)
            if(codedInfo){
                req.user = codedInfo.user
                next()
            }
            else{
                return res.status(401).send({message: "Log in to continue"})
            }
        }catch(error){
            if(error.expiredAt && error.expiredAt < new Date){
                return res.status(401).send({message: "Session expired"})
            }
            else{
                return res.status(401).send({message: "Log in to continue"})
            }
        }
       }
    }
}
module.exports =  new Authorization()