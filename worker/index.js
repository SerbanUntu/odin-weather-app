export default {
    async fetch(req, env) {
        const params = new URL(req.url).searchParams
        params.set('key', env.WEATHER_API_KEY)
        const r = await fetch(`https://api.weatherapi.com/v1/forecast.json?${params}`)
        return new Response(r.body, {
                status: r.status,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        })
    },
}