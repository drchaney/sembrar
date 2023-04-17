const client = require('./client');
const { createCategory, createTag, createProductTag, createReview, createPromoCode, addToCart } = require('./')

async function dropTables() {
    console.log('Dropping All Tables...');
    try {
        await  client.query(`
        DROP TABLE IF EXISTS product_tags;
        DROP TABLE IF EXISTS tags;
        DROP TABLE IF EXISTS product_photos;
        DROP TABLE IF EXISTS reviews;
        DROP TABLE IF EXISTS order_lines;
        DROP TABLE IF EXISTS cart_lines;
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS categories;
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS promo_codes;
        DROP TABLE IF EXISTS carts;
        DROP TABLE IF EXISTS articles;
        DROP TABLE IF EXISTS users;
    `)
    } catch (error) {
        throw error; 
    }
}

async function createTables() {
    try {
        console.log("Starting to build tables...");
        await client.query(`
            CREATE TABLE categories (
                id SERIAL PRIMARY KEY,
                category_name VARCHAR(255) UNIQUE NOT NULL
            );
        
            CREATE TABLE products (
                id SERIAL PRIMARY KEY,
                product_name VARCHAR(255) NOT NULL,
                short_desc VARCHAR(255) NOT NULL,
                long_desc TEXT NOT NULL,
                category_id INT NOT NULL REFERENCES categories(id),
                price DECIMAL(10,2) NOT NULL,
                isSale BOOLEAN NOT NULL,
                isFeatured BOOLEAN NOT NULL,
                isActive BOOLEAN NOT NULL,
                qoh INT NOT NULL
            );

            CREATE TABLE tags (
                id SERIAL PRIMARY KEY,
                tag_name VARCHAR(255) UNIQUE NOT NULL
            );
            
            CREATE TABLE product_tags (
                id SERIAL PRIMARY KEY,
                product_id INT NOT NULL REFERENCES products(id),
                tag_id INT NOT NULL REFERENCES tags(id)
            );

            CREATE TABLE product_photos (
                id SERIAL PRIMARY KEY,
                url VARCHAR(255) NOT NULL,
                product_id INT NOT NULL REFERENCES products(id)
            );

            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                first_name VARCHAR(255),
                last_name VARCHAR(255),
                email VARCHAR(255) UNIQUE NOT NULL,
                hashedPassword VARCHAR(512) NOT NULL,
                address_line_1 VARCHAR(255),
                address_line_2 VARCHAR(255),
                city VARCHAR(255),
                state VARCHAR(255),
                zip VARCHAR(255),
                user_group INT NOT NULL DEFAULT 1,
                isActive BOOLEAN NOT NULL DEFAULT TRUE
              );

            CREATE TABLE reviews (
                id SERIAL PRIMARY KEY,
                product_id INT NOT NULL REFERENCES products(id),
                user_id INT NOT NULL REFERENCES users(id),
                review TEXT,
                rating INT NOT NULL,
                UNIQUE ("product_id", "user_id")
            );

            CREATE TABLE promo_codes (
                id SERIAL PRIMARY KEY,
                code VARCHAR(255) NOT NULL,
                discount INT NOT NULL,
                isActive BOOLEAN NOT NULL,
                start_date DATE,
                end_date DATE,
                remaining_uses INT,
                created_by INT NOT NULL REFERENCES users(id)
            );

              CREATE TABLE orders (
                id SERIAL PRIMARY KEY,
                first_name VARCHAR(255),
                last_name VARCHAR(255),
                user_id INT NOT NULL REFERENCES users(id),
                email VARCHAR(255) NOT NULL,
                address_line_1 VARCHAR(255) NOT NULL,
                address_line_2 VARCHAR(255),
                city VARCHAR(255) NOT NULL,
                state VARCHAR(255) NOT NULL,
                zip VARCHAR(255) NOT NULL,
                promo_code_id INT REFERENCES promo_codes (id)
            );

            CREATE TABLE order_lines (
                id SERIAL PRIMARY KEY,
                order_id INT NOT NULL REFERENCES orders(id),
                product_id INT NOT NULL REFERENCES products(id),
                price DECIMAL(10,2) NOT NULL,
                qty INT NOT NULL,
                line_status INT NOT NULL DEFAULT 1
            );

            CREATE TABLE cart_lines (
                id SERIAL PRIMARY KEY,
                user_id INT NOT NULL REFERENCES users(id),
                product_id INT NOT NULL REFERENCES products(id),
                qty INT NOT NULL,
                UNIQUE ("user_id", "product_id")
            );

            CREATE TABLE articles (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                body TEXT NOT NULL,
                article_type VARCHAR(255) NOT NULL,
                start_date DATE,
                end_date DATE,
                isActive boolean NOT NULL,
                author INT NOT NULL REFERENCES users (id)
            );
        `)

        console.log("Finished building tables!");
    } catch (error) {
        console.error("Error building tables!");
    throw error;
    }
}

