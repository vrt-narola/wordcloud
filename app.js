const fs = require("fs");
const path = require("path");
const { Worker, parentPort, workerData, isMainThread } = require("worker_threads");
const { convertToWords, calculateAppearancePercent } = require("./wordCalculation");
global.baseDir = __dirname;

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

if (isMainThread) {
    const readFilesWithThreads = async () => {
        try {
            const fileDirPath = path.join(`${baseDir}/textFiles`);
            const files = fs.readdirSync(fileDirPath).filter(file => path.extname(file) == ".txt");

            const workerFilePromises = files.map(file => {
                return new Promise((resolve, reject) => {
                    const filePath = path.join(fileDirPath, file);
                    const worker = new Worker(__filename, {
                        workerData: { filePath }
                    });

                    worker.on('message', resolve);
                    worker.on('error', reject);
                    worker.on('exit', code => {
                        if (code !== 0) {
                            reject(new Error(`Worker is not running due to ${code}`));
                        }
                    });
                });
            });

            const textFiles = await Promise.all(workerFilePromises);
            const words = convertToWords(textFiles);
            const percents = calculateAppearancePercent(words);
            writeOutputToFile(percents);
        } catch (error) {
            console.error('Error - readFilesWithThreads:', error);
        }
    }
    readFilesWithThreads()
} else {
    fs.readFile(workerData.filePath, 'utf8', (error, fileData) => {
        if (error) {
            parentPort.postMessage(`Error reading file: ${error?.message ?? error}`);
        } else {
            parentPort.postMessage(fileData);
        }
    });
};