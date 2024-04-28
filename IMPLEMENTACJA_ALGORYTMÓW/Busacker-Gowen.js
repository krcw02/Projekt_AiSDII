class Krawedz {
    constructor(poczatek, koniec, przepustowosc, koszt) {
        this.poczatek = poczatek;
        this.koniec = koniec;
        this.przepustowosc = przepustowosc;
        this.koszt = koszt;
        this.przeplyw = 0;
    }
}

class Graf {
    constructor(V) {
        this.V = V;
        this.krawedzie = [];
        this.sasiedztwo = new Array(V).fill(null).map(() => []);
    }

    dodajKrawedz(poczatek, koniec, przepustowosc, koszt) {
        const krawedz1 = new Krawedz(poczatek, koniec, przepustowosc, koszt);
        const krawedz2 = new Krawedz(koniec, poczatek, 0, -koszt);
        this.sasiedztwo[poczatek].push(this.krawedzie.length);
        this.krawedzie.push(krawedz1);
        this.sasiedztwo[koniec].push(this.krawedzie.length);
        this.krawedzie.push(krawedz2);
    }

    algorytmBellmanaForda(s, t) {
        const odleglosci = new Array(this.V).fill(Number.POSITIVE_INFINITY);
        const poprzednicy = new Array(this.V).fill(-1);
        odleglosci[s] = 0;

        for (let i = 0; i < this.V - 1; i++) {
            for (const krawedz of this.krawedzie) {
                if (krawedz.przepustowosc - krawedz.przeplyw > 0 && odleglosci[krawedz.poczatek] + krawedz.koszt < odleglosci[krawedz.koniec]) {
                    odleglosci[krawedz.koniec] = odleglosci[krawedz.poczatek] + krawedz.koszt;
                    poprzednicy[krawedz.koniec] = krawedz;
                }
            }
        }

        return { odleglosci, poprzednicy };
    }

    najtanszyPrzeplywMaksymalny(s, t, F) {
        let calkowityPrzeplyw = 0;
        let calkowityKoszt = 0;

        while (calkowityPrzeplyw < F) {
            const { odleglosci, poprzednicy } = this.algorytmBellmanaForda(s, t);

            if (odleglosci[t] === Number.POSITIVE_INFINITY) {
                // Brak sciezki do ujscia
                break;
            }

            // Znalezienie najtanszej sciezki
            let przeplywSciezki = F - calkowityPrzeplyw;
            let obecny = t;
            while (obecny !== s) {
                const krawedz = poprzednicy[obecny];
                przeplywSciezki = Math.min(przeplywSciezki, krawedz.przepustowosc - krawedz.przeplyw);
                obecny = krawedz.poczatek;
            }

            // Aktualizacja przeplywu i kosztu
            obecny = t;
            while (obecny !== s) {
                const krawedz = poprzednicy[obecny];
                krawedz.przeplyw += przeplywSciezki;
                this.krawedzie[krawedz.koniec ^ 1].przeplyw -= przeplywSciezki; // odwrocenie krawedzi
                calkowityKoszt += przeplywSciezki * krawedz.koszt;
                obecny = krawedz.poczatek;
            }

            calkowityPrzeplyw += przeplywSciezki;
        }

        return { calkowityPrzeplyw, calkowityKoszt };
    }
}

// Przykladowe uzycie
const V = 4; // Liczba wierzcholkow
const graf = new Graf(V);

// Dodawanie krawedzi
graf.dodajKrawedz(0, 1, 3, 1); // poczatek, koniec, przepustowosc, koszt
graf.dodajKrawedz(0, 2, 2, 2);
graf.dodajKrawedz(1, 2, 2, 1);
graf.dodajKrawedz(1, 3, 3, 3);
graf.dodajKrawedz(2, 3, 2, 1);

const zrodlo = 0;
const ujscie = 3;
const F = 4; // Docelowy przeplyw

const { calkowityPrzeplyw, calkowityKoszt } = graf.najtanszyPrzeplywMaksymalny(zrodlo, ujscie, F);
console.log("Najtanszy przeplyw:", calkowityPrzeplyw);
console.log("Koszt:", calkowityKoszt);
