const { Client } = require('pg')

const saveCar = async (car, scrapeRunId) => {
  const client = new Client()

  await client.connect()
  try {
    const carAttributes = JSON.stringify(car)
    const query = `INSERT INTO scraped_car_attributes
                (car_attributes, scrape_run_id)
                VALUES ('${carAttributes}', '${scrapeRunId}')`
    await client.query(query)
  } catch (error) {
    console.error('car not saved')
  } finally {
    await client.end()
  }
}

const saveScrapeRun = async (scrapeType) => {
  const client = new Client()

  await client.connect()
  try {
    const query = `INSERT INTO scrape_run_details
                (scrape_type)
                VALUES ('${scrapeType}') returning id`
    const res = await client.query(query)
    return res.rows[0].id
  } catch (error) {
    console.error('scrape run not saved')
    return null
  } finally {
    await client.end()
  }
}

module.exports = {
  saveCar,
  saveScrapeRun
}
