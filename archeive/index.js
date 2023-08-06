const express = require('express');
require('../config');                                    // db connection
const alerts = require('./alerts');                      // schema model
const mongoose = require('mongoose')

const app = express();
const port = 3000;                                       // defined port number

app.use(express.json());

app.post('/post', async (req, res) => {
    try {
        let data = await new alerts(req.body);
        let result = await data.save();
        res.status(200).json(result);
    } catch (err) {
        res.status(412).json({ 'error': err.message })
    }
})

app.get('/get', async (req, res) => {
    try {
        let data = await alerts.find({_id: {$in:req.query._id}})
        // res.send(JSON.stringify(req.headers))
        res.status(200).json(data);
    } catch (err) {
        res.status(412).json({ 'error': err.message });
    }
})

app.put('/put/:_id', async (req, res) => {
    try {
        let data = await alerts.updateOne(req.params, { $set: req.body }, { runValidators: true });
        res.status(200).json(data);
    } catch (err) {
        res.status(412).json({ 'error': err.message });
    }
})

app.put('/putmany/', async (req, res) => {
    try {
        // let isArchive = alerts.
        // let data = await alerts.updateMany({ _id: { $in: req.query._id } }, { $set: { "isArchive": !true } });
        res.send(JSON.stringify(req.headers))
        // res.send(data);
    } catch (err) {
        res.status(412).json({ 'error': err.message })
    }
})


app.put('/putbyid_toggle', async (req, res) => {
    try {
        let objectId = []
        if (!req.query._id) {
            objectId = req.body._id;
            // res.send(objectId);
        } else {
            objectId.push(req.query._id)
            // res.send(objectId);
        }

        let isArchive = await alerts.aggregate([{ $project: { "_id": 1, "isArchive": 1 } }, { $match: { "_id": new mongoose.Types.ObjectId("601c52934b5bf31d14731410") } }, { $sort: { "_id": -1 } }])
        res.status(200).json({ "objectId": objectId[0], "isArchive": isArchive })



    } catch (err) {
        res.status(412).json({ 'error': err.message })
    }

})

app.put('/isarchive', async (req, res) => {
    try {
        let objectId = [];
        if (!req.query._id) {
            objectId = req.body._id;
            // res.send(objectId);
        } else {
            objectId.push(req.query._id)
            // res.send(objectId);
        }
        let data = await alerts.updateMany({ "_id": { $in: objectId }},{ $set: { "isRead": true } })
        res.status(200).json(data);
        // res.send(objectId)
    } catch (err) {
    res.status(412).json({ 'error': err.message });
    console.log(err)
}
})

app.delete('/delete/:_id', async (req, res) => {
    try {
        let data = await alerts.deleteOne(req.params);
        res.status(200).json(data);
    } catch (err) {
        res.status(412).json({ 'error': err.message });
    }
})

app.delete('/deletemany/:_id', async (req, res) => {
    try {
        let data = await alerts.deleteMany(req.params);
        res.status(200).json(data);
    } catch (err) {
        res.status(412).json({ 'error': err.message });
    }
})

app.listen(port);