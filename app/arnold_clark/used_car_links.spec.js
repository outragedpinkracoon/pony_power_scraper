const chai = require('chai')
require('chai')
require('sepia')

const expect = chai.expect

const usedCarLinks = require('./used_car_links')

describe('Car Links', function() {
  describe('#retrieve()', function() {
    it('should return a list of 5 car urls', async function() {
      const expectedResults = [
        'https://www.arnoldclark.com/nearly-new-cars/mg/mg3/1-5-vti-tech-3style-5dr-start-stop/2017/ref/arnfz-u-18892',
        'https://www.arnoldclark.com/nearly-new-cars/vauxhall/corsa/1-4-design-5dr/2016/ref/arnay-u-101905',
        'https://www.arnoldclark.com/used-cars/citroen/c3-picasso/1-6-bluehdi-edition-5dr/2016/ref/arnez-u-13815',
        'https://www.arnoldclark.com/used-cars/vauxhall/corsa/1-4-ecoflex-sri-5dr/2016/ref/arnbn-u-15074',
        'https://www.arnoldclark.com/nearly-new-cars/dacia/sandero/1-5-dci-ambiance-5dr/2017/ref/cc_j3l0u689clo9else'
      ]
      const result = await usedCarLinks.scrape()
      expect(result).to.deep.eq(expectedResults)
    })
  })
})
