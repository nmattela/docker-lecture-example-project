const express = require('express')
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb')
const mongoose = require('mongoose')


const port = 4000
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const listItemSchema = new mongoose.Schema({
    name: { type: String, required: true }
})
const ListItem = mongoose.model('ListItem', listItemSchema)

app.get('/', async (req, res) => {
    res.send(await ListItem.find())
})
app.post('/',  async (req, res) => {
    const listItem = new ListItem({ name: req.body })
    await listItem.save()
    res.send('OK')
})
app.delete('/', (req, res) => {
    ListItem.findOneAndDelete({ name: req.body })
    res.send('OK')
})

mongoose.connect('mongodb://list:list@mongo:27017/list')
mongoose.connection.once('open', () => console.log('MongoDB ready'))
app.listen(port, () => console.log('Express ready'))