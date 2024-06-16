const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const convert = require('fbx2gltf');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use('/converted', express.static(path.join(__dirname, 'server/upload/converted')));

const cleanFiles = (directory) => {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(`Failed: ${err}`);
      return;
    }

    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) {
          console.error(`Failed: ${err}`);
        } else {
          console.log(`Deleted: ${file}`);
        }
      });
    }
  });
};


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'server/upload/');
    fs.mkdirSync(uploadPath, { recursive: true });
    cleanFiles(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  const srcPath = file.path;
  const destDir = path.join(__dirname, 'server/upload/converted/');
  const destPath = path.join(destDir, path.basename(srcPath, path.extname(srcPath)) + '.glb');

  fs.mkdirSync(destDir, { recursive: true });
  cleanFiles(destDir);
  // console.log(`File uploaded to ${srcPath}`);
  // console.log(`Converting file to ${destPath}`);

  convert(srcPath, destPath, ['--khr-materials-unlit']).then(
    () => {
      // console.log(`File converted successfully to ${destPath}`);
      const publicPath = 'http://localhost:3000/converted/';
      const fileName = path.basename(destPath);
      res.json(
        { 
          url: publicPath,
          fileName : fileName,
        }
      );
    },
    error => {
      console.error("error:", error);
      res.status(500).send("Error converting file.");
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
