import data from '../data/part-01.json';

export default function (): number {
  let time: number = Date.now();
  let result: number = 0;
  let lineWidth: number = 140;
  let linesToIterate: number = 5; // max 140

  // valid symbols too look out for
  const matchingSymbols: { possibilitys: string[], coordinates: number[][] } = {
    possibilitys: data.input.match(/[^\d\s\w\.]/g) || [],
    coordinates: []
  }

  // 2-dimensional array of input
  let rows: string[][] = (data.input.match(new RegExp(`.{1,${lineWidth}}`, 'g')) || []) as string[][];

  // limit the amount of lines to iterate over
  rows = rows.slice(0, linesToIterate);

  // coordinates of matching symbols
  rows.map((singleRow: string[], index: number) => {
    
    // loop through all possible symbols
    matchingSymbols.possibilitys.forEach((symbol: string) => {
      const symbolCoordinates: number[] = [];
 
      // loop through all symbols in the current row
      for (let i = 0; i < singleRow.length; i++) {
        if (singleRow[i] === symbol) {
          symbolCoordinates.push(i);
        }
      }

      // add the coordinates of the matching symbols to the array
      symbolCoordinates.forEach((coordinate: number) => {
        const coordinateAlreadyExists = matchingSymbols.coordinates.find((existingCoordinate: number[]) => existingCoordinate[0] === index && existingCoordinate[1] === coordinate);

        if (!coordinateAlreadyExists) {
          matchingSymbols.coordinates.push([index, coordinate]);
        }
      });
    });
  });

  // loop through the coordinates of matching symbols
  matchingSymbols.coordinates.forEach((coordinate: number[]) => {
    const [row, column] = coordinate;
    const foundSymbol = rows[row][column];

    // get the current scope of the symbol
    const currentScope = () => {
      let currentSelection: string[][] = [];

      // default scopeSize is 1 in each direction (resulting in 3x3 grid around the current symbol)
      let scopeSize = {
        left: 1,
        top: 1,
        right: 1,
        bottom: 1
      }
  
      // iterate as long as scopeSize keeps increasing
      while (true) {

        // selection of the current symbol based on the scopeSize
        const selection: string[][] = rows.slice(row - scopeSize.top, row + scopeSize.bottom + 1).map((singleRow: string[]) => {
          return singleRow.slice(column - scopeSize.left, column + scopeSize.right + 1);
        });

        // when reached the end of current input, it's possible that the selection is missing a row so we add it
        while(selection.length < 3) {
          const charLength = selection[0].length;
          let contentFiller = '';
          for (let i = 0; i < charLength; i++) {
            contentFiller += '.';
          }
          selection.push((`${contentFiller}` as unknown) as string[]);
        }

        let foundNumber = false;
  
        selection.forEach((cell: string[]) => {
          // check if the first character of the current cell is a number
          if (!isNaN(parseInt(cell[0]))) {
            scopeSize.left++;
            foundNumber = true;
          }
          // check if the last character of the current cell is a number
          if (!isNaN(parseInt(cell[cell.length - 1]))) {
            scopeSize.right++;
            foundNumber = true;
          }
        });

        currentSelection = selection;

        // Break the loop if no additional numbers were found in the current iteration
        if (!foundNumber) {
          return currentSelection;
        }
      }
    }

    if (currentScope().length > 0) {
      const joinedScope = currentScope().join('').replace(/\s/g, '');
      const extractAdjecentNumbers = joinedScope.match(/\d+/g);

      console.log('🔥 foundSymbol:', foundSymbol);
      
      console.log('🔥 extractAdjecentNumbers:', extractAdjecentNumbers);
      

      extractAdjecentNumbers?.forEach((number: string) => {
        result += parseInt(number);
      });
    }
  });

  const timeTaken = new Date(Date.now() - time).toISOString().substr(11, 12);
  console.log(`🎉 Calculating Result: ${result} took ${timeTaken}`);

  return result;
};