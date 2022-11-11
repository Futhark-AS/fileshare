const HTTP_CODES = require("http-status-enum");
// Used to get read-only SAS token URL
const generateReadOnlySASUrl = require("../azure-storage-blob-sas-url.js");
module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");
    context.log(req)

  // User name is the container name
  const containerName = req.query?.username;
  if (!containerName) {
    context.res.body = `username is not defined`;
    context.res.status = HTTP_CODES.BAD_REQUEST;
  }

  // `filename` is required property to use multi-part npm package
  const fileName = req.query?.filename;
  if (!fileName) {
    context.res.body = `filename is not defined`;
    context.res.status = HTTP_CODES.BAD_REQUEST;
  }

  // get storage client
  // get connection string to Azure Storage from environment variables
  // Replace with DefaultAzureCredential before moving to production
  const storageConnectionString = process.env.AzureWebJobsStorage;
  if (!storageConnectionString) {
    context.res.body = `AzureWebJobsStorage env var is not defined - get Storage Connection string from Azure portal`;
    context.res.status = HTTP_CODES.BAD_REQUEST;
  }

  try {
    // Get SAS token
    const sasInfo = await generateReadOnlySASUrl(
      storageConnectionString,
      containerName,
      fileName
    );

    context.res.body = sasInfo;
  } catch (err) {
    context.log.error(err.message);
    context.res.body = { error: `${err.message}` };
    context.res.status = HTTP_CODES.INTERNAL_SERVER_ERROR;
  }
  return context.res;
};
