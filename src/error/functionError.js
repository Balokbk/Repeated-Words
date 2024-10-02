export default function trhowError(error){
    if(error.code === 'ENOENT'){
        throw new Error('Cannot find the file')
    }else{
        return 'Application error'
    }
}