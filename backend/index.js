const express = require('express')
const bodyParser = require('body-parser')
const { Client } = require('pg')
const cors = require('cors')
const client = new Client({
    host: 'db',
    port: 5432,
    user: 'list',
    password: 'list',
})


const port = 4000
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.raw({ inflate: true, limit: '100kb', type: 'text/plain' }))

const main = async () => {
    await client.connect()

    const getAll = async () => (await client.query('SELECT * FROM list_items')).rows

    app.get('/', async (req, res) => {
        res.send(await getAll())
    })
    app.post('/',  async (req, res) => {
        await client.query('INSERT INTO list_items (name) VALUES ($1::text)', [req.body])
        res.send(await getAll())
    })
    app.delete('/', async (req, res) => {
        await client.query('DELETE FROM list_items WHERE name = $1', [req.body])
        res.send(await getAll())
    })
    
    
    app.listen(port, () => console.log('Express ready'))
}

main()