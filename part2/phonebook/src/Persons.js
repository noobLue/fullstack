import Person from './Person'

const Persons = ({persons, newFilter}) => {
    return (
        <table>
        <tbody>
            {persons.filter(p=>p.name.toLowerCase().includes(newFilter.toLowerCase())).map((p)=><Person p={p} key={p.name} />)}
        </tbody>
        </table>
    )
}

export default Persons