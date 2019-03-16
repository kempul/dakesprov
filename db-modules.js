const dotenv = require("dotenv");
const DakesApi = require("./api/api");


dotenv.config();

const paramDb = {
    user: process.env.USERDB,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
}

function DbModule() {
    return {
        ambilKunjungan: function (jenis, tahun, bulan) {
            const { Pool } = require('pg')
            const pool = new Pool(paramDb);
            return pool.query("SELECT kode_wilayah, tahun, bulan, jml_l, jml_p FROM dakesprov.kunjungan_view WHERE instalasi = $1 and tahun = $2 and bulan = $3", 
                [ jenis, tahun, bulan ])
        },
        
        ambilPenyakit: function (penyakit, tahun, bulan) {
            const { Pool } = require('pg')
            const pool = new Pool(paramDb);
            var myQ0 =
              "SELECT kode_wilayah, tahun, bulan, penderita_l, penderita_p, meninggal_l, meninggal_p FROM dakesprov.penyakit_view WHERE penyakit like penyakitparam and tahun = $1 and bulan = $2";
            const myQ = myQ0.replace('penyakitparam', "'%" + penyakit + "%'" )  
            //console.log(myQ)
            return pool.query( myQ, [tahun, bulan])
        },
        goodbye: function () {
            return 'goodbye!';
        }

    }
}
    
    

module.exports = DbModule;
