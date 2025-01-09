async function searchProduct(req,res){
    try{
        const query = req.query.q
        console.log('query', query)
    }catch(err){
        res.json({
            error:true,
            success:false,
            message:err.message,
            data:null,

        })
        
    }
}
module.exports=searchProduct