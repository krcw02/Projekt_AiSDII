# Projekt_AiSDII (LE)
## Grupa 4 

1. Kamil Krystowski
2. Maciej Zajdel
3. Kacper Szymczyk

### Prezentacja: https://www.canva.com/design/DAGIeEFadOQ/1lHgcEXNX4MGQ9Ys_RNiMw/edit?utm_content=DAGIeEFadOQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

| L.p. | Specyfikacja problemu (dane i wyniki)                    | Do jakich treści w zadaniu odnosi się algorytm             | Zastosowane struktury danych                        | Informacje o zastosowanym algorytmie                                                                                                          |
|------|----------------------------------------------------------|------------------------------------------------------------|----------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| 1    | Transport odcinków do budowy płotu                       | Transport odcinków z fabryki do miejsca budowy płotu       | Kolejka, Zbiór, Tablica                            | Algorytm BFS: Używany do znajdowania najkrótszej ścieżki, wskazując jednocześnie optymalną trasę transportu odcinków.                    |
| 2    | Budowa optymalnego płotu                                 | Minimalny płot wokół Krainy, wykorzystując punkty orientacyjne jako wierzchołki | Stos, Lista                                        | Algorytm Grahama: Zbudowanie płotu z otrzymanej otoczki wypukłej oraz minimalizacja jego długości.                                      |
| 3    | Dobór tragarzy w pary                                    | Przydzielanie tragarzy z rękoma z przodu i z tyłu w pary    | Tablica dwuwymiarowa                               | Algorytm dynamiczny: Używany do znajdowania maksymalnej liczby par tragarzy, aktualizując tablicę dp na podstawie możliwych kombinacji tragarzy z dwóch grup, maksymalizując liczbę możliwych do utworzenia par. |
| 4    | Oszczędne kodowanie opowieści-melodii                    | Zapisanie opowieści-melodii na maszynie z ograniczoną pamięcią | Drzewo binarne, Tablice                           | Algorytm Huffman: Do kompresji danych,  zmniejszając liczby bitów potrzebnych do reprezentacji danych przez wykorzystanie zmiennej długości kodów dla różnych znaków. |
| 5    | Zamiana fragmentów opowieści-melodii                     | Identyfikacja i zamiana "poli" na "boli" w opowieści-melodii | Stringi, Tablice znaków                           | Algorytm Knutha-Morrisa-Pratta (KMP): Do szybkiego wyszukiwania wzorców,  wykorzystując tablicę przejść (lps - Longest Prefix Suffix).    |
| 6    | Optymalizacja pracy strażników                           | Grafik pracy strażników                                     | Tablice                                            | Algorytm zachłanny: Wybór tragarza z największą energią do pracy jako strażnik, wybierając lokalnie najlepszą opcję w każdym kroku. |
| 7    | Wizualizacja ścieżek                                     | Wyznaczanie ścieżek pomiędzy dwoma punktami, zaznaczając piksele, które tworzą najkrótszą trasę na siatce | Tablica punktów, Lista punktów, Współrzędne punktów | Algorytm Bresenhama: Do rysowania linii w grafice komputerowej, pozwala na rysowanie linii między dwoma punktami na siatce pikseli, iterując po punktach na siatce pikseli i wybierając kolejne piksele, które najlepiej przybliżają teoretyczną linię łączącą dwa punkty. |
