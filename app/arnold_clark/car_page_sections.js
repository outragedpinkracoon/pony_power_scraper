const cheerio = require('cheerio')

const productSummary = ($, term) => {
  return textOfSibling(
    $(`table.ac-product__summary th:contains('${term}')`)
  )
}

const techSpecs = ($, term) => {
  const html = cheerio.load(reactProps($).specification.technical)
  return textOfSibling(
    html(`th:contains('${term}')`)
  )
}

const reactProps = ($) => {
  return JSON.parse(
    // eslint-disable-next-line quotes
    $("div[data-react-class='vehicles/show/productPageContainer']")
      .attr('data-react-props'))
      .vehicle
}

const videoDataTable = ($, term) => {
  return textOfSibling(
    $(`#video_data_table .ac-product__summary dt:contains('${term}')`)
  )
}

const textOfSibling = (element) => {
  return element.next().text()
}

module.exports = {
  productSummary,
  techSpecs,
  reactProps,
  videoDataTable
}
