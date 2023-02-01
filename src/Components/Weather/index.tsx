import { useState } from "react"

const api = {
    key: "874d31958bddaffa4fca3d256298c6c3",
    base: "https://api.openweathermap.org/data/2.5/"
}

export function Weather() {
    const [query, setQuery] = useState('')
    const [weather, setWeather] = useState({})

    const search = (evt: { key: string }) => {
        if (evt.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result)
                    setQuery('')
                    console.log(result)
                })
        }
    }

    const dateBuilder = (d: Date) => {
        let months = [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",]
        let days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]

        let day = days[d.getDay()]
        let date = d.getDate()
        let moth = months[d.getMonth()]
        let year = d.getFullYear()

        return `${day} ${date} ${moth} ${year}`
    }

    return (
        <>
            <div className={(
                typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
                <main className="min-h-screen p-6">
                    <div className="w-full mb-[75px]">
                        <input
                            type="text"
                            className="block w-full p-4 appearance-none bg-none border-none outline-none bg-[rgba(255, 255, 255, 0.5)] rounded-b-2xl mt-[-25px] shadow-[0_5px_0px_0_rgba(0,0,0,0.2)] text-[#313131] text-[20px] transition-all"
                            placeholder="Search..."
                            onChange={e => setQuery(e.target.value)}
                            value={query}
                            onKeyPress={search}
                        />
                    </div>
                    {(typeof weather.main != "undefined") ? (
                        <>
                            <div className="location-box">
                                <div className="location text-[#ffffff] text-[32px] font-medium text-center">{weather.name}, {weather.sys.country}</div>
                                <div className="date text-[#fff] text-[20px] font-light italic text-center">{dateBuilder(new Date())}</div>
                            </div>
                            <div className="text-center">
                                <div className="temp relative inline-block m-[30px] bg-[#ffffff33] rounded-2xl py-[15px] px-[25px] text-[#fff] text-[70px] font-black text-center shadow-[0_3px_6px_0_rgba(0, 0, 0, 0.2)]">
                                    {Math.round(weather.main.temp)}ºc
                                </div>
                                <div className="weather text-[#fff] text-[48px] font-bold">
                                    {weather.weather[0].main}
                                </div>
                            </div>
                        </>
                    ) : ('')}
                </main>
            </div>
        </>
    )
}