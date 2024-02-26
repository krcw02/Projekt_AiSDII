#include <iostream>
#include <vector>

using namespace std;

class Graph
{
private:
    int V;
    vector<vector<int>> graph;

public:
    Graph(int vertices) : V(vertices)
    {
        graph.resize(V, vector<int>(V, 0));
    }

    void add_edge(int u, int v, int weight)
    {
        graph[u][v] = weight;
    }
    void print_adjacency_matrix()
    {
        cout << "Macierz sasiedztwa:" << endl;
        for (int i = 0; i < V; ++i)
        {
            for (int j = 0; j < V; ++j)
            {
                cout << graph[i][j] << " ";
            }
            cout << endl;
        }
    }
    void print_adjacency_list()
    {
        cout << "Lista sasiadow:" << endl;
        for (int i = 0; i < V; ++i)
        {
            cout << "Wierzcholek " << i << ":";
            for (int j = 0; j < V; ++j)
            {
                if (graph[i][j] != 0)
                {
                    cout << " -> " << j << "(" << graph[i][j] << ")";
                }
            }
            cout << endl;
        }
    }
    void print_two_arrays()
    {
        cout << "Dwie tablice:" << endl;
        for (int i = 0; i < V; ++i)
        {
            for (int j = 0; j < V; ++j)
            {
                if (graph[i][j] != 0)
                {
                    cout << "Edge from " << i << " to " << j << ", weight: " << graph[i][j] << endl;
                }
            }
        }
    }
};

int main() 
{
    int V = 4;
    Graph graph(V);
    graph.add_edge(0, 1, 10);
    graph.add_edge(0, 2, 20);
    graph.add_edge(1, 2, 30);
    graph.add_edge(2, 3, 40);

    graph.print_adjacency_matrix();
    cout << endl;
    graph.print_adjacency_list();
    cout << endl;
    graph.print_two_arrays();

    return 0;
}
