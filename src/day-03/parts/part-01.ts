import data from '../data/part-01.json';

export default function (): number {
  let time: number = Date.now();
  let result: number = 0;
  let lineWidth: number = 140;
  let linesToIterate: number = 140; // max 140

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
    // const foundSymbol = rows[row][column];

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
  
        selection.forEach((cell: string[], index: number) => {

          if (index === 0) {
            // assuming we're at the first match of of the current rows[row] (somewhere on the left)
            // i know that we're moving LEFT if adjecent numbers are found
            // so i check if the current cell's content is already at the 0th position
            // of the current row prevent moving out of bounds
            // just turn the current row and cell around and check if the current cell is at the 0th position
        
            if(rows[row].toString().indexOf(cell.toString()) !== -1) {

              // check if the first character of the current cell is a number
              if (!isNaN(parseInt(cell[0]))) {
                scopeSize.left++;
                foundNumber = true;
              }
            }
          }

          if (index === 3) {
            // assuming we're at the last match of of the current rows[row] (somewhere on the right)
            // i do the same as above but then for the right side

            const reversedRow = rows[row].toString().split('').reverse().join('');
            const reversedCell = cell.toString().split('').reverse().join('');

            if(reversedRow[row].toString().indexOf(reversedCell.toString()) !== -1) {

              // check if the last character of the current cell is a number
              if (!isNaN(parseInt(cell[cell.length - 1]))) {
                scopeSize.right++;
                foundNumber = true;
              }
            }
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

      extractAdjecentNumbers?.forEach((number: string) => {
        result += parseInt(number);
      });
    }
  });

  const timeTaken = new Date(Date.now() - time).toISOString().substr(11, 12);
  console.log(`🎉 Calculating Result: ${result} took ${timeTaken}`);

  return result;
};