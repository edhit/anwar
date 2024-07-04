module.exports  = {
  type: "object",
  properties: {
    path_file: {
      type: "string",
      format: 'fileExist'
    },
    words: {
      type: "array",
      format: 'arrayNotEmpty'
    },
    file: {
      type: "string",
      format: 'isAlphanumeric'
    }
  },
  required: [
    "path_file",
    "words",
    "file",
  ],
  additionalProperties: false
}