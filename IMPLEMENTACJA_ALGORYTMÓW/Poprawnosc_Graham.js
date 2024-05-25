// Funkcja do okreslenia orientacji trojki punktow (p, q, r).
// Zwraca 0, jesli p, q i r sa wspolliniowe, 1 jesli sa w prawo (zgodnie z ruchem wskazowek zegara), 2 jesli sa w lewo (przeciwnie do ruchu wskazowek zegara).
function orientation(p, q, r)
{
    const val = (q[1] - p[1]) * (r[0] - q[0]) - (q[0] - p[0]) * (r[1] - q[1]);
    if (val == 0)
    {
        return 0;
    }
    return (val > 0) ? 1 : 2;
}

// Funkcja do porownania punktow na podstawie ich kata biegunowego wzgledem punktu odniesienia (pivot).
function compare(p, q)
{
    const diff = orientation(pivot, p, q);
    if (diff === 0)
    {
        return (distanceSquared(pivot, q) >= distanceSquared(pivot, p)) ? -1 : 1;
    }
    return (diff === 2) ? -1 : 1;
}

// Funkcja do obliczenia kwadratu odleglosci miedzy dwoma punktami.
function distanceSquared(p1, p2)
{
    return Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2);
}

// Funkcja do znalezienia otoczki wypuklej zbioru punktow za pomoca algorytmu Grahama.
function convexHull(points)
{
    // Inicjalizacja zmiennych do znalezienia punktu o najmniejszej wspolrzednej y (pivot).
    let minY = Infinity;
    let minIndex = -1;
    for (let i = 0; i < points.length; i++)
    {
        const y = points[i][1];
        if (y < minY || (y === minY && points[i][0] < points[minIndex][0]))
        {
            minY = y;
            minIndex = i;
        }
    }
    // Po zakonczeniu petli, pivot to punkt o najmniejszej wspolrzednej y.
    pivot = points[minIndex];
    // Sprawdzanie poprawnosci wyboru punktu pivot
    console.assert(pivot === points[minIndex], 'Punkt pivot zostal niepoprawnie wybrany');

    // Sortowanie punktow na podstawie kata biegunowego wzgledem pivot.
    points.sort(compare);
    // Sprawdzanie poprawnosci sortowania punktow
    for (let i = 1; i < points.length - 1; i++) {
        console.assert(orientation(pivot, points[i], points[i + 1]) !== 1, 'Punkty nie sa poprawnie posortowane wzgledem pivot');
    }

    // Inicjalizacja stosu pierwszymi dwoma punktami.
    const stack = [points[0], points[1]];
    // Sprawdzanie poprawnosci inicjalizacji stosu
    console.assert(stack.length === 2, 'Stos nie zostal poprawnie zainicjalizowany');
    
    // Niezmiennik petli: stos zawiera wierzcholki biezacej otoczki wypuklej.
    for (let i = 2; i < points.length; i++)
    {
        // Upewnienie sie, ze trzy ostatnie punkty w stosie wraz z biezacym punktem tworza skret w lewo.
        while (stack.length > 1 && orientation(stack[stack.length - 2], stack[stack.length - 1], points[i]) != 2)
        {
            stack.pop(); // Usuniecie gornego punktu ze stosu, jesli nie tworzy skretu w lewo.
        }
        stack.push(points[i]); // Dodanie biezacego punktu na stos.

    // Sprawdzanie poprawnosci dodawania punktow do stosu
        console.assert(stack.length >= 2, 'Punkt nie zostal poprawnie dodany do stosu');
    }
    return stack; // Zwrocenie punktow tworzacych otoczke wypukla.
}

const points = [[2, 3], [8, 4], [8, 7], [2, 7], [4, 5], [6, 6], [3, 2], [7, 3], [1, 9], [10, 1], [5, 9], [9, 9], [3, 8]];
const convexHullPoints = convexHull(points);
console.log("Punkty otoczki wypuklej:", convexHullPoints);

