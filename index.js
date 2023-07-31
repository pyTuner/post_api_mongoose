const express = require('express');
require('./config');
const employees = require('./employee');

const port = 3000;
const app = express();

app.use(express.json())  // to convert request data into json format

app.post('/create', async (req, res) => {
    try {
        let data = new employees(req.body);
        if (data.passwd != data.cpasswd) {
            res.status(422).json({ error: "Missmatch password" })
            // throw new Error('Password does not match!')    // exception should not throw in API, It break the flow
        } else if (data.passwd.length > 26){
            res.status(412).json({'error': "password lenght maximize!"});        
        }   
        else {
            let result = await data.save();
            // console.log(`${data} user register data`)
            console.log(`${result}`)
            res.status(200).json(result)
            res.end();
        }
    }
    catch (err) {
        console.log(`$error txt>> ${err.message}`)
        res.status(412).json({'error': err.message});
        res.end();
    }
})

app.get('/read/:key', async (req, res) => {
    try {
        console.log(req.params.key)
        let data = await employees.find(
            {
                "$or":[
                    { "fname" :{$regex:req.params.key}},
                    { "mname" :{$regex:req.params.key}},
                    { "lname" :{$regex:req.params.key}},
                    { "email" :{$regex:req.params.key}},
                    { "mobno" :{$regex:req.params.key}},
                    { "subscription" :{$regex:req.params.key}}
                ]
            }
            );  // doesnt require schema
        res.status(200).json(data);
    } catch (err) {
        console.log(`error msg>> ${err}`);
        res.send(err);
        res.end();
    }
})

app.delete('/delete/:_id', async (req, res) => {
    console.log(req.params);
    try {
        let data = await employees.deleteMany()
        res.send(data);
    } catch (err) {
        console.log(`error txt>> ${err}`);
        res.send(err);
        res.end();
    }
})


app.put('/update/:_id', async (req, res) => {
    console.log(req.params);
    try {
        let data = await employees.updateOne(req.params, { $set: req.body },  { runValidators: true })
        res.send(data);
    } catch (err) {
        console.log(`error txt>> ${err}`);
        res.send(err);
        res.end();
    }
})

app.listen(port);


// we can pass '_id' from params and body also for put and delete methods
// we usually pass 'id' through params for delete due to one parameter is enough to perform delete.