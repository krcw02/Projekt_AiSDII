class VillagerInterface {
  constructor() {
    this.lastId = 0;
    this.villagers = [];
    document.querySelector("#addVillager").addEventListener("click", () => {
      this.addVillager();
    });
  }

  addVillager() {
    const hands = document.querySelector("input[name='ratio']:checked").value;
    const name = document.querySelector("#VillagerName").value;
    document.querySelector("#VillagerName").value = "";
    const partner = "";
    const id = this.lastId++;
    const energy = Math.floor(Math.random() * 7) + 1;
    this.villagers.push({ id, name, hands, energy });

    console.log(hands, name, id, energy, partner);
    document.querySelector(".listaPlaszczakow").innerHTML += `
    <div class="plasczak" id="n${id}">
            <div class="l">
            <img src="${
              document.querySelector("#img" + hands).src
            }" height="80px">
          </div>
          <div class="p">
            <p>Imie: ${name} (${id})</p>
            <p>Energia: ${energy}/7</p>
          </div>
    </div>
    `;
  }

  updateStats(id) {
    const villager = this.villagers.find((villager) => villager.id == id);

    document.querySelector("#n" + id + " > .p").innerHTML = `
    <p>Imie: ${villager.name} (${id})</p>
    <p>Energia: ${villager.energy}/7</p>
    <p>${villager.partner}</p>
    `;
  }

  groupVillagers() {
    let type1 = this.villagers.filter((emp) => emp.hands === "1");
    let type2 = this.villagers.filter((emp) => emp.hands === "2");
    let pairs = [];

    let dp = Array(type1.length + 1)
      .fill(null)
      .map(() => Array(type2.length + 1).fill(0));
    let backtrack = Array(type1.length + 1)
      .fill(null)
      .map(() => Array(type2.length + 1).fill({}));

    for (let i = 1; i <= type1.length; i++) {
      for (let j = 1; j <= type2.length; j++) {
        if (
          (type1[i - 1].id % 2 === 0 && type2[j - 1].id % 2 === 0) ||
          (type1[i - 1].id % 2 !== 0 && type2[j - 1].id % 2 !== 0)
        ) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
          backtrack[i][j] = {
            prev_i: i - 1,
            prev_j: j - 1,
            pair: [type1[i - 1], type2[j - 1]],
          };
        } else {
          if (dp[i - 1][j] > dp[i][j - 1]) {
            dp[i][j] = dp[i - 1][j];
            backtrack[i][j] = { prev_i: i - 1, prev_j: j, pair: null };
          } else {
            dp[i][j] = dp[i][j - 1];
            backtrack[i][j] = { prev_i: i, prev_j: j - 1, pair: null };
          }
        }
      }
    }

    let i = type1.length;
    let j = type2.length;
    while (i > 0 && j > 0) {
      if (backtrack[i][j] && backtrack[i][j].pair) {
        pairs.push(backtrack[i][j].pair);
        i = backtrack[i][j].prev_i;
        j = backtrack[i][j].prev_j;
      } else if (backtrack[i][j]) {
        if (backtrack[i][j].prev_i < i) {
          i = backtrack[i][j].prev_i;
        } else if (backtrack[i][j].prev_j < j) {
          j = backtrack[i][j].prev_j;
        } else {
          break;
        }
      } else {
        break;
      }
    }

    let usedType1 = new Set(pairs.map((pair) => pair[0].id));
    let usedType2 = new Set(pairs.map((pair) => pair[1].id));

    type1.forEach((emp) => {
      if (!usedType1.has(emp.id)) pairs.push([emp]);
    });
    type2.forEach((emp) => {
      if (!usedType2.has(emp.id)) pairs.push([emp]);
    });

    pairs.forEach((pair) => {
      if (pair.length == 1) {
        pair[0].partner = "nie ma pary";
        this.updateStats(pair[0].id);
      } else {
        pair[0].partner =
          "Pracuje z: " + pair[1].name + " (" + pair[1].id + ")";
        pair[1].partner =
          "Pracuje z: " + pair[0].name + " (" + pair[0].id + ")";
        this.updateStats(pair[0].id);
        this.updateStats(pair[1].id);
      }
    });

    return pairs;
  }

  generateSchedule(callback) {
    const sortedVillagers = this.villagers.sort((a, b) => b.energy - a.energy);

    let i = 0;

    sortedVillagers.forEach((villager) => {
      document.querySelector(".grafik").innerHTML += `
      <div class="plasczak" id="nn${villager.id}">
            <div class="l">
            <img src="${
              document.querySelector("#img" + villager.hands).src
            }" height="80px">
          </div>
          <div class="p">
            <p>Dzień: ${i++}</p>
            <p>Imie: ${villager.name} (${villager.id})</p>
          </div>
      </div>
      `;
    });

    document.querySelector(
      "#button8"
    ).innerHTML = `<h3>Wyślij strażnika do pracy</h3>`;

    document.querySelector("#button8").addEventListener("click", () => {
      const id = sortedVillagers.shift().id;
      document.querySelector("#nn" + id).remove();
      callback(id);
    });
  }
}

export { VillagerInterface };
