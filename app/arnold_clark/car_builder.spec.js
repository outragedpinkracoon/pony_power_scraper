const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
require('sepia')

chai.use(chaiAsPromised)
chai.should()

const carBuilder = require('./car_builder')

describe('Car Builder', function() {
  describe('#scrape()', function() {
    it('returns the correct car details', function() {
      const url = 'https://www.arnoldclark.com/used-cars/vauxhall/corsa/1-4-ecoflex-sri-5dr/2016/ref/arnbn-u-15074'
      const expectedCarData = {
        'bodyType': 'Hatchback',
        'colour': 'Red',
        'engine': 1.40,
        'fuel': 'Petrol',
        'imageUrl': 'https://vcache.arnoldclark.com/imageserver/AHRKNKB6N6-NUD1/800/f',
        'make': 'Vauxhall',
        'mileage': '8915',
        'model': 'Corsa',
        'mpg': '55.4',
        'price': 8898,
        'roadTax': 30,
        'seats': 5,
        'year': 2016,
        'carUrl': 'https://www.arnoldclark.com/used-cars/vauxhall/corsa/1-4-ecoflex-sri-5dr/2016/ref/arnbn-u-15074'
      }

      return carBuilder.scrape(url).should.eventually.deep.eq(expectedCarData)
    })
  })

  context('when the road tax is not applicable', function() {
    const url = 'https://www.arnoldclark.com/nearly-new-cars/vauxhall/corsa/1-4-design-5dr/2016/ref/arnay-u-101905'
    const expectedCarData = {
      'roadTax': 0,
    }
    it('returns the correct car details', function() {
      return carBuilder.scrape(url).should.eventually.include(expectedCarData)
    })
  })
})

