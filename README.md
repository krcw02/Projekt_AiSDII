# Projekt_AiSDII (LE)
## Grupa 4 

1. Kamil Krystowski
2. Maciej Zajdel
3. Kacper Szymczyk

| L.p. | Specyfikacja problemu (dane i wyniki) | Do jakich treści w zadaniu odnosi się algorytm | Zastosowane struktury danych | Informacje o zastosowanym algorytmie |
|------|---------------------------------------|------------------------------------------------|-------------------------------|--------------------------------------|
| 1    | Transport odcinków do budowy płotu    | Transport odcinków z fabryki do miejsca budowy płotu, optymalne parowanie tragarzy | Grafy, Lista sąsiedztwa, Tablice | **Algorytm Dijkstry/A***: Używany do znajdowania najkrótszej ścieżki w grafie ważonym. W Java, można wykorzystać PriorityQueue do efektywnej implementacji. :rocket: |
| 2    | Budowa optymalnego płotu              | Minimalne drzewo rozpinające dla punktów orientacyjnych Krainy | Grafy, Lista sąsiedztwa | **Algorytm Kruskala/Prima**: Używany do znalezienia minimalnego drzewa rozpinającego. W Java, struktury Union-Find dla Kruskala lub PriorityQueue dla Prima są pomocne. :construction: |
| 3    | Oszczędne kodowanie opowieści-melodii | Zapisanie opowieści-melodii na maszynie z ograniczoną pamięcią, zamiana "poli" na "boli" | Drzewo binarne, Tablice, Hashmapa | **Algorytm Huffman**: Do kompresji danych. W Java, można skorzystać z PriorityQueue do budowy drzewa Huffmana. :floppy_disk: |
| 4    | Optymalizacja pracy strażników        | Grafik pracy strażników z minimalną liczbą odsłuchań melodii, optymalizacja trasy i energii | Grafy, Kolejka, Tablice | **Programowanie dynamiczne**: Do optymalizacji wyboru strażników i punktów zatrzymania. W Java, można używać tablic lub ArrayList do przechowywania wyników pośrednich. :shield: |
| 5    | Współpraca tragarzy                   | Dobór par tragarzy do wspólnego transportu odcinków | Grafy, Tablice, Sety | **Algorytmy przeszukiwania**: DFS/BFS mogą być używane do eksplorowania możliwych par tragarzy. W Java, LinkedList dla BFS lub Stack dla DFS. :handshake: |
| 6    | Optymalizacja miejsca na maszynie     | Maksymalizacja liczby zapisanych fragmentów opowieści przy ograniczonej przestrzeni | Tablice, Listy | **Problem plecakowy**: Do optymalnego wykorzystania miejsca. W Java, programowanie dynamiczne z użyciem tablic dwuwymiarowych. :package: |
| 7    | Zamiana fragmentów opowieści-melodii  | Identyfikacja i zamiana "poli" na "boli" w opowieści-melodii | Stringi, Tablice znaków | **Algorytmy wyszukiwania wzorca w tekście**: Algorytm Knutha-Morrisa-Pratta (KMP) do szybkiego wyszukiwania wzorców. W Java, implementacja może wykorzystywać tablice znaków. :mag: |
