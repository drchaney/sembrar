const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET
const { createUser, checkUserByEmail, loginUser } = require('../db');

// GET /api/users/
usersRouter.get('/', async (req, res, next) => {
    try {
        res.send({
            name: 'UsersRouteSuccessful',
            message: '/api/users/ is working correctly'});
    } catch (error) {
        next(error)
    }
})

// GET /api/users/register
usersRouter.post('/register', async (req, res, next) => {
    try {
        const {email, password} = req.body
        const isUser = await checkUserByEmail(email)
        if (isUser) {
            res.status(401).send({
                name: 'EmailExistsError',
                message: 'This email already exists'
            });
        } else if (!email.includes("@") || (!email.includes("."))) {
            res.status(401).send({
                name: 'InvalidEmailError',
                message: 'Email is of an invalid format'
            })
        } else if (password.length < 8) {
            res.status(401).send({
                name: 'PasswordLengthError',
                message: 'Password Too Short!'
        });
        } else {
            const user = await createUser( {email, password} );
            if (!user) {
                next({
                    name: 'RegistrationError',
                    message: 'Registration unsuccessful. Please try again.',
            });
            } else {
                const token = jwt.sign({id: user.id, email: user.email}, JWT_SECRET, { expiresIn: '1w' });
                res.send({ user, message: "Welcome to Sembrar!  You registered successfully!", token });
            }
        } 
    } catch (error) {
      next(error)
    }
})

// GET /api/users/login
usersRouter.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(401).send({
                name: 'MissingCredentialsError',
                message: 'Both email and password are required'
            });
        }
        const user = await loginUser({email, password});
        if(!user) {
            next({
                name: 'IncorrectCredentialsError',
                message: 'Username or password is incorrect',
            })
        } else {
            const token = jwt.sign({id: user.id, email: user.email}, JWT_SECRET, { expiresIn: '1w' });
            res.send({ 
                user, 
                message: "you're logged in!",
                token 
            });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = usersRouter;
