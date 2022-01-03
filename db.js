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
