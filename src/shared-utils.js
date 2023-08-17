const T23_SM_PROVIDER='T23_SM_PROVIDER';

function readConfiguration(config, prefix){
    Object.keys(process.env).forEach(function(key) {
        if (key.startsWith(prefix)){
            if (process.env[key] && process.env[key].trim()!=''){
                if (key.includes('ACCESS_KEY') || key.includes('USER') || key.includes('PASS')) {
                    console.log('-- env.'+key+' is ****');                        
                } else {
                    console.log('-- env.'+key+' is '+process.env[key].trim());
                }
                config[key]=process.env[key].trim();
            } else {
                console.log('-- env.'+key+' is empty');
            }
        }
    });
}

function readSMConfiguration(){
    var smConfig={};
    readConfiguration(smConfig,'T23_SM_');
    if (!smConfig[T23_SM_PROVIDER]){
        smConfig=null;
    }
    return smConfig;
}

function truncador(secret){
    return (secret+'**').substring(0,2)+'***********';
}

function readFile(filePath){
    const fs = require('fs');
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (err) {
        console.error(err);
        throw new Error('Error reading file: '+filePath);
    }
}

exports.readConfiguration = readConfiguration;
exports.readSMConfiguration = readSMConfiguration;

exports.truncador = truncador;
exports.readFile = readFile;
