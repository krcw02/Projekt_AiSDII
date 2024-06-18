import * as PIXI from "pixi.js";
import grass from "./assets/grass.png";
import pathTexture from "./assets/path.png";
import poinTexture from "./assets/point.png";
import { pathTextures, factoryTextures, fenceTexture } from "./Textures";
import { createGraph } from "./graf";
import { createFenceBetweenLandmarks } from "./fence";
import { Villager, VillagerPair } from "./Villager";
import { FenceBuilder } from "./fenceBuilder";
import { VillagerInterface } from "./VillagerInterface";
import { Huffman } from "./Huffman";

function refreshBlock(x, y) {
  const block = map.blocks[y * width + x];
  let texture = 0;
  const left = map.blocks[y * width + x - 1];
  const right = map.blocks[y * width + x + 1];
  const top = map.blocks[(y - 1) * width + x];
  const bottom = map.blocks[(y + 1) * width + x];

  if (block.permutation != -1) {
    if (left.id == block.id) {
      texture += 1;
    }
    if (right.id == block.id) {
      texture += 4;
    }
    if (top.id == block.id) {
      texture += 8;
    }
    if (bottom.id == block.id) {
      texture += 2;
    }
    block.texture = pathTextures[texture];
    block.permutation = texture;
  }
}

function setFactory(block, x, y) {
  if (factoryPosition) {
    const b0 = map.blocks[factoryPosition[1] * width + factoryPosition[0]];
    const b1 = map.blocks[factoryPosition[1] * width + factoryPosition[0] + 1];
    const b2 =
      map.blocks[(factoryPosition[1] + 1) * width + factoryPosition[0]];
    const b3 =
      map.blocks[(factoryPosition[1] + 1) * width + factoryPosition[0] + 1];

    b0.texture = map.textures[0];
    b1.texture = map.textures[0];
    b2.texture = map.textures[0];
    b3.texture = map.textures[0];

    b0.id = 0;
    b1.id = 0;
    b2.id = 0;
    b3.id = 0;

    b0.permutation = -1;
    b1.permutation = -1;
    b2.permutation = -1;
    b3.permutation = -1;

    factoryPosition = null;
  }

  const block1 = map.blocks[y * width + x + 1];
  const block2 = map.blocks[(y + 1) * width + x];
  const block3 = map.blocks[(y + 1) * width + x + 1];

  block.texture = factoryTextures[0];
  block1.texture = factoryTextures[1];
  block2.texture = factoryTextures[2];
  block3.texture = factoryTextures[3];

  block.id = 3;
  block1.id = 3;
  block2.id = 3;
  block3.id = 3;

  block.permutation = 0;
  block1.permutation = 1;
  block2.permutation = 2;
  block3.permutation = 3;

  //set factory position
  factoryPosition = [x, y];
  return;
}

function changeTexture(x, y, texture) {
  const block = map.blocks[y * width + x];
  if (texture == 3) {
    setFactory(block, x, y);
    return;
  }
  block.texture = map.textures[texture];
  block.id = texture;
  block.permutation = texture == 1 ? 0 : -1;
  refreshBlock(x, y);
  refreshBlock(x, y + 1);
  refreshBlock(x, y - 1);
  refreshBlock(x + 1, y);
  refreshBlock(x - 1, y);
}

function toggleMapEvent(state) {
  if (!map.buttonMode && state) {
    console.log(map.buttonMode);
    map.on("click", (event) => {
      const position = event.getLocalPosition(map);
      const x = Math.floor(position.x / map.blockSize);
      const y = Math.floor(position.y / map.blockSize);
      const index = y * width + x;
      if (index >= 0 && index < map.blocks.length) {
        console.log(`Kliknięto blok na pozycji X: ${x}, Y: ${y}`);
        changeTexture(x, y, map.actualTexture);
      }
    });
  } else if (map.buttonMode && !state) {
    map.off("click");
  }
  map.buttonMode = state;
}

function toggleButtonClass() {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.classList.remove("activeButton");
  });
}

