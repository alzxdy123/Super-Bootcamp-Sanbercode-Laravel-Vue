// Soal condition 1

var nama = "aldy";
var peran = "werewolf";

if (nama == "" && peran == "") {
  console.log("Nama harus di isi");
} else if (nama !== "") {
  if (peran == "") {
    console.log("Halo " + nama + ", Pilih peranmu untuk memulai game");
  } else if (peran.toLocaleLowerCase() == "penyihir") {
    console.log(
      "Halo " +
        peran +
        " " +
        nama +
        ", kamu dapat melihat siapa saja yg menjadi werewolf"
    );
  } else if (peran.toLocaleLowerCase() == "guard") {
    console.log(
      "Hallo " +
        peran +
        " " +
        nama +
        ", kamu akan membantu melindungi teman mu dari serangan werewolf"
    );
  } else if (peran.toLocaleLowerCase() == "werewolf") {
    console.log(
      "Hallo " + peran + " " + nama + ", Kamu akan memakan mangsa setiap malam"
    );
  } else {
    console.log("Peran tidak ada di dalam game");
  }
} else {
  console.log("Input inavalid");
}
