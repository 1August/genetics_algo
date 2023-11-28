// Открыть данную папку в терминале (Пример: C:\desktop\genetics_algo)
// node ./knapsack.js

function generatePopulation(size, items) {
    const population = [];
    for (let i = 0; i < size; i++) {
        const individual = [];
        for (let j = 0; j < items.length; j++) {
            individual.push(Math.random() < 0.5 ? 0 : 1);
        }
        population.push(individual);
    }
    return population;
}

function fitness(individual, items, maxWeight) {
    let totalValue = 0;
    let totalWeight = 0;
    for (let i = 0; i < items.length; i++) {
        if (individual[i] === 1) {
            totalValue += items[i].value;
            totalWeight += items[i].weight;
        }
    }

    return totalWeight > maxWeight ? 0 : totalValue
}

function crossover(parent1, parent2) {
    const crossoverPoint = Math.floor(Math.random() * parent1.length);

    const child1 = parent1.slice(0, crossoverPoint).concat(parent2.slice(crossoverPoint));
    const child2 = parent2.slice(0, crossoverPoint).concat(parent1.slice(crossoverPoint));

    return [child1, child2];
}

function mutate(individual, mutationRate) {
    for (let i = 0; i < individual.length; i++) {
        if (Math.random() < mutationRate) {
            individual[i] = individual[i] === 0 ? 1 : 0;
        }
    }
    return individual;
}

function geneticKnapsack(items, maxWeight, populationSize, generations, mutationRate) {
    let population = generatePopulation(populationSize, items);
    let bestSolution = [];
    let bestFitness = 0;

    for (let gen = 0; gen < generations; gen++) {
        const newPopulation = [];
        for (let i = 0; i < population.length; i += 2) {
            const parent1 = population[i];
            const parent2 = population[i + 1];
            const [child1, child2] = crossover(parent1, parent2);
            mutate(child1, mutationRate);
            mutate(child2, mutationRate);
            newPopulation.push(child1, child2);
        }

        population = newPopulation;

        for (let i = 0; i < population.length; i++) {
            const currentFitness = fitness(population[i], items, maxWeight);
            if (currentFitness > bestFitness) {
                bestFitness = currentFitness;
                bestSolution = population[i];
            }
        }
    }

    return { bestSolution, bestFitness };
}

const items = [
    { weight: 2, value: 10 }, // 5
    { weight: 5, value: 20 }, // 4
    { weight: 1, value: 8 }, // 8
    { weight: 3, value: 15 }, // 5
    { weight: 1, value: 20 }, // 20
];

const maxWeight = 6;
const populationSize = 100;
const generations = 100;
const mutationRate = 0.1;

const result = geneticKnapsack(items, maxWeight, populationSize, generations, mutationRate);
console.log('Лучшее решение:', result.bestSolution);

