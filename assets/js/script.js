"use strict";

const _firstCountry = 0;
const URL = "https://foreca-weather.p.rapidapi.com";
const _weatherApi = "foreca-weather.p.rapidapi.com";

const _app = Vue.createApp({
	data() {
		return {
			countries: listOfCountries,
			currentCode: listOfCountries[_firstCountry].code,
			currentName: listOfCountries[_firstCountry].name,
			resultInfoCountry: null,
			noError: true,
		}
	},

	methods: {
		changeCountry(e){
			this.currentCode = e.target.value;
			this.currentName = this.countries.filter(c => c.code === e.target.value)[_firstCountry].name;
		},

		optionsForApi(){
			return {
				method: 'GET',
				headers: {
					'X-RapidAPI-Key': this.$refs.rapidAPIKey.value,
					'X-RapidAPI-Host': _weatherApi,
				}
			};
		},

		async processCountryInfoRequest(){
			const options = this.optionsForApi();
			
			const fetchedCountryInfo = await fetch(`${URL}/location/search/${this.$refs.city.value}?lang=en&country=${this.currentCode.toLowerCase()}`, options);
			
			this.resultInfoCountry = await fetchedCountryInfo.json();

			if (this.resultInfoCountry.locations[0] === undefined) return;

			await this.processWeatherRequest();
			const finishedWeatherRequest = await this.weatherInfo;

			this.displayValuesOfRequest(finishedWeatherRequest);

		},

		async processWeatherRequest(){
			if (this.resultInfoCountry === null) return;

			const idOfCountry = this.resultInfoCountry.locations[0].id;

			const options = this.optionsForApi();

			const fetchedWeatherInfo = await fetch(`${URL}/current/${idOfCountry}?alt=0&tempunit=C&windunit=MS&tz=Europe%2FLondon&lang=en`, options);
			this.weatherInfo = fetchedWeatherInfo.json();
		},

		displayValuesOfRequest(finishedWeatherRequest){
			this.$refs.temperature.innerHTML = "The temperature is " + finishedWeatherRequest.current.temperature + " °C";
			this.$refs.symbolPhrase.innerHTML = "This weather is " + finishedWeatherRequest.current.symbolPhrase;
		},
	},
});

_app.mount("#app");