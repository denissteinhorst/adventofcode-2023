import { dayEntry } from '../components/dayEntry'
import part1 from './parts/part-01'
import part2 from './parts/part-02'

const props = {
    day: '01',
    intro: 'Day 1: Trebuchet?!',
    question: 'What is the sum of all of the calibration values?',
    part1: {
        challange: 'Numbers only',
        answer: part1().toString()
    },
    part2: {
        challange: 'Numbers + Numbers as Strings -mixed-',
        answer: part2().toString()
    },
}

export default () => {
    document.body.appendChild(
        dayEntry(props.day, props.intro, props.question, props.part1, props.part2)
    )
}
