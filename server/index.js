const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const convert = require('fbx2gltf');
const cors = require('cors');
const GIFEncoder = require('gifencoder'); //m1 주석처리
const { createCanvas, loadImage } = require('canvas'); //m1 주석처리

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/converted', express.static(path.join(__dirname, 'upload/converted')));
app.use('/gifs', express.static(path.join(__dirname, 'upload/gifs')));

const cleanFiles = (directory) => {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(`Failed: ${err}`);
      return;
    }
    for (const file of files) {
      const filePath = path.join(directory, file);
      if (file !== '.gitkeep') {
        fs.unlink(filePath, err => {
          if (err) {
            console.error(`Failed: ${err}`);
          } else {
            console.log(`Deleted: ${file}`);
          }
        });
      }
    }
  });
};

// fbx 파일 업로드 설정
const storageFbx = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'upload/');
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// 프레임 업로드 설정
const storageFrames = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'upload/frames/');
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const uploadFbx = multer({ storage: storageFbx });
const uploadFrames = multer({ storage: storageFrames });

app.post('/upload', uploadFbx.single('file'), (req, res) => {
  const file = req.file;
  const srcPath = file.path;
  const destDir = path.join(__dirname, 'upload/converted/');
  const destPath = path.join(destDir, path.basename(srcPath, path.extname(srcPath)) + '.glb');

  fs.mkdirSync(destDir, { recursive: true });

  convert(srcPath, destPath, ['--khr-materials-unlit']).then(
    () => {
      const publicPath = 'http://localhost:3000/converted/';
      const fileName = path.basename(destPath);
      res.json({
        url: publicPath,
        fileName: fileName,
      });
    },
    error => {
      console.error("Error:", error);
      res.status(500).send("Error converting file.");
    }
  );
});

app.post('/upload-frame', uploadFrames.single('frame'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }
  res.status(200).send('Frame uploaded successfully.');
});

app.get('/generate-gif', async (req, res) => {
  const framesDir = path.join(__dirname, 'upload/frames');
  const files = fs.readdirSync(framesDir).filter(file => file.endsWith('.jpg') || file.endsWith('.jpeg'));
  
  if (files.length === 0) {
    return res.status(400).send('No frames available to create GIF.');
  }

  const encoder = new GIFEncoder(500, 500);
  encoder.start();
  encoder.setRepeat(0);
  encoder.setDelay(100);
  encoder.setQuality(10);

  const canvas = createCanvas(500, 500);
  const ctx = canvas.getContext('2d');

  for (const file of files) {
    const filePath = path.join(framesDir, file);
    const img = await loadImage(filePath);
    ctx.drawImage(img, 0, 0, 500, 500);
    encoder.addFrame(ctx);
  }

  encoder.finish();
  const gifBuffer = encoder.out.getData();

  const gifPath = path.join(__dirname, 'upload/gifs/animation.gif');
  fs.writeFileSync(gifPath, gifBuffer);

  cleanFiles(framesDir);

  res.setHeader('Content-Type', 'image/gif');
  res.sendFile(gifPath);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
