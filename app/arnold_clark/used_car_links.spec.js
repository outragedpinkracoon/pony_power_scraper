const chai = require('chai')
require('chai')
require('sepia')

const expect = chai.expect

const usedCarLinks = require('./used_car_links')

describe('Car Links', function() {
  describe('#retrieve()', function() {
    it('should return a list of 5 used car urls', async function() {
      const expectedResults = [
        'https://www.arnoldclark.com/used-cars/dacia/sandero-stepway/1-5-dci-laureate-5dr/2016/ref/arnao-u-265664',
        'https://www.arnoldclark.com/used-cars/vauxhall/corsa/1-4-design-5dr/2016/ref/arnbg-u-99049',
        'https://www.arnoldclark.com/used-cars/citroen/c3-picasso/1-6-bluehdi-edition-5dr/2016/ref/arnez-u-13815',
        'https://www.arnoldclark.com/used-cars/vauxhall/corsa/1-4-ecoflex-sri-5dr/2016/ref/arndr-u-13623',
        'https://www.arnoldclark.com/used-cars/vauxhall/corsa/1-4-ecoflex-sri-5dr/2016/ref/arnfe-u-19944'
      ]
      const result = await usedCarLinks.scrape(5)
      expect(result.car_data).to.deep.eq(expectedResults)
      expect(result.total_pages).to.eq(7)
    })
  })
})
