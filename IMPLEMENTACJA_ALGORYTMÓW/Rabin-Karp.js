function rabinKarp(tekst, wzorzec)
{
    const d = 256;
    const q = 101 //Modul
    const n = tekst.length;
    const m = wzorzec.length;
    let hTekst = 0;
    let hWzorzec = 0;
    let potD = 1;
    for(let i = 0; i < m - 1; i++)
    {
        potD = (potD * d) % q;
    }
    for(let i = 0; i < m; i++)
    {
        hTekst = (hTekst * d + tekst.charCodeAt(i)) % q;
        hWzorzec = (hWzorzec * d + wzorzec.charCodeAt(i)) % q; 
    }
    const pozycje = [];
    for(let i = 0; i < n - m + 1; i++)
    {
        if(hTekst === hWzorzec)
        {
            let j;
            for(j = 0; j < m; j++)
            {
                if(tekst.charAt(i + j) !== wzorzec.charAt(j))
                {
                    break;
                }
            }
            if(j === m)
            {
                pozycje.push(i);
            }
        }
        if(i < n - m)
        {
            hTekst = ((hTekst - tekst.charCodeAt(i) * potD) * d + tekst.charCodeAt(i + m)) % q;
            if(hTekst < 0)
            {
                hTekst = hTekst + q;
            }
        }
    }
    return pozycje;
}

//PRZYKLAD
const tekst = "Ala Kot ma kotki a koty ma Alę";
const wzorzec = "kot";
const pozycje = rabinKarp(tekst, wzorzec);
if(pozycje.length === 0) 
{
    console.log("Wzorzec nie został znaleziony");
} 
else 
{
    console.log(`Wzorzec znaleziony na pozycjach: ${pozycje.join(", ")}`);
}