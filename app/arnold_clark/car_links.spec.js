const chai = require('chai')
require('chai')
require('sepia')

const expect = chai.expect

const carLinks = require('./car_links')

describe('car links', function() {
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

  describe('scraping nearly new cars', function() {
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

  describe('returning the total pages', function() {
    it('should return the correct number of total pages', async function() {
      const result = await carLinks.scrape('Nearly%20New%20Cars', 1)
      expect(result.total_pages).to.eq(5)
    })
  })

  describe('returning the current page', function() {
    describe('when no page is given', function() {
      it('should return the first page', async function() {
        const result = await carLinks.scrape('Nearly%20New%20Cars', 1)
        expect(result.current_page).to.eq(1)
      })
    })

    describe('when a page is given', function() {
      it('should return the given page', async function() {
        const result = await carLinks.scrape('Nearly%20New%20Cars', 1, 5)
        expect(result.current_page).to.eq(5)
      })
    })
  })

  describe('returning the total number of cars on a page', function() {
    describe('when no page is given', function() {
      it('should return the first page', async function() {
        const result = await carLinks.scrape('Nearly%20New%20Cars', 1)
        expect(result.total_cars).to.eq(24)
      })
    })

    describe('when a page is given', function() {
      it('should return the given page', async function() {
        const result = await carLinks.scrape('Nearly%20New%20Cars', 1, 5)
        expect(result.total_cars).to.eq(11)
      })
    })
  })

  describe('calculating the number of cars to return', function() {
    describe('when cars available are more than cars requested', function() {
      it('returns the requested number of cars', async function() {
        const result = await carLinks.scrape('Nearly%20New%20Cars', 5, 1)
        expect(result.car_data.length).to.eq(5)
      })
    })

    describe('when cars available equals cars requested', function() {
      it('returns the requested number of cars', async function() {
        const result = await carLinks.scrape('Nearly%20New%20Cars', 24, 1)
        expect(result.car_data.length).to.eq(24)
      })
    })

    describe('when cars available is less than cars requested', function() {
      it('returns the number of cars available', async function() {
        const result = await carLinks.scrape('Nearly%20New%20Cars', 24, 5)
        expect(result.car_data.length).to.eq(11)
      })
    })
  })
})
