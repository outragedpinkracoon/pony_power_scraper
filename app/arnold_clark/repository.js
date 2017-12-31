const { Client } = require('pg')

const saveSuccessfulCar = async (car, scrapeRunId) => {
  const client = new Client()

  await client.connect()
  try {
    const carAttributes = JSON.stringify(car)
    const query = `INSERT INTO scraped_car
                   (car_attributes, scrape_run_id)
                   VALUES ('${carAttributes}', '${scrapeRunId}')`
    await client.query(query)
  } catch (error) {
    throw error
  } finally {
    await client.end()
  }
}

const saveFailedCar = async (carUrl, scrapeRunId, errorMessage) => {
  const client = new Client()

  await client.connect()
  try {
    const query = `INSERT INTO failed_car
                   (car_url, scrape_run_id, error_message)
                   VALUES ('${carUrl}', '${scrapeRunId}', '${errorMessage}')`
    await client.query(query)
  } catch (error) {
    throw error
  } finally {
    await client.end()
  }
}

const saveScrapeRun = async (scrapeType) => {
  const client = new Client()

  await client.connect()
  try {
    const query = `INSERT INTO scrape_run
                   (scrape_type)
                   VALUES ('${scrapeType}') returning id`
    const res = await client.query(query)
    return res.rows[0].id
  } catch (error) {
    throw error
  } finally {
    await client.end()
  }
}

const finishScrapeRun = async (scrapeRunId) => {
  const client = new Client()

  await client.connect()
  try {
    const query = `UPDATE scrape_run
                   SET finished_at = current_timestamp
                   WHERE id = ${scrapeRunId}`
    await client.query(query)
  } catch (error) {
    throw error
  } finally {
    await client.end()
  }
}

module.exports = {
  finishScrapeRun,
  saveFailedCar,
  saveScrapeRun,
  saveSuccessfulCar
}
