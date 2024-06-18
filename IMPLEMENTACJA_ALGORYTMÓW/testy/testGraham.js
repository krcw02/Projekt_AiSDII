// GrahamTest.js
import { Graham } from "./Graham.js";

// Funkcja do asercji wyników testów
function assert(condition, message) {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
}

// Test 1: Funkcja orientation
function testOrientation() {
  const graham = new Graham();
  assert(
    graham.orientation([0, 0], [1, 1], [2, 2]) === 0,
    "Test orientation nie przeszedł dla punktów na jednej linii"
  );
  assert(
    graham.orientation([0, 0], [1, 1], [1, 2]) === 2,
    "Test orientation nie przeszedł dla kierunku przeciwnika"
  );
  assert(
    graham.orientation([0, 0], [1, 1], [2, 0]) === 1,
    "Test orientation nie przeszedł dla kierunku zgodnego z ruchem wskazówek zegara"
  );
  console.log("Test orientation przeszedł");
}

// Test 2: Funkcja compare
function testCompare() {
  const graham = new Graham();
  graham.pivot = [0, 0];
  assert(
    graham.compare([1, 1], [2, 2]) === -1,
    "Test compare nie przeszedł dla punktów na tej samej linii, punkt bliższy powinien być pierwszy"
  );
  assert(
    graham.compare([2, 2], [1, 1]) === 1,
    "Test compare nie przeszedł dla punktów na tej samej linii, punkt dalszy powinien być drugi"
  );
  assert(
    graham.compare([1, 1], [1, 2]) === -1,
    "Test compare nie przeszedł dla punktów w lewo od pivota"
  );
  assert(
    graham.compare([1, 2], [1, 1]) === 1,
    "Test compare nie przeszedł dla punktów w prawo od pivota"
  );
  console.log("Test compare przeszedł");
}

// Test 3: Funkcja distanceSquared
function testDistanceSquared() {
  const graham = new Graham();
  assert(
    graham.distanceSquared([0, 0], [1, 1]) === 2,
    "Test distanceSquared nie przeszedł dla punktów (0,0) i (1,1)"
  );
  assert(
    graham.distanceSquared([0, 0], [2, 0]) === 4,
    "Test distanceSquared nie przeszedł dla punktów (0,0) i (2,0)"
  );
  assert(
    graham.distanceSquared([1, 1], [4, 5]) === 25,
    "Test distanceSquared nie przeszedł dla punktów (1,1) i (4,5)"
  );
  console.log("Test distanceSquared przeszedł");
}

// Test 5: Funkcja convexHull dla wypukłego zbioru punktów
function testConvexHullConvexSet() {
  const graham = new Graham();
  const points = [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
  ];
  const expectedHull = [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
  ];
  const result = graham.convexHull(points);
  assert(
    JSON.stringify(result) === JSON.stringify(expectedHull),
    "Test convexHullConvexSet nie przeszedł"
  );
  console.log("Test convexHullConvexSet przeszedł");
}

// Wykonanie wszystkich testów
function uruchomTesty() {
  testOrientation();
  testCompare();
  testDistanceSquared();
  testConvexHullConvexSet();
}

// Uruchomienie testów
uruchomTesty();
