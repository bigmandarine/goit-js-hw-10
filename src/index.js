import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  oneCountryInfo: document.querySelector('.country-info'),
};

function inputSearchCountry() {
  if (refs.input.value === '') {
    refs.countryList.innerHTML = '';
    refs.oneCountryInfo.innerHTML = '';
  }
  const trimInputValue = refs.input.value.trim();
  fetchCountries(refs.input.value)
    .then(countries => {
      if (trimInputValue !== '') {
        if (countries.length > 10) {
          return Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (countries.length >= 2 && countries.length <= 10) {
          refs.countryList.innerHTML = '';
          refs.oneCountryInfo.innerHTML = '';
          renderAllContries(countries);
        } else if (countries.length === 1) {
          refs.countryList.innerHTML = '';
          refs.oneCountryInfo.innerHTML = '';
          renderOneCountry(countries);
        }
      } else if (!countries.name.contains(trimInputValue)) {
        return Notiflix.Notify.failure(
          'Oops, there is no country with that name'
        );
      }
    })
    .catch(() =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}

function renderAllContries(countries) {
  const allContries = countries
    .map(
      country =>
        `<li><img alt="Flag" src="${country.flags.svg}" width="30" height="20"/> <b>${country.name.common}</b></li>`
    )
    .join('');
  return refs.countryList.insertAdjacentHTML('beforeend', allContries);
}

function renderOneCountry(countries) {
  const oneCountry = countries
    .map(
      country =>
        `<h1><img alt="Flag" src="${
          country.flags.svg
        }" width="40" height="25"/> ${
          country.name.common
        }</h1><ul><li><b>Capital:</b> ${
          country.capital
        }</li><li><b>Population:</b> ${
          country.population
        }</li><li><b>Languages:</b> ${Object.values(
          country.languages
        )}</li></ul>`
    )
    .join('');
  return refs.oneCountryInfo.insertAdjacentHTML('beforeend', oneCountry);
}

refs.input.addEventListener(
  'input',
  debounce(() => {
    inputSearchCountry();
  }, DEBOUNCE_DELAY)
);
