// Used to get read-only SAS token URL
const {
    BlobSASPermissions,
    BlobServiceClient,
    SASProtocol,
  } = require ("@azure/storage-blob");

/**
 * Utility method for generating a secure short-lived SAS URL for a blob.
 * To know more about SAS URLs, see: https://docs.microsoft.com/en-us/azure/storage/common/storage-sas-overview
 * @connectionString connectionString - string
 * @param containerName - string (User's alias)
 * @param filename - string
 */
module.exports = generateReadOnlySASUrl = async (
    connectionString,
    containerName,
    filename
  ) => {

    // get storage client
    const blobServiceClient = BlobServiceClient.fromConnectionString(
        connectionString
    );

    // get container client
    const containerClient = blobServiceClient.getContainerClient(
        containerName
    );

    // connect to blob client
    const blobClient = containerClient.getBlobClient(filename);

    // Best practice: create time limits
    const SIXTY_MINUTES = 60 * 60 * 1000;
    const NOW = new Date();

    // Create SAS URL
    const accountSasTokenUrl = await blobClient.generateSasUrl({
      startsOn: NOW,
      expiresOn: new Date(new Date().valueOf() + (SIXTY_MINUTES)),
      permissions: BlobSASPermissions.parse("r"), // Read only permission to the blob
      protocol: SASProtocol.HttpsAndHttp, // Only allow HTTPS access to the blob
    });
    return {
        accountSasTokenUrl, 
        storageAccountName: blobClient.accountName
    };
  };