function cleanWord(word){
    return word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
}

function verifyDupes(text){
    const wordsList = text.split(' ')
    const result = {}
    wordsList.forEach(word => {
        if(word.length >= 3){
            const cleanedWord = cleanWord(word)
            result[cleanedWord] = (result[cleanedWord] || 0) + 1
        }
    });
    return result
}

export function countWords(text){
    const paragraph = extractParagraph(text)
    const count = paragraph.flatMap((paragraph) =>{
        if(!paragraph) return []
        return verifyDupes(paragraph)
    })
    return count
}

function extractParagraph(text){
    return text.toLowerCase().split('\n')
}