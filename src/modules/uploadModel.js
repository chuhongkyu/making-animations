import createModel from "./createModel";

async function uploadModel(file, scene) {
    const formData = new FormData();
    formData.append('file', file);
  
    try {
        const response = await fetch('http://localhost:3000/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const url = data.url;
        const fileName = data.fileName;
        createModel(url, fileName, scene);
    } catch (error) {
        console.error('Error converting file:', error);
    }
}

export default uploadModel;