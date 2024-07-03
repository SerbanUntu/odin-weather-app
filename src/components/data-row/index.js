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

	getComponent() {
		const tr = document.createElement('tr')
		tr.innerHTML = `
			<td><p>${this.name}</p></td>
			<td><img src=${this.weatherIcon}></td>
			<td><h2>${this.temp}°${API.preferred.temp.toUpperCase()}</h2></td>
			<td><p>${this.conditionText}</p></td>
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
				<h3>${this.wind}</h3>
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
