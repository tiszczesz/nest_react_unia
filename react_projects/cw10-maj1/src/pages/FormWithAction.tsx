import { useState } from "react";


const FormWithAction = () => {
    const [result, setResult] = useState("");

    function handleAction(formDate: FormData): void | Promise<void> {
        console.log('handle action')
        setResult(`Dane z formularza: imię: ${formDate.get("firstname")}, 
                    data urodzenia: ${formDate.get("birthDate")},
                   wykształcenie: ${formDate.get("education")}`);
    }

    return (
        <div>
            <h2>Form with Action</h2>
            <form action={(fd) => handleAction(fd)} >
                <div className="row m-2">
                    <label className="col-3 text-end" htmlFor="firstname">Podaj imię:</label>
                    <input className="col-6" type="text" id="firstname" name="firstname" />
                </div>
                <div className="row m-2">
                    <label className="col-3 text-end" htmlFor="birthDate">Podaj datę urodzenia:</label>
                    <input className="col-6" type="date" id="birthDate" name="birthDate" />
                </div>
                <div className="row m-2">
                    <label className="col-3 text-end" htmlFor="education">Podaj poziom wykształcenia:</label>
                    <select className="col-6" id="education" name="education">
                        <option value="podstawowe">podstawowe</option>
                        <option value="średnie">średnie</option>
                        <option value="wyższe">wyższe</option>
                    </select>
                </div>
                <div className="row m-2">
                    <button className="col-6 offset-3 btn btn-outline-primary" type="submit">
                        Wyślij
                    </button>
                </div>
            </form>
            <hr />
            <div className="border p-2">{result}</div></div>
    )
}

export default FormWithAction