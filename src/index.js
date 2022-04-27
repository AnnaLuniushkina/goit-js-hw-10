import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';
const debounce = require('lodash.debounce');

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

let searchRequest;

searchBox.addEventListener('input', debounce(((event) => {
    searchRequest = event.target.value.trim();
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';

    if (searchRequest) {
        fetchCountries(searchRequest)
            .then(searchParameters)
            .catch(error => {
                Notify.failure('Oops, there is no country with that name');
            })
    }
}), 500));

function searchParameters(data) {
    if (data.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');

        return;
    } 
    renderCountry(data);
}

function renderCountry(data) {
    const renderCountryList = data.map(({ flags: {svg}, name: {official} }) => {
        return `<li style="font-size: 30px; display: flex; align-items: center"><img src="${svg}" alt="Прапор ${official}" width='50' height='30'style="padding-right: 10px">${official}</li>`
    }).join('');

    if (data.length === 1) {
        const languages = Object.values(data[0].languages).join(', ')
        const renderCountryInfo = `<ul style="list-style: none">

    <li><span style="font-weight: bold">Capital:</span> ${data[0].capital}</li>
    <li><span style="font-weight: bold">Population:</span> ${data[0].population}</li>
    <li><span style="font-weight: bold">Languages:</span> ${languages}</li>
</ul>`;
        
        countryInfo.insertAdjacentHTML('afterbegin', renderCountryInfo);
    }
    return countryList.insertAdjacentHTML('afterbegin', renderCountryList);
}