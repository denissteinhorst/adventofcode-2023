import data from '../data/part-01.json';

export default function (): number {
  let result: number = 0;

  // maximum amount of cubes per color
  const cubeLimits = {
    "red": 12,
    "green": 13,
    "blue": 14
  }

  // regex helper function
  const patternBinder = (color: string) => {
    return new RegExp(`(\\d+)\\s+${color}`, 'i');
  }

  // loop through all games
  for (let i = 0; i < data.input.length; i++) {
    const listEntry = data.input[i];
    const gameId = listEntry.split(':')[0].match(/\d+/g)![0];
    const gameLoop = listEntry.split(':')[1];
    const gameRound = gameLoop.split(';');

    // loop through every round in a game
    const possibleRound = gameRound.map((setOfCubes) => {
      
      // get amount of cubes per color
      const amountOfRedCubes = setOfCubes.match(patternBinder('red'));
      const amountOfGreenCubes = setOfCubes.match(patternBinder('green'));
      const amountOfBlueCubes = setOfCubes.match(patternBinder('blue'));

      // store amount of cubes per color
      let cubeCounter = {
        red: amountOfRedCubes ? parseInt(amountOfRedCubes[1]) : 0,
        green: amountOfGreenCubes ? parseInt(amountOfGreenCubes[1]) : 0,
        blue: amountOfBlueCubes ? parseInt(amountOfBlueCubes[1]) : 0
      }

      // check if amount of cubes per color is within the limits
      if(cubeCounter.red > cubeLimits.red) return false;
      if(cubeCounter.green > cubeLimits.green) return false;
      if(cubeCounter.blue > cubeLimits.blue) return false;

      return true
    });
    
    // check if given game is possible and add gameId to result if so
    possibleRound.every((round) => round === true) 
      ? result = result + parseInt(gameId)
      : null
  };

  return result;
};
