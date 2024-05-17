const numberOfCheckpoints = 10; // Liczba punktow orientacyjnych
const energyLevels = [5, 8, 3, 7, 6, 9, 4]; // Poziomy energii plaszczakow
const melodyTolerance = 3; // Maksymalna liczba odsluchan melodii tolerowana przez straznika przykladowa

// Funkcja wybierajaca kolejnego straznika na podstawie energii
function chooseGuard(energyLevels) {
    let maxEnergy = -1;
    let chosenGuard = -1;
    for (let i = 0; i < energyLevels.length; i++) {
        if (energyLevels[i] > maxEnergy) {
            maxEnergy = energyLevels[i];
            chosenGuard = i;
        }
    }
    energyLevels[chosenGuard] = -1; // Oznaczamy wybranego straznika jako wykorzystanego
    return chosenGuard;
}

// Funkcja wybierajaca punkty zatrzymania dla straznika
function chooseCheckpoints(currentCheckpoint, numberOfCheckpoints) {
    const checkpoints = [];
    let i = currentCheckpoint + 1;
    while (checkpoints.length < melodyTolerance && checkpoints.length < numberOfCheckpoints) {
        checkpoints.push(i % numberOfCheckpoints);
        i++;
    }
    return checkpoints;
}

function getDayName(dayIndex) {
    const daysOfWeek = ["Poniedzialek", "Wtorek", "Sroda", "Czwartek", "Piatek", "Sobota", "Niedziela"];
    return daysOfWeek[dayIndex % daysOfWeek.length];
}

// Glowna funkcja rozwiazujaca problem
function scheduleGuards(numberOfDays, numberOfCheckpoints, energyLevels) {
    const schedule = [];
    for (let day = 0; day < numberOfDays; day++) {
        const guard = chooseGuard(energyLevels);
        const checkpoints = chooseCheckpoints(day, numberOfCheckpoints);
        const dayName = getDayName(day);
        const listeningCount = checkpoints.length; // Liczba odsluchan melodii
        const workDuration = listeningCount * melodyTolerance; // Czas pracy straznika
        schedule.push({ dayName, guard, checkpoints, listeningCount, workDuration });
    }
    return schedule;
}

// PRZYKLAD
const numberOfDays = 7;
const guardSchedule = scheduleGuards(numberOfDays, numberOfCheckpoints, energyLevels);
console.log("Grafik pracy straznikow:");
guardSchedule.forEach((day, index) => {
    console.log(`Dzien ${day.dayName}: Straznik ${day.guard}, punkty zatrzymania: ${day.checkpoints.join(", ")}, Liczba odsluchan melodii: ${day.listeningCount}, Czas pracy: ${day.workDuration} godzin`);
});
