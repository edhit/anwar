const xlsx = require('json-as-xlsx');
const logger = require("./logger");

exports.jsonToEcxel = async function(data, file) {
    try {
        const columns = Object.keys(data[0]).map(value => {
            return {
                label: value,
                value: value
            }
        })

        const excel_file = [
            {
              columns: columns,
              content: data
            },
          ]

        const settings = {
            fileName: file
        }

        const download_path = `${__dirname.split('\\').slice(0, -2).join('\\')}\\uploads\\${file}.xlsx`
    
        xlsx(excel_file, settings, function () {
            logger.info("DOWNLOAD COMPLETE " + download_path)
        });
    } catch (error) {
        logger.error(error)
    }
}