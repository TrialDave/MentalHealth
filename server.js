const express = require ('express');
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require ('mongodb');
const Visitor = require('./models/visitorModel').default;
const app = express();
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

//routes

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/visitors', async(req,res) => {
    try{
        const visitors = await Visitor.find({});
        res.status(200).json(visitors);
    } catch(error){
        res.status(500).json({message:error.message})
    }
});

app.get('/visitors/:id', async(req,res) => {
    try{
        const{id} = req.params;
        const visitor = await Visitor.findById(id);
        res.status(200).json(visitor);

    } catch(error){
        res.status(500).json({message:error.message})     
    }
});


app.post('/submit', async(req,res) => {
try{
    
    const newVisitor = new  Visitor (req.body);
    await newVisitor.save();
    console.log('Data sent to db:', req.body);
    res.status(200).json({message: 'data captured successfully'})
}catch(error){
    console.error('error saving data', error);
    //Check if it has a validation error
    if(error.name === 'ValidationError'){
        const errors = {};
        Object.keys(error.errors).forEach((key) => {
            errors[key] = error.errors[key].message;
        });
        return res.status(400).json({ errors })
    }
    res.status(500).json({error:'faled to save data'});
}

});


//update a visitor
app.put('/visitors/:id', async(req,res) => {
    try{
        const {id} = req.params;
        const visitor = await Visitor.findByIdAndUpdate(id, req.body);
        //we cannot find any visitor in database
        if(!visitor){
            return res.status(404).json({message: `cannot find any visitor with ID ${id}`})
        }
        const updatedVisitor = await Visitor.findById(id);
        res.status(200).json(updatedVisitor);


    }catch (error) {
        res.status(500).json({message:error.message})
    }


})
// delete a visitor
 app.delete('/visitors/:id', async(req,res) => {
    try{
        const{id} = req.params;
        const visitor = await Visitor.findByIdAndDelete(id);
        if(!visitor){
            return res.status(404).json({message: `cannot find any visitor with ID ${id}`})
        }
        res.status(200).json(visitor);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
 })

mongoose.connect('mongodb+srv://admin:09122024API@api.8w8nmtk.mongodb.net/API?retryWrites=true&w=majority&appName=API')
.then(() => {
    app.listen(3000, () => {
        console.log('App is running on port 3000')
    })
    console.log('connected to MongoDB')
}).catch((error) => {
    console.log(error)
})
const shutdown = () => {
    server.close(() => {
      console.log('Process terminated');
      process.exit(0);
    });
  };
  
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);