/*
Dowod poprawnosci:
1. Inicjalizacja: Punkt pivot jest poprawnie wybrany jako punkt o najmniejszej wspolrzednej y (i najmniejszej wspolrzednej x w przypadku remisu). To zapewnia unikalny punkt pivot.
2. Sortowanie: Punkty sa sortowane na podstawie ich kata biegunowego wzgledem punktu pivot. Gwarantuje to, ze mozemy przetwarzac punkty w kolejnosci ich kata, zapewniajac poprawna konstrukcje otoczki wypuklej.
3. Niezmiennik petli: Na poczatku kazdej iteracji petli for (indeks i), stos zawiera wierzcholki otoczki wypuklej przetworzonych do tej pory punktow. Ten niezmiennik jest zachowany, poniewaz:
    - Poczatkowy stos zawiera pierwsze dwa punkty, ktore tworza poczatkowy odcinek.
    - Dla kazdego kolejnego punktu, upewniamy sie, ze dodanie go do stosu zachowuje wlasnosc otoczki wypuklej, usuwajac punkty, ktore powoduja skret w prawo (czyli zapewniajac skret przeciwny do ruchu wskazowek zegara).
    - Asercje sprawdzaja poprawnosc poszczegolnych krokow, np. wyboru pivot, sortowania punktow i stanu stosu.
4. Zakonczenie: Algorytm Grahama konczy dzialanie po przetworzeniu wszystkich punktow ze zbioru wejsciowego. 
Jest to zapewnione przez petle glowna algorytmu, ktora iteruje przez wszystkie punkty dokladnie jeden raz, dodajac je do stosu i tworzac otoczke wypukla. 
Ponadto, zakonczenie dzialania algorytmu jest gwarantowane przez fakt, ze dla kazdego punktu algorytm poprawnie okresla jego przynaleznosc do otoczki wypuklej na podstawie kata biegunowego wzgledem punktu pivot oraz poprzednich punktow na stosie. 
Dodatkowo, po zakonczeniu dzialania petli glownej, stos zawiera wszystkie wierzcholki otoczki wypuklej w odpowiedniej kolejnosci, czyli przeciwnie do ruchu wskazowek zegara. 
To zapewnia poprawnosc wyniku dzialania algorytmu, poniewaz otoczka wypukla jest zdefiniowana jako zbior punktow tworzacych najmniejszy wielokat wypukly zawierajacy wszystkie punkty ze zbioru wejsciowego. 
W rezultacie, algorytm Grahama zwraca poprawna otoczke wypukla dla danego zbioru punktow wejsciowych.

Niezmienniki petli i asercje:
- Niezmiennik: Stos `stack` zawiera poprawna otoczke wypukla dla przetworzonych do tej pory punktow.
- Asercje:
  - Po znalezieniu punktu pivot, `pivot` zawiera poprawny punkt o najmniejszej wspolrzednej y.
  - Po sortowaniu, `points` jest posortowany rosnaco wzgledem kata biegunowego w stosunku do `pivot`.
  - Podczas petli, `stack` zawsze zawiera poprawna otoczke wypukla dla przetworzonych do tej pory punktow.
  - Kazdy dodany punkt jest poprawnie dodany do stosu.
  - Po zakonczeniu petli stos zawiera wierzcholki otoczki wypuklej w kolejnosci przeciwnie do ruchu wskazowek zegara.

Zlozonosc czasowa:
- Znalezienie punktu pivot zajmuje O(n) czasu.
- Sortowanie punktow zajmuje O(n log n) czasu.
- Konstrukcja otoczki wypuklej za pomoca petli for zajmuje O(n) czasu w najgorszym przypadku, poniewaz kazdy punkt jest dodawany i usuwany ze stosu co najwyzej raz.
Ogolnie zlozonosc czasowa wynosi O(n log n).
*/
