function naikAngkot(arrPenumpang) {
  const rute = ["A", "B", "C", "D", "E", "F"];
  const ruteMapping = rute.map((r) => r.toLocaleLowerCase());
  const hasil = [];

  for (let i = 0; i < rute.length; i++) {
    const penumpang = arrPenumpang[0];
    const naikDari = arrPenumpang[1].toLocaleLowerCase();
    const tujuan = arrPenumpang[2].toLocaleLowerCase();

    const awal = ruteMapping.indexOf(naikDari);
    const akhir = ruteMapping.indexOf(tujuan);

    const ongkos = (akhir - awal) * 2000;

    hasil.push({
      penumpang: penumpang,
      naikDari: naikDari,
      tujuan: tujuan,
      bayar: ongkos,
    });
  }

  return hasil;
}

console.log(naikAngkot(["Aldy", "A", "F"]));
