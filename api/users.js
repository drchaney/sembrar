const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET
const { createUser, checkUserByEmail, loginUser, editUser, getUserById, editReview, getReviewById, getReviewByProductId } = require('../db');
const { requireUser } = require('./utils');

// GET /api/users/me
usersRouter.get('/me', requireUser, async (req, res, next) => {
    try {
        const { id, email, first_name, user_group } = req.user;
        res.send({user_id:id, email, first_name, user_group});
    } catch (error) {
        next(error)
    }
})

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

// POST /api/users/register
usersRouter.post('/register', async (req, res, next) => {
    try {
        const {email, password} = req.body
        const user_group = 1;
        const isUser = await checkUserByEmail(email)
        if (isUser) {
            next({
                name: 'EmailExistsError',
                message: 'This email already exists'
            });
        } else if (!email.includes("@") || (!email.includes("."))) {
            next({
                name: 'InvalidEmailError',
                message: 'Email is of an invalid format'
            })
        } else if (password.length < 8) {
            next({
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
                const token = jwt.sign({id: user.id, email: user.email, user_group: 1}, JWT_SECRET, { expiresIn: '1w' });
                const creds = {id: user.id, email: email, user_group: user.user_group}
                res.send({ creds, message: "Welcome to Sembrar!  You registered successfully!", token });
            }
        } 
    } catch (error) {
      next(error)
    }
})

// POST /api/users/login
usersRouter.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(401);
            next({
                name: 'MissingCredentialsError',
                message: 'Both email and password are required'
            });
        }
        const user = await loginUser({email, password});
        if(!user) {
            res.status(401);
            next({
                name: 'IncorrectCredentialsError',
                message: 'Username or password is incorrect',
            })
        } else {
            const token = jwt.sign({id: user.id, email: email, user_group: user.user_group}, JWT_SECRET, { expiresIn: '1w' });
            const creds = {id: user.id, email: email, user_group: user.user_group}

            res.send({ 
                creds, 
                message: "you're logged in!",
                token 
            });
        }
    } catch (error) {
        next(error);
    }
});
 
// POST /api/users/reviews/:reviewId
usersRouter.post('/reviews/:reviewId', async (req, res, next) => {
    try {
        const { review, rating  } = req.body;
        const { reviewId } = req.params.reviewId;
        const reviewToEdit = await getReviewById(reviewId);

        if(!reviewToEdit) {
                next({
                    name: 'ReviewNotFoundError',
                    message: `Review ID ${reviewId} not found`
            })
          } else if(req.user.id !== reviewToEdit.user_id) {
            res.status(403);
                next({
                    name: "WrongUserError",
                    message: `User ${req.user} did not create this review; unable to edit`
            });
          } else {
            const updatedReview = await editReview(reviewToEdit.id, review, rating);
            if(updatedReview) {
              res.send(updatedReview);
            } else {
                next({
                    name: 'FailedToUpdateError',
                    message: `Error updating review ID ${review.Id}`
              })
            }
          }
    } catch (error) {
        next(error);
    }
});

// GET /api/users/reviews/product/:productId
usersRouter.get('/reviews/product/:productId', async (req, res, next) => {
    try {
        const { productId } = req.params;
        const productReviews = await getReviewByProductId(productId);

        if(!productReviews) {
            next({
                name: 'ProductReviewsNotFoundError',
                message: `Product ID ${productId} was not found`
            })
        } else {
            res.send(productReviews);
        }
    } catch (error) {
        next(error);
    }
});


// POST /api/users/:userId
usersRouter.patch('/users/:Id', async (req, res, next) => {
    try {
        const { first_name, last_name, email, address_line_1, address_line_2, city, state, zip, user_group, isActive } = req.body;
        const { userId } = req.params;
        const userToEdit = await getUserById(userId);

        if(!userToEdit) {
                next({
                    name: 'UserNotFoundError',
                    message: `User ID ${reviewId} not found`
            })
          } else if(req.user.id !== userToEdit.user_id) {
            res.status(403);
                next({
                    name: "WrongUserError",
                    message: `User ${req.user} is unable to edit this profile`
            });
          } else {
            const updatedUser = await editUser(id, first_name, last_name, email, address_line_1, address_line_2, city, state, zip, user_group, isActive);
            if(updatedReview) {
              res.send(updatedReview);
            } else {
                next({
                    name: 'FailedToUpdateError',
                    message: `Error updating review ID ${review.Id}`
              })
            }
          }
    } catch (error) {
        next(error);
    }
});

module.exports = usersRouter;
