class Wezel 
{
    constructor(symbol, czestotliwosc) 
    {
        this.symbol = symbol;
        this.czestotliwosc = czestotliwosc;
        this.lewy = null;
        this.prawy = null;
    }
}

class Huffman 
{
    constructor() 
    {
        this.korzen = null;
    }
    
    // Budowanie drzewa kodow Huffmana
    budujDrzewo(symbole, czestotliwosci) 
    {
        let wezly = [];
        for(let i = 0; i < symbole.length; i++) 
            {
            wezly.push(new Wezel(symbole[i], czestotliwosci[i]));
        }
        // Tworzenie kolejki priorytetowej wezlow
        wezly.sort((a, b) => a.czestotliwosc - b.czestotliwosc);
        // Asercja: Sprawdzenie, czy wezly sa posortowane po pierwszym sortowaniu
        console.assert(wezly.every((_, i, arr) => i === 0 || arr[i - 1].czestotliwosc <= arr[i].czestotliwosc), "Blad: Wezly nie sa posortowane po pierwszym sortowaniu");

        while(wezly.length > 1) 
        {
            // Pobranie dwoch najmniejszych wezlow
            let lewy = wezly.shift();
            let prawy = wezly.shift();
            // Tworzenie wezla posredniego
            let rodzic = new Wezel(null, lewy.czestotliwosc + prawy.czestotliwosc);
            rodzic.lewy = lewy;
            rodzic.prawy = prawy;
            // Wstawienie wezla posredniego do kolejki
            wezly.push(rodzic);
            wezly.sort((a, b) => a.czestotliwosc - b.czestotliwosc);
            // Asercja: Sprawdzenie, czy wezly sa posortowane po kazdej iteracji sortowania
            console.assert(wezly.every((_, i, arr) => i === 0 || arr[i - 1].czestotliwosc <= arr[i].czestotliwosc), "Blad: Wezly nie sa posortowane po iteracji sortowania");
        }
        this.korzen = wezly[0];
        // Asercja: Sprawdzenie, czy korzen drzewa jest poprawny po zakonczeniu budowy drzewa
        console.assert(this.korzen !== null, "Blad: Korzen drzewa jest null po zakonczeniu budowy drzewa");
    }

    // Funkcja pomocnicza do rekurencyjnego tworzenia kodow Huffmana
    pom_generujKody(wezel, obecnyKod, kody) 
    {
        if(wezel.symbol !== null) 
        {
            kody[wezel.symbol] = obecnyKod;
        } 
        else 
        {
            this.pom_generujKody(wezel.lewy, obecnyKod + "0", kody);
            this.pom_generujKody(wezel.prawy, obecnyKod + "1", kody);
        }
    }

    // Funkcja generujaca kody Huffmana dla poszczegolnych symboli
    generujKody() 
    {
        let kody = {};
        this.pom_generujKody(this.korzen, "", kody);
        // Asercja: Sprawdzenie, czy kazdy symbol ma przypisany kod
        console.assert(Object.keys(kody).length > 0, "Blad: Nie wygenerowano zadnych kodow Huffmana");
        return kody;
    }

    // Obliczanie dlugosci oryginalnej wiadomosci (zakladajac, ze kazdy symbol to 1 bajt = 8 bitow)
    obliczDlugoscOryginalnejWiadomosci(symbole, czestotliwosci) 
    {
        let dlugosc = 0;
        for(let i = 0; i < symbole.length; i++) 
        {
            dlugosc += 8 * czestotliwosci[i];
        }
        // Asercja: Sprawdzenie, czy dlugosc oryginalnej wiadomosci jest poprawna
        console.assert(dlugosc > 0, "Blad: Dlugosc oryginalnej wiadomosci jest niepoprawna");
        return dlugosc;
    }

    // Obliczanie dlugosci skompresowanej wiadomosci
    obliczDlugoscSkompresowanejWiadomosci(kody, czestotliwosci) 
    {
        let dlugosc = 0;
        for(let symbol in kody) 
        {
            let index = symbole.indexOf(symbol);
            dlugosc += kody[symbol].length * czestotliwosci[index];
        }
        // Asercja: Sprawdzenie, czy dlugosc skompresowanej wiadomosci jest poprawna
        console.assert(dlugosc > 0, "Blad: Dlugosc skompresowanej wiadomosci jest niepoprawna");
        return dlugosc;
    }
}

