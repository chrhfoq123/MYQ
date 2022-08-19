module.exports = {
    questionInsert : async function(subject) {
        let query = `INSERT INTO question (subject, make_time) VALUES ("${subject}", now())`;
        const conn = await require('../../database/index')();        

        conn.query(query, (err, rows) => {
            if(err) console.log(err);
            return rows
        });
    },
}