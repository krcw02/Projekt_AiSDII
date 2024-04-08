class Wezel
{
    constructor(symbol, czestotliwosc)
    {
        this.symbol = symbol;
        this.czestotliwosc = czestotliwosc;
        this.lewy = null;
        this.prawy = null;
    }
}

class Huffman
{
    constructor()
    {
        this.korzen = null;
    }
    //Budowanie drzewa kodow Huffmana
    budujDrzewo(symbole, czestotliwosci)
    {
        let wezly = [];
        for(let i = 0; i < symbole.length; i++)
        {
            wezly.push(new Wezel(symbole[i], czestotliwosci[i]));
        }
        //Tworzenie kolejki priorytetowej wezlow
        wezly.sort((a, b) => a.czestotliwosc - b.czestotliwosc);
        while(wezly.length > 1)
        {
            //Pobranie dwoch najmniejszych wezlow
            let lewy = wezly.shift();
            let prawy = wezly.shift();
            //Tworzenie wezla posredniego
            let rodzic = new Wezel(null, lewy.czestotliwosc + prawy.czestotliwosc);
            rodzic.lewy = lewy;
            rodzic.prawy = prawy;
            //Wstawienie wezla posredniego do kolejki
            wezly.push(rodzic);
            wezly.sort((a, b) => a.czestotliwosc - b.czestotliwosc);
        }
        this.korzen = wezly[0];
    }
    //Funkcja pomocnicza do rekurencyjnego tworzenia kodow Huffmana
    pom_generujKody(wezel, obecnyKod, kody)
    {
        if(wezel.symbol !== null)
        {
            kody[wezel.symbol] = obecnyKod;
        }
        else
        {
            this.pom_generujKody(wezel.lewy, obecnyKod + "0", kody);
            this.pom_generujKody(wezel.prawy, obecnyKod + "1", kody);
        }
    }
    //Funkcja generujaca kody Huffmana dla poszczegolnych symboli
    generujKody()
    {
        let kody = {};
        this.pom_generujKody(this.korzen, "", kody);
        return kody;
    }
}

//PRZYKLAD
let symbole = ['a', 'b', 'c', 'd', 'e', 'f'];
let czestotliwosci = [5, 9, 12, 13, 16, 45];
let huffman = new Huffman();
huffman.budujDrzewo(symbole, czestotliwosci);
let kody = huffman.generujKody();
console.log("Kody Huffmana dla poszczegolnych symboli:");
for(let symbol in kody)
{
    console.log(`${symbol}: ${kody[symbol]}`);
}