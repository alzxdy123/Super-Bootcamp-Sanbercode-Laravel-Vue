<?php 

trait Mobil {
    public $name;
    public $luasLintasan = 200;
    public $jumlahRoda;
    public $skill;

    public function Kelebihan() {
        echo "$this->name memiliki kelebihan $this->skill";
    }
}

trait Balapan {
    public $speedPower;

    public function Mendahului($mobil) {
        echo "$this->name mendahului $mobil->name";
        echo "<br>";
        $mobil->Didahului($this);
    }

    public function Didahului($mobil) {
        echo "$this->name didahului $mobil->name <br> <br>";
        echo $mobil->getInfoKendaraan();
        echo "<br>";
        echo $mobil->luasLintasan -= $mobil->speedPower;
    }
}

class MobilListrik {
    use Mobil, Balapan;

    public function __construct($name, $jumlahRoda, $skill, $speedPower) {
        $this->name = $name;
        $this->jumlahRoda = $jumlahRoda;
        $this->skill = $skill;
        $this->speedPower = $speedPower;
    }

    public function getInfoKendaraan() {
        echo "Nama: " . $this->name . "<br>";
        echo "Luas Lintasan: " . $this->luasLintasan . "<br>";
        echo "Jumlah Roda: " . $this->jumlahRoda . "<br>";
        echo "Skill: " . $this->skill . "<br>";
        echo "Speed Power: " . $this->speedPower . "<br>";
    }
}

class MobilSport {
    use Mobil, Balapan;

    public function __construct($name, $jumlahRoda, $skill, $speedPower) {
        $this->name = $name;
        $this->jumlahRoda = $jumlahRoda;
        $this->skill = $skill;
        $this->speedPower = $speedPower;
    }

    public function getInfoKendaraan() {
        echo "Nama: " . $this->name . "<br>";
        echo "Luas Lintasan: " . $this->luasLintasan . "<br>";
        echo "Jumlah Roda: " . $this->jumlahRoda . "<br>";
        echo "Skill: " . $this->skill . "<br>";
        echo "Speed Power: " . $this->speedPower . "<br>";
    }
}

$tesla = new MobilListrik('Tesla', 4, "Stabil di tikungan", 20);
$buggati = new MobilSport('Buggati', 4, "Melaju cepat", 30);

echo $tesla->Kelebihan();
echo "<br>";
echo $buggati->Kelebihan();

echo "<br>";
echo "<br>";

echo $tesla->Mendahului($buggati);

echo "<br>";
echo "<br>";

echo $buggati->Mendahului($tesla);