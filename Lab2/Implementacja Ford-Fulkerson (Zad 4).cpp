#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
#include <climits>

using namespace std;

struct Krawedz 
{
    int u, v; 
    int pojemnosc;
    int przeplyw;
    Krawedz(int poczatek, int koniec, int cap) : u(poczatek), v(koniec), pojemnosc(cap), przeplyw(0) {}
};

// DFS w celu znalezienia sciezki powiekszajacej
int dfs(int u, int ujscie, int przeplyw, vector<vector<int>>& graf, vector<int>& rodzic, vector<bool> &odwiedzone) 
{
    if(u == ujscie)
    {
         return przeplyw;
    }
    odwiedzone[u] = true;
    for(int v = 0; v < graf.size(); v++) 
    {
        if(!odwiedzone[v] && graf[u][v] > 0) 
        {
            rodzic[v] = u;
            int przeplyw_w_krawedzi = min(przeplyw, graf[u][v]);
            int sciezkaPrzeplywu = dfs(v, ujscie, przeplyw_w_krawedzi, graf, rodzic, odwiedzone);
            if(sciezkaPrzeplywu > 0)
            {
                return sciezkaPrzeplywu;
            }
        }
    }
    return 0;
}

// Implementacja algorytmu Forda-Fulkersona
int ford_fulkerson(vector<vector<int>>& graf, int zrodlo, int ujscie) 
{
    int n = graf.size();
    vector<vector<int>> graf_residualny = graf; 
    vector<int> rodzic(n, -1); 
    int maksymalnyPrzeplyw = 0;
    while(true) 
    {
        vector<bool> odwiedzone(n, false);
        int sciezkaPrzeplywu = dfs(zrodlo, ujscie, INT_MAX, graf_residualny, rodzic, odwiedzone);
        if(sciezkaPrzeplywu == 0)
        {
            break;
        }
        maksymalnyPrzeplyw = maksymalnyPrzeplyw + sciezkaPrzeplywu;
        for(int v = ujscie; v != zrodlo; v = rodzic[v]) 
        {
            int u = rodzic[v];
            graf_residualny[u][v] = graf_residualny[u][v] - sciezkaPrzeplywu;
            graf_residualny[v][u] = graf_residualny[v][u] + sciezkaPrzeplywu;
        }
    }
    return maksymalnyPrzeplyw;
}

int main() 
{
    vector<vector<int>> graf = 
    {
        {0, 20, 50, 0, 0, 0, 0},  // s
        {0, 0, 0, 60, 50, 0, 0},  // x
        {0, 10, 0, 30, 0, 0, 0},  // y
        {0, 0, 0, 0, 10, 0, 20},   // w
        {0, 0, 0, 0, 0, 80, 40},  // u
        {0, 0, 0, 0, 0, 0, 40},   // e
        {0, 0, 0, 0, 0, 0, 0}     // t
    };
    int zrodlo = 0; 
    int ujscie = 6; 
    int maksymalnyPrzeplyw = ford_fulkerson(graf, zrodlo, ujscie);
    cout << "Maksymalny przeplyw: " << maksymalnyPrzeplyw << endl;
    return 0;
}
