const swaggerAutogen = require('swagger-autogen')();
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');

/**
 * swagger-autogen docs: https://www.npmjs.com/package/swagger-autogen
 */
module.exports = (
    options = { 
        apiName: '',
        host: '',
        schemes: [''],
        swaggerSpecFilePath: '', 
        endpointsFiles: [''],
        docsUrl: ''
    }
) => {
    return async (req, res, next) => {
        if (req.url === '/') {
            try {
                const doc = {
                    info: {
                        title: options.apiName
                    },
                    host: options.host,
                    schemes: options.schemes
                };
                await swaggerAutogen(options.swaggerSpecFilePath, options.endpointsFiles, doc);
                fs.readFile(options.swaggerSpecFilePath, 'utf8', (err, data) => {
                    if (err) {
                        throw err;
                    }
                    const swaggerDocument = JSON.parse(data);
                    req.app.use(
                        options.docsUrl,
                        swaggerUi.serve,
                        swaggerUi.setup(swaggerDocument, { explorer: true })
                    );
                    next();
                });
            } catch(error) {
                console.log(error);
                next();
            }
        } else {
            next();
        }
    }
}