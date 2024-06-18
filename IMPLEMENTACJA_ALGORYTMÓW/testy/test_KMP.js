const { zamienWzorzec } = require('./KMP_kod');

function assertEqual(actual, expected, message) {
    if (actual === expected) {
        console.log(`✔️  ${message}`);
    } else {
        console.error(`❌  ${message}`);
        console.error(`   Oczekiwane: ${expected}, ale otrzymane: ${actual}`);
    }
}

function runTests() {
    console.log("Uruchamianie testów dla zamienWzorzec...");

    const tekstMelodii = "ZapoliSzKryspoli123polipoliabcdUlalapolipoliboli";
    const staryWzorzec = "poli";
    const nowyWzorzec = "boli";
    const oczekiwanyTekstMelodii = "ZaboliSzKrysboli123boliboliabcdUlalaboliboliboli";
    assertEqual(zamienWzorzec(tekstMelodii, staryWzorzec, nowyWzorzec), oczekiwanyTekstMelodii, "zamienWzorzec powinno poprawnie zamienić 'poli' na 'boli'");

    const tekst1 = "polishBookspolimamagotujepoliposluchammuzyki";
    const oczekiwanyTekst1 = "bolishBooksbolimamagotujeboliposluchammuzyki";
    assertEqual(zamienWzorzec(tekst1, staryWzorzec, nowyWzorzec), oczekiwanyTekst1, "zamienWzorzec powinno poprawnie zamienić 'poli' na 'boli'");

    const tekst4 = "polipoli";
    const oczekiwanyTekst4 = "boliboli";
    assertEqual(zamienWzorzec(tekst4, staryWzorzec, nowyWzorzec), oczekiwanyTekst4, "zamienWzorzec powinno poprawnie zamienić 'poli' na 'boli'");

    const tekst5 = "polipoliSzkolapolipoli";
    const oczekiwanyTekst5 = "boliboliSzkolaboliboli";
    assertEqual(zamienWzorzec(tekst5, staryWzorzec, nowyWzorzec), oczekiwanyTekst5, "zamienWzorzec powinno poprawnie zamienić 'poli' na 'boli'");

    const tekst6 = "XpolipoliYpolipoliZ";
    const oczekiwanyTekst6 = "XboliboliYboliboliZ";
    assertEqual(zamienWzorzec(tekst6, staryWzorzec, nowyWzorzec), oczekiwanyTekst6, "zamienWzorzec powinno poprawnie zamienić 'poli' na 'boli'");

    const tekst2 = "helloworld";
    const staryWzorzec2 = "world";
    const nowyWzorzec2 = "universe";
    const oczekiwanyTekst2 = "hellouniverse";
    assertEqual(zamienWzorzec(tekst2, staryWzorzec2, nowyWzorzec2), oczekiwanyTekst2, "zamienWzorzec powinno poprawnie zamienić 'world' na 'universe'");

    const tekst3 = "abcdabcd";
    const staryWzorzec3 = "abc";
    const nowyWzorzec3 = "xyz";
    const oczekiwanyTekst3 = "xyzdxyzd";
    assertEqual(zamienWzorzec(tekst3, staryWzorzec3, nowyWzorzec3), oczekiwanyTekst3, "zamienWzorzec powinno poprawnie zamienić 'abc' na 'xyz'");

    const tekst7 = "abcabcabc";
    const staryWzorzec7 = "abc";
    const nowyWzorzec7 = "123";
    const oczekiwanyTekst7 = "123123123";
    assertEqual(zamienWzorzec(tekst7, staryWzorzec7, nowyWzorzec7), oczekiwanyTekst7, "zamienWzorzec powinno poprawnie zamienić 'abc' na '123'");

    const tekst8 = "hellohellohello";
    const staryWzorzec8 = "hello";
    const nowyWzorzec8 = "hi";
    const oczekiwanyTekst8 = "hihihi";
    assertEqual(zamienWzorzec(tekst8, staryWzorzec8, nowyWzorzec8), oczekiwanyTekst8, "zamienWzorzec powinno poprawnie zamienić 'hello' na 'hi'");
}

runTests();
