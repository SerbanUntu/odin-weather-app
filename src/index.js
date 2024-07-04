import './styles/reset.css'
import './styles/main.css'
import './styles/util.css'
import { API } from './api'
import { images } from './images'
import { Category, Theme, Time } from './enums'
import { DataRow } from './components/data-row'
import { selectUnit } from './components/unit-buttons'
import { ErrorMessage } from './components/error'

const input = document.querySelector('input') //TODO make this more semantic
const searchButton = document.querySelector('.search-button')
const daysButton = document.querySelector('.days-button')
const hoursButton = document.querySelector('.hours-button')
const forecastMenu = document.querySelector('.forecast-data')

function getImageName() {
	const condition = Category.toString(API.current.condition.category)
	const time = Time.toString(API.current.day)
	return `${condition}-${time}`
}

function getImage() {
	return images[getImageName()]
}

function resetContent() {
	const table = document.querySelector('table')
	if (table) table.remove()
}

function toggleDays() {
	resetContent()
	const table = DataRow.getAll(daysButton.textContent)
	daysButton.classList.add('selected')
	hoursButton.classList.remove('selected')
	forecastMenu.appendChild(table)
}

function toggleHours() {
	resetContent()
	const table = DataRow.getAll(hoursButton.textContent)
	daysButton.classList.remove('selected')
	hoursButton.classList.add('selected')
	forecastMenu.appendChild(table)
}

function updateDocument() {
	const currentImage = getImage()
	document.querySelector('.credits').textContent = `
		©${new Date().getFullYear()} Serban Untu. Photo by ${currentImage.authors}.
	`
	document.querySelector('.weather-icon').src = API.current.condition.icon
	document.querySelector('.current-temp').textContent =
		`${API.current.temp[API.preferred.temp]}°${API.preferred.temp.toUpperCase()}`
	document.querySelector('.current-condition').textContent = API.current.condition.text
	document.querySelector('.location').textContent = `${API.location.name}, ${API.location.country}`
	document.querySelector('.date').textContent = API.current.dateText
	document.querySelector('.time').textContent = API.current.time
	document.body.dataset.theme = currentImage.theme === Theme.DARK ? 'dark' : 'light'
	document.body.dataset.image = getImageName()
	document.body.style.backgroundImage = `url("${currentImage.src}")`
	document.title = `${API.current.temp[API.preferred.temp]}°${API.preferred.temp.toUpperCase()} in ${API.location.name} | WeatherWatch`
	toggleDays()
}

export async function onApiFetch(value) {
	document.body.style.cursor = 'wait'
	API.fetchData(value)
		.catch(e => {
			ErrorMessage.pushError(e)
		})
		.then(() => {
			API.processData()
			updateDocument()
		})
		.finally(() => {
			document.body.style.cursor = 'auto'
		})
}

searchButton.addEventListener('click', e => {
	e.preventDefault()
	if (input.value !== '') {
		onApiFetch(input.value)
	}
})

daysButton.addEventListener('click', e => {
	e.preventDefault()
	toggleDays()
})

hoursButton.addEventListener('click', e => {
	e.preventDefault()
	toggleHours()
})

document.body.dataset.theme = 'light'

selectUnit('c')
selectUnit('kph')

onApiFetch('Iasi')