function getPathBetweenPoints(start, end) {
  let lastCommonPoint = null;
  for (let i = 0; i < start.length; i++) {
    if (start.path[i] !== end.path[i]) {
      lastCommonPoint = i - 1;
      break;
    }
  }
}

const map = new PIXI.Container();
map.sortableChildren = true;
width = 128;
height = 128;
map.blockSize = 64;
map.blocks = [];
map.textures = [
  PIXI.Texture.from(grass),
  PIXI.Texture.from(pathTexture),
  PIXI.Texture.from(poinTexture),
];
map.interactive = true; // Mapa jest interaktywna
map.buttonMode = false; // Ustawiamy kursor jako wskaźnik
map.actualTexture = 1;
map.refreshObjects = [];
factoryPosition = null;
for (let y = 0; y < width; y++) {
  for (let x = 0; x < height; x++) {
    const block = new PIXI.Sprite(map.textures[0]);
    block.x = x * map.blockSize;
    block.y = y * map.blockSize;
    block.width = map.blockSize;
    block.height = map.blockSize;
    block.id = 0;
    block.permutation = -1;
    map.addChild(block);
    map.blocks.push(block);
  }
}

let pathGraph = null;
let fenceBuilder = null;

const villagerInterface = new VillagerInterface();
let pathForGuard = null;
let pointNumbers = [];

document.querySelector("#button1").addEventListener("click", () => {
  map.actualTexture = 0; // Zmiana aktualnej tekstury na trawę
  toggleMapEvent(true);
  toggleButtonClass();
  document.querySelector("#button1").classList.add("activeButton");
});
document.querySelector("#button2").addEventListener("click", () => {
  map.actualTexture = 1; // Zmiana aktualnej tekstury na ścieżkę
  toggleMapEvent(true);
  toggleButtonClass();
  document.querySelector("#button2").classList.add("activeButton");
});
document.querySelector("#button3").addEventListener("click", () => {
  toggleMapEvent(false);
  toggleButtonClass();
  document.querySelector("#button3").classList.add("activeButton");
});
document.querySelector("#button4").addEventListener("click", () => {
  map.actualTexture = 2; // Zmiana aktualnej tekstury na punkt
  toggleMapEvent(true);
  toggleButtonClass();
  document.querySelector("#button4").classList.add("activeButton");
});
document.querySelector("#button5").addEventListener("click", () => {
  map.actualTexture = 3; // Zmiana aktualnej tekstury na fabrykę
  toggleMapEvent(true);
  //set activeButton class for button
  toggleButtonClass();
  document.querySelector("#button5").classList.add("activeButton");
});
document.querySelector("#button6").addEventListener("click", () => {
  // generowanie grafu

  //remove all text from map

  if (factoryPosition) {
    pathGraph = createGraph(map, [factoryPosition[0] - 1, factoryPosition[1]]);

    let { fence, landmarks } = createFenceBetweenLandmarks(pathGraph, map);
    let fenceBuilder = new FenceBuilder(
      map,
      pathGraph,
      factoryPosition[0],
      factoryPosition[1]
    );

    const pary = villagerInterface.groupVillagers();

    console.log(pary);
    pary.forEach((pair) => {
      if (pair.length == 1) {
        const villager = new Villager(
          map,
          factoryPosition[0] + 1,
          factoryPosition[1],
          pair[0].hands - 1,
          pair[0].id
        );
        return;
      } else {
        const villagerPair = new VillagerPair(
          map,
          factoryPosition[0],
          factoryPosition[1],
          factoryPosition[0],
          factoryPosition[1],
          64,
          0,
          1,
          pair[0].id,
          pair[1].id
        );
        fenceBuilder.addVillagerPair(villagerPair);
      }
    });

    // get arr of pixi obj from landmarks
    const landmarksPixi = landmarks.map((landmark) => map.blocks[landmark]);
    const randomNumbers = landmarks.map(() => Math.floor(Math.random() * 100));
    landmarksPixi.pop();
    // set random numbers to landmarks
    landmarksPixi.forEach((landmark, index) => {
      const text = new PIXI.Text(
        randomNumbers[index] > 9
          ? randomNumbers[index]
          : "0" + randomNumbers[index],
        {
          fontSize: 30,
          fill: 0xffffff,
        }
      );
      // each box is 64x64px so we need to move text to center of box
      text.x = landmark.x + 15;
      text.y = landmark.y + 15;
      map.addChild(text);
    });

    const landmarkSet = fenceBuilder.startBilding(fence, landmarks);
    //make path for guard as array from set
    pathForGuard = Array.from(landmarkSet);
    pathForGuard.push(pathForGuard[0]);
    pointNumbers = randomNumbers;
  }
});

