import data from '../data/part-01.json';

export default function (): number {
    let result: number = 0;
    const getEveryDigit: RegExp = new RegExp(/\d/g);

    // loop over the input-data
    data.input.map((item) => {
        const digits = item.match(getEveryDigit);
        if (!digits) return // skip if no digits found

        result = result + parseInt(digits[0] + digits[digits.length - 1]);
    });

    return result;
};
