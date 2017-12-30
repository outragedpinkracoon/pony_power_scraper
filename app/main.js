require('dotenv').config()
require('sepia')

const { Client } = require('pg')

const scrapedCar = require('./arnold_clark/scraped_car')
const carLinks = require('./arnold_clark/car_links')

const run = async () => {
  scrapeCars('Used%20Cars', 'used')
  scrapeCars('Nearly%20New%20Cars', 'nearly-new')
}

const scrapeCars = async (searchType, scrapeType) => {
  const data = await carLinks.scrape(searchType, 2)
  const scrapeRunId = await saveScrapeRun(scrapeType)
  if (scrapeRunId == null) {
    return
  }
  data.car_data.forEach((carUrl) => {
    processCar(carUrl, scrapeRunId)
  })
}

const processCar = async (carUrl, scrapeRunId) => {
  try {
    const car = await scrapedCar.retrieve(carUrl)
    if (car == null) return
    saveCar(car, scrapeRunId)
    console.log('car saved', carUrl)
  } catch (error) {
    console.error('could not process car:', carUrl)
  }
}

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

run()

