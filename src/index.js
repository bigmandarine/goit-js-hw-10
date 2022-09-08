import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector('#search-box'),
};
function inputSearchCountry() {
  console.log(fetchCountries(refs.input.value));
}
refs.input.addEventListener(
  'input',
  debounce(() => {
    inputSearchCountry();
  }, DEBOUNCE_DELAY)
);
