// GrafTest.js
import { Graf } from "./Graf.js";

// Funkcja do asercji wyników testów
function assert(condition, message) {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
}

// Test 1: Dodawanie krawędzi
function testDodajKrawedz() {
  const graf = new Graf();
  graf.dodajKrawedz("A", "B");
  assert(
    graf.sasiedztwo["A"].includes("B"),
    "Test dodaj Krawedz nie przeszedł: 'A' nie zawiera 'B'"
  );
  assert(
    graf.sasiedztwo["B"].includes("A"),
    "Test dodaj Krawedz nie przeszedł: 'B' nie zawiera 'A'"
  );
  console.log("Test dodajKrawedz przeszedł");
}

// Test 2: BFS dla prostego grafu
function testBFS() {
  const graf = new Graf();
  graf.dodajKrawedz("A", "B");
  graf.dodajKrawedz("A", "C");
  graf.dodajKrawedz("B", "D");
  const wynik = graf.bfs("A");
  assert(
    JSON.stringify(wynik) === JSON.stringify(["A", "B", "C", "D"]),
    "Test BFS nie przeszedł"
  );
  console.log("Test BFS przeszedł");
}

// Test 3: DFS dla prostego grafu
function testDFS() {
  const graf = new Graf();
  graf.dodajKrawedz("A", "B");
  graf.dodajKrawedz("A", "C");
  graf.dodajKrawedz("B", "D");
  const wynik = graf.dfs("A");
  assert(
    JSON.stringify(wynik) === JSON.stringify(["A", "B", "D", "C"]),
    "Test DFS nie przeszedł"
  );
  console.log("Test DFS przeszedł");
}

// Test 4: Graf z pojedynczym wierzchołkiem
function testGrafZJednymWierzcholkiem() {
  const graf = new Graf();
  graf.dodajKrawedz("A", "A");
  const wynikBFS = graf.bfs("A");
  const wynikDFS = graf.dfs("A");
  assert(
    JSON.stringify(wynikBFS) === JSON.stringify(["A"]),
    "Test grafu z pojedynczym wierzchołkiem BFS nie przeszedł"
  );
  assert(
    JSON.stringify(wynikDFS) === JSON.stringify(["A"]),
    "Test grafu z pojedynczym wierzchołkiem DFS nie przeszedł"
  );
  console.log("Test grafu z pojedynczym wierzchołkiem przeszedł");
}

// Test 5: Graf bez połączeń
function testGrafBezPolaczen() {
  const graf = new Graf();
  graf.dodajKrawedz("A", "B");
  graf.dodajKrawedz("C", "D");
  const wynikBFS = graf.bfs("A");
  const wynikDFS = graf.dfs("A");
  assert(
    JSON.stringify(wynikBFS) === JSON.stringify(["A", "B"]),
    "Test grafu bez połączeń BFS nie przeszedł"
  );
  assert(
    JSON.stringify(wynikDFS) === JSON.stringify(["A", "B"]),
    "Test grafu bez połączeń DFS nie przeszedł"
  );
  console.log("Test grafu bez połączeń przeszedł");
}

// Wykonanie wszystkich testów
function uruchomTesty() {
  testDodajKrawedz();
  testBFS();
  testDFS();
  testGrafZJednymWierzcholkiem();
  testGrafBezPolaczen();
}

// Uruchomienie testów
uruchomTesty();
