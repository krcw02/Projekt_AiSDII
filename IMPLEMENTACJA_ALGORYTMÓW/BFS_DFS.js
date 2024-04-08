class Graf
{
    constructor()
    {
        this.sasiedztwo = {}; //Lista sasiedztwa
    }
    dodajKrawedz(u, v)
    {
        if(!this.sasiedztwo[u])
        {
            this.sasiedztwo[u] = [];
        }
        if(!this.sasiedztwo[v])
        {
            this.sasiedztwo[v] = [];
        }
        this.sasiedztwo[u].push(v);
        this.sasiedztwo[v].push(u); 
    }
    bfs(start)
    {
        let odwiedzone = {};
        let kolejka = [];
        let wynik = [];
        odwiedzone[start] = true;
        kolejka.push(start);
        while(kolejka.length)
        {
            let obecny = kolejka.shift();
            wynik.push(obecny);
            this.sasiedztwo[obecny].forEach(sasiad => {
                if(!odwiedzone[sasiad])
                {
                    odwiedzone[sasiad] = true;
                    kolejka.push(sasiad);
                }
            });
        }
        return wynik;
    }
    dfs(start)
    {
        let odwiedzone = {};
        let wynik = [];
        const dfsRekurencyjnie = (wierzcholek) => {
            odwiedzone[wierzcholek] = true;
            wynik.push(wierzcholek);
            this.sasiedztwo[wierzcholek].forEach(sasiad => {
                if(!odwiedzone[sasiad])
                {
                    dfsRekurencyjnie(sasiad);
                }
            });
        };
        dfsRekurencyjnie(start);
        return wynik;
    }
}

//PRZYKLAD
let g = new Graf();
g.dodajKrawedz('A', 'B');
g.dodajKrawedz('A', 'C');
g.dodajKrawedz('B', 'D');
g.dodajKrawedz('B', 'E');
g.dodajKrawedz('C', 'F');
console.log("Przeszukiwanie wszerz (BFS):");
console.log(g.bfs('A'));
console.log("Przeszukiwanie w głab (DFS):");
console.log(g.dfs('A'));