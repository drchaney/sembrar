const client = require('./client');

async function getAllProducts(){
    try {
        const {rows} = await client.query(`
            SELECT products.*, ARRAY_AGG(tags.tag_name) AS tag_names, ARRAY_AGG(product_photos.url) AS photo_urls, categories.category_name
            FROM products
            LEFT JOIN product_tags ON products.id = product_tags.product_id
            LEFT JOIN tags ON product_tags.tag_id = tags.id
            LEFT JOIN product_photos ON products.id = product_photos.product_id
            LEFT JOIN categories ON products.category_id = categories.id
            GROUP BY products.id, product_photos.url, categories.category_name;         
        `);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function getAllProductsByCategory( {category}) {
    try {
        const {rows} = await client.query(`
        SELECT products.*, ARRAY_AGG(tags.tag_name) AS tag_names, ARRAY_AGG(product_photos.url) AS photo_urls, categories.category_name
        FROM products
        LEFT JOIN product_tags ON products.id = product_tags.product_id
        LEFT JOIN tags ON product_tags.tag_id = tags.id
        LEFT JOIN product_photos ON products.id = product_photos.product_id
        LEFT JOIN categories ON products.category_id = categories.id
        WHERE categories.category_name = $1
        GROUP BY products.id, categories.category_name;
        `, [category]);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function getAllCategories(){
    try {
        const {rows} = await client.query(`
            SELECT * FROM categories;
        `);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function getFeaturedProducts(){
    try {
        const {rows} = await client.query(`
        SELECT products.*, ARRAY_AGG(tags.tag_name) AS tag_names, ARRAY_AGG(product_photos.url) AS photo_urls, categories.category_name
        FROM products
        LEFT JOIN product_tags ON products.id = product_tags.product_id
        LEFT JOIN tags ON product_tags.tag_id = tags.id
        LEFT JOIN product_photos ON products.id = product_photos.product_id
        LEFT JOIN categories ON products.category_id = categories.id
        WHERE products.isfeatured = true
        GROUP BY products.id, categories.category_name;
        `);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function getFeaturedProductsByCategory( {category} ){
    try {
        const {rows} = await client.query(`
        SELECT products.*, ARRAY_AGG(tags.tag_name) AS tag_names, ARRAY_AGG(product_photos.url) AS photo_urls, categories.category_name
        FROM products
        LEFT JOIN product_tags ON products.id = product_tags.product_id
        LEFT JOIN tags ON product_tags.tag_id = tags.id
        LEFT JOIN product_photos ON products.id = product_photos.product_id
        LEFT JOIN categories ON products.category_id = categories.id
        WHERE products.isfeatured = true
        AND categories.category_name = $1
        GROUP BY products.id, categories.category_name;
        `, [category]);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function getFeaturedProductsByTag( {tag} ){
    try {
        const {rows} = await client.query(`
        SELECT products.*, ARRAY_AGG(tags.tag_name) AS tag_names, ARRAY_AGG(product_photos.url) AS photo_urls, categories.category_name
        FROM products
        LEFT JOIN product_tags ON products.id = product_tags.product_id
        LEFT JOIN tags ON product_tags.tag_id = tags.id
        LEFT JOIN product_photos ON products.id = product_photos.product_id
        LEFT JOIN categories ON products.category_id = categories.id
        WHERE products.isfeatured = true
        AND tags.tag_name = $1
        GROUP BY products.id, categories.category_name;
        `, [tag]);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function createCategory({ category }) {
    try {
        const {rows: [cat]} = await client.query(`
            INSERT INTO categories(category_name) VALUES ($1)
            ON CONFLICT (category_name) DO NOTHING 
            RETURNING id, category_name
        `, [category]);
      return cat;
    } catch (error) {
      throw error;
    }
}

async function createTag({ tag }) {
    try {
        const {rows: [newTag]} = await client.query(`
            INSERT INTO tags(tag_name) VALUES ($1)
            ON CONFLICT (tag_name) DO NOTHING 
            RETURNING id, tag_name
        `, [tag]);
        return newTag;
    } catch (error) {
        throw error;
    }
}

async function createProductTag({ product_id, tag_id }) {
    try {
        const {rows: [newProductTag]} = await client.query(`
            INSERT INTO product_tags(product_id, tag_id) VALUES ($1, $2)
            RETURNING id, product_id, tag_id
        `, [product_id, tag_id]);
        return newProductTag;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllProducts,
    createCategory,
    createTag,
    createProductTag,
    getAllProductsByCategory,
    getAllCategories,
    getFeaturedProducts,
    getFeaturedProductsByCategory,
    getFeaturedProductsByTag
};