document.querySelector("#button7").addEventListener("click", () => {
  villagerInterface.generateSchedule((id) => {
    console.log("Villager id: ", id);
    const villager = map.refreshObjects.find((obj) => obj.id === id);
    if (villager) {
      //go to the first landmark
      let i = 0;

      villager.moveInPath(pathForGuard[0].path);
      villager.addEventListener("pathEnd", () => {
        i++;
        console.log(i);
        if (i <= pathForGuard.length) {
          let path = pathForGuard[i - 1].path.slice(
            pathForGuard[i - 1].path.length - 2
          );
          path.reverse();
          console.log(pointNumbers[i - 1], pointNumbers[i]);

          setTimeout(
            () => {
              villager.moveInPath(
                path.concat(
                  pathForGuard[i].path.slice(pathForGuard[i].path.length - 2)
                )
              );
            },
            pointNumbers[i - 1] < pointNumbers[i] ? 10 : 3000
          );
        }
      });
    }
  });
});

document.querySelector("#button9").addEventListener("click", () => {
  const tekstMelodii = document.querySelector("#HufmanInput").value;
  const staryWzorzec = document.querySelector("#FirstPattern").value;
  const nowyWzorzec = document.querySelector("#SecondPattern").value;
  const huffman = new Huffman();
  let nowyTekstMelodii = huffman.zamienWzorzec(
    tekstMelodii,
    staryWzorzec,
    nowyWzorzec
  );

  let symbole = [];
  let czestotliwosci = [];
  for (let char of nowyTekstMelodii) {
    let index = symbole.indexOf(char);
    if (index === -1) {
      symbole.push(char);
      czestotliwosci.push(1);
    } else {
      czestotliwosci[index]++;
    }
  }

  huffman.budujDrzewo(symbole, czestotliwosci);
  let kody = huffman.generujKody();
  console.log("Kody Huffmana dla poszczególnych symboli:");
  for (let symbol in kody) {
    console.log(`${symbol}: ${kody[symbol]}`);
  }

  const dlugoscOryginalnejWiadomosci =
    huffman.obliczDlugoscOryginalnejWiadomosci(symbole, czestotliwosci);
  const dlugoscSkompresowanejWiadomosci =
    huffman.obliczDlugoscSkompresowanejWiadomosci(kody, czestotliwosci);
  const stopienKompresji =
    dlugoscOryginalnejWiadomosci / dlugoscSkompresowanejWiadomosci;

  let updatedNowyTekstMelodii = "";
  for (let index = 0; index < nowyTekstMelodii.length; index++) {
    updatedNowyTekstMelodii += nowyTekstMelodii[index];
    if ((index + 1) % 40 === 0) {
      updatedNowyTekstMelodii += "<br>";
    }
  }
  nowyTekstMelodii = updatedNowyTekstMelodii;

  // wypisz wszystklie wyniki
  document.querySelector("#HufmanOutput").innerHTML = `
  <p>Nowy tekst melodii po zamianie '${staryWzorzec}' na '${nowyWzorzec}':</p>
  <p>${nowyTekstMelodii}</p><br>
  <p>Długość oryginalnej wiadomości: ${dlugoscOryginalnejWiadomosci}</p><br>
  <p>Długość skompresowanej wiadomości: ${dlugoscSkompresowanejWiadomosci}</p><br>
  <p>Stopień kompresji: ${stopienKompresji}</p>
  `;
});

export { map };
