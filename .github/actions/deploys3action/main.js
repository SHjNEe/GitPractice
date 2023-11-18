const core = require("@actions/core");
const github = require("@actions/github");
const exec = require("@actions/exec");
// const AWS = require("aws-sdk");
// const fs = require("fs");

async function run() {
  // Get input values from GitHub Actions inputs
  const bucketName = core.getInput("bucket-name", { required: true });
  const bucketRegion = core.getInput("bucket-region", { required: true });
  const distFolder = core.getInput("dist-folder", { required: true });
  //Upload files
  const s3Uri = `s3:://${bucketName}`;
  exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);

  // // Load AWS credentials and configure S3
  // const s3 = new AWS.S3({
  //   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  //   region: bucketRegion,
  // });

  // // Read the file to upload
  // const fileContent = fs.readFileSync(filePath);

  // // Define params for S3 upload
  // const params = {
  //   Bucket: bucketName,
  //   Key: s3ObjectName,
  //   Body: fileContent,
  // };

  // // Upload file to S3
  // await s3.upload(params).promise();
}

run();
