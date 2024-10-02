

const register = async(req,res)=>
{
    res.send('registered user');
}

const login = async(req,res)=>
{
    res.send('logged user');
}

module.exports = {register,login};