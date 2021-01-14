const {Pool}=require("pg")

const con=new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'tp_music',
    port: '5432'
});

module.exports=con;
