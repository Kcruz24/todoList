
module.exports.catchAsyncErrors = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}