async function createInitialCategories() {
    console.log('Starting to create categories...');
    try {
  
        const categoriesToCreate = [
            { category: 'outdoor garden'},
            { category: 'indoor plants'},
            { category: 'fruits and vegetables'},
            { category: 'herbs'},
            { category: 'supplies'}
        ]
        const categories = await Promise.all(categoriesToCreate.map(createCategory));
    
        console.log('Categories created:');
        console.log(categories);
        console.log('Finished creating categories!');
    } catch (error) {
        console.error('Error creating categories!');
        throw error;
    }
  }

async function createInitialProducts() {
    try {       
        console.log('Starting to create products...');
        await  client.query(`
            \COPY products (
                product_name, short_desc, long_desc, category_id, price, isSale, isFeatured, isActive, qoh)
            FROM '/Users/Public/my_products_table_data.csv'
            DELIMITER ','
            CSV HEADER;
        `)
        console.log('Finished creating products!');
    } catch (error) {
        console.error('Error creating products  !');
    throw error;
    }
}

async function createInitialTags() {
    console.log('Starting to create tags...');
    try {
        const tagsToCreate = [
            { tag: 'low maintenance'},
            { tag: 'drought tolerant'},
            { tag: 'deer resistant'},
            { tag: 'perennial'},
            { tag: 'early spring'},
            { tag: 'annual'},
            { tag: 'fall flowering'},
            { tag: 'low sunlight'}
        ]
        const tags = await Promise.all(tagsToCreate.map(createTag));
  
        console.log('Tags created:');
        console.log(tags);
        console.log('Finished creating tags!');
    } catch (error) {
        console.error('Error creating tags!');
        throw error;
    }
}

async function createInitialProductTags() {
    console.log('Starting to create two product_tags for each product...');
    try {
        let productTagsToCreate = [];
        for (let i = 1; i < 139; i++){
            let x = Math.floor(Math.random() * 8) + 1;
            let newTag = {product_id: i, tag_id: x};
            productTagsToCreate.push(newTag);
            x = x + 1;
            if (x == 9){
                x = 1;
            }
            newTag = {product_id: i, tag_id: x};
            productTagsToCreate.push(newTag);
        }
        const productTags = await Promise.all(productTagsToCreate.map(createProductTag));
        console.log('product_tags created:');
        console.log(productTags);
        console.log('Finished creating product_tags!');
    } catch (error) {
        console.error('Error creating product_tags!');
        throw error;
    }
}

async function createInitialProductPhotos() {
    try {       
        console.log('Starting to create product_photos...');
        await  client.query(`
            \COPY product_photos (
                url, product_id)
            FROM '/Users/Public/my_product_photos_table_data.csv'
            DELIMITER ','
            CSV HEADER;
        `)
        console.log('Finished creating product_photos!');
    } catch (error) {
        console.error('Error creating product_photos!');
    throw error;
    }
}

async function createInitialUsers() {
    try {       
        console.log('Starting to create users...');
        await  client.query(`
            \COPY users (
                first_name, last_name, email, hashedPassword, address_line_1, address_line_2, city, state, zip, user_group)
            FROM '/Users/Public/my_users_table_data.csv'
            DELIMITER ','
            CSV HEADER;
        `)
        console.log('Finished creating products!');
    } catch (error) {
        console.error('Error creating products  !');
    throw error;
    }
}

