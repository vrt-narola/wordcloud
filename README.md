# wordcloud

## Installation Process

1. Clone the repository:

  `git clone https://github.com/vrt-narola/wordcloud.git`

2. Install the dependencies:

`npm install`

3. Run the project:

`node app.js`

## Explanation:

We have used worker threads to process multiple text files concurrently, extract words from them, calculate word frequencies, categorize words based on their appearance percentage, and then write the results to a file.

### Main Thread Logic (isMainThread):

- Defines an async function readFilesWithThreads to handle reading multiple text files concurrently. Retrieves a list of .txt files from the textFiles directory. Creates a worker thread for each file, passing the file path as workerData. Each worker thread reads its assigned file and sends back its content.

- The main thread awaits all worker threads to complete, then processes the combined text content, extracts words from the text using a regex pattern.
calculateAppearancePercent: Calculates word frequencies, sorts them, and categorizes them based on their appearance percentage. Finally, calls writeOutputToFile to write the categorized words to a file.

### Worker Thread Logic:

- Each worker thread reads its assigned file using fs.readFile. Sends the file content back to the main thread via parentPort.postMessage.

### Word Calculation Functions:

- `convertToWords` Converts text data into an array of words using a regex pattern.
- `calculateAppearancePercent` Calculates the appearance percentage of each word, categorizes them into sizes (Huge, Big, Normal, Small), and returns an array of objects containing word, counts, and size.

## Sample Input files content:
- File1.txt: `apple banana apple orange banana apple peach banana apple pear orange apple banana orange apple grape banana apple`
- File2.txt: `banana orange apple grape pear orange apple banana orange grape apple pear orange banana apple grape peach banana apple`
- File3.txt: `apple orange banana orange banana apple pear peach orange apple banana orange apple banana grape pear apple`
- File4.txt: `grape apple grape banana orange apple pear banana apple orange grape peach apple banana grape orange apple banana orange`
- File5.txt: `orange apple grape banana orange pear grape apple peach banana orange grape apple banana orange apple grape peach banana`

## Output file:
apple, 26, Huge  
banana, 21, Big  
orange, 19, Big  
grape, 13, Normal  
pear, 7, Small  
peach, 6, Small
