const App = () => {
    const courseName = "Half Stack application development";
    const courseParts: CoursePart[] = [
        {
            name: "Fundamentals",
            exerciseCount: 10
        },
        {
            name: "Using props to pass data",
            exerciseCount: 7
        },
        {
            name: "Deeper type usage",
            exerciseCount: 14
        }
    ];

    interface CoursePart {
        name: string;
        exerciseCount: number;
    }

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
                    <p key={part.name}>
                        {part.name} {part.exerciseCount}
                    </p>
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

export default App;