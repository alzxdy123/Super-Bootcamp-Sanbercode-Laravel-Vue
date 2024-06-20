<?php 

abstract class Hewan {
    public $nama;
    public $darah = 50;
    public $jumlahKaki;
    public $keahlian;

    abstract public function Atraksi();
    abstract public function GetInfoHewan();
}

trait Fight {
    public $attackPower;
    public $defencePower;

    public function Serang($target) {
        echo "$this->nama menyerang $target->nama <br>";
        $target->DiSerang($this);
    }
    public function DiSerang($attacker) {
        echo "$this->nama sedang diserang <br>";

        $demage = $attacker->attackPower / $this->defencePower;
        $this->darah -= $demage;

        echo "Darah $this->nama saat ini : $this->darah";
    }
}

class Harimau extends Hewan {
    use Fight;

    public function __construct($nama) {
        $this->nama = $nama;
        $this->jumlahKaki = 4;
        $this->keahlian = "Lari cepat";
        $this->attackPower = 7;
        $this->defencePower = 8;
    }

    public function Atraksi() {
        return "{$this->nama} sedang {$this->keahlian}";
    }

    public function GetInfoHewan() {
        echo "Nama hewan : $this->nama <br>";
        echo "Jumlah kaki : $this->jumlahKaki <br>";
        echo "Keahlian : $this->keahlian <br>";
        echo "Attack : $this->attackPower <br>";
        echo "Defence : $this->defencePower <br>";
    }
}

class Elang extends Hewan{
    use Fight;

    public function __construct($nama) {
        $this->nama = $nama;
        $this->jumlahKaki = 2;
        $this->keahlian = "Terbang tinggi";
        $this->attackPower = 10;
        $this->defencePower = 5;
    }

    public function Atraksi() {
        return "{$this->nama} sedang {$this->keahlian}";
    }


    public function GetInfoHewan() {
        echo "Nama hewan : $this->nama <br>";
        echo "Jumlah kaki : $this->jumlahKaki <br>";
        echo "Keahlian : $this->keahlian <br>";
        echo "Attack : $this->attackPower <br>";
        echo "Defence : $this->defencePower <br>";
    }
}

$elang_1 = new Elang("Elang1");
$harimau_1 = new Harimau("Harimau1");

echo $elang_1->GetInfoHewan();
echo "<br>";
echo $elang_1->Atraksi();
echo "<br> <br>";
echo $harimau_1->GetInfoHewan();
echo "<br>";
echo $harimau_1->Atraksi();

echo "<br> <br>";

echo $elang_1->Serang($harimau_1);
echo "<br> <br>";
echo $harimau_1->Serang($elang_1);
