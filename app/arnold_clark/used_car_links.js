const carLinks = require('./car_links')

const numberOfCars = 5
const root = 'https://www.arnoldclark.com/used-cars/search'

const url = () => {
  const params = [
    '?search_type=Used%20Cars',
    '&payment_type=cash',
    '&max_price=10000',
    '&location=Edinburgh%20EH17%2C%20UK',
    '&distance=100',
    '&photos_only=true',
    '&unreserved_only=true',
    '&transmission=Manual',
    '&mpg=50',
    '&mileage=10000',
    '&age=2',
    '&min_engine_size=1345',
    '&body_type%5B%5D=Hatchback',
    '&body_type%5B%5D=Estate',
    '&body_type%5B%5D=Saloon',
    '&body_type%5B%5D=SUV',
    '&body_type%5B%5D=People%20carrier',
    '&doors%5B%5D=5',
    '&seats%5B%5D=4',
    '&seats%5B%5D=5',
    '&seats%5B%5D=7',
    '&sort_order=price'
  ]

  return `${root}${params.join('')}`
}

const scrape = () => {
  return carLinks.retrieve(url(), numberOfCars)
}

module.exports = {
  scrape
}