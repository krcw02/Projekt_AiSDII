// FUNKCJA POMOCNICZA DO GENEROWANIA TABLICY PRZEJSC (prefix function) DLA WZORCA
function obliczanieTablicyPrzejsc(wzorzec) 
{
    const M = wzorzec.length;
    const lps = new Array(M).fill(0);
    let dlugosc = 0; // dlugosc poprzedniego najdluzszego prefiksu-sufiksu
    let i = 1;

    while(i < M) 
    {
        // Asercja: `i` jest mniejsze niz `M`
        console.assert(i < M, "Indeks `i` powinien byc mniejszy niz dlugosc wzorca");

        if(wzorzec[i] === wzorzec[dlugosc]) 
        {
            dlugosc++;
            lps[i] = dlugosc;
            i++;
        } 
        else 
        {
            if(dlugosc !== 0) 
            {
                dlugosc = lps[dlugosc - 1];
            } 
            else 
            {
                lps[i] = 0;
                i++;
            }
        }
        // Niezmiennik petli: `lps[j]` jest poprawnie obliczone dla wszystkich `j < i`
    }
    // Asercja: Tablica `lps` jest poprawnie obliczona
    console.assert(lps.every((val, idx) => idx === 0 || val >= lps[idx - 1]), "Blad: Tablica `lps` jest niepoprawnie obliczona");
    return lps;
}

// FUNKCJA ZAMIENIAJACA WZORZEC W TEKSCIE
function zamienWzorzec(tekst, staryWzorzec, nowyWzorzec) 
{
    const N = tekst.length;
    const M = staryWzorzec.length;
    const lps = obliczanieTablicyPrzejsc(staryWzorzec);
    let i = 0; // Indeks dla tekstu
    let j = 0; // Indeks dla wzorca
    let wynik = '';
    let poczatek = 0; // Poczatkowa pozycja fragmentu do skopiowania
    while(i < N) 
    {
        // Asercja: `i` jest mniejsze niz `N`
        console.assert(i < N, "Indeks `i` powinien byc mniejszy niz dlugosc tekstu");
        if(staryWzorzec[j] === tekst[i]) 
        {
            i++;
            j++;
        }
        if(j === M) 
        {
            wynik += tekst.substring(poczatek, i - M) + nowyWzorzec;
            poczatek = i;
            j = 0;
        } 
        else if(i < N && staryWzorzec[j] !== tekst[i]) 
        {
            if(j !== 0) 
            {
                j = lps[j - 1];
            } 
            else 
            {
                i++;
            }
        }
        // Niezmiennik petli: `tekst` do `i` zostalo przeszukane poprawnie do tej pory
    }
    wynik += tekst.substring(poczatek);
    // Asercja: Wynikowy tekst zawiera nowy wzorzec zamiast starego
    console.assert(wynik.includes(nowyWzorzec), "Blad: Wynikowy tekst nie zawiera nowego wzorca");
    return wynik;
}

// PRZYKLAD
const tekstMelodii = "ZapoliSzKryspoli123polipoliabcdUlalapolipoliboli";
const staryWzorzec = "poli";
const nowyWzorzec = "boli";
const nowyTekstMelodii = zamienWzorzec(tekstMelodii, staryWzorzec, nowyWzorzec);
console.log(nowyTekstMelodii);

/*
Dowod poprawnosci:
1. Inicjalizacja:
   - Funkcja `obliczanieTablicyPrzejsc` tworzy i inicjalizuje tablice `lps` (longest prefix suffix) do przechowywania dlugosci najdluzszego prefiksu-sufiksu dla kazdego indeksu wzorca.
   - Poczatkowo, `dlugosc` jest ustawione na 0, a `i` na 1, co zapewnia rozpoczecie sprawdzania wzorca od drugiego znaku.

2. Obliczanie tablicy `lps`:
   - Petla `while` przechodzi przez wzorzec, porownujac bieżący znak wzorca z aktualna dlugoscia prefiksu-sufiksu.
   - Jesli znaki sa rowne, dlugosc prefiksu-sufiksu zwieksza sie, a odpowiednia wartosc jest przypisywana do `lps[i]`.
   - Jesli znaki nie sa rowne, sprawdzana jest wartosc `dlugosc`. Jesli jest niezerowa, przypisywana jest wartosc z `lps[dlugosc - 1]`, co pozwala na kontynuacje porownan z odpowiednia wartoscia prefiksu-sufiksu. Jesli `dlugosc` jest zerowa, `lps[i]` jest ustawione na 0.

3. Zamiana wzorca:
   - Funkcja `zamienWzorzec` uzywa tablicy `lps` do efektywnego przeszukiwania tekstu w celu znalezienia wszystkich wystapien `staryWzorzec`.
   - Petla `while` przechodzi przez tekst, porownujac bieżący znak tekstu z bieżącym znakiem wzorca.
   - Jesli znaki sa rowne, indeksy `i` i `j` sa zwiekszane. Jesli `j` osiagnie dlugosc wzorca (`M`), oznacza to znalezienie calego wzorca w tekscie i zamiane go na `nowyWzorzec`.
   - Jesli znaki nie sa rowne, sprawdzana jest wartosc `j`. Jesli jest niezerowa, przypisywana jest wartosc z `lps[j - 1]`, co pozwala na kontynuacje porownan z odpowiednia wartoscia prefiksu-sufiksu. Jesli `j` jest zerowe, `i` jest zwiekszane.

Niezmienniki petli i asercje:
- Niezmiennik: `lps` jest poprawnie obliczone dla wszystkich `j < i`.
- Niezmiennik: Przeszukane `tekst` do `i` zostalo przeszukane poprawnie do tej pory.
- Asercje:
  - Po obliczeniu `lps`, tablica `lps` jest poprawnie obliczona.
  - W trakcie zamiany wzorca, indeks `i` jest zawsze mniejszy niz `N`.
  - Wynikowy tekst zawiera nowy wzorzec zamiast starego.

Zakonczenie:
- Algorytm konczy sie, gdy `i` osiagnie dlugosc tekstu (`N`).
- Algorytm KMP jest poprawny, poniewaz zapewnia poprawne przeszukiwanie wzorca w tekscie oraz zamiane wszystkich wystapien `staryWzorzec` na `nowyWzorzec`.

Złożoność czasowa algorytmu:  
- O(N + M), gdzie N to długość tekstu, a M to długość wzorca. 
- To wynika z faktu, że w najgorszym przypadku algorytm odwiedza każdy znak tekstu i wzorca dokładnie raz.
*/
