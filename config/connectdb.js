const mongoose=require('mongoose')

const connectdb = () =>{
    mongoose
    .connect('mongodb+srv://yosrbelaid:yosr1234@cluster1.iqorj.mongodb.net/api?retryWrites=true&w=majority&appName=Cluster1')
    .then((console.log('mongoose connected')))
    .catch((err)=>console.log(err))
}

module.exports = connectdb