usedCarLinks = require('./arnold_clark/used_car_links')

usedCarLinks.scrape()
  .then((res) => console.log(res))
  .catch((err) => console.log(err))
