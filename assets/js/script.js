"use strict";
/* 90afc290a4msh942c639bb0fe563p15afe0jsn7d560927cf10 */
const _firstCountry = 0;
const URL = "https://foreca-weather.p.rapidapi.com/location/search/";
const _weatherApi = "foreca-weather.p.rapidapi.com";

const _app = Vue.createApp({
	data() {
		return {
			countries: listOfCountries,
			currentCode: listOfCountries[_firstCountry].code,
			currentName: listOfCountries[_firstCountry].name,
			resultInfoCountry: null,
			weatherInformation: null,
		}
	},
	methods: {
		changeCountry(e){
			this.currentCode = e.target.value;
			this.currentName = this.countries.filter(c => c.code === e.target.value)[_firstCountry].name;
		},
		async processCountryInfoRequest(){
			const options = {
				method: 'GET',
				headers: {
					'X-RapidAPI-Key': this.$refs.rapidAPIKey.value,
					'X-RapidAPI-Host': _weatherApi,
				}
			};
			
			this.resultInfoCountry = await fetch(`${URL}${this.$refs.city.value}?lang=en&country=${this.currentCode.toLowerCase()}`, options)
			.then(res => res.json());
			await this.processWeatherRequest();
		},

		async processWeatherRequest(){
			if (this.resultInfoCountry === null) return;
			const idOfCountry = this.resultInfoCountry.locations[0].id;

			const options = {
				method: 'GET',
				headers: {
					'X-RapidAPI-Key': this.$refs.rapidAPIKey.value,
					'X-RapidAPI-Host': _weatherApi,
				}
			};

			this.weatherInformation = await fetch(`https://foreca-weather.p.rapidapi.com/current/${idOfCountry}?alt=0&tempunit=C&windunit=MS&tz=Europe%2FLondon&lang=en`, options)
				.then(response => response.json())
				.then(response => console.log(response))
				.catch(err => console.error(err));

			console.log(this.weatherInformation.current);
/*
			this.$refs.temperature.innerHTML = `Temperature: ${this.weatherInformation.current.temperature} ${this.weatherInformation.current.tempunit}`;
			this.$refs.weather.innerHTML = `Weather: ${this.weatherInformation.current.symbolPhrase}`;
			*/

		}
	},
});

_app.mount("#app");