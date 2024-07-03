import './styles/reset.css'
import './styles/main.css'
import './styles/util.css'
import { API } from './api'
import { images } from './images'
import { Category, Theme, Time } from './enums'

function getImage() {
	const condition = Category.toString(API.current.condition.category)
	const time = Time.toString(API.current.day)
	return images[`${condition}-${time}`]
}

async function onApiFetch(value) {
	await API.fetchData(value)
	API.processData()
	const currentImage = getImage()
	document.querySelector('.weather-icon').src = API.current.condition.icon
	document.querySelector('.current-temp').textContent = `${API.current.temp.c} °C`
	document.querySelector('.current-condition').textContent = API.current.condition.text
	document.querySelector('.location').textContent = `${API.location.name}, ${API.location.country}`
	document.querySelector('.date').textContent = API.current.dateText
	document.querySelector('.time').textContent = API.current.time
	document.body.dataset.theme = currentImage.theme === Theme.DARK ? 'dark' : 'light'
	document.body.style.backgroundImage = `url("${currentImage.src}")`
}

const searchButton = document.querySelector('.search-button')
const input = document.querySelector('input') //TODO make this more semantic

searchButton.addEventListener('click', e => {
	e.preventDefault()
	onApiFetch(input.value)
})

document.body.dataset.theme = 'dark'

onApiFetch('London')
