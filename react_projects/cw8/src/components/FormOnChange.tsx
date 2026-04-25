import { useState, type SubmitEvent } from "react"

const FormOnChange = () => {
    //ustawienie stanów dla każdego z pól formularza
    const [firstname, setFirstname] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [education, setEducation] = useState('');

    console.log('render')
    function handleSubmit(e: SubmitEvent<HTMLFormElement>): void {
        e.preventDefault()
    }

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="row m-2">
                    <label className="col-3 text-end" htmlFor="firstname">Podaj imię:</label>
                    <input onChange={} className="col-6" type="text" id="firstname" />
                </div>
                <div className="row m-2">
                    <label className="col-3 text-end" htmlFor="birthDate">Podaj datę urodzenia:</label>
                    <input onChange={} className="col-6" type="date" id="birthDate" />
                </div>
                <div className="row m-2">
                    <label className="col-3 text-end" htmlFor="education">Podaj poziom wykształcenia:</label>
                    <select onChange={} className="col-6" id="education">
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
            <div className="border p-2">tu będzie wynik</div>
        </>
    )
}

export default FormOnChange