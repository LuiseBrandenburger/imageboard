const spicedPg = require("spiced-pg");

const database = "imageboard";
const username = "postgres";
const password = "postgres";

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${username}:${password}@localhost:5432/${database}`
);

module.exports.getImages = () => {
    const q = `SELECT * FROM images
    ORDER by id DESC
    LIMIT 6`;
    return db.query(q);
};

module.exports.addImage = (description, username, title, url) => {
    const q = `INSERT INTO images (description, username, title, url)
    VALUES ($1, $2, $3, $4)
    RETURNING description, username, title, url, id, created_at`;

    const params = [description, username, title, url];
    return db.query(q, params);
};

module.exports.getImgByID = (id) => {
    const q = `SELECT * FROM images WHERE id = ($1)`;
    const params = [id];
    return db.query(q, params);
};

module.exports.addComment = (username, comment, img_id) => {
    const q = `INSERT INTO comments (username, comment, img_id)
    VALUES ($1, $2, $3)
    RETURNING username, comment, id, img_id, created_at`;

    const params = [username, comment, img_id];
    return db.query(q, params);
};


module.exports.getCommentsByID = (img_id) => {
    const q = `SELECT * FROM comments WHERE img_id = ($1)
    ORDER by id DESC`;
    const params = [img_id];
    return db.query(q, params);
};

module.exports.getMoreImagesByID = (id) => {
    const q = `SELECT * , 
        (SELECT id FROM images ORDER BY id ASC LIMIT 1) AS "lowestId"
        FROM images 
        WHERE id < ($1)
        ORDER BY id DESC
        LIMIT 6
        `;
    const params = [id];
    return db.query(q, params);
};


