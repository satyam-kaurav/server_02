const Minio = require("minio");
const multer = require("multer");
const uniqid = require("uniqid");

// Configuration for MinIO
const MINIO_ENDPOINT = process.env.ENDPOINT; // MinIO server endpoint
const MINIO_PORT = parseInt(process.env.MINIO_PORT, 10); // Convert port to number
const MINIO_USE_SSL = process.env.USESSL === "true"; // Convert USESSL to boolean
const MINIO_ACCESS_KEY = process.env.MINIO_ACCESS_KEY;
const MINIO_SECRET_KEY = process.env.MINIO_SECRET_KEY;
const BUCKET_NAME = process.env.BUCKET_NAME;

// Initialize MinIO client
const minioClient = new Minio.Client({
  endPoint: MINIO_ENDPOINT,
  port: MINIO_PORT,
  useSSL: MINIO_USE_SSL,
  accessKey: MINIO_ACCESS_KEY,
  secretKey: MINIO_SECRET_KEY,
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb
  },
});

// Utility function for uploading files to MinIO
const uploadFileToMinIO = async (file, folderName) => {
  const extension = file.originalname.split(".").pop();
  const uniqueFileName = `${uniqid()}.${extension}`;
  const params = {
    Bucket: BUCKET_NAME,
    Key: `${folderName}/${uniqueFileName}`,
    Body: file.buffer,
  };

  try {
    await minioClient.putObject(params.Bucket, params.Key, params.Body);
    return `${folderName}/${uniqueFileName}`;
  } catch (error) {
    throw error;
  }
};

// Utility function for deleting a file from MinIO
const deleteFileFromMinIO = async (fileUrl) => {
  const fileName = fileUrl.split("/").pop();
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
  };

  try {
    await minioClient.removeObject(params.Bucket, params.Key);
  } catch (error) {
    throw error;
  }
};

module.exports = { upload, uploadFileToMinIO, deleteFileFromMinIO };
