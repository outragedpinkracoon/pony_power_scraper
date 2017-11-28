const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
chai.should()

const carLinks = require('./car_links')
const urls = require('./urls')

describe('Car Links', function() {
  describe('#retrieve()', function() {
    it('should return a list of 5 car urls', function() {
      return carLinks.retrieve(
        urls.usedCarsIndex(), 5
      ).should.eventually.have.length(5)
    })
  })
})
