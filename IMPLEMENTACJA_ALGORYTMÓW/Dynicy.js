class Graf
{
    constructor(wierzcholki)
    {
        this.V = wierzcholki;
        this.adj = new Array(wierzcholki);
        for(let i = 0; i < wierzcholki; i++)
        {
            this.adj[i] = [];
        }
    }
    //Metoda dodajaca krawedz do grafu
    dodajKrawedz(u, v, przepustowosc)
    {
        this.adj[u].push({v, przepustowosc, przeplyw: 0});
    }
    //Metoda przeszukiwania grafu wszerz (BFS)
    BFS(s, t, rodzic)
    {
        let odwiedzone = new Array(this.V).fill(false);
        let kolejka = [];
        kolejka.push(s);
        odwiedzone[s] = true;
        rodzic[s] = -1;
        while(kolejka.length !== 0)
        {
            let u = kolejka.shift();
            for(let i = 0; i < this.adj[u].length; i++)
            {
                let v = this.adj[u][i].v;
                let przepustowosc = this.adj[u][i].przepustowosc;
                if(!odwiedzone[v] && przepustowosc > 0)
                {
                    kolejka.push(v);
                    rodzic[v] = u;
                    odwiedzone[v] = true;
                }
            }
        }
        return odwiedzone[t];
    }
    //Metoda znajdujaca maksymalny przeplyw w grafie
    DinicMaksymalnyPrzeplyw(zrodlo, ucho)
    {
        if(zrodlo === ucho)
        {
            return -1;
        }
        let rodzic = new Array(this.V);
        let maksymalnyPrzeplyw = 0;
        while(this.BFS(zrodlo, ucho, rodzic))
        {
            let przeplywSciezki = Infinity;
            //Szukanie minimalnego przeplywu na sciezce
            for(let v = ucho; v != zrodlo; v = rodzic[v])
            {
                let u = rodzic[v];
                let idx = this.adj[u].findIndex(item => item.v === v);
                przeplywSciezki = Math.min(przeplywSciezki, this.adj[u][idx].przepustowosc);
            }
            //Aktualizacja przeplywu na sciezce
            for(let v = ucho; v != zrodlo; v = rodzic[v])
            {
                let u = rodzic[v];
                let idx = this.adj[u].findIndex(item => item.v === v);
                this.adj[u][idx].przepustowosc -= przeplywSciezki;
                let reverseIdx = this.adj[v].findIndex(item => item.v === u);
                if(reverseIdx === -1)
                {
                    this.adj[v].push({v: u, przepustowosc: 0, przeplyw: 0});
                    reverseIdx = this.adj[v].length - 1;
                }
                this.adj[v][reverseIdx].przepustowosc += przeplywSciezki;
            }
            maksymalnyPrzeplyw = maksymalnyPrzeplyw + przeplywSciezki;
        }
        return maksymalnyPrzeplyw;
    }
}

//Przyklad
let graf = new Graf(6);
graf.dodajKrawedz(0, 1, 16);
graf.dodajKrawedz(0, 2, 13);
graf.dodajKrawedz(1, 2, 10);
graf.dodajKrawedz(1, 3, 12);
graf.dodajKrawedz(2, 1, 4);
graf.dodajKrawedz(2, 4, 14);
graf.dodajKrawedz(3, 2, 9);
graf.dodajKrawedz(3, 5, 20);
graf.dodajKrawedz(4, 3, 7);
graf.dodajKrawedz(4, 5, 4);
console.log("Maksymalny przeplyw: " + graf.DinicMaksymalnyPrzeplyw(0, 5));