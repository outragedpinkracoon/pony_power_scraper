const carLinks = require('./car_links')

const numberOfCars = 5
const root = 'https://www.arnoldclark.com/used-cars/search'

const url = () => {
  const params = [
    '?search_type=Used%20Cars',
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

const scrape = () => {
  return carLinks.retrieve(url(), numberOfCars)
}

module.exports = {
  scrape
}
