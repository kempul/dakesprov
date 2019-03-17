const cron = require("node-cron")
const dotenv = require("dotenv")
const KunjunganRes = require("./kunjungan-rest");
const PenyakitRes = require("./penyakit-rest")
var moment = require("moment-timezone")

moment()
  .tz("Asia/Jakarta")
  .format();

dotenv.config();

const express = require("express");
const app = express();
const port = 3123;


//dakesApi = new DakesApi();
kunjunganRes = new KunjunganRes()
penyakitRes = new PenyakitRes() 


cron.schedule("0 5 1 * *", function () {
    var tanggal = new Date()
    tanggal.setDate(tanggal.getDate() - 1)
    var kemarin = moment(tanggal, "DD MM YYYY, hh:mm:ss");
    var tahun = kemarin.year().toString()
    var bulan = ("0" + (kemarin.month() + 1)).slice(-2);
    var tgl = kemarin.date();


    console.log(kemarin.format("DD/MM/YYYY , HH:mm:ss"));
    console.log('tahun : ' + tahun)
    console.log("bulan : " + bulan);
    console.log("tgl : " + tgl);

    kunjunganRes.kirimKunjungan("post", "RAWAT JALAN", tahun, bulan);
    kunjunganRes.kirimKunjungan("post", "RAWAT INAP", tahun, bulan);

    penyakitArr = [
        "dbd",
        "kusta",
        "hiv",
        "hipertensi",
        "malaria",
        "tb"
    ];

    penyakitArr.forEach(function (penyakit) {
        penyakitRes.kirimPenyakit("post", penyakit, tahun, bulan);
    })


}, {
    timezone: "Asia/Jakarta"
});

cron.schedule("0 5 28 * *", function() {
    
    var tanggal = new Date();
    tanggal.setDate(tanggal.getDate() - 1);
    var kemarin = moment(tanggal, "DD MM YYYY, hh:mm:ss");
    var tahun = kemarin.year().toString();
    var bulan = ("0" + (kemarin.month() + 1)).slice(-2);
    var tgl = kemarin.date();

    console.log(kemarin.format("DD/MM/YYYY , HH:mm:ss"));
    console.log("tahun : " + tahun);
    console.log("bulan : " + bulan);
    console.log("tgl : " + tgl);

    
    kunjunganRes.kirimKunjungan("put", "RAWAT JALAN", tahun, bulan);
    kunjunganRes.kirimKunjungan("put", "RAWAT INAP", tahun, bulan);

    penyakitArr = ["dbd", "kusta", "hiv", "hipertensi", "malaria", "tb"];

    penyakitArr.forEach(function(penyakit) {
      penyakitRes.kirimPenyakit("put", penyakit, tahun, bulan);
    });
}, {
    timezone: "Asia/Jakarta"
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
/*
    console.log('ambil kunjungan');
    var tahun = '2018'
    var bulan = '02'
    var penyakit = 'tb'
    
    db.ambilPenyakit(penyakit, tahun, bulan)
    .then(
        hasilQ => {
            console.log(hasilQ.rows[0])
        }
    )
 */   
});


