if(process.env.NODE_ENVY== 'production'){
    module.exports=require('./prod');
}else {
    module.exports = require('./dev');
}