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
            // throw new Error('Password does not match!')
        } else {
            let result = await data.save();
            // console.log(`${data} user register data`)
            console.log(`${result}`)
            res.send('done');
        }
    }
    catch (err) {
        console.log(`$error txt >> ${err.message}`)
        res.send(err)
    }
})

app.get('/read/', async (req, res) => {
    let data = await employees.find();  // doesnt require schema
    res.send(data);
    res.end()
})

app.delete('/delete/:_id', async (req, res) => {
    console.log(req.params);
    let data = await employees.deleteOne(req.params)
    res.send(data);
})


app.put('/update/:_id', async (req, res) => {
    console.log(req.params);
    let data = await employees.updateOne(req.params, { $set: req.body })
    res.send(data)
})

app.listen(port);


// we can pass '_id' from params and body also for put and delete methods
// we usually pass 'id' through params for delete due to one parameter is enough to perform delete.