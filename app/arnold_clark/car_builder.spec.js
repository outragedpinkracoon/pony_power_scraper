const chai = require('chai')
require('sepia')

const expect = chai.expect

const carBuilder = require('./car_builder')

describe('Car Builder', function() {
  describe('#scrape()', function() {
    it('returns the correct car details', async function() {
      const url = 'https://www.arnoldclark.com/used-cars/citroen/c3-picasso/1-6-bluehdi-edition-5dr/2016/ref/arnez-u-13815'
      const expectedCarData = {
        'bodyType': 'Estate',
        'carUrl': 'https://www.arnoldclark.com/used-cars/citroen/c3-picasso/1-6-bluehdi-edition-5dr/2016/ref/arnez-u-13815',
        'colour': 'Black',
        'engine': 1.56,
        'fuel': 'Diesel',
        'imageUrl': 'https://vcache.arnoldclark.com/imageserver/ADRHNZE6Z1-YUS1/800/f',
        'make': 'Citroen',
        'mileage': '9624',
        'model': 'C3 Picasso',
        'mpg': '72.4',
        'price': 8798,
        'roadTax': 20,
        'seats': 5,
        'year': 2016
      }
      let result = await carBuilder.scrape(url)
      expect(result).to.deep.eq(expectedCarData)
    })

    context('when the road tax is not applicable', function () {
      const url = 'https://www.arnoldclark.com/nearly-new-cars/vauxhall/corsa/1-4-design-5dr/2016/ref/arnay-u-101905'
      const expectedCarData = {
        'roadTax': 0,
      }
      it('returns the correct car details', async function () {
        let result = await carBuilder.scrape(url)
        expect(result).to.include(expectedCarData)
      })
    })
  })
})

