const url = 'https://covid-193.p.rapidapi.com/countries';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'ganti dengan key yang benar ya',
        'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
    }
};

function isNull(num) {
    return num ?? 0;
}

let fetchCountryData = async () => {
    let country = document.getElementById("country-select");
    chosen = country.value;
    let url2 = `https://covid-193.p.rapidapi.com/statistics?country=${chosen}`;
    try {
        const response = await fetch(url2, options);
        const result = await response.json();
        const { cases, deaths, tests } = result.response[0]

        let active = isNull(cases.active)
        let newcases = isNull(cases.new)
        let recovered = isNull(cases.recovered)
        let total = isNull(cases.total)
        let death = isNull(deaths.total)
        let test = isNull(tests.total)

        document.getElementById("active-cases").innerHTML = active
        document.getElementById("new-cases").innerHTML = newcases
        document.getElementById("recovered-cases").innerHTML = recovered
        document.getElementById("total-cases").innerHTML = total
        document.getElementById("total-deaths").innerHTML = death
        document.getElementById("total-tests").innerHTML = test
    } catch (error) {
        console.error(error);
    }
}

let fetchCountry = async () => {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        let list = ''
        result.response.forEach(ele => {
            list += `
            <option value=${ele} id=${ele}>${ele}</option>
            `})
        document.getElementById('country-select').innerHTML = list
        fetchCountryData()
    } catch (error) {
        console.error(error);
    }
}
