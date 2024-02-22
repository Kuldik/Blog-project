import { validationResult } from 'express-validator';

export default (req, res, next) => {
    const errors = validationResult(req);
    if (errors) {
        res.status(400).json(errors);
    } else {
        next();
    }
}