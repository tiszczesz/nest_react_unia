import { useRef, useState, type SubmitEvent } from "react";


const FormWithRef = () => {
    console.log('render form with ref')
    const [result, setResult] = useState("");
    const firstnameRef = useRef<HTMLInputElement>(null);
    const birthDateRef = useRef<HTMLInputElement>(null);
    const educationRef = useRef<HTMLSelectElement>(null);
    function handleSubmit(e: SubmitEvent<HTMLFormElement>): void {
        //throw new Error("Function not implemented.");
        e.preventDefault();
        if (firstnameRef.current && birthDateRef.current && educationRef.current) {
            const firstname = firstnameRef.current.value;
            const birthDate = birthDateRef.current.value;
            const education = educationRef.current.value;
            setResult(`Dane z formularza: imię: ${firstname}, data urodzenia: ${birthDate}, wykształcenie: ${education}`);
        }
    }

    return (
        <div>
            <h2>Form with Ref</h2>
            <form onSubmit={(e) => handleSubmit(e)} >
                <div className="row m-2">
                    <label className="col-3 text-end" htmlFor="firstname">Podaj imię:</label>
                    <input ref={firstnameRef} className="col-6" type="text" id="firstname" />
                </div>
                <div className="row m-2">
                    <label className="col-3 text-end" htmlFor="birthDate">Podaj datę urodzenia:</label>
                    <input ref={birthDateRef} className="col-6" type="date" id="birthDate" />
                </div>
                <div className="row m-2">
                    <label className="col-3 text-end" htmlFor="education">Podaj poziom wykształcenia:</label>
                    <select ref={educationRef} className="col-6" id="education">
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

export default FormWithRef