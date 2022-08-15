import path from 'path';
import fs from 'fs';
import logger from '../util/logger';

let Routes: any[] = [];

fs
.readdirSync(path.join(__dirname, '.'), { withFileTypes: true })
.filter((dirent: any) => dirent.isDirectory())
.forEach((directory) => {
    const fullpath = path.join(__dirname, directory.name);
    return fs.readdirSync(fullpath)
        .filter((file: string) => (file.endsWith('route.ts') || file.endsWith('route.js')))
        .forEach((file: string) => {
            logger.debug(`including routes from ${file}`);
            Routes = [...Routes, ...require(path.join(fullpath, file)).default ]
        })
});

export default Routes;