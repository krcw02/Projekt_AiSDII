# Projekt_AiSDII (LE)
## Grupa 4 

1. Kamil Krystowski
2. Maciej Zajdel
3. Kacper Szymczyk

| L.p. | Specyfikacja problemu (dane i wyniki) | Do jakich treści w zadaniu odnosi się algorytm | Zastosowane struktury danych | Informacje o zastosowanym algorytmie |
|------|---------------------------------------|------------------------------------------------|-------------------------------|--------------------------------------|
| 1    | Transport odcinków do budowy płotu    | Transport odcinków z fabryki do miejsca budowy płotu | Kolejka, Zbiór, Tablica | **Algorytm BFS**: Używany do znajdowania najkrótszej ścieżki, wskazując jednocześnie optymalną trasę transportu odcinków. |
| 2    | Budowa optymalnego płotu              | Minimalny płot wokół Krainy, wykorzystując punkty orientacyjne jako wierzchołki | Stos, Lista | **Algorytm Grahama**: Zbudowanie płotu z otrzymanej otoczki wypukłej oraz minimalizacja jego długości. |
| 3    | Oszczędne kodowanie opowieści-melodii | Zapisanie opowieści-melodii na maszynie z ograniczoną pamięcią | Drzewo binarne, Tablice | **Algorytm Huffman**: Do kompresji danych,  zmniejszając liczby bitów potrzebnych do reprezentacji danych przez wykorzystanie zmiennej długości kodów dla różnych znaków. |
| 4    | Zamiana fragmentów opowieści-melodii  | Identyfikacja i zamiana "poli" na "boli" w opowieści-melodii | Stringi, Tablice znaków | **Algorytm Knutha-Morrisa-Pratta (KMP)**: Do szybkiego wyszukiwania wzorców,  wykorzystując tablicę przejść (lps - Longest Prefix Suffix). |
| 5    | Optymalizacja pracy strażników        | Grafik pracy strażników z minimalną liczbą odsłuchań melodii | Tablice | **Algorytm zachłanny**: Wybiera lokalnie najlepszą opcję wyboru strażnika z najwyższym poziomem energii i opcje wyboru punktów zatrzymania zgodnie z ograniczeniem liczby odsłuchań melodii. |
| 6    | Wizualizacja ścieżek                  | Wyznaczanie ścieżek pomiędzy dwoma punktami, zaznaczając piksele, które tworzą najkrótszą trasę na siatce | Tablica punktów, Lista punktów, Współrzędne punktów | **Algorytm Bresenhama**: Do rysowania linii w grafice komputerowej, pozwala na rysowanie linii między dwoma punktami na siatce pikseli, iterując po punktach na siatce pikseli i wybierając kolejne piksele, które najlepiej przybliżają teoretyczną linię łączącą dwa punkty. |
