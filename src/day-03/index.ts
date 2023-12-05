import { dayEntry } from '../components/dayEntry'
import part1 from './parts/part-01'
import part2 from './parts/part-02'

const props = {
    day: '01',
    intro: 'Day 3: Gear Ratios',
    question: 'What is the sum of all of the part numbers in the engine schematic?',
    part1: {
        challange: 'add up all the part numbers (even diagonally!)',
        answer: part1().toString()
    },
    part2: {
        challange: '...',
        answer: part2().toString()
    },
}

export default () => {
    document.body.appendChild(
        dayEntry(props.day, props.intro, props.question, props.part1, props.part2)
    )
}
