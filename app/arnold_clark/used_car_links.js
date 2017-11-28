const rp = require('request-promise')
const cheerio = require('cheerio')

const run = (url) => {
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
      for (let index = 0; index < 5; index++) {
        const href = $(links[index]).attr('href')
        top5results.push(href)
      }
      return resolve(top5results)
    })
  })
}

const buildUrl = () => {
  const root = 'https://www.arnoldclark.com/used-cars/search?search_type=Used%20Cars'

  const params = [
    '&payment_type=cash',
    '&max_price=12000',
    '&location=Edinburgh%20EH17%2C%20UK',
    '&distance=100',
    '&photos_only=true',
    '&unreserved_only=true',
    '&transmission=Manual',
    '&mpg=50',
    '&mileage=50000',
    '&age=2',
    '&min_engine_size=1545',
    '&body_type%5B%5D=Hatchback',
    '&body_type%5B%5D=Estate',
    '&body_type%5B%5D=Saloon',
    '&body_type%5B%5D=SUV',
    '&body_type%5B%5D=People%20carrier',
    '&doors%5B%5D=5',
    '&sort_order=mileage'
  ]

  return `${root}${params.join('')}`
}

module.exports = {
  run, buildUrl
}

// run(buildUrl()).then((res) => console.log('hi'+res))
