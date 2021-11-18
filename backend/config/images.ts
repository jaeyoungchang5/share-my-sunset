import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

const username: string = process.env.MONGOATLAS_USERNAME;
const password: string = process.env.MONGOATLAS_PASSWORD;
const cluster: string = process.env.MONGOATLAS_CLUSTER;

const url: string = `mongodb+srv://${username}:${password}@${cluster}`;

const storage = new GridFsStorage({
    url: url,
    file: (req, file) => {
        return {
            bucketName: 'images00',
            filename: new Date().toISOString() + file.originalname
        }
    }
});
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './uploads');
//     },
//     filename: function(req, file, cb) {
//         cb(null, new Date().toISOString() + file.originalname);
//     }
// });

export const upload = multer({
    storage: storage
});