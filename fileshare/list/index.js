// Used to get read-only SAS token URL
const {
    BlobServiceClient,
  } = require ("@azure/storage-blob");

module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  // User name is the container name
  const containerName = req.query?.username;
  if (!containerName) {
    context.res.body = `username is not defined`;
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
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      storageConnectionString
    );

    // get container client
    const containerClient = blobServiceClient.getContainerClient(containerName);


    // get all blob sas urls
    const blobs = [];
    for await (const blob of containerClient.listBlobsFlat()) {
      blobs.push({
        name: blob.name,
      });
    }

    context.res.body = blobs;

  } catch (err) {
    context.log.error(err.message);
    context.res.body = { error: `${err.message}` };
    context.res.status = HTTP_CODES.INTERNAL_SERVER_ERROR;
  }

  return context.res;
};
