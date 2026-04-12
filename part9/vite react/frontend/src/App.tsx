import * as React from "react";

interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CourseDesc extends CoursePartBase {
    description: string;
}

interface CoursePartBasic extends CourseDesc {
    description: string;
    kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
}

interface CoursePartBackground extends CourseDesc {
    backgroundMaterial: string;
    kind: "background"
}

interface CoursePartSpecial extends CourseDesc {
    requirements: string[];
    kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const App = () => {
    const courseName = "Half Stack application development";

    const courseParts: CoursePart[] = [
        {
            name: "Fundamentals",
            exerciseCount: 10,
            description: "This is an awesome course part",
            kind: "basic"
        },
        {
            name: "Using props to pass data",
            exerciseCount: 7,
            groupProjectCount: 3,
            kind: "group"
        },
        {
            name: "Basics of type Narrowing",
            exerciseCount: 7,
            description: "How to go from unknown to string",
            kind: "basic"
        },
        {
            name: "Deeper type usage",
            exerciseCount: 14,
            description: "Confusing description",
            backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
            kind: "background"
        },
        {
            name: "TypeScript in frontend",
            exerciseCount: 10,
            description: "a hard part",
            kind: "basic",
        },
        {
            name: "Backend development",
            exerciseCount: 21,
            description: "Typing the backend",
            requirements: ["nodejs", "jest"],
            kind: "special"
        }
    ];

    const Welcome = ({name}: { name: string }): React.JSX.Element => {
        return <h1>{name}</h1>;
    };

    const Total = ({totalExercises}: { totalExercises: number }): React.JSX.Element => {
        return <p>Number of exercises {totalExercises}</p>;
    };


    const Content = ({courseParts}: { courseParts: CoursePart[] }): React.ReactElement => {
        return (
            <div>
                {courseParts.map((part) => (
                    <Part part={part}></Part>
                ))}
            </div>
        );
    };

    const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

    return (
        <div>
            <Welcome name={courseName}/>
            <Content courseParts={courseParts}/>
            <Total totalExercises={totalExercises}/>
        </div>
    );
};

const assertNever = (value: never): never => {

    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
}

const Part = ({part}: { part: CoursePart }): React.ReactElement => {

    switch (part.kind) {
        case "basic":
            return (
                <div>
                    <b key={part.name}>{part.name} {part.exerciseCount}</b>
                    <p key={part.name}> {part.description}</p>
                </div>
            )
        case "group":
            return (
                <div>
                    <b key={part.name}>{part.name} {part.exerciseCount}</b>
                    <p key={part.name}> project exercises: {part.groupProjectCount}</p>
                </div>
            )
        case "background":
            return (<div>
                <b key={part.name}>{part.name} {part.exerciseCount}</b>
                <p key={part.name}> {part.description}</p>
                <p key={part.name}> submit to {part.backgroundMaterial}</p>
            </div>)
        case "special":
            return (<div>
                <b key={part.name}>{part.name} {part.exerciseCount}</b>
                <p key={part.name}> {part.description}</p>
                <p key={part.name}> required skills: {part.requirements.toString()}</p>
            </div>)
        default:
            return (assertNever(part))
    }

}

export default App;