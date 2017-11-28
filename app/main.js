require('sepia')

carBuilder = require('./arnold_clark/car_builder')
usedCarLinks = require('./arnold_clark/used_car_links')

usedCarLinks.scrape()
  .then((res) => {
      res.forEach((carUrl) => {
        carBuilder.scrape(carUrl)
          .then((res) => console.log(res))
          .catch((err) => console.log(err))
      })
    }
  )
  .catch((err) => console.log(err))