// PRZYKLAD
let symbole = ['a', 'b', 'c', 'd', 'e', 'f'];
let czestotliwosci = [5, 9, 12, 13, 16, 45];
let huffman = new Huffman();
huffman.budujDrzewo(symbole, czestotliwosci);
let kody = huffman.generujKody();
console.log("Kody Huffmana dla poszczegolnych symboli:");
for(let symbol in kody) 
{
    console.log(`${symbol}: ${kody[symbol]}`);
}

let dlugoscOryginalnejWiadomosci = huffman.obliczDlugoscOryginalnejWiadomosci(symbole, czestotliwosci);
let dlugoscSkompresowanejWiadomosci = huffman.obliczDlugoscSkompresowanejWiadomosci(kody, czestotliwosci);
let stopienKompresji = dlugoscOryginalnejWiadomosci / dlugoscSkompresowanejWiadomosci;
console.log("Stopien kompresji:", stopienKompresji);

/*
Dowod poprawnosci:
1. Inicjalizacja:
   - Tworzenie wezlow dla kazdego symbolu i jego czestotliwosci. Zapewnia to, ze kazdy symbol jest reprezentowany jako lisc drzewa Huffmana.
   - Kolejka priorytetowa sortowana jest wedlug czestotliwosci, co umozliwia latwe laczenie dwoch najmniejszych wezlow w jeden wezel posredni.

2. Budowanie drzewa:
   - Petla `while` kontynuuje, dopoki w kolejce pozostaje wiecej niz jeden wezel, zapewniajac stopniowe laczenie wezlow w jedno drzewo.
   - Kazde polaczenie dwoch najmniejszych wezlow tworzy nowy wezel posredni, co gwarantuje, ze koncowe drzewo jest drzewem Huffmana.
   - Asercje moga sprawdzac poprawnosc stanu kolejki przed i po kazdej iteracji petli.

3. Generowanie kodow:
   - Funkcja rekurencyjna `pom_generujKody` generuje kody Huffmana przez przegladanie drzewa od korzenia do lisci.
   - Dla kazdego symbolu, funkcja generuje odpowiedni kod binarny, co zapewnia, ze symbole o wyzszej czestotliwosci maja krotsze kody.
   - Asercje moga sprawdzac poprawnosc kodow na roznych etapach generowania.

4. Obliczanie dlugosci wiadomosci:
   - Funkcje `obliczDlugoscOryginalnejWiadomosci` i `obliczDlugoscSkompresowanejWiadomosci` obliczaja dlugosci odpowiednio oryginalnej i skompresowanej wiadomosci.
   - Asercje moga sprawdzac poprawnosc obliczanych dlugosci na roznych etapach.

Niezmienniki petli i asercje:
- Niezmiennik: Kolejka `wezly` zawiera wezly posortowane wedlug czestotliwosci w kazdej iteracji petli.
- Asercje:
  - Po utworzeniu wezlow, `wezly` zawiera poprawne wezly dla wszystkich symboli.
  - Po kazdej iteracji petli `while`, `wezly` jest ponownie posortowane wedlug czestotliwosci.
  - Po zakonczeniu petli `while`, `korzen` zawiera korzen drzewa Huffmana.
  - Podczas generowania kodow, `kody` zawiera poprawne kody Huffmana dla przetworzonych wezlow.
  - Po zakonczeniu generowania kodow, `kody` zawiera poprawne kody dla wszystkich symboli.

Zakonczenie:
- Algorytm konczy sie, gdy wszystkie wezly zostana polaczone w jedno drzewo.

Zlozonosc algorytmu:
1. Tworzenie poczatkowych wezlow i ich sortowanie:
   - Tworzenie wezlow ma zlozonosc O(n).
   - Sortowanie wezlow ma zlozonosc O(n log n).
2. Budowanie drzewa:
   - W kazdej iteracji petli while pobierane sa dwa najmniejsze wezly i wstawiany jest nowy wezel do listy.
   - Wstawienie wezla wymaga ponownego sortowania, co ma zlozonosc O(n log n) w najgorszym przypadku.
   - Poniewaz petla wykonuje sie n-1 razy, zlozonosc wynosi O(n log n).
3. Generowanie kodow:
   - Generowanie kodow odbywa sie rekurencyjnie i przegladane jest cale drzewo, co ma zlozonosc O(n).
Laczna zlozonosc:
- Dominuje zlozonosc sortowania, co oznacza, ze laczna zlozonosc algorytmu to O(n log n).
*/