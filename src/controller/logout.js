const logout = (req,res,next)=>{
    res.clearCookie("jwt");
    res.status(200).json({mgs:"Logout successful"});
}
module.exports = logout;