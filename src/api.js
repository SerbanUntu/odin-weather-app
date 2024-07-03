import { Category, Time } from './enums'

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const monthNames = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
]

export class API {
	static rawData
	static current
	static days
	static hours
	static preferred = {
		temp: 'c',
		speed: 'kph',
	}
	static key = 'e00f824bfd8e428c976102008240107'
	static FORECAST_DAYS = 3

	static getCategoryFromConditionCode(code) {
		switch (code) {
			case 1000:
				return Category.CLEAR
			case 1003:
			case 1006:
				return Category.CLOUDY
			case 1087:
			case 1273:
			case 1276:
			case 1279:
			case 1282:
				return Category.STORMY
			case 1009:
			case 1030:
			case 1069:
			case 1135:
			case 1147:
			case 1204:
			case 1207:
			case 1249:
			case 1252:
				return Category.OVERCAST
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
				return Category.SNOWY
			default:
				return Category.RAINY
		}
	}

	static async fetchData(location) {
		const url = `http://api.weatherapi.com/v1/forecast.json?key=${API.key}&q=${location}&days=${API.FORECAST_DAYS}`
		const response = await fetch(url, { mode: 'cors' })
		const json = await response.json()
		API.rawData = json
		return json
	}

	static processData() {
		API.current = {}
		API.current.day = API.rawData.current.is_day === 1 ? Time.DAY : Time.NIGHT
		API.current.date = new Date(API.rawData.location.localtime.split(' ')[0])
		API.current.time = API.rawData.location.localtime.split(' ')[1]
		API.current.wind = {
			dir: API.rawData.current.wind_dir,
			kph: API.rawData.current.wind_kph,
			mph: API.rawData.current.wind_mph,
		}
		API.current.temp = {
			c: API.rawData.current.temp_c,
			f: API.rawData.current.temp_f,
		}
		API.location = {
			name: API.rawData.location.name,
			country: API.rawData.location.country,
		}
		API.current.dateText = `${dayNames[API.current.date.getDay()]}, ${API.current.date.getDate()} ${monthNames[API.current.date.getMonth()]}`
		API.current.condition = {
			text: API.rawData.current.condition.text,
			category: API.getCategoryFromConditionCode(API.rawData.current.condition.code),
			icon: API.rawData.current.condition.icon,
		}
		API.current.humidity = API.rawData.current.humidity
		API.current.uv = API.rawData.current.uv
	}
}
