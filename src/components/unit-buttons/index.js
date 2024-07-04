import './index.css'
import { API } from '../../api'
import { DataRow } from '../data-row'

const tempButton = document.querySelector('.temp-button')
const speedButton = document.querySelector('.speed-button')

export function selectUnit(unit) {
	switch (unit) {
		case 'c':
			API.preferred.temp = 'c'
			document.querySelector('.unit.f').classList.remove('selected')
			document.querySelector('.unit.c').classList.add('selected')
			break
		case 'f':
			API.preferred.temp = 'f'
			document.querySelector('.unit.c').classList.remove('selected')
			document.querySelector('.unit.f').classList.add('selected')
			break
		case 'kph':
			API.preferred.speed = 'kph'
			document.querySelector('.unit.mph').classList.remove('selected')
			document.querySelector('.unit.kph').classList.add('selected')
			break
		default:
			API.preferred.speed = 'mph'
			document.querySelector('.unit.kph').classList.remove('selected')
			document.querySelector('.unit.mph').classList.add('selected')
	}
}

tempButton.addEventListener('click', e => {
	e.preventDefault()
	selectUnit(API.preferred.temp === 'c' ? 'f' : 'c')
	DataRow.updateUnits()
})

speedButton.addEventListener('click', e => {
	e.preventDefault()
	selectUnit(API.preferred.speed === 'kph' ? 'mph' : 'kph')
	DataRow.updateUnits()
})
