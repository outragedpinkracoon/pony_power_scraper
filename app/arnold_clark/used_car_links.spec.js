const chai = require('chai')
const expect = chai.expect

const scraper = require('./used_car_links')
const run = scraper.run
const usedCarUrl = scraper.buildUrl()

describe('Scraper', function() {
  describe('#run()', function() {
    it('should return a list of 5 car urls', function(done) {
      run(usedCarUrl, function(carUrls) {
        expect(carUrls.length).to.eq(5)
        done()
      })
    })
  })
})
