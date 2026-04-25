
const FormOnChange = () => {
    return (
        <>
            <form>
                <div className="row m-2">
                    <label className="col-3 text-end" htmlFor="firstname">Podaj imię:</label>
                    <input className="col-6" type="text" id="firstname" />
                </div>
                <div className="row m-2">
                    <label className="col-3 text-end" htmlFor="birthDate">Podaj datę urodzenia:</label>
                    <input className="col-6" type="date" id="birthDate" />
                </div>
                <div className="row m-2">
                    <label className="col-3 text-end" htmlFor="education">Podaj poziom wykształcenia:</label>
                    <select className="col-6" id="education">
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
        </>
    )
}

export default FormOnChange