export class API {
	static rawData
	static data
	static key = 'e00f824bfd8e428c976102008240107'

	static getCategoryFromConditionCode(code) {
		switch (code) {
			case 1000:
				return 'clear'
			case 1003:
			case 1006:
				return 'cloudy'
			case 1087:
			case 1273:
			case 1276:
			case 1279:
			case 1282:
				return 'stormy'
			case 1009:
			case 1030:
			case 1069:
			case 1135:
			case 1147:
			case 1204:
			case 1207:
			case 1249:
			case 1252:
				return 'overcast'
			case 1066:
			case 1114:
			case 1117:
			case 1210:
			case 1213:
			case 1216:
			case 1219:
			case 1222:
			case 1225:
			case 1237:
			case 1255:
			case 1258:
			case 1261:
			case 1264:
				return 'snowy'
			default:
				return 'rainy'
		}
	}

	static async fetchRealtimeData(location) {
		const url = `http://api.weatherapi.com/v1/current.json?key=${API.key}&q=${location}`
		const response = await fetch(url, { mode: 'cors' })
		const json = await response.json()
		API.rawData = json
		return json
	}

	static processRealtimeData() {
		API.data = {}
		API.data.day = API.rawData.current.is_day === 1
		API.data.wind = {
			dir: API.rawData.current.wind_dir,
			kph: API.rawData.current.wind_kph,
			mph: API.rawData.current.wind_mph,
		}
		API.data.temp = {
			c: API.rawData.current.temp_c,
			f: API.rawData.current.temp_f,
		}
		API.data.location = {
			name: API.rawData.location.name,
			country: API.rawData.location.country,
			date: new Date(API.rawData.location.localtime.split(' ')[0]),
			time: API.rawData.location.localtime.split(' ')[1],
		}
		API.data.condition = {
			text: API.rawData.current.condition.text,
			category: API.getCategoryFromConditionCode(API.rawData.current.condition.code),
		}
	}

	// static async fetchForecastData(location) {}
}
