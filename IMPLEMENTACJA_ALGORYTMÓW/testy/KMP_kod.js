// FUNKCJA POMOCNICZA DO GENEROWANIA TABLICY PRZEJSC (prefix function) DLA WZORCA
function obliczanieTablicyPrzejsc(wzorzec) {
    const M = wzorzec.length;
    const lps = new Array(M).fill(0);
    let dlugosc = 0; // dlugosc poprzedniego najdluzszego prefiksu-sufiksu
    let i = 1;

    while(i < M) {
        if(wzorzec[i] === wzorzec[dlugosc]) {
            dlugosc++;
            lps[i] = dlugosc;
            i++;
        } else {
            if(dlugosc !== 0) {
                dlugosc = lps[dlugosc - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
    return lps;
}

// FUNKCJA ZAMIENIAJACA WZORZEC W TEKSCIE
function zamienWzorzec(tekst, staryWzorzec, nowyWzorzec) {
    const N = tekst.length;
    const M = staryWzorzec.length;
    const lps = obliczanieTablicyPrzejsc(staryWzorzec);
    let i = 0; // Indeks dla tekstu
    let j = 0; // Indeks dla wzorca
    let wynik = '';
    let poczatek = 0; // Poczatkowa pozycja fragmentu do skopiowania
    while(i < N) {
        if(staryWzorzec[j] === tekst[i]) {
            i++;
            j++;
        }
        if(j === M) {
            wynik += tekst.substring(poczatek, i - M) + nowyWzorzec;
            poczatek = i;
            j = 0;
        } else if(i < N && staryWzorzec[j] !== tekst[i]) {
            if(j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }
    wynik += tekst.substring(poczatek);
    return wynik;
}


module.exports = { zamienWzorzec };
