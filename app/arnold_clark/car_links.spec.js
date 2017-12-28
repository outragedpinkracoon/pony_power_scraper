const chai = require('chai')
require('chai')
require('sepia')

const expect = chai.expect

const carLinks = require('./car_links')

describe('Car Links', function() {
  describe('Scraping used cars', function() {
    it('should return a list of 5 used car urls', async function() {
      const expectedResults = [
        'https://www.arnoldclark.com/used-cars/dacia/sandero-stepway/1-5-dci-laureate-5dr/2016/ref/arnao-u-265664',
        'https://www.arnoldclark.com/used-cars/vauxhall/corsa/1-4-design-5dr/2016/ref/arnbg-u-99049',
        'https://www.arnoldclark.com/used-cars/citroen/c3-picasso/1-6-bluehdi-edition-5dr/2016/ref/arnez-u-13815',
        'https://www.arnoldclark.com/used-cars/vauxhall/corsa/1-4-ecoflex-sri-5dr/2016/ref/arndr-u-13623',
        'https://www.arnoldclark.com/used-cars/vauxhall/corsa/1-4-ecoflex-sri-5dr/2016/ref/arnfe-u-19944'
      ]
      const result = await carLinks.scrape('Used%20Cars', 5)
      expect(result.car_data).to.deep.eq(expectedResults)
      expect(result.total_pages).to.eq(7)
    })
  })

  describe('Scraping nearly new cars', function() {
    it('should return a list of 5 nearly new car urls', async function() {
      const expectedResults = [
        'https://www.arnoldclark.com/nearly-new-cars/dacia/sandero/1-5-dci-ambiance-5dr/2017/ref/arnew-u-13527',
        'https://www.arnoldclark.com/nearly-new-cars/vauxhall/corsa/1-4-75-ecoflex-sri-5dr/2016/ref/arnfx-u-668135',
        'https://www.arnoldclark.com/nearly-new-cars/mg/mg3/1-5-vti-tech-3form-sport-5dr-start-stop/2017/ref/cc_d7kx8llkbakt7ne1',
        'https://www.arnoldclark.com/nearly-new-cars/vauxhall/corsa/1-4-ecoflex-sri-5dr/2017/ref/arnbj-u-62089',
        'https://www.arnoldclark.com/nearly-new-cars/dacia/sandero/1-5-dci-ambiance-5dr/2017/ref/arnas-u-56813'
      ]
      const result = await carLinks.scrape('Nearly%20New%20Cars', 5)
      expect(result.car_data).to.deep.eq(expectedResults)
      expect(result.total_pages).to.eq(5)
    })
  })

  describe('Returning the total pages', function() {
    it('should return the correct number of total pages', async function() {
      const result = await carLinks.scrape('Nearly%20New%20Cars')
      expect(result.total_pages).to.eq(5)
    })
  })
})
