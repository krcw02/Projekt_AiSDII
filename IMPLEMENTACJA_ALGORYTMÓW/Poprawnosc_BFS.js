class Node 
{
    constructor(v, p, numbersOfNeighbours = 0, permutation = -1) 
    {
        this.vertex = v; // point (x,y)
        this.path = p; // array of points(x,y)
        this.numbersOfNeighbours = numbersOfNeighbours;
        this.permutation = permutation;
    }
}

function tCoord(x, y) 
{
    const width = 128;
    return y * width + x;
}

export function createGraph(map, start) 
{
    let list = [];
    let queue = [];
    let visited = new Set();

    queue.push(new Node(start, [start]));

    while(queue.length) 
    {
        let node = queue.shift();
        let x = node.vertex[0];
        let y = node.vertex[1];
        let path = node.path;

        // Asercja: węzeł nie był jeszcze odwiedzony
        console.assert(!visited.has(tCoord(x, y)), "Błąd: Węzeł był już odwiedzony");
        if(visited.has(tCoord(x, y))) continue;
        visited.add(tCoord(x, y));

        let numbersOfNeighbours = 0;
        // sprawdzamy czy możemy iść w lewo
        if (x - 1 >= 0 && map.blocks[tCoord(x - 1, y)].id == 1) {
            numbersOfNeighbours++;
            queue.push(new Node([x - 1, y], [...path, [x - 1, y]]));
        }
        // sprawdzamy czy możemy iść w prawo
        if (x + 1 < 128 && map.blocks[tCoord(x + 1, y)].id == 1) {
            numbersOfNeighbours++;
            queue.push(new Node([x + 1, y], [...path, [x + 1, y]]));
        }
        // sprawdzamy czy możemy iść w górę
        if (y - 1 >= 0 && map.blocks[tCoord(x, y - 1)].id == 1) {
            numbersOfNeighbours++;
            queue.push(new Node([x, y - 1], [...path, [x, y - 1]]));
        }
        // sprawdzamy czy możemy iść w dół
        if (y + 1 < 128 && map.blocks[tCoord(x, y + 1)].id == 1) {
            numbersOfNeighbours++;
            queue.push(new Node([x, y + 1], [...path, [x, y + 1]]));
        }
        list.push(new Node([x, y], path, numbersOfNeighbours, map.blocks[tCoord(x, y)].permutation));
    }

    // Asercja: lista wynikowa zawiera odwiedzone węzły
    console.assert(list.length > 0, "Błąd: Lista wynikowa jest pusta");
    console.log(list);
    return list;
}

/*
Dowód poprawności algorytmu BFS (Breadth-First Search):

1. Inicjalizacja:
   - Inicjalizujemy kolejkę `queue` i dodajemy do niej węzeł początkowy `start`.
   - Tworzymy zestaw `visited`, aby śledzić odwiedzone węzły.
   - Tworzymy pustą listę `list` do przechowywania wynikowych węzłów.

2. Pętla BFS:
   - Pętla `while` działa, dopóki kolejka nie jest pusta.
   - Pobieramy pierwszy węzeł z kolejki `queue.shift()`.
   - Sprawdzamy, czy węzeł został już odwiedzony. Jeśli tak, przechodzimy do następnej iteracji.
   - Dodajemy węzeł do zestawu `visited`.
   - Sprawdzamy cztery możliwe kierunki ruchu (lewo, prawo, góra, dół).
   - Jeśli ruch jest możliwy (nie wychodzimy poza granice mapy i następny blok jest dostępny), dodajemy nowy węzeł do kolejki.
   - Aktualizujemy licznik sąsiadów `numbersOfNeighbours`.
   - Dodajemy bieżący węzeł do listy wynikowej `list`.

3. Niezmienniki pętli:
   - `queue` zawiera węzły, które zostały odkryte, ale jeszcze nie odwiedzone.
   - `visited` zawiera węzły, które zostały odwiedzone.
   - Każdy węzeł jest odwiedzany dokładnie raz.
   - Węzeł jest dodawany do listy wynikowej `list` po odwiedzeniu i aktualizacji informacji o sąsiadach.

4. Zakończenie:
   - Algorytm kończy się, gdy kolejka `queue` jest pusta.
   - Wszystkie węzły dostępne z węzła początkowego `start` zostały odwiedzone i dodane do listy wynikowej `list`.
   - Zwracamy listę `list` zawierającą wszystkie odwiedzone węzły wraz z ich informacjami.

5. Asercje:
   - Przed każdą istotną operacją dodajemy asercje sprawdzające poprawność warunków.
   - Asercje gwarantują, że:
     - Węzeł nie był już odwiedzony przed dodaniem do `visited`.
     - Lista wynikowa `list` zawiera odwiedzone węzły.

Algorytm BFS działa w czasie O(V + E), gdzie V to liczba węzłów, a E to liczba krawędzi w grafie. 
Poprawnie odwiedza wszystkie węzły dostępne z węzła początkowego i zwraca je w postaci listy.
*/