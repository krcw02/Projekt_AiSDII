#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
#include <climits>

using namespace std;

// Implementacja algorytmu Edmondsa-Karpa
int edmonds_karp(vector<vector<int>> &graf, int zrodlo, int ujscie) 
{
    int n = graf.size();
    vector<vector<int>> graf_residualny = graf; // siec rezydualna
    vector<int> rodzic(n, -1); // tablica rodzicow dla sciezki powiekszajacej
    int maksymalnyPrzeplyw = 0;
    while(true) 
    {
        queue<int> kolejka;
        kolejka.push(zrodlo);
        fill(rodzic.begin(), rodzic.end(), -1);
        // BFS w celu znalezienia sciezki powiekszajacej
        while(!kolejka.empty() && rodzic[ujscie] == -1) 
        {
            int u = kolejka.front();
            kolejka.pop();
            for(int v = 0; v < n; v++) 
            {
                if(rodzic[v] == -1 && graf_residualny[u][v] > 0) 
                {
                    rodzic[v] = u;
                    kolejka.push(v);
                }
            }
        }
        // Jesli nie ma już sciezki powiekszajacej, przerwanie petli
        if(rodzic[ujscie] == -1)
        {
            break;
        }
        // Znajdowanie minimalnej przepustowosci sciezki powiekszajacej
        int przeplywSciezki = INT_MAX;
        for(int v = ujscie; v != zrodlo; v = rodzic[v]) 
        {
            int u = rodzic[v];
            przeplywSciezki = min(przeplywSciezki, graf_residualny[u][v]);
        }
        // Aktualizowanie przeplywu sieci i sieci rezydualnej
        for(int v = ujscie; v != zrodlo; v = rodzic[v]) 
        {
            int u = rodzic[v];
            graf_residualny[u][v] = graf_residualny[u][v] - przeplywSciezki;
            graf_residualny[v][u] = graf_residualny[v][u] + przeplywSciezki;
        }
        maksymalnyPrzeplyw = maksymalnyPrzeplyw + przeplywSciezki;
    }
    return maksymalnyPrzeplyw;
}

int main() 
{
    // Graf jako macierz sasiedztwa
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
    int maksymalnyPrzeplyw = edmonds_karp(graf, zrodlo, ujscie);
    cout << "Maksymalny przeplyw: " << maksymalnyPrzeplyw << endl;
    return 0;
}
