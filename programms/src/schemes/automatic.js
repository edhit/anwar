module.exports  = {
  type: "object",
  properties: {
    path_file: {
      type: "string",
      format: 'fileExist'
    },
    actions: {
      type: "number",
      // format: 'arrayNotEmpty'
    },
    file: {
      type: ["string", "number"],
      format: 'fileName'
    },
  },
  required: [
    "path_file",
    "actions",
    "file",
  ],
  additionalProperties: false
}