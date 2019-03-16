const axios = require("axios");
const baseUrl = "http://103.30.183.173/servicejateng/";

function DakesApi() {
    return {
        getToken: function(user, passwd) {
        return axios.post(baseUrl + "getToken", {
            username: "kab rembang",
            password: "3317"
        }).then(
            (res) => {
                //console.log(res.data + '    ===========   ');
                return res.data;
            })
        },
        
        getRawatJalan: function( tokenVar, kotaVar, tahunVar, bulanVar ) {
            return axios.get(baseUrl + "pilah_gender/rawat_jalan", {
                params: {
                    token: tokenVar,
                    kota: kotaVar,
                    tahun: tahunVar,
                    bulan: bulanVar
                }
            });            
        },
        
        postKunjungan: function (jenisVar, tokenVar, dataVar) {
            var jenis = ''
            if ( jenisVar == 'RAWAT JALAN') {
                jenis = 'rawat_jalan'
            } else {
                jenis = 'rawat_inap'
            }
            return axios.post(baseUrl + "pilah_gender/" + jenis, dataVar, {
                params: {
                    token: tokenVar
                }
            });
        },

        putKunjungan: function (jenisVar, tokenVar, dataVar) {
            var jenis = ''
            if (jenisVar == 'RAWAT JALAN') {
                jenis = 'rawat_jalan'
            } else {
                jenis = 'rawat_inap'
            }
            return axios.put(baseUrl + "pilah_gender/" + jenis, dataVar, {
                params: {
                    token: tokenVar
                }
            });
        },

        postPenyakit: function (penyakitVar, tokenVar, dataVar) {
            return axios.post(baseUrl + "penyakit/" + penyakitVar, dataVar, {
                params: {
                    token: tokenVar
                }
            });
        },


        putPenyakit: function (penyakitVar, tokenVar, dataVar) {
            return axios.put(baseUrl + "penyakit/" + penyakitVar, dataVar, {
                params: {
                    token: tokenVar
                }
            });
        }

    }
}

module.exports = DakesApi