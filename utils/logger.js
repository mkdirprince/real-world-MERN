// console log info
const info = (...params) => {
  console.log(...params)
}


// console log errors
const error = (...params) => {
  console.error(...params)
}

module.exports = {
  info,
  error
}