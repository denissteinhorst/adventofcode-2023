import data from '../data/part-01.json';

export default function (): number {
  let result: number = 0;

  // maximum amount of cubes per color
  const cubeLimits = {
    "red": 12,
    "green": 13,
    "blue": 14
  }

  const patternBinder = (color: string) => {
    return new RegExp(`(\\d+)\\s+${color}`, 'i');
  }

  for (let i = 0; i < data.input.length; i++) {
    const listEntry = data.input[i];
    const gameId = listEntry.split(':')[0].match(/\d+/g)![0];
    const gameLoop = listEntry.split(':')[1];
    const gameRound = gameLoop.split(';');

    let cubeCounter = {
      "red": 0,
      "green": 0,
      "blue": 0
    }

    console.log('🔥 ----- NEW GAME -----:');
    
    const possibleRound = gameRound.map((setOfCubes, index) => {

      const matchRed = setOfCubes.match(patternBinder('red'));
      const matchGreen = setOfCubes.match(patternBinder('green'));
      const matchBlue = setOfCubes.match(patternBinder('blue'));

      cubeCounter = {
        red: cubeCounter.red += matchRed ? parseInt(matchRed[1]) : 0,
        green: cubeCounter.green += matchGreen ? parseInt(matchGreen[1]) : 0,
        blue: cubeCounter.blue += matchBlue ? parseInt(matchBlue[1]) : 0
      }

      console.log('🔥 setOfCubes:', setOfCubes);
      console.log('🔥 cubeCounter:', cubeCounter);

      if(cubeCounter.red > cubeLimits.red) return false;
      if(cubeCounter.green > cubeLimits.green) return false;
      if(cubeCounter.blue > cubeLimits.blue) return false;

      return true
    });
    
    possibleRound.every((round) => round === true) 
      ? result = result + parseInt(gameId)
      : null
  };

  return result;
};
