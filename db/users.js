const client = require('./client');
const bcrypt = require('bcrypt');
const SALT_COUNT = 12;

async function createUser({ email, password }) {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
        const {rows: [user]} = await client.query(`
            INSERT INTO users(email, hashedpassword) VALUES ($1, $2)
            ON CONFLICT (email) DO NOTHING 
            RETURNING id, email 
        `, [email, hashedPassword]);
        return user;
    } catch (error) {
        throw error;
    }
}

async function createReview({ product_id, user_id, review, rating }) {
    try {
        const {rows: [newReview]} = await client.query(`
            INSERT INTO reviews(product_id, user_id, review, rating) VALUES ($1, $2, $3, $4)
            RETURNING id, product_id, user_id, review, rating
        `, [product_id, user_id, review, rating]);
        return newReview;
    } catch (error) {
        throw error;
    }
}

async function checkUserByEmail(email) {
    try {
        const {rows: [user]} = await client.query(`
            SELECT users.email FROM users
            WHERE users.email = $1
        `, [email]);
        if (user) return true;
        return false;
    } catch (error) {
        throw error;
    }
}

async function loginUser({email, password}) {
    try {
        const isUser = await checkUserByEmail(email);
        if (!isUser){
            return;
        }
        const {rows: [user]} = await client.query(`
            SELECT * FROM users
            WHERE users.email = $1
        `, [email]);
        const hashedPassword = user.hashedpassword;
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);
        if(!passwordsMatch){
            return;
        }
        const { id } = user;
        const userDetails = { id, email }
        return userDetails;
    } catch (error) {
        throw error;
    }
}

async function editReview({ review_id, review, rating }) {
    try {
        const {rows: [editReview]} = await client.query(`
            UPDATE reviews
            SET rating = $3, review = $2
            WHERE id = $1
        `, [review_id, review, rating]);
        return editReview;
    } catch (error) {
        throw error;
    }
}

async function getReviewById(id){
    try {
        const {rows: [review]} = await client.query(`
            SELECT * FROM routines
            WHERE id = $1
        `, [id]);
        return review;
    } catch (error) {
        throw error;
    }
}

async function editUser({ user_id, first_name, last_name, email, address_line_1, address_line_2, city, state, zip, user_group, isActive }) {
    try {
        const {rows: [editUser]} = await client.query(`
            UPDATE users
            SET first_name = $2, last_name = $3, email = $4, address_line_1 = $5, address_line_2 = $6, city = $7, state = $8, zip = $9, user_group = $10, isActive = $11
            WHERE id = $1
        `, [user_id, first_name, last_name, email, address_line_1, address_line_2, city, state, zip, user_group, isActive]);
        return editUser;
    } catch (error) {
        throw error;
    }
}

async function getUserById(id){
    try {
        const {rows: [email]} = await client.query(`
            SELECT * FROM users
            WHERE id = $1
        `, [id]);
        return email;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    createReview,
    checkUserByEmail,
    loginUser,
    editReview,
    getReviewById,
    editUser,
    getUserById
};
