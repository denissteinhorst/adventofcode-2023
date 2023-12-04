import { dayEntry } from '../components/dayEntry'
import part1 from './parts/part-01'
import part2 from './parts/part-02'

const props = {
    day: '01',
    intro: 'Day 2: Cube Conundrum',
    question: 'What is the sum of the IDs of those games?',
    part1: {
        challange: '12 red cubes, 13 green cubes and 14 blue cubes',
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
