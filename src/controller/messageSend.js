const uData = require('./../../db/userData');

const messageSend = async(req,res,next)=>{
    try {
        if(req._id){
            const {name, email, number, text} = req.body;
            const data = await uData.findById({_id:req._id});
            const addMgs = await  data.addMessage(name, email, number, text);
            // await data.save();
            res.status(200).send({mgs:"message send successfull"});
        }else{
            res.status(404).send({mgs:"Plz login first"})
        }
    } catch (error) {
        console.log(error)
    }
}
module.exports = messageSend;