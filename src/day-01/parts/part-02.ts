import data from '../data/part-02.json';

export default function (): number {
  let result: number = 0;
  const getEveryDigit: RegExp = new RegExp(/\d/g);
  const translationTable: Record<string, number> = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9
  };

  const getNumber = (listEntry: string, reverseSearch: boolean): number => {
    let subResult: number = 0;

    // reverse the listEntry and the translationTable
    const reversedListEntry = listEntry.split('').reverse().join('');
    const reversedTranslationKeys = Object.keys(translationTable).map((key) => key.split('').reverse().join(''));

    // define the ressource to search in / against
    const ressource = reverseSearch 
      ? reversedListEntry
      : listEntry;

    const matchAgainst = reverseSearch 
      ? reversedTranslationKeys.join('|')
      : Object.keys(translationTable).join('|');

    // get digits
    const firstDigit = ressource.match(getEveryDigit) 
      ? ressource.match(getEveryDigit)![0]
      : null;

    const firstDigitPos = ressource.match(getEveryDigit) 
      ? ressource.match(firstDigit!) !.index 
      : null;

    // get strings
    const firstString = ressource.match(matchAgainst);
    const firstStringPos = firstString 
      ? ressource.match(`${firstString}`)?.index 
      : 1337 // set to a high number to make sure it is not used;

    // queue number
    if (reverseSearch) {
      subResult = firstDigitPos! < firstStringPos!
        ? parseInt(firstDigit!)
        : translationTable[firstString![0].split('').reverse().join('') as keyof typeof translationTable];
    } else {
      subResult = firstDigitPos! < firstStringPos!
        ? parseInt(firstDigit!)
        : translationTable[(firstString![0] as string) as keyof typeof translationTable];
    }

    // return subResult
    return subResult;
  }

  // loop over the input-data
  data.input.map((item) => {
    const calc: Record<string, number> = {
      "firstNumber": getNumber(item, false),
      "secondNumber": getNumber(item, true)
    }

    result = result + parseInt(calc.firstNumber.toString() + calc.secondNumber.toString());
  });

  return result;
};
