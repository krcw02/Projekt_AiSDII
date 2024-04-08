class Wezel {
  constructor(wartosc, priorytet) {
    this.wartosc = wartosc;
    this.priorytet = priorytet;
  }
}

class KolejkaPriorytetowa {
  constructor() {
    this.elementy = [];
  }
  
  dodaj(wartosc, priorytet) {
    let nowyWezel = new Wezel(wartosc, priorytet);
    this.elementy.push(nowyWezel);
    this.przesunDoGory();
  }
  
  przesunDoGory() {
    let indeks = this.elementy.length - 1;
    const element = this.elementy[indeks];
    while (indeks > 0) {
      let indeksRodzica = Math.floor((indeks - 1) / 2);
      let rodzic = this.elementy[indeksRodzica];
      if (element.priorytet >= rodzic.priorytet) break;
      this.elementy[indeksRodzica] = element;
      this.elementy[indeks] = rodzic;
      indeks = indeksRodzica;
    }
  }
  
  usun() {
    const minimalny = this.elementy[0];
    const koniec = this.elementy.pop();
    if (this.elementy.length > 0) {
      this.elementy[0] = koniec;
      this.przesunDoDolu();
    }
    return minimalny;
  }
  
  przesunDoDolu() {
    let indeks = 0;
    const dlugosc = this.elementy.length;
    const element = this.elementy[0];
    while (true) {
      let indeksLewegoDziecka = 2 * indeks + 1;
      let indeksPrawegoDziecka = 2 * indeks + 2;
      let leweDziecko, praweDziecko;
      let zamiana = null;

      if (indeksLewegoDziecka < dlugosc) {
        leweDziecko = this.elementy[indeksLewegoDziecka];
        if (leweDziecko.priorytet < element.priorytet) {
          zamiana = indeksLewegoDziecka;
        }
      }
      if (indeksPrawegoDziecka < dlugosc) {
        praweDziecko = this.elementy[indeksPrawegoDziecka];
        if (
          (zamiana === null && praweDziecko.priorytet < element.priorytet) ||
          (zamiana !== null && praweDziecko.priorytet < leweDziecko.priorytet)
        ) {
          zamiana = indeksPrawegoDziecka;
        }
      }
      if (zamiana === null) break;
      this.elementy[indeks] = this.elementy[zamiana];
      this.elementy[zamiana] = element;
      indeks = zamiana;
    }
  }
}

class GrafWażony {
  constructor() {
    this.listaSąsiedztwa = {};
  }
  
  dodajWierzchołek(wierzchołek) {
    if (!this.listaSąsiedztwa[wierzchołek]) this.listaSąsiedztwa[wierzchołek] = [];
  }
  
  dodajKrawędź(wierzchołek1, wierzchołek2, waga) {
    this.listaSąsiedztwa[wierzchołek1].push({ węzeł: wierzchołek2, waga });
  }
  
  Dijkstra(start, koniec) {
    const węzły = new KolejkaPriorytetowa();
    const odległości = {};
    const poprzednie = {};
    let ścieżka = [];
    let najmniejszy;
    for (let wierzchołek in this.listaSąsiedztwa) {
      if (wierzchołek === start) {
        odległości[wierzchołek] = 0;
        węzły.dodaj(wierzchołek, 0);
      } else {
        odległości[wierzchołek] = Infinity;
        węzły.dodaj(wierzchołek, Infinity);
      }
      poprzednie[wierzchołek] = null;
    }
    while (węzły.elementy.length) {
      najmniejszy = węzły.usun().wartosc;
      if (najmniejszy === koniec) {
        while (poprzednie[najmniejszy]) {
          ścieżka.push(najmniejszy);
          najmniejszy = poprzednie[najmniejszy];
        }
        break;
      }
      if (najmniejszy || odległości[najmniejszy] !== Infinity) {
        for (let sąsiad in this.listaSąsiedztwa[najmniejszy]) {
          let następnyWęzeł = this.listaSąsiedztwa[najmniejszy][sąsiad];
          let kandydat = odległości[najmniejszy] + następnyWęzeł.waga;
          let następnySąsiad = następnyWęzeł.węzeł;
          if (kandydat < odległości[następnySąsiad]) {
            odległości[następnySąsiad] = kandydat;
            poprzednie[następnySąsiad] = najmniejszy;
            węzły.dodaj(następnySąsiad, kandydat);
          }
        }
      }
    }
    return ścieżka.concat(start).reverse();
  }
}

var graf = new GrafWażony();
graf.dodajWierzchołek("A");
graf.dodajWierzchołek("B");
graf.dodajWierzchołek("C");
graf.dodajWierzchołek("D");
graf.dodajWierzchołek("E");
graf.dodajWierzchołek("F");

graf.dodajKrawędź("A", "B", 4);
graf.dodajKrawędź("A", "C", 2);
graf.dodajKrawędź("B", "E", 3);
graf.dodajKrawędź("C", "D", 2);
graf.dodajKrawędź("C", "F", 4);
graf.dodajKrawędź("D", "E", 3);
graf.dodajKrawędź("D", "F", 1);
graf.dodajKrawędź("E", "F", 1);

console.log(graf.Dijkstra("A", "F"));
