const path = require('path');
const fse = require('fs-extra');

const files = [
    'README.md',
    'LICENSE',
];

Promise.all(files.map(file => copyFile(file))).then(() => createPackageFile());

async function copyFile(file) {
    const buildPath = resolveBuildPath(file);
    await new Promise(resolve => {
        fse.copy(file, buildPath, (err) => {
            if (err)
                throw err;
            resolve();
        });
    });
    return console.log(`Copied ${file} to ${buildPath}`);
}

function resolveBuildPath(file) {
    return path.resolve(__dirname, '../dist/', path.basename(file));
}

async function createPackageFile() {
    const data = await new Promise((resolve) => {
        fse.readFile(path.resolve(__dirname, '../package.json'), 'utf8', (err, data) => {
            if (err)
                throw err;
            resolve(data);
        });
    });
    let packageData = JSON.parse(data);
    const { 
        author,
        name,
        version,
        description,
        keywords,
        repository,
        license,
        bugs,
        homepage,
        peerDependencies,
        dependencies,
    } = packageData;

    const minimalPackage = {
        name,
        author,
        version,
        description,
        main: './index.js',
        typings: './',
        keywords,
        repository,
        license,
        bugs,
        homepage,
        peerDependencies,
        dependencies,
    };
    return new Promise((resolve) => {
        const buildPath = path.resolve(__dirname, '../dist/package.json');
        const data_1 = JSON.stringify(minimalPackage, null, 2);
        fse.writeFile(buildPath, data_1, (err) => {
            if (err)
                throw (err);
            console.log(`Created package.json in ${buildPath}`);
            resolve();
        });
    });
}
