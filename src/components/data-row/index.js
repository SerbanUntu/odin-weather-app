import { API } from '../../api'
import './index.css'
import RainIcon from '../../images/rain.svg'
import UVIcon from '../../images/uv.svg'
import WindIcon from '../../images/wind.svg'
import HumidityIcon from '../../images/humidity.svg'

export class DataRow {
	name
	conditionText
	weatherIcon
	temp
	rain
	uv
	humidity
	wind

	static currentTabName

	constructor(name, conditionText, weatherIcon, temp, rain, uv, humidity, wind) {
		this.name = name
		this.conditionText = conditionText
		this.weatherIcon = weatherIcon
		this.temp = temp
		this.rain = rain
		this.uv = uv
		this.humidity = humidity
		this.wind = wind
	}

	static getAll(variant) {
		DataRow.currentTabName = variant
		const table = document.createElement('table')
		if (variant === 'Days') {
			for (const data of API.forecast) {
				const day = data.day
				const currentRow = new DataRow(
					day.name,
					day.condition.text,
					day.condition.icon,
					day.temp[API.preferred.temp],
					day.rain,
					day.uv,
					day.humidity,
					day.wind[API.preferred.speed],
				)
				const tr = currentRow.getComponent()
				table.appendChild(tr)
			}
		} else {
			for (const data of API.forecast) {
				const headingRow = document.createElement('tr')
				headingRow.classList.add('heading-row')
				headingRow.innerHTML = `
					<td class="heading-cell" colspan="8">
						<h2 class="font-regular">${data.day.name}</h2>
					</td>`
				table.appendChild(headingRow)
				const hours = data.hours
				hours.forEach(hour => {
					const currentRow = new DataRow(
						hour.name,
						hour.condition.text,
						hour.condition.icon,
						hour.temp[API.preferred.temp],
						hour.rain,
						hour.uv,
						hour.humidity,
						hour.wind[API.preferred.speed],
					)
					const tr = currentRow.getComponent()
					table.appendChild(tr)
				})
			}
		}
		return table
	}

	static updateCurrentTemp() {
		document.querySelector('.current-temp').textContent =
			`${API.current.temp[API.preferred.temp]}°${API.preferred.temp.toUpperCase()}`
	}

	static updateDaysTemp() {
		document.querySelectorAll('table .row-temp').forEach((node, index) => {
			node.textContent = `${API.forecast[index].day.temp[API.preferred.temp]}°${API.preferred.temp.toUpperCase()}`
		})
	}

	static updateDaysWind() {
		document.querySelectorAll('table .row-wind').forEach((node, index) => {
			node.textContent = `${API.forecast[index].day.wind[API.preferred.speed]}`
			node.parentNode.setAttribute(
				'title',
				`Wind speed: ${API.forecast[index].day.wind[API.preferred.speed]}${API.preferred.speed}`,
			)
		})
	}

	static updateHoursTemp() {
		let forecastIndex = 0
		let hourIndex = 0
		document.querySelectorAll('table .row-temp').forEach(node => {
			if (hourIndex >= API.forecast[forecastIndex].hours.length) {
				forecastIndex += 1
				hourIndex = 0
			}
			node.textContent = `${API.forecast[forecastIndex].hours[hourIndex].temp[API.preferred.temp]}°${API.preferred.temp.toUpperCase()}`
			hourIndex += 1
		})
	}

	static updateHoursWind() {
		let forecastIndex = 0
		let hourIndex = 0
		document.querySelectorAll('table .row-wind').forEach(node => {
			if (hourIndex >= API.forecast[forecastIndex].hours.length) {
				forecastIndex += 1
				hourIndex = 0
			}
			node.textContent = `${API.forecast[forecastIndex].hours[hourIndex].wind[API.preferred.speed]}`
			node.parentNode.setAttribute(
				'title',
				`Wind speed: ${API.forecast[forecastIndex].hours[hourIndex].wind[API.preferred.speed]}${API.preferred.speed}`,
			)
			hourIndex += 1
		})
	}

	static updateUnits() {
		DataRow.updateCurrentTemp()
		if (DataRow.currentTabName === 'Days') {
			DataRow.updateDaysTemp()
			DataRow.updateDaysWind()
		} else {
			DataRow.updateHoursTemp()
			DataRow.updateHoursWind()
		}
	}

	getComponent() {
		const tr = document.createElement('tr')
		tr.innerHTML = `
			<td><p>${this.name}</p></td>
			<td><img class="row-weather-icon" src=${this.weatherIcon}></td>
			<td><h2 class="row-temp">${this.temp}°${API.preferred.temp.toUpperCase()}</h2></td>
			<td><p class="text-ellipsis">${this.conditionText}</p></td>
			<td class="data-group data-rain" title="Chance of rain: ${this.rain}%">
				<div class="img-wrapper">
					<img src=${RainIcon}>
				</div>
				<h3>${this.rain}%</h3>
			</td>
			<td class="data-group data-uv" title="UV Index: ${this.uv}">
				<div class="img-wrapper">
					<img src=${UVIcon}>
				</div>
				<h3>${this.uv}</h3>
			</td>
			<td class="data-group data-wind" title="Wind speed: ${this.wind}${API.preferred.speed}">
				<div class="img-wrapper">
					<img src=${WindIcon}>
				</div>
				<h3 class="row-wind">${this.wind}</h3>
			</td>
			<td class="data-group data-humidity" title="Air humidity: ${this.humidity}%">
				<div class="img-wrapper">
					<img src=${HumidityIcon}>
				</div>
				<h3>${this.humidity}%</h3>
			</td>
		`
		return tr
	}
}
