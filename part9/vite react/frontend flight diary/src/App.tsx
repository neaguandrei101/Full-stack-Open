import * as React from "react";
import {useEffect} from "react";
import axios from "axios";

interface JournalLog {
    "id": number;
    "date": string;
    "weather": string;
    "visibility": string;
}

const JournalElement = ({journalLogs}: { journalLogs: JournalLog[] }): React.ReactElement => {
    return (
        <div>
            {journalLogs.map((journal) => (
                <div key={journal.id}>
                    <h3>Date: {journal.date}</h3>
                    <p>Weather: {journal.weather}</p>
                    <p>Visibility: {journal.visibility}</p>
                </div>)
            )}
        </div>
    );
};

function App() {

    const [journalLogs, setJournalLogs] = React.useState<JournalLog[]>([]);
    const [date, setDate] = React.useState<string>("");
    const [weather, setWeather] = React.useState<string>("");
    const [visibility, setVisibility] = React.useState<string>("");

    const [error, setError] =  React.useState<string>("");

    useEffect(() => {
        axios.get<JournalLog[]>('http://localhost:3000/api/diaries').then(response => {
            setJournalLogs(response.data)
        })
    }, [])

    const journalCreation = (event: React.SyntheticEvent) => {
        event.preventDefault()

        const newJournalLog: Omit<JournalLog, 'id'> = {
            date, weather, visibility
        }


        axios.post<JournalLog>('http://localhost:3000/api/diaries', newJournalLog)
            .then(response => {
                setJournalLogs(journalLogs.concat(response.data))
            })
            .catch(error => {
                if (axios.isAxiosError<{message: string}>(error)) {
                    console.log(error.message);
                    setError(error.message);
                } else {
                    console.error(error);
                }
            })

        setDate('')
        setWeather('')
        setVisibility('')
    };

    return (
        <div>
            <h1>Diary entries</h1>
            <JournalElement journalLogs={journalLogs}/>

            <h1>Add new journal log</h1>

            <h3 style={{ display: error !== '' ? 'block' : 'none', color: 'red' }}>
                {error}
            </h3>
            <form onSubmit={journalCreation}>
                <div style={{marginBottom: '10px'}}>
                    <label>
                        Date:
                        <input
                            value={date}
                            onChange={(event) => setDate(event.target.value)}
                        />
                    </label>
                </div>

                <div style={{marginBottom: '10px'}}>
                    <label>
                        Weather:
                        <input
                            value={weather}
                            onChange={(event) => setWeather(event.target.value)}
                        />
                    </label>
                </div>

                <div style={{marginBottom: '10px'}}>
                    <label>
                        Visibility:
                        <input
                            value={visibility}
                            onChange={(event) => setVisibility(event.target.value)}
                        />
                    </label>
                </div>

                <button type='submit'>add</button>
            </form>
        </div>
    )
}

export default App
