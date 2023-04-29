const client = require('./client');

async function createCart( {user_id, isActive}){
    try{
        const {rows: [cart]} = await client.query(`
            INSERT INTO carts(user_id, isActive) VALUES ($1, $2)
            RETURNING id, user_id, isActive 
        `, [user_id, isActive]);
        return cart;
    } catch (error) {
        throw error;
    }
}

async function addToCart({ cart_id, product_id, qty }) {
    try {
        const {rows: [line]} = await client.query(`
            INSERT INTO cart_lines(cart_id, product_id, qty) VALUES ($1, $2, $3)
            RETURNING id, cart_id, product_id, qty
        `, [cart_id, product_id, qty]);
        return line;
    } catch (error) {
        throw error;
    }
}

async function getCartByUserId( {user_id} ){
    try {
        const {rows} = await client.query(`
            SELECT DISTINCT ON (cart_lines.product_id) carts.user_id, cart_lines.cart_id, cart_lines.product_id, cart_lines.qty, products.product_name, products.price, products.qoh, product_photos.url
            FROM carts
            LEFT JOIN cart_lines ON carts.id = cart_lines.cart_id
            LEFT JOIN products ON cart_lines.product_id = products.id
            JOIN product_photos ON products.id = product_photos.product_id
            WHERE carts.user_id = $1
        `, [user_id]);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function getCartIdByUserId( {user_id} ){
    try {
        const {rows} = await client.query(`
            SELECT id AS cart_id
            FROM carts
            WHERE carts.user_id = $1
        `, [user_id]);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function interpretCart( {product_id } ){
    try {
        const {rows} = await client.query(`
            SELECT DISTINCT ON (products.id) products.product_name, products.price, products.qoh, product_photos.url
            FROM products
            JOIN product_photos ON products.id = product_photos.product_id
            WHERE products.id = $1
        `, [product_id]);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function editCart( {qty, cart_id, product_id } ){
    try {
        const {rows} = await client.query(`
            UPDATE cart_lines
            SET qty = $1
            WHERE cart_id = $2 AND product_id = $3
            RETURNING *;
        `, [qty, cart_id, product_id]);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function deleteCartLine( {cart_id, product_id }){
    try {
        const {rows} = await client.query(`
            DELETE FROM cart_lines 
            WHERE cart_id = $1 AND product_id = $2
            RETURNING *;
        `, [cart_id, product_id]);
        return rows;
    } catch (error) {
        throw error;
    } 
}

async function getOrdersByUserId( {user_id} ){
    try {
        const {rows} = await client.query(`
        SELECT orders.*, order_lines.*, products.*, product_photos.*
        FROM orders
        JOIN order_lines ON orders.id = order_lines.order_id
        JOIN products ON order_lines.product_id = products.id
        JOIN product_photos ON products.id = product_photos.product_id
        WHERE orders.user_id = $1;
        `, [user_id]);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function checkCode( {code} ){
    try {
        const {rows} = await client.query(`
        SELECT code, discount
        FROM promo_codes
        WHERE code = $1
        AND isactive = true
        `, [code]);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function createOrder( ){
    try{

        // create a record in orders
        // copy details over such as first name, etc. from the form
        // when the order is created, start attaching order_lines to it
        // each order line references the order id, and is copies from cart_lines

    } catch (error) {
        throw (error)
    }
}

module.exports = {
    getCartByUserId,
    addToCart,
    getOrdersByUserId,
    createOrder,
    createCart,
    getCartIdByUserId,
    interpretCart,
    editCart,
    deleteCartLine,
    checkCode
};



