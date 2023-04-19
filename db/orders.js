const client = require('./client');

async function addToCart({ user_id, product_id, qty }) {
    try {
        const {rows: [line]} = await client.query(`
            INSERT INTO cart_lines(user_id, product_id, qty) VALUES ($1, $2, $3)
            RETURNING id, user_id, product_id, qty
        `, [user_id, product_id, qty]);
        return line;
    } catch (error) {
        throw error;
    }
}

async function getCartByUserId( {user_id} ){
    try {
        const {rows} = await client.query(`
        SELECT cart_lines.user_id, products.product_name, products.price, product_photos.url
        FROM cart_lines
        JOIN products ON cart_lines.product_id = products.id
        JOIN product_photos ON products.id = product_photos.product_id
        WHERE cart_lines.user_id = $1;
        `, [user_id]);
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
    createOrder
};


