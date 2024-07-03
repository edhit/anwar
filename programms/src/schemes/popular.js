const validator = require('./validator')

module.exports  = {
  type: "object",
  properties: {
    path_file: {
      type: "string",
      format: 'fileExist'
    },
    letter: {
      type: "string",
      format: 'isAlpha'
    },
    price: {
      type: "string",
      format: 'isAlpha'
    },
    type: {
      type: "string"
    },
    opinion: {
      type: "number"
    },
    rate: {
      type: "number"
    },
    file: {
      type: "string",
      format: 'isAlphanumeric'
    },
    yandex: {
      type: "object"
    }
  },
  required: [
    "path_file",
    "letter",
    "price",
    "type",
    "opinion",
    "rate",
    "file",
    "yandex"
  ],
  additionalProperties: false
}