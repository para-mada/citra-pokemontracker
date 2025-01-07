import fs from 'fs'
import axios from 'axios'

const os = require('os')

const FormData = require('form-data');

export const watchSave = function (FILE_NAME) {
    if (!fs.existsSync(FILE_NAME)) {
        console.log(FILE_NAME)
        console.log('file cannot be read')
        return;
    }
    fs.watchFile(FILE_NAME, {
        bigint: true,
        persistent: false,
        interval: 5000
    }, () => {
        const formData = new FormData();
        formData.append('file', fs.createReadStream(FILE_NAME), {
            filename: os.userInfo().username
        });
        axios.post('http://127.0.0.1:8000/uploadfile/', formData, {
            headers: {
                ...formData.getHeaders(),  // Añade los encabezados necesarios para multipart/form-data
            },
        }).then(() => console.log('succeeded')).catch(() => console.error('failed'))
    })
}
export const stopWatching = function () {
    return fs.unwatchFile(process.env.SAVE_FILE)
}