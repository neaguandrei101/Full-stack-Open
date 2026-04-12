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

    useEffect(() => {
        axios.get<JournalLog[]>('http://localhost:3000/api/diaries').then(response => {
            setJournalLogs(response.data)
        })
    }, [])

    return (
        <div>
            <h1>Diary entries</h1>
            <JournalElement journalLogs={journalLogs} />
        </div>
    )
}

export default App
