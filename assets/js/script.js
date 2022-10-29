"use strict";
/* 90afc290a4msh942c639bb0fe563p15afe0jsn7d560927cf10 */
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
			
			this.resultInfoCountry = await fetch(`${URL}/location/search/${this.$refs.city.value}?lang=en&country=${this.currentCode.toLowerCase()}`, options)
			.then(res => res.json());
			this.weatherInformation = await this.processWeatherRequest();
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

			return await fetch(`${URL}/current/${idOfCountry}?alt=0&tempunit=C&windunit=MS&tz=Europe%2FLondon&lang=en`, options)
				.then(res => res.json())
				.then(res => console.log(res));
		}
	},
	async mounted() {
		try {
			this.$refs.temperature.innerText = this.weatherInformation.current.temperature;
			this.$refs.symbolPhrase.innerText = this.weatherInformation.current.symbolPhrase;
		} catch (error) {
			this.$refs.temperature.innerText = "Sorry, we couldn't request the information";
			this.$refs.symbolPhrase.innerText = "Sorry, we couldn't request the information";
		}		
	},
});

_app.mount("#app");