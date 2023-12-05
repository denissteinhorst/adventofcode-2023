import data from '../data/part-01.json'; // same dataset as in part-01

export default function (): number {
  let result: number = 0;



  // regex helper function
  const patternBinder = (color: string) => {
    return new RegExp(`(\\d+)\\s+${color}`, 'i');
  }

  // loop through all games
  for (let i = 0; i < data.input.length; i++) {
    const listEntry = data.input[i];
    const gameLoop = listEntry.split(':')[1];
    const gameRound = gameLoop.split(';');

    // Cube storage per game
    let cubeStorage = {
      "red": 0,
      "green": 0,
      "blue": 0
    }

    // loop through every round in a game
    gameRound.map((setOfCubes) => {
      
      // get amount of cubes per color
      const amountOfRedCubes = setOfCubes.match(patternBinder('red'));
      const amountOfGreenCubes = setOfCubes.match(patternBinder('green'));
      const amountOfBlueCubes = setOfCubes.match(patternBinder('blue'));

      // store always the highest amount of cubes per color
      if (amountOfRedCubes && cubeStorage.red < parseInt(amountOfRedCubes[1])) {
        cubeStorage.red = parseInt(amountOfRedCubes[1]);
      }

      if (amountOfGreenCubes && cubeStorage.green < parseInt(amountOfGreenCubes[1])) {
        cubeStorage.green = parseInt(amountOfGreenCubes[1]);
      }

      if (amountOfBlueCubes && cubeStorage.blue < parseInt(amountOfBlueCubes[1])) {
        cubeStorage.blue = parseInt(amountOfBlueCubes[1]);
      }
    });
    
    // get the power of cubes by multiplying the amount of cubes per color
    result = result + Object.values(cubeStorage).reduce((acc, cur) => acc * cur);
  };
  
  return result;
};
