const dotenv = require("dotenv");
const DakesApi = require("./api/api");
const DbModule = require("./db-modules");

dotenv.config();


function KunjunganRes() {
    const dbModule = new DbModule()
    const api = new DakesApi()
    var dataTable = {
        kode_wilayah: '3317',
        tahun: '2017',
        bulan: '03',
        jml_l: '0',
        jml_p: '0'
    }

    var tokenVar = ''


    return {
        kirimKunjungan: function (verbMethode, jenis, tahun, bulan) {
            return dbModule.ambilKunjungan(jenis, tahun, bulan)
                .then(
                    hasilQ => {
                        if (hasilQ.rows.length == 0) {
                            //console.log("empty result query")
                            dataTable.tahun = tahun
                            dataTable.bulan = bulan
                        } else {
                            dataTable = hasilQ.rows[0]
                        }

                        //console.log(dataTable)
                        return api.getToken(
                          process.env.USERDAKES,
                          process.env.PASSWDDAKES
                        );

                    }
                )
                .then(
                    token => {
                        //console.log(token)
                        //console.log(jenis);
                        tokenVar = token
                        if (verbMethode == 'post') {
                            return api.postKunjungan(
                                jenis,
                                tokenVar,
                                dataTable
                            )                            
                        } else {
                            return api.putKunjungan(
                                jenis,
                                tokenVar,
                                dataTable
                            )
                        }
                    }
                )
                .then(
                    res0 => {
                        console.log(jenis)
                        console.log(verbMethode)
                        console.log(tokenVar)
                        console.log(dataTable)
                        console.log(res0.data)
                    }
                )
                .catch( err => {
                    console.log(jenis)
                    console.log(verbMethode)
                    console.log(tokenVar)
                    console.log(dataTable)
                    console.log(err)
                })
        }
    }
}

module.exports = KunjunganRes;