async function createInitialReviews() {
    console.log('Starting to create reviews...');
    try {
        const reviewsToCreate = [
            {product_id: 1, user_id: 3, review: 'Loved it', rating: 5},
            {product_id: 1, user_id: 4, review: 'Hated it', rating: 1},
            {product_id: 2, user_id: 3, review: 'Meh', rating: 3},
            {product_id: 2, user_id: 5, review: 'Its okay', rating: 3},
            {product_id: 3, user_id: 4, review: 'Works ok', rating: 4}
        ]
        const reviews = await Promise.all(reviewsToCreate.map(createReview));
        console.log('reviews created:');
        console.log(reviews);
        console.log('Finished creating reviews!');
    } catch (error) {
        console.error('Error creating reviews');
        throw error;
    }
}

async function createInitialPromoCodes() {
    console.log('Starting to create promo_codes...');
    try {
  
        const promoCodesToCreate = [
            { code: 'GRANDOPENING25', discount: 25, isActive: 'true', created_by: 2},
            { code: 'GARDEN20', discount: 20, isActive: 'true', remaining_uses: 150, created_by: 2},
        ]
        const codes = await Promise.all(promoCodesToCreate.map(createPromoCode));
        console.log('promo_codes created:');
        console.log(codes);
        console.log('Finished creating promo_codes!');
    } catch (error) {
        console.error('Error creating promo_codes!');
        throw error;
    }
}

async function createInitialOrders() {
    try {       
        console.log('Starting to create orders...');
        await  client.query(`
            \COPY orders (
                first_name, last_name, user_id, email, address_line_1, address_line_2, city, state, zip, promo_code_id)
            FROM '/Users/Public/my_orders_table_data.csv'
            DELIMITER ','
            CSV HEADER;
        `)
        console.log('Finished creating orders!');
    } catch (error) {
        console.error('Error creating orders!');
    throw error;
    }
}

async function createInitialOrderLines() {
    try {       
        console.log('Starting to create order_lines...');
        await  client.query(`
            \COPY order_lines (
                order_id, product_id, price, qty, line_status)
            FROM '/Users/Public/my_order_lines_table_data.csv'
            DELIMITER ','
            CSV HEADER;
        `)
        console.log('Finished creating order_lines!');
    } catch (error) {
        console.error('Error creating order_lines!');
    throw error;
    }
}

async function createInitialCartLines() {
    console.log ('Starting to create cart_lines...');
    try {
        const cartLinesToCreate = [
            { user_id: 3, product_id: 1, qty: 1},
            { user_id: 4, product_id: 1, qty: 2},
            { user_id: 3, product_id: 2, qty: 1},
            { user_id: 4, product_id: 2, qty: 2},
            { user_id: 3, product_id: 3, qty: 10},
            { user_id: 4, product_id: 3, qty: 20},
            { user_id: 5, product_id: 3, qty: 1},
            { user_id: 6, product_id: 4, qty: 1},
        ]
        const cartLines = await Promise.all(cartLinesToCreate.map(addToCart));
        console.log('cart_lines created:');
        console.log(cartLines);
        console.log('Finished creating cart_lines!');
    } catch (error) {
        console.error('Error creating cart_lines!');
        throw error;
    }
}

async function createInitialArticles() {
    try {       
        console.log('Starting to create articles...');
        await client.query(`
            \COPY articles (
                title, body, article_type, start_date, end_date, isActive, author)
            FROM '/Users/Public/my_articles_table_data.csv'
            DELIMITER ','
            CSV HEADER;
        `)
        console.log('Finished creating articles!');
    } catch (error) {
        console.error('Error creating articles!');
    throw error;
    }
}

async function rebuildDB() {
    try {
        client.connect();
        await dropTables();
        await createTables();
        await createInitialCategories();
        await createInitialProducts();
        await createInitialTags();
        await createInitialProductTags();
        await createInitialProductPhotos();
        await createInitialUsers();
        await createInitialReviews();
        await createInitialPromoCodes();
        await createInitialOrders();
        await createInitialOrderLines();
        await createInitialCartLines();
        await createInitialArticles();
    } catch (error) {
        console.log('Error during rebuildDB')
    throw error;
    }
}

module.exports = {
    rebuildDB
};