export const fetchWeather = async (latitude, longitude) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const current = data.current_weather;

        return {
            temperature: current.temperature,
            condition: mapCondition(current.weathercode),
            humidity: 60,
            wind: `${current.windspeed} km/h`,
        };
    } catch (error) {
        console.error("Failed to fetch weather:", error);
        return null;
    }
};

export const mapCondition = (code) => {
    if ([0].includes(code)) return 'Clear';
    if ([1, 2].includes(code)) return 'Partly Cloudy';
    if ([3].includes(code)) return 'Cloudy';
    if ([45, 48].includes(code)) return 'Fog';
    if ([51, 53, 55].includes(code)) return 'Light Drizzle';
    if ([56, 57].includes(code)) return 'Freezing Drizzle';
    if ([61].includes(code)) return 'Slight Rain';
    if ([63].includes(code)) return 'Moderate Rain';
    if ([65].includes(code)) return 'Heavy Rain';
    if ([66, 67].includes(code)) return 'Freezing Rain';
    if ([71].includes(code)) return 'Slight Snowfall';
    if ([73].includes(code)) return 'Moderate Snowfall';
    if ([75].includes(code)) return 'Heavy Snowfall';
    if ([80, 81, 82].includes(code)) return 'Rain Showers';
    if ([85, 86].includes(code)) return 'Snow Showers';
    if ([95].includes(code)) return 'Thunderstorm';
    if ([96, 99].includes(code)) return 'Thunderstorm with Hail';

    return 'Unknown';
};

export const tips = {
    'Clear': "Enjoy the sun — sunglasses and sunscreen are your best friends!",
    'Partly Cloudy': "Layer up — it might cool down later.",
    'Cloudy': "A bit gloomy — carry a light jacket or sweater.",
    'Fog': "Drive carefully and wear bright or reflective clothing.",
    'Light Drizzle': "Bring an umbrella or a water-resistant hoodie.",
    'Freezing Drizzle': "Watch for ice — dress warmly and wear grippy shoes.",
    'Slight Rain': "Carry a compact umbrella or a light raincoat.",
    'Moderate Rain': "You’ll want a waterproof jacket and closed shoes.",
    'Heavy Rain': "Stay dry — boots, raincoat, and umbrella needed!",
    'Freezing Rain': "High ice risk — bundle up and avoid unnecessary travel.",
    'Slight Snowfall': "Wear warm layers and waterproof footwear.",
    'Moderate Snowfall': "Snowy day — layer up with winter gear.",
    'Heavy Snowfall': "Bundle up for a winter storm — snow boots and thermal wear are a must.",
    'Rain Showers': "Rain gear advised — it may come and go quickly.",
    'Snow Showers': "Wear a warm coat and be cautious of slippery paths.",
    'Thunderstorm': "Stay indoors when possible — avoid metal objects and open fields.",
    'Thunderstorm with Hail': "Severe weather — protect yourself and stay inside if you can.",
};

