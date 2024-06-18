const Huffman = require('./Huffman_kod');

function assertEqual(actual, expected, message) {
    if (actual === expected) {
        console.log(`✔️  ${message}`);
    } else {
        console.error(`❌  ${message}`);
        console.error(`   Oczekiwane: ${expected}, ale otrzymane: ${actual}`);
    }
}

function runTests() {
    console.log("Uruchamianie testów dla algorytmu Huffmana...");

    let symbole = ['a', 'b', 'c', 'd', 'e', 'f'];
    let czestotliwosci = [5, 9, 12, 13, 16, 45];

    let huffman = new Huffman();
    huffman.budujDrzewo(symbole, czestotliwosci);

    let kody = huffman.generujKody();
    const expectedCodes = {
        "f":"0",
        "c":"100",
        "d":"101",
        "a":"1100",
        "b":"1101",
        "e":"111"
    };
    assertEqual(JSON.stringify(kody), JSON.stringify(expectedCodes), "Sprawdzanie poprawności generowania kodów Huffmana");

    let stopienKompresji = huffman.obliczStopienKompresji(symbole, czestotliwosci);
    const expectedCompressionRatio = 3.57;
    assertEqual(stopienKompresji.toFixed(2), expectedCompressionRatio.toFixed(2), "Sprawdzanie poprawności obliczenia stopnia kompresji");

    // Test 1: Dwa symbole o równej częstotliwości
    let symbole1 = ['a', 'b'];
    let czestotliwosci1 = [10, 10];

    let huffman1 = new Huffman();
    huffman1.budujDrzewo(symbole1, czestotliwosci1);

    let kody1 = huffman1.generujKody();
    const expectedCodes1 = {
        "a": "0",
        "b": "1"
    };
    assertEqual(JSON.stringify(kody1), JSON.stringify(expectedCodes1), "Sprawdzanie poprawności generowania kodów Huffmana (Test 1)");

    let stopienKompresji1 = huffman1.obliczStopienKompresji(symbole1, czestotliwosci1);
    const expectedCompressionRatio1 = 8.00;
    assertEqual(stopienKompresji1.toFixed(2), expectedCompressionRatio1.toFixed(2), "Sprawdzanie poprawności obliczenia stopnia kompresji (Test 1)");

    // Test 2: Trzy symbole o różnych częstotliwościach
    let symbole2 = ['a', 'b', 'c'];
    let czestotliwosci2 = [5, 3, 2];

    let huffman2 = new Huffman();
    huffman2.budujDrzewo(symbole2, czestotliwosci2);

    let kody2 = huffman2.generujKody();
    const expectedCodes2 = {
        "a": "0",
        "c": "10",
        "b": "11"
        
    };
    assertEqual(JSON.stringify(kody2), JSON.stringify(expectedCodes2), "Sprawdzanie poprawności generowania kodów Huffmana (Test 2)");

    let stopienKompresji2 = huffman2.obliczStopienKompresji(symbole2, czestotliwosci2);
    const expectedCompressionRatio2 = 5.33;
    assertEqual(stopienKompresji2.toFixed(2), expectedCompressionRatio2.toFixed(2), "Sprawdzanie poprawności obliczenia stopnia kompresji (Test 2)");
}

runTests();
