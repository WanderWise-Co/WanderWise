const getAllJobs = async(req,res)=>{
    res.send('get all jobs');
}
const createJob = async(req,res)=>{
    res.send('created job');
}
const getJob = async(req,res)=>{
    res.send('get singlle job');
}
const updateJob = async(req,res)=>{
    res.send('updated job');
}
const deleteJob = async(req,res)=>{
    res.send('deleted job');
}

module.exports = {getAllJobs,getJob,createJob,updateJob,deleteJob};