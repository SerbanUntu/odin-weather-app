import './styles/reset.css'
import './styles/main.css'
import './styles/util.css'
import { API } from './api'
import { images } from './images'
import { Category, Theme, Time } from './enums'
import { DataRow } from './components/data-row'

const input = document.querySelector('input') //TODO make this more semantic
const searchButton = document.querySelector('.search-button')
const daysButton = document.querySelector('.days-button')
const hoursButton = document.querySelector('.hours-button')
const forecastMenu = document.querySelector('.forecast-data')

function getImage() {
	const condition = Category.toString(API.current.condition.category)
	const time = Time.toString(API.current.day)
	return images[`${condition}-${time}`]
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

async function onApiFetch(value) {
	await API.fetchData(value)
	API.processData()
	const currentImage = getImage()
	document.querySelector('.weather-icon').src = API.current.condition.icon
	document.querySelector('.current-temp').textContent =
		`${API.current.temp[API.preferred.temp]}°${API.preferred.temp.toUpperCase()}`
	document.querySelector('.current-condition').textContent = API.current.condition.text
	document.querySelector('.location').textContent = `${API.location.name}, ${API.location.country}`
	document.querySelector('.date').textContent = API.current.dateText
	document.querySelector('.time').textContent = API.current.time
	document.body.dataset.theme = currentImage.theme === Theme.DARK ? 'dark' : 'light'
	document.body.style.backgroundImage = `url("${currentImage.src}")`
	toggleDays()
}

searchButton.addEventListener('click', e => {
	e.preventDefault()
	onApiFetch(input.value)
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

onApiFetch('Iasi')
