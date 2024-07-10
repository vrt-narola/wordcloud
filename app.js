global.baseDir = __dirname;
const { readFiles, writeOutputToFile } = require("./fileOperations");
const { calculateAppearancePercent, convertToWords } = require("./wordCalculation");

const wordsWithPercent = async () => {
    try {
        const textFiles = await readFiles();
        const words = convertToWords(textFiles);
        const percents = calculateAppearancePercent(words);
        writeOutputToFile(percents);
    } catch (error) {
        console.error("Error - wordsWithPercent: ", error);
        throw new Error(error);
    }
}

wordsWithPercent();