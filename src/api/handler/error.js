
module.exports = (req, res, next, error) => {
    const status = 500;

    return res.status(status).json({ error: error });
}