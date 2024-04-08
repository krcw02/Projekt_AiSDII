//FUNKCJA POMOCNICZA DO GENEROWANIA TABLICY PRZEJSC (prefix function) DLA WZORCA
function obliczanieTablicyPrzejsc(wzorzec) 
{
    const M = wzorzec.length;
    const lps = new Array(M).fill(0);
    let dlugosc = 0;
    let i = 1;
    while(i < M) 
    {
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
    }
    return lps;
}

//FUNKCJA WYSZUKUJACA WZORZEC W TEKSCIE PRZY UZYCIU ALGORYTMU KMP
function wyszukiwanieWzorca(tekst, wzorzec) 
{
    const N = tekst.length;
    const M = wzorzec.length;
    const lps = obliczanieTablicyPrzejsc(wzorzec);
    let i = 0; // Indeks dla tekstu
    let j = 0; // Indeks dla wzorca
    let znaleziono = false;
    while(i < N) 
    {
        if(wzorzec[j] === tekst[i]) 
        {
            i++;
            j++;
        }
        if(j === M) 
        {
            znaleziono = true;
            console.log("Znaleziono wzorzec na pozycji", i - j + 1);
            j = lps[j - 1];
        } 
        else if(i < N && wzorzec[j] !== tekst[i]) 
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
    }
    if(!znaleziono) 
    {
        console.log("Nie znaleziono zadnego wystapienia wzorca");
    }
}

//PRZYKLAD 
const tekst = "ababdbcybcwqhdicybcvywabcabdbcybcacqbvaaabdbcybc";
const wzorzec = "abdbcybc";
wyszukiwanieWzorca(tekst, wzorzec);
