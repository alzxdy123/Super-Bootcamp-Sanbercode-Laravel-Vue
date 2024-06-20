`Contoh Latihan`

Pada game ini terdapat MobilListrik dan MobilSport. Mereka bisa saling Mendahului. Dimana ketika MobilSport mendahului MobilListrik, maka jumlah luas sirkuit pada Mobil Sport akan berkurang. Begitupun sebaliknya.

Buatlah 2 class utama (Mobil dan Balapan), namun kedua kelas tersebut tidak bisa diinstansiasi. ( Hint : yang tidak bisa diinstansiasi yaitu Abctact Class, Interfce, dan Trait)

Kemudian buatlah kelas MobilListrik dan MobilSport, dimana kelas tersebut dapat menggunakan seluruh property dan method yang ada di kelas Mobil dan Balapan. Dan kelas MobilSport dan MobilListrik ini dapat diinstansiasi.

- Adapun property yang ada di kelas Mobil adalah name, luasLintasan dengan nilai default 200, jumlahRoda, dan skill.

- Sedangkan property yang ada di kelas Balapan adalah speedPower

Ketika MobilListrik diinstansiasi, maka jumlahRoda bernilai 4, dan skill bernilai "Stabil di tikungan", speedPower = 20,

Ketika MobilSport diintansiasi, maka jumlahRoda bernilai 4, dan skill bernilai "Melaju Cepat" , speedPower = 30

Method yang harus ada di dalam kelas Mobil :

- kelebihan(), di dalam method ini akan menampilkan string nama dan skill. Contoh "MobilSport1 sedang Melaju cepat" atau "MobilListrik1 sedang Stabil di tikungan".

Method yang harus ada di dalam kelas Balapan :

- mendahului() , di dalam method ini akan menampilkan string sebagai contoh berikut. Contoh : "MobilSport1 sedang mendahului MobilListrik1" atau "MobilListrik1 sedang mendahului MobilSport1".
  didahului(), di dalam method ini akan menampilkan string sebagai contoh berikut. Contoh : "MobilSport1 sedang didahului" atau "MobilListrik1 sedang didahului", kemudian mobil yang mendahului akan berkurang luasLintasan dengan rumus :
  "luasLintasan sekarang - speedPower"

Catatan : method didahului() otomatis dipanggil jika method mendahului() dipanggil.

Method yang harus ada di dalam kelas MobilListrik dan MobilSport :

getInfoKendaraan(), didalam method ini semua property yang ada di dalam kelas Mobil dan Balapan ditampilkan , dan jenis hewan (MobilListrik atau MobilSport).
