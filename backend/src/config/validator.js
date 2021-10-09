const { body } = require('express-validator')

exports.createUser = [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
];

exports.signin = [
    body('email', 'Enter a valid email').isEmail(),
    body('password','Password can not be blank!').isLength({ min : 1 })
];

exports.createNote = [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({min:5}),
    body('tag', 'tag must be atleast 3 characters').isLength({ min: 3 }),
];