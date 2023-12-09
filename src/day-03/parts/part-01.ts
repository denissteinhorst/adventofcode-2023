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
  console.log('🔥 rows:', rows);
  

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
    const [hitRow, hitColumn] = coordinate;
    const foundSymbol = rows[hitRow][hitColumn];

    // scope of the selection
    const scopes = {
      0: { left: 2, right: 2, selection: '' },
      1: { left: 2, right: 2, selection: '' },
      2: { left: 2, right: 2, selection: '' },
    };

    // console.log(`found: [ ${foundSymbol} ] in Row ${hitRow}/${rows.length} at Column ${hitColumn}/${rows[hitRow].length}`);
    
    const makeSelection = (row: number, column: number, direction: string, selectionWidth: number ) => {
      const selection: string[] = [];
  
      // create the selection
      for (let i = 0; i < selectionWidth; i++) {
          const columnIndex = direction === 'left' ? column - i : column + i;
  
          
          // Check if columnIndex is within bounds
            if (columnIndex >= 0 && columnIndex < rows[row].length) {
                selection.push(rows[row][columnIndex]);
            } else {
                // Handle out-of-bounds case (you can choose to push a default value or handle it in some other way)
                selection.push(''); // Default value when out of bounds
            }
      }
  
      // its left to right, so reverse the selection
      if (direction === 'left') {
          selection.reverse();
      }
  
      return selection;
  };

    // iterate over the rows (top, middle, bottom) and expand in each direction
    const checkRow = (row: number, index: number) => {
      if(rows[row]) {
        let selectionBasedOnScopeLeft = makeSelection(row, hitColumn, 'left', scopes[index].left);
        let selectionBasedOnScopeRight = makeSelection(row, hitColumn, 'right', scopes[index].right);
        selectionBasedOnScopeLeft.pop(); // remove matching symbol

        // while the first character of the selection is a number, incerase the scope[0].left by 1 
        while (selectionBasedOnScopeLeft[0].match(/\d/)) {
          scopes[index].left++;
          selectionBasedOnScopeLeft = makeSelection(row, hitColumn, 'left', scopes[index].left);
          selectionBasedOnScopeLeft.pop(); // remove matching symbol
        }

        // while the last character of the selection is a number, incerase the scope[0].right by 1
        while (selectionBasedOnScopeRight[selectionBasedOnScopeRight.length - 1].match(/\d/)) {
          scopes[index].right++;
          selectionBasedOnScopeRight = makeSelection(row, hitColumn, 'right', scopes[index].right);
          selectionBasedOnScopeRight.pop(); // remove matching symbol
        }

        const selection = [...selectionBasedOnScopeLeft, ...selectionBasedOnScopeRight];
        return selection.join('');
      }
    }

    scopes[0].selection = checkRow((hitRow - 1), 0);
    scopes[1].selection = checkRow(hitRow, 1);
    scopes[2].selection = checkRow((hitRow + 1), 2);

    // console.log('🔥 scopes:', scopes);   
  
    let joinedScope = '';

    // join all scopes
    Object.values(scopes).forEach((scope: any) => {
      joinedScope += scope.selection ? scope.selection : '';
    });

    // extract all numbers from the joined scope
    const extractAdjecentNumbers = joinedScope.match(/\d+/g);

    // add all numbers together
    extractAdjecentNumbers?.forEach((number: string) => {
      result += parseInt(number);
    });
  });

  const timeTaken = new Date(Date.now() - time).toISOString().substr(11, 12);
  console.log(`🎉 Calculating Result: ${result} took ${timeTaken}`);

  return result;
};