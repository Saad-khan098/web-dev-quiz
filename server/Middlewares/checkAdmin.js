const checkAdmin = (req,res,next)=>{
    console.log('checking for admin');
    console.log(req.user);
    if(!req.user){
        return res.status(401).json({msg: 'not signed in'});
    }
    if(req.user?.role == 'admin') next();
    else return res.status(401).json({msg: 'not an admin'}); 
}
export default checkAdmin;