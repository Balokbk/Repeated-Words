function filterOccurrences(paragraph){
    return Object.keys(paragraph).filter((key) => paragraph[key] > 1)
}

function mountFileOutput(wordsList){
    let finalText = ''
    wordsList.forEach((paragraph, i) => {
        const dupes  = filterOccurrences(paragraph).join(', ')
        if(dupes){
            finalText += `Duplicate words in paragraph ${i+1}: ${dupes}\n`
        }
    });
    return finalText
}
export { mountFileOutput }