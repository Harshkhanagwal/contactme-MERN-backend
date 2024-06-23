const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);

        req.body = parseBody
        next();

    } catch (err) {
        const msg = err.errors[0].message
        res.status(400).json({error : msg})
    }
}

module.exports = validate;
