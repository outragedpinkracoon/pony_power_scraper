const chai = require('chai')
require('chai')
require('sepia')

const expect = chai.expect

const nearlyNewCarLinks = require('./nearly_new_car_links')

describe('Car Links', function() {
  describe('#retrieve()', function() {
    it('should return a list of 5 nearly new car urls', async function() {
      const expectedResults = [
        'https://www.arnoldclark.com/nearly-new-cars/dacia/sandero/1-5-dci-ambiance-5dr/2017/ref/arnew-u-13527',
        'https://www.arnoldclark.com/nearly-new-cars/vauxhall/corsa/1-4-75-ecoflex-sri-5dr/2016/ref/arnfx-u-668135',
        'https://www.arnoldclark.com/nearly-new-cars/mg/mg3/1-5-vti-tech-3form-sport-5dr-start-stop/2017/ref/cc_d7kx8llkbakt7ne1',
        'https://www.arnoldclark.com/nearly-new-cars/vauxhall/corsa/1-4-ecoflex-sri-5dr/2017/ref/arnbj-u-62089',
        'https://www.arnoldclark.com/nearly-new-cars/dacia/sandero/1-5-dci-ambiance-5dr/2017/ref/arnas-u-56813'
      ]
      const result = await nearlyNewCarLinks.scrape()
      expect(result).to.deep.eq(expectedResults)
    })
  })
})
