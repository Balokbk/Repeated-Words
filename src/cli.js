import fs from 'fs'
import path from 'path';
import trhowError from './error/functionError.js'
import { countWords } from './index.js';
import { mountFileOutput } from './helpers.js';
import { Command } from 'commander'
import chalk from 'chalk'

const program = new Command()

program.version(0.1).option('-t, --text <string>', 'The path of the file.txt that will be processed').option('-d, --destiny <string>', 'The path of the destiny file for the processed file').action((options) => {
    const {text, destiny} = options
    if(!text || !destiny){
        console.log(chalk.hex('#FFA500')('Error: insert a path or a destiny'))
        program.help()
        return
    }

    const textPath = path.resolve(text)
    const destinyPath = path.resolve(destiny)

    try{
        processArchive(textPath, destinyPath)
        console.log(chalk.hex('#00FF44')('Process completed successfully, check the destiny folder!'))
    }catch(error){
        console.log(chalk.hex('#FF0000')('An error occurred :( ',error))
    }
})

program.parse()

function processArchive(text, destiny){   
    fs.readFile(text, 'utf-8',(error, txt) =>{
        try{
            if(error) throw error
            const result = countWords(txt)
            createAndSaveArchive(result, destiny)
        }catch(error){
            trhowError(error)
        }
    })
}
    
async function createAndSaveArchive(wordsList, path = 'c:\Users\User\Downloads', docName = 'text'){
    const newDoc = `${path}/${docName}.txt`
    const wordsText = mountFileOutput(wordsList)
    try{
        await fs.promises.writeFile(newDoc, wordsText)
    }catch(error){
        throw error
    }
}