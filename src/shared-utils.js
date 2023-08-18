const T23_SM_PROVIDER='T23_SM_PROVIDER';

function readConfiguration(config, prefix){
    Object.keys(process.env).forEach(function(key) {
        if (key.startsWith(prefix)){
            if (process.env[key] && process.env[key].trim()!=''){
                var value=process.env[key].trim();
                console.log('-- env.'+key+' is '+truncador(value));                        
                //console.log('-- env.'+key+' is '+value);
                config[key]=value;
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
