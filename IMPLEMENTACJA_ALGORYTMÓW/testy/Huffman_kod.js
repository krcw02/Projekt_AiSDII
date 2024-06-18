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

    budujDrzewo(symbole, czestotliwosci) {
        let wezly = [];
        for (let i = 0; i < symbole.length; i++) {
            wezly.push(new Wezel(symbole[i], czestotliwosci[i]));
        }
        wezly.sort((a, b) => a.czestotliwosc - b.czestotliwosc);
        while (wezly.length > 1) {
            let lewy = wezly.shift();
            let prawy = wezly.shift();
            let rodzic = new Wezel(null, lewy.czestotliwosc + prawy.czestotliwosc);
            rodzic.lewy = lewy;
            rodzic.prawy = prawy;
            wezly.push(rodzic);
            wezly.sort((a, b) => a.czestotliwosc - b.czestotliwosc);
        }
        this.korzen = wezly[0];
    }

    pom_generujKody(wezel, obecnyKod, kody) {
        if (wezel.symbol !== null) {
            kody[wezel.symbol] = obecnyKod;
        } else {
            this.pom_generujKody(wezel.lewy, obecnyKod + "0", kody);
            this.pom_generujKody(wezel.prawy, obecnyKod + "1", kody);
        }
    }

    generujKody() {
        let kody = {};
        this.pom_generujKody(this.korzen, "", kody);
        return kody;
    }

    obliczStopienKompresji(symbole, czestotliwosci) {
        let dlugoscOryginalna = symbole.reduce((acc, symbol, index) => acc + 8 * czestotliwosci[index], 0);
        
        let huffman = new Huffman();
        huffman.budujDrzewo(symbole, czestotliwosci);
        let kody = huffman.generujKody();
        let dlugoscSkompresowana = 0;
        for (let symbol in kody) {
            let index = symbole.indexOf(symbol);
            dlugoscSkompresowana += kody[symbol].length * czestotliwosci[index];
        }

        let stopienKompresji = dlugoscOryginalna / dlugoscSkompresowana;
        return stopienKompresji;
    }
}

module.exports = Huffman;
