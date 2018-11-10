export default (req, res, next) => { 
    console.log('this is the request', req.body);
    req.headers['new-header'] = 'hello';
    next();
 }