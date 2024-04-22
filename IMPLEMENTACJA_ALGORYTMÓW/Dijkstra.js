class Wezel 
{
    constructor(wartosc, priorytet) 
    {
        this.wartosc = wartosc;
        this.priorytet = priorytet;
    }
}

class KolejkaPriorytetowa 
{
    constructor() 
    {
        this.elementy = [];
    }
    
    dodaj(wartosc, priorytet) 
    {
        let nowyWezel = new Wezel(wartosc, priorytet);
        this.elementy.push(nowyWezel);
        this.przesunDoGory();
    }
    
    przesunDoGory() 
    {
        let indeks = this.elementy.length - 1;
        const element = this.elementy[indeks];
        while (indeks > 0) 
        {
            let indeksRodzica = Math.floor((indeks - 1) / 2);
            let rodzic = this.elementy[indeksRodzica];
            if(element.priorytet >= rodzic.priorytet) break;
            this.elementy[indeksRodzica] = element;
            this.elementy[indeks] = rodzic;
            indeks = indeksRodzica;
        }
    }

    usun() 
    {
        const minimalny = this.elementy[0];
        const koniec = this.elementy.pop();
        if(this.elementy.length > 0) 
        {
            this.elementy[0] = koniec;
            this.przesunDoDolu();
        }
        return minimalny;
    }

    przesunDoDolu() 
    {
        let indeks = 0;
        const dlugosc = this.elementy.length;
        const element = this.elementy[0];
        while(true) 
        {
            let indeksLewegoDziecka = 2 * indeks + 1;
            let indeksPrawegoDziecka = 2 * indeks + 2;
            let leweDziecko, praweDziecko;
            let zamiana = null;
            if(indeksLewegoDziecka < dlugosc) 
            {
                leweDziecko = this.elementy[indeksLewegoDziecka];
                if(leweDziecko.priorytet < element.priorytet) 
                {
                    zamiana = indeksLewegoDziecka;
                }
            }
            if(indeksPrawegoDziecka < dlugosc) 
            {
                praweDziecko = this.elementy[indeksPrawegoDziecka];
                if(
                    (zamiana === null && praweDziecko.priorytet < element.priorytet) ||
                    (zamiana !== null && praweDziecko.priorytet < leweDziecko.priorytet)
                ) 
                {
                    zamiana = indeksPrawegoDziecka;
                }
            }
            if(zamiana === null) break;
            this.elementy[indeks] = this.elementy[zamiana];
            this.elementy[zamiana] = element;
            indeks = zamiana;
        }
    }
}

class GrafWazony 
{
    constructor() 
    {
        this.listaSasiedztwa = {};
    }
    dodajWierzcholek(wierzcholek) 
    {
        if(!this.listaSasiedztwa[wierzcholek]) this.listaSasiedztwa[wierzcholek] = [];
    }
    dodajKrawedz(wierzcholek1, wierzcholek2, waga) 
    {
        this.listaSasiedztwa[wierzcholek1].push({ wezel: wierzcholek2, waga });
    }
    Dijkstra(start, koniec) 
    {
        const wezly = new KolejkaPriorytetowa();
        const odleglosci = {};
        const poprzednie = {};
        let sciezka = [];
        let najmniejszy;
        for(let wierzcholek in this.listaSasiedztwa) 
        {
            if(wierzcholek === start) 
            {
                odleglosci[wierzcholek] = 0;
                wezly.dodaj(wierzcholek, 0);
            } 
            else 
            {
                odleglosci[wierzcholek] = Infinity;
                wezly.dodaj(wierzcholek, Infinity);
            }
            poprzednie[wierzcholek] = null;
        }
        while(wezly.elementy.length) 
        {
            najmniejszy = wezly.usun().wartosc;
            if(najmniejszy === koniec) 
            {
                while(poprzednie[najmniejszy]) 
                {
                    sciezka.push(najmniejszy);
                    najmniejszy = poprzednie[najmniejszy];
                }
                break;
            }
            if(najmniejszy || odleglosci[najmniejszy] !== Infinity) 
            {
                for(let sasiad in this.listaSasiedztwa[najmniejszy]) 
                {
                    let nastepnyWezel = this.listaSasiedztwa[najmniejszy][sasiad];
                    let kandydat = odleglosci[najmniejszy] + nastepnyWezel.waga;
                    let nastepnySasiad = nastepnyWezel.wezel;
                    if(kandydat < odleglosci[nastepnySasiad]) 
                    {
                        odleglosci[nastepnySasiad] = kandydat;
                        poprzednie[nastepnySasiad] = najmniejszy;
                        wezly.dodaj(nastepnySasiad, kandydat);
                    }
                }
            }
        }
        return sciezka.concat(start).reverse();
    }
}

var graf = new GrafWazony();
graf.dodajWierzcholek("A");
graf.dodajWierzcholek("B");
graf.dodajWierzcholek("C");
graf.dodajWierzcholek("D");
graf.dodajWierzcholek("E");
graf.dodajWierzcholek("F");

graf.dodajKrawedz("A", "B", 4);
graf.dodajKrawedz("A", "C", 2);
graf.dodajKrawedz("B", "E", 3);
graf.dodajKrawedz("C", "D", 2);
graf.dodajKrawedz("C", "F", 4);
graf.dodajKrawedz("D", "E", 3);
graf.dodajKrawedz("D", "F", 1);
graf.dodajKrawedz("E", "F", 1);

console.log(graf.Dijkstra("A", "F"));
