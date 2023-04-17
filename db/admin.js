const client = require('./client');

async function createPromoCode({ code, discount, isActive, start_date, end_date, remaining_uses, created_by }) {
    try {
        const {rows: [promoCode]} = await client.query(`
            INSERT INTO promo_codes(code, discount, isActive, start_date, end_date, remaining_uses, created_by) 
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id, code, discount, isActive, start_date, end_date, remaining_uses, created_by
        `, [code, discount, isActive, start_date, end_date, remaining_uses, created_by]);
        return promoCode;
    } catch (error) {
      throw error;
    }
}

async function getArticlesByType( { article_type }) {
    try {
        const {rows} = await client.query(`
        SELECT articles.* 
        FROM articles
        WHERE article_type = $1
        `, [article_type ]);
        return rows;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createPromoCode,
    getArticlesByType
};
