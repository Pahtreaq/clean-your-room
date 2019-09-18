function formatPrice(price) {
  return parseInt(price * 100) / 100
}

function calculateEmployerContribution(product, price, dollarsOff) {
  if (product.employerContribution.mode === 'dollar') {
    price = price - product.employerContribution.contribution
  } else {
    dollarsOff = price * (product.employerContribution.contribution / 100)
    price = price - dollarsOff
  }
}

function CalculateVolLifePrice(price, product, coverageLevels) {
  for (var i = 0; i < coverageLevels.length; i++) {
    var coverageAmount = coverageLevels[i].coverage

    price += (coverageAmount / product.cost.costDivisor) * product.cost.price
  }
  return price
}

function calculateLTDPrice(product, employee) {
  var salaryPercentage = product.coveragePercentage / 100

  return ((employee.salary * salaryPercentage) / product.cost.costDivisor) * product.cost.price
}
module.exports.calculateProductPrice = function (product, employee, coverageLevels) {
  var price = 0
  var dollarsOff = 0
  var DiscountedPrice
  switch (product.type) {
    case 'volLife':
      price = CalculateVolLifePrice(price, dollarsOff, product, coverageLevels)
      DiscountedPrice = calculateEmployerContribution(product, price, dollarsOff)
      return formatPrice(DiscountedPrice)
    case 'ltd':
      price = calculateLTDPrice(product, employee)
      DiscountedPrice = calculateEmployerContribution(product, price, dollarsOff)
      return formatPrice(DiscountedPrice)
      return calculateLTDPrice(product, employee)
    default:
      return 0
  }
}