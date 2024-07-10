function bintangPagar(angka) {
  for (var i = 1; i <= angka; i++) {
    var hasil = "";

    for (var a = 1; a <= i; a++) {
      if (a % 2 === 0) {
        hasil += "#";
      } else {
        hasil += "*";
      }
    }

    console.log(hasil);
  }
}

bintangPagar(5);
