exports.isAdmin = (req, res, next) => {
    if (req.user.isAdmin)
        return next();
    res.status(400).json({
        'message': 'access denied'
    });
}
exports.isModerator = (req, res, next) => {
    if (req.user.isModerator)
        return next();
    res.status(400).json({
        'message': 'access denied'
    });
}