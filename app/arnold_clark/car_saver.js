require('dotenv').config()

const { Client } = require('pg')

const client = new Client()
client.connect()

let query = `INSERT INTO scrape_run_details (scrape_type) VALUES ('nearly-new') returning id`

client.query(query, (err, res) => {
  console.log(err, res)
  console.log(res.rows[0])
  client.end()
})
