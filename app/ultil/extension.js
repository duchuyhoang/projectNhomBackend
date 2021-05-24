const path=require('path')


exports.getExtension=(filename) =>{
    var ext = path.extname(filename || '').split('.');
    return ext[ext.length - 1];
}