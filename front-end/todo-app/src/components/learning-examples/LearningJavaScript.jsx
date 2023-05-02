
const person = {
    name: "David",
    age: 24,
    profiles: ['Twitter', 'Instagram'],
    printProfile: () => {
        person.profiles.map(profile => console.log(profile));
    }
}

function printProfile(){
    console.log(person.profiles[0]);
}

export default function LearningJavaScript(){
    return (
        <>
            <div>Name: {person.name}</div>
            <div>Age: {person.age}</div>
            <div>Social Media: {person.profiles[0]}, {person.profiles[1]}</div>
            <div>Age: {person.printProfile()}</div>
        </>
);
}