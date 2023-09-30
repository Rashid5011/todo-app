// import cloudinary from "cloudinary";

// cloudinary.config({
//   cloud_name: "dgdr92ooy",
//   api_key: "551111537316754",
//   api_secret: "mQVNNF0ZKtepIdWmXXY6Uvauhec",
// });

// export default cloudinary;
// src/cloudinaryConfig.js
import cloudinary from "cloudinary-core";

const cl = new cloudinary.Cloudinary({
  cloud_name: dgdr92ooy,
  api_key: "551111537316754",
  api_secret: "mQVNNF0ZKtepIdWmXXY6Uvauhec",
});

export default cl;
