const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
require('sepia')

chai.use(chaiAsPromised)
chai.should()

const usedCarLinks = require('./used_car_links')

describe('Car Links', function() {
  describe('#retrieve()', function() {
    it('should return a list of 5 car urls', function() {
      return usedCarLinks.scrape().should.eventually.have.length(5)
    })
  })
})
