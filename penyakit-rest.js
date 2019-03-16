const dotenv = require("dotenv");
const DakesApi = require("./api/api");
const DbModule = require("./db-modules");

dotenv.config();


function PenyakitRes() {
    const dbModule = new DbModule()
    const api = new DakesApi()
    var tokenVar = ''
    var dataTable = {
            kode_wilayah: '3317',
            tahun: '2017',
            bulan: '03',
            penderita_l: '0',
            penderita_p: '0',
            meninggal_l: '0',
            meninggal_p: '0'
        }
    
    return {
        kirimPenyakit: function (verbMethode, penyakit, tahun, bulan) {
            return dbModule
                .ambilPenyakit(penyakit, tahun, bulan)
                .then(hasilQ => {
                    if (hasilQ.rows.length == 0) {
                        //console.log("empty result query");
                        dataTable.tahun = tahun
                        dataTable.bulan = bulan
                    } else {
                        dataTable = hasilQ.rows[0];
                    }

                    return api.getToken(
                        process.env.USERDAKES,
                        process.env.PASSWDDAKES
                    );
                })
                .then(token => {
                    tokenVar = token
                    if (verbMethode == 'post') {
                        return api.postPenyakit(
                            penyakit,
                            tokenVar,
                            dataTable
                        );
                    } else {
                        return api.putPenyakit(
                            penyakit,
                            tokenVar,
                            dataTable
                        );
                    }              
                })
                .then(res0 => {
                    console.log(penyakit)
                    console.log(verbMethode)
                    console.log(dataTable)
                    console.log(tokenVar)    
                    console.log(res0.data);
                })
                .catch( err => {
                    console.log(penyakit);
                    console.log(verbMethode);
                    console.log(dataTable)
                    console.log(tokenVar)
                    console.log(err)
                    }
                );
        }
    }
}

module.exports = PenyakitRes;
