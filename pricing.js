function formatPrice(price) {
  return parseInt(price * 100) / 100
}

function calculateEmployerContribution(product, price, dollarsOff) {
  if (product.employerContribution.mode === 'dollar') {
    price = price - product.employerContribution.contribution
    return price
  } else {
    dollarsOff = price * (product.employerContribution.contribution / 100)
    price = price - dollarsOff
    return price
  }
}

function calculateVolLifePrice(price, dollarsOff, product, coverageLevels) {
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
  var discountedPrice = 0

  switch (product.type) {
    case 'volLife':
      price = calculateVolLifePrice(price, dollarsOff, product, coverageLevels)
      discountedPrice = calculateEmployerContribution(product, price, dollarsOff)
      return formatPrice(discountedPrice)
    case 'ltd':
      price = calculateLTDPrice(product, employee)
      discountedPrice = calculateEmployerContribution(product, price, dollarsOff)
      return formatPrice(discountedPrice)
    default:
      return 0
  }
}