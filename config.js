var mysql = require('mysql');

var CONFIG = {
    library:
        {
            // Static value for development, you can generate a new key
            // by hitting the <apiroot>/magic-gateway/keysmith route with
            // a get request from postman.
            public_key: "9cc0909d9bb04ca30e23924dfa946453f4a9dab2e8835ce41201e0e509ac15d9dff55896d319987ec9677facad01b36013b02ce9be03f5ab26f65b47aeee2cc12e289505e8b2bdfaf3cfe1d5cbd7a53fed7e65a427a758736031d49cfe2fae806b0ec01eefdacbdde97c22213c3896387e103ad19e603b975b06b627acf5777ae449fc1cce0e2d2f41504f7de6b3488edf16142117dd89c47e37c0d94771748e3db63343e90ff8cda65fd3e05457955b9d88aee360b14a29fd248ec472179123a0f3cf2054efd3043546c652e103d9f91f62c2eb9f472c6ab8ee97480894c27b728b22539771422e4396a81848bcf383b19b6a26a71d2f53412eb149f199d74f",
            algorithm: "aes-256-ctr"
        },
    database:
        {
            library:
                {
                    database_name: 'library',
                    connection_pool: mysql.createPool({
                        connectionLimit: 64,
                        host: 'localhost',
                        user: 'root',
                        password: '',
                        database: 'library',
                        debug: false
                    })
                }
        }
};

module.exports = CONFIG;
