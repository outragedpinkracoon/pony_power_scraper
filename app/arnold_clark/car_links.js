const rp = require('request-promise')
const cheerio = require('cheerio')

const retrieve = (url, numberOfCars) => {
  return new Promise(function(resolve, reject) {
    const options = {
      uri: url,
      transform: (body) => {
        return cheerio.load(body)
      }
    }

    rp(options).then(($) => {
      const links = $('.ac-vehicle__title a')
      const top5results = []
      for (let index = 0; index < numberOfCars; index++) {
        const href = $(links[index]).attr('href')
        top5results.push(href)
      }
      return resolve(top5results)
    })
    .catch((err) => {
      reject(err)
    })
  })
}

module.exports = {
  retrieve
}
