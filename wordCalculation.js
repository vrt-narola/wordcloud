const _ = require("lodash");
const sizeWithPercent = [
    { threshold: 60, size: 'Big' },
    { threshold: 30, size: 'Normal' },
    { threshold: 0, size: 'Small' },
];

const convertToWords = (textFiles = []) => {
    try {
        const text = textFiles.toString()
        return text.toLowerCase().match(/\b[\w'-]+\b/gi);
    } catch (error) {
        console.error("Error - countWords: ", error);
        throw new Error(error);
    }
};

const calculateAppearancePercent = (words = []) => {
    try {
        const wordCount = _.countBy(words);
        words = _.sortBy(Object.keys(wordCount), word => -wordCount[word]);
        const wordsWithPercent = [];
        const maxCount = wordCount[words[0]];
        words?.map(word => {
            if (!wordsWithPercent.some(wordData => wordData.word === word)/* && wordCount[word] > 1*/) { // If you want to ignore single item, you can enble the code.
                const percent = (wordCount[word] * 100) / maxCount;
                wordsWithPercent.push({
                    word,
                    counts: wordCount[word],
                    // percent, // If needed then return the percentage as well.
                    size: maxCount === wordCount[word] ? "Huge" : sizeWithPercent.find(obj => percent >= obj.threshold).size
                })
            }
        })
        return wordsWithPercent;

    } catch (error) {
        console.error("Error - calculateAppearancePercent: ", error);
        throw new Error(error);
    }
};

module.exports = {
    convertToWords,
    calculateAppearancePercent
}