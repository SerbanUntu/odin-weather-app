export class Theme {
	static DARK = Symbol('Theme.DARK')
	static LIGHT = Symbol('Theme.LIGHT')
}

export class Category {
	static CLEAR = Symbol('Category.CLEAR')
	static CLOUDY = Symbol('Category.CLOUDY')
	static OVERCAST = Symbol('Category.OVERCAST')
	static RAINY = Symbol('Category.RAINY')
	static STORMY = Symbol('Category.STORMY')
	static SNOWY = Symbol('Category.SNOWY')

	static toString(value) {
		if (value === Category.CLEAR) return 'clear'
		if (value === Category.CLOUDY) return 'cloudy'
		if (value === Category.OVERCAST) return 'overcast'
		if (value === Category.RAINY) return 'rainy'
		if (value === Category.STORMY) return 'stormy'
		if (value === Category.SNOWY) return 'snowy'
	}
}

export class Time {
	static DAY = Symbol('Time.DAY')
	static NIGHT = Symbol('Time.NIGHT')

	static toString(value) {
		if (value === Time.DAY) return 'day'
		if (value === Time.NIGHT) return 'night'
	}
}
