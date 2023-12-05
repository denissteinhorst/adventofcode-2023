import data from '../data/part-01.json';



export default function (): number {
  let result: number = 0;
  let lineWidth: number = 140;
  let allCoordinates: number[][] = [];

  // valid symbols too look out for
  const matchingSymbols: string[] = data.input.match(/[^\d\s\w\.]/g) || [];

  // create 2-dimensional array of the input
  let rows: string[][] = (data.input.match(new RegExp(`.{1,${lineWidth}}`, 'g')) || []) as string[][];

  rows.map((singleRow: string[], index: number) => {
    
    // get all coordinates of the matching symbols in the current row, a symbol can occur multiple times
    // if the excact same coordinates are already in the array, don't add them again
    matchingSymbols.forEach((symbol: string) => {
      const symbolCoordinates: number[] = [];

      for (let i = 0; i < singleRow.length; i++) {
        if (singleRow[i] === symbol) {
          symbolCoordinates.push(i);
        }
      }

      symbolCoordinates.forEach((coordinate: number) => {
        const coordinateAlreadyExists = allCoordinates.find((existingCoordinate: number[]) => existingCoordinate[0] === index && existingCoordinate[1] === coordinate);

        if (!coordinateAlreadyExists) {
          allCoordinates.push([index, coordinate]);
        }
      });
    });
  });

  console.log('🔥 rows:', rows);
  


  const selectDynamicGrid = (startCoordinate: number[], scopeWidth) => {
    const [startRow, startCol] = startCoordinate;
    const { right, left } = scopeWidth;
    const grid: string[][] = [];

    // loop through the rows
    for (let i = 0; i < rows.length; i++) {
      const currentRow = rows[i];
      const currentRowLength = currentRow.length;
      const currentRowIndex = i;

      // check if the current row is the row of the starting coordinate
      if (currentRowIndex === startRow) {
        // loop through the columns
        for (let j = 0; j < currentRowLength; j++) {
          const currentCol = currentRow[j];
          const currentColIndex = j;

          // check if the current column is the column of the starting coordinate
          if (currentColIndex === startCol) {
            // loop through the rows again
            for (let k = 0; k < rows.length; k++) {
              const currentRow = rows[k];
              const currentRowLength = currentRow.length;
              const currentRowIndex = k;
              const gridRow: string[] = [];

              // check if the current row is within the scope
              if (currentRowIndex >= startRow - left && currentRowIndex <= startRow + right) {
                // loop through the columns again
                for (let l = 0; l < currentRowLength; l++) {
                  const currentCol = currentRow[l];
                  const currentColIndex = l;

                  // check if the current column is within the scope
                  if (currentColIndex >= startCol - left && currentColIndex <= startCol + right) {
                    // add the current column to the grid row
                    gridRow.push(currentCol);
                  }
                }
              }

              // add the grid row to the grid
              grid.push(gridRow);
            }
          }
        }
      }
    }

    return grid.map((row: string[]) => row.join(''));
  }

  // loop through every symbol coordinate
  allCoordinates.forEach((coordinate: number[]) => {
      const [row, column] = coordinate;
      const foundSymbol = rows[row][column];

      console.log(`🔥 found: [ ${foundSymbol} ] in row: [ ${row} ] at col: [ ${column} ] `);

      const scopeWidth = {
        right: 1,
        left: 1
      };

      while (rows[row][column - scopeWidth.left] && rows[row][column - scopeWidth.left].match(/\d/)) {
        scopeWidth.left++;
      }
    
      while (rows[row][column + scopeWidth.right] && rows[row][column + scopeWidth.right].match(/\d/)) {
        scopeWidth.right++;
      }

      selectDynamicGrid(coordinate, scopeWidth).forEach((row: string[]) => {
          if (row.toString().match((/\d/))) {
            const extractedNumbers = row.toString().split(/[^\d]/).filter((cell: string) => cell !== '');
      
            console.log('🔥 extractedNumbers:', extractedNumbers);
      
            for (const number of extractedNumbers) {
              result += parseInt(number);
            }
          }
      });
  });


  return result;
};