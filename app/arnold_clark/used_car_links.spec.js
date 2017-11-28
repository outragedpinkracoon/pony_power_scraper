const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
chai.should()

const scraper = require('./used_car_links')
const url = scraper.buildUrl
const run = scraper.run

describe('Scraper', function() {
  describe('#run()', function() {
    it('should return a list of 5 car urls', function() {
      return run(url()).should.eventually.have.length(5)
    })
  })
})
