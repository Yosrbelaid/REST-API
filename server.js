const express=require('express')
const app=express();
require('dotenv').config();
const connectdb=require('./config/connectdb')
app.use(express.json())
// const GET = express.Router();
// const POST = express.Router();
// const PUT = express.Router();
// const DELETE = express.Router();
const User = require('./Models/User'); 
connectdb()

app.get('/Users' , async (req,res) =>{
    try {
        const result = await User.find();
        res.send(result)
    } catch (error) {
        console.log(error)
        
    }
})

app.post('/Add', async (req, res) => {
    try {
        const users = req.body;
        if (Array.isArray(users) && users.length > 0) {

            const many = await User.insertMany(users);
            res.send({ msg: 'many users created', many });
        } 

        else if (typeof users === 'object' && users !== null) {
            const newUser = new User(users); 
            await newUser.save();  
            res.send({ msg: 'one user created', newUser });
        } else {
            res.status(400).send({ msg: 'You must send a single user or an array of users.' });
        }
    } catch (error) {
        console.log(error);
    }
});
app.delete('/deletePerson/:id', async (req, res) => {
    try {
        const  Id  = req.params.id;

        const deleted = await User.findOneAndDelete({_id:Id});

        if (!deleted) {
            return res.status(404).send({ msg: 'User not found' });
        }

        res.send({ msg: 'User deleted ', deleted });
    } catch (error) {
        console.error(error);
    }
});

app.put('/update/:Id', async (req, res) => {
    try {
        const Id  = req.params.Id; 
         const edited = await User.findOneAndUpdate({ _id : Id },{...req.body} ,{new: true});

        if (!edited) {
            return res.status(404).send({ msg: 'User not found' });
        }

        res.send({ msg: 'edit done ', edited });
    } catch (error) {
        console.error(error);
    }
});




app.listen(5000,(err)=>err ? console.log(err) : console.log('server is running'))