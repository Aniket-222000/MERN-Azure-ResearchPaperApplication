const { BlobServiceClient } = require('@azure/storage-blob');
const { azure } = require('../config');

const blobServiceClient = BlobServiceClient.fromConnectionString(
  azure.connectionString
);
const containerClient = blobServiceClient.getContainerClient(
  azure.containerName
);

// ensure container exists
async function ensureContainer() {
  const exists = await containerClient.exists();
  if (!exists) await containerClient.create();
}

async function uploadFile(buffer, originalName) {
  await ensureContainer();
  const blobName = `${Date.now()}‑${originalName}`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  await blockBlobClient.uploadData(buffer);
  return blockBlobClient.url;
}

module.exports = { uploadFile };
