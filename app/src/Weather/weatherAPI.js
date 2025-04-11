export const fetchWeather = async (latitude, longitude) => {
    const url = `http://localhost:8080/api/weather?lat=${latitude}&lon=${longitude}`;

    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch weather from backend:", error);
        return null;
    }
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

