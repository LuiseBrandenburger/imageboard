const spicedPg = require("spiced-pg");

const database = "imageboard";
const username = "postgres";
const password = "postgres";

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${username}:${password}@localhost:5432/${database}`
);


module.exports.getImages = () => {
    const q = `SELECT * FROM images`;
    return db.query(q);
};

module.exports.addImage = (description, username, title, url) => {
    const q = `INSERT INTO images (description, username, title, url)
    VALUES ($1, $2, $3, $4)
    RETURNING description, username, title, url`;

    const params = [description, username, title, url];
    return db.query(q, params);
};

