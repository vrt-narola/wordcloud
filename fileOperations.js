const fs = require("fs");
const path = require("path");

const readFiles = () => {
    try {
        const fileDirPath = path.join(`${baseDir}/textFiles`);
        const files = fs.readdirSync(fileDirPath).filter(file => path.extname(file) == ".txt");

        return Promise.all(files.map(file => {
            const filePath = path.join(fileDirPath, file);
            return fs.promises.readFile(filePath, "utf-8", (error, fileData) => {
                if (error) throw new Error(error);
                return fileData
            });
        }))
    } catch (error) {
        console.error("Error - readFiles: ", error);
        throw new Error(error);
    }
};

const writeOutputToFile = (results) => {
    try {
        const outputFilePath = path.join(baseDir, 'words_categorization.txt');
        const fileContent = results.map(result => `${result.word}, ${result.counts}, ${result.size}`).join('\n');
        fs.writeFileSync(outputFilePath, fileContent, 'utf-8');
        console.log(`Results have been written to ${outputFilePath}`);
    } catch (error) {
        console.error("Error - writeOutputToFile: ", error);
        throw new Error(error)
    }
};

module.exports = {
    readFiles,
    writeOutputToFile
}
