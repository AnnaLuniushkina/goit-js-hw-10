export function fetchCountries(name) {
    const options = `?fields=name,capital,population,flags,languages`;

    return fetch(`https://restcountries.com/v3.1/name/${name}${options}`).then(response => {
        if (!response.ok) {
            throw Error(response.status)
        }
        return response.json();
    });
}
