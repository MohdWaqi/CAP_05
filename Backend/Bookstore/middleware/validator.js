const books = require('../schema/schema')
const validator = async(req, res, next)=>{
    const data = req.body
    if(data.title && data.author && data.ISBN){
        const allbooksCount = await books.countDocuments()
        req.body.id = allbooksCount +1
        next()
    }else{
        res.send({message: "Missing format"})
    }
}


module.exports = validator