class Graf
{
    constructor(wierzcholki)
    {
        this.V = wierzcholki; //Liczba wierzcholkow
        this.graf = [] //Tablica krawedzi
    }
    dodajKrawedz(u, v, w)
    {
        this.graf.push([u, v, w]);
    }
    //Znajdowanie zbioru wierzcholka "i"
    znajdz(rodzic, i)
    {
        if(rodzic[i] === i)
        {
            return i;
        }
        return this.znajdz(rodzic, rodzic[i]);
    }
    //Dolaczanie "x" i "y" do tego samego zbioru
    scal(rodzic, ranga, x, y)
    {
        let xKorzen = this.znajdz(rodzic, x);
        let yKorzen = this.znajdz(rodzic, y);
        if(ranga[xKorzen] < ranga[yKorzen])
        {
            rodzic[xKorzen] = yKorzen;
        }
        else if(ranga[xKorzen] > ranga[yKorzen])
        {
            rodzic[yKorzen] = xKorzen;
        }
        else
        {
            rodzic[yKorzen] = xKorzen;
            ranga[xKorzen]++;
        }
    }
    kruskalMST()
    {
        let wynik = []; //Krawedzie minimalnego drzewa rozpinajacego
        let i = 0; //Indeks dla krawedzi wynikowych
        let e = 0; //Indeks dla krawedzi w posortowanej kolejnosci
        //Sortowanie krawedzi wedlug wagi
        this.graf.sort((a, b) => a[2] - b[2]);
        let rodzic = [];
        let ranga = [];
        //Inicjalizacja zbioru
        for(let v = 0; v < this.V; v++)
        {
            rodzic[v] = v;
            ranga[v] = 0;
        }
        while(i < this.V - 1)
        {
            let[u, v, w] = this.graf[e++];
            let x = this.znajdz(rodzic, u);
            let y = this.znajdz(rodzic, v);
            //Jesli dodanie krawedzi nie stworzy cyklu, dodajemy do wyniku
            if(x !== y)
            {
                wynik[i++] = [u, v, w];
                this.scal(rodzic, ranga, x, y);
            }
        }
        return wynik;
    }
}

//PRZYKLAD
let g = new Graf(4);
//dodajemy wierzcholki, na koncu waga
g.dodajKrawedz(0, 1, 10);
g.dodajKrawedz(0, 2, 6);
g.dodajKrawedz(0, 3, 5);
g.dodajKrawedz(1, 3, 15);
g.dodajKrawedz(2, 3, 4);
console.log("Minimalne drzewo rozpinajace (Kruskal):");
console.log(g.kruskalMST());