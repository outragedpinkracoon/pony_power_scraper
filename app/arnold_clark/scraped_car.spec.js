const chai = require('chai')
require('sepia')

const expect = chai.expect

const scrapedCar = require('./scraped_car')

describe('Scraped Car', function() {
  describe('#retrieve()', function() {
    it('returns the correct car details', async function() {
      const url = 'https://www.arnoldclark.com/used-cars/citroen/c3-picasso/1-6-bluehdi-edition-5dr/2016/ref/arnez-u-13815'
      const expectedCarData = {
        'bodyType': 'Estate',
        'carUrl': 'https://www.arnoldclark.com/used-cars/citroen/c3-picasso/1-6-bluehdi-edition-5dr/2016/ref/arnez-u-13815',
        'colour': 'Black',
        'cost': {
          'price': 8798,
          'roadTax': 20
        },
        'engine': {
          'breakHorsePower': 100,
          'engineSize': 1.56,
          'fuelTankCapacity': 50,
          'fuel': 'Diesel',
          'mpg': '72.4'
        },
        'imageUrl': 'https://vcache.arnoldclark.com/imageserver/ADRHNZE6Z1-YUS1/800/f',
        'mileage': '9624',
        'make': 'Citroen',
        'model': 'C3 Picasso',
        'registration': 'SY16ZHD',
        'seats': 5,
        'turningCircle': 10,
        'year': 2016,
        'towing': {
          'maxTowingWeightBraked': 900,
          'maxTowingWeightUnbraked': 620,
          'minimumKerbWeight': 1420,
        }
      }
      let result = await scrapedCar.retrieve(url)
      expect(result).to.deep.eq(expectedCarData)
    })

    context('when the road tax is not applicable', function() {
      const url = 'https://www.arnoldclark.com/nearly-new-cars/vauxhall/corsa/1-4-design-5dr/2016/ref/arnay-u-101905'
      const expectedCarData = {
        'cost': {
          'price': 8698,
          'roadTax': 0
        }
      }
      it('returns the correct car details', async function() {
        let result = await scrapedCar.retrieve(url)
        expect(result).to.deep.include(expectedCarData)
      })
    })
  })
})

