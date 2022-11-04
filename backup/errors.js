const errors = (msg,res) => {
    res.statusCode = 404;
    res.send(msg);
}

module.exports = {
    errors
};