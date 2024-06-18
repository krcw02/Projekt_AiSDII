class Wezel {
  constructor(symbol, czestotliwosc) {
    this.symbol = symbol;
    this.czestotliwosc = czestotliwosc;
    this.lewy = null;
    this.prawy = null;
  }
}

class Huffman {
  constructor() {
    this.korzen = null;
  }

  // Budowanie drzewa kodow Huffmana
  budujDrzewo(symbole, czestotliwosci) {
    let wezly = [];
    for (let i = 0; i < symbole.length; i++) {
      wezly.push(new Wezel(symbole[i], czestotliwosci[i]));
    }

    // Tworzenie kolejki priorytetowej wezlow
    wezly.sort((a, b) => a.czestotliwosc - b.czestotliwosc);
    while (wezly.length > 1) {
      // Pobranie dwoch najmniejszych wezlow
      let lewy = wezly.shift();
      let prawy = wezly.shift();

      // Tworzenie wezla posredniego
      let rodzic = new Wezel(null, lewy.czestotliwosc + prawy.czestotliwosc);
      rodzic.lewy = lewy;
      rodzic.prawy = prawy;

      // Wstawienie wezla posredniego do kolejki
      wezly.push(rodzic);
      wezly.sort((a, b) => a.czestotliwosc - b.czestotliwosc);
    }
    this.korzen = wezly[0];
  }

  // Funkcja pomocnicza do rekurencyjnego tworzenia kodow Huffmana
  pom_generujKody(wezel, obecnyKod, kody) {
    if (wezel.symbol !== null) {
      kody[wezel.symbol] = obecnyKod;
    } else {
      this.pom_generujKody(wezel.lewy, obecnyKod + "0", kody);
      this.pom_generujKody(wezel.prawy, obecnyKod + "1", kody);
    }
  }

  // Funkcja generujaca kody Huffmana dla poszczegolnych symboli
  generujKody() {
    let kody = {};
    this.pom_generujKody(this.korzen, "", kody);
    return kody;
  }

  // Obliczanie długości oryginalnej wiadomości (zakładając, że każdy symbol to 1 bajt = 8 bitów)
  obliczDlugoscOryginalnejWiadomosci(symbole, czestotliwosci) {
    let dlugosc = 0;
    for (let i = 0; i < symbole.length; i++) {
      dlugosc += 8 * czestotliwosci[i];
    }
    return dlugosc;
  }

  // Obliczanie długości skompresowanej wiadomości
  obliczDlugoscSkompresowanejWiadomosci(kody, czestotliwosci) {
    let dlugosc = 0;
    for (let symbol in kody) {
      let index = symbole.indexOf(symbol);
      dlugosc += kody[symbol].length * czestotliwosci[index];
    }
    return dlugosc;
  }
  obliczanieTablicyPrzejsc(wzorzec) {
    const M = wzorzec.length;
    const lps = new Array(M).fill(0);
    let dlugosc = 0;
    let i = 1;
    while (i < M) {
      if (wzorzec[i] === wzorzec[dlugosc]) {
        dlugosc++;
        lps[i] = dlugosc;
        i++;
      } else {
        if (dlugosc !== 0) {
          dlugosc = lps[dlugosc - 1];
        } else {
          lps[i] = 0;
          i++;
        }
      }
    }
    return lps;
  }
  zamienWzorzec(tekst, staryWzorzec, nowyWzorzec) {
    const N = tekst.length;
    const M = staryWzorzec.length;
    const lps = this.obliczanieTablicyPrzejsc(staryWzorzec);
    let i = 0; // Indeks dla tekstu
    let j = 0; // Indeks dla wzorca
    let wynik = "";
    let poczatek = 0; // Początkowa pozycja fragmentu do skopiowania

    while (i < N) {
      if (staryWzorzec[j] === tekst[i]) {
        i++;
        j++;
      }

      if (j === M) {
        wynik += tekst.substring(poczatek, i - M) + nowyWzorzec;
        poczatek = i;
        j = 0;
      } else if (i < N && staryWzorzec[j] !== tekst[i]) {
        if (j !== 0) {
          j = lps[j - 1];
        } else {
          i++;
        }
      }
    }
    wynik += tekst.substring(poczatek);
    return wynik;
  }
}

export { Huffman };

// PRZYKLAD
const tekstMelodii =
  "ZapoliSzKryspoli123polipoliabcdUlalapolipolibolipolibolimelodiamelodiatajest";
const staryWzorzec = "poli";
const nowyWzorzec = "boli";
const nowyTekstMelodii = Huffman.prototype.zamienWzorzec(
  tekstMelodii,
  staryWzorzec,
  nowyWzorzec
);
console.log("Nowy tekst melodii po zamianie 'poli' na 'boli':");
console.log(nowyTekstMelodii);

let symbole = [];
let czestotliwosci = [];
for (let char of nowyTekstMelodii) {
  let index = symbole.indexOf(char);
  if (index === -1) {
    symbole.push(char);
    czestotliwosci.push(1);
  } else {
    czestotliwosci[index]++;
  }
}

let huffman = new Huffman();
huffman.budujDrzewo(symbole, czestotliwosci);
let kody = huffman.generujKody();
console.log("Kody Huffmana dla poszczególnych symboli:");
for (let symbol in kody) {
  console.log(`${symbol}: ${kody[symbol]}`);
}

let dlugoscOryginalnejWiadomosci = huffman.obliczDlugoscOryginalnejWiadomosci(
  symbole,
  czestotliwosci
);
let dlugoscSkompresowanejWiadomosci =
  huffman.obliczDlugoscSkompresowanejWiadomosci(kody, czestotliwosci);
let stopienKompresji =
  dlugoscOryginalnejWiadomosci / dlugoscSkompresowanejWiadomosci;
console.log("Stopień kompresji:", stopienKompresji);
