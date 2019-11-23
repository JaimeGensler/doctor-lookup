import { Doctor } from './doctor.js';

export async function searchBetterDoctor(query) {
    try {
        const response = await fetch(`https://api.betterdoctor.com/2016-03-01/doctors?query=${query}&location=45.512%2C%20-122.658%2C50&user_location=45.512%2C%20-122.658&sort=best-match-desc&skip=0&limit=10&user_key=${process.env.API_KEY}`);

        if (response.ok) {
            const jsonResponse = await response.json();
            return cullSearchData(jsonResponse.data)
        } else {
            throw new Error(response.status);
        }
    } catch (error) {
        console.error(`BetterDoctor API Error: ${error}`);
    }
}

function cullSearchData(searchData) {
    let doctors = [];
    searchData.forEach((searchResult) => {
        doctors.push(
            new Doctor(
                searchResult.profile.first_name,
                searchResult.profile.last_name,
                searchResult.profile.title,
                searchResult.profile.image_url,
                searchResult.practices[0].name,
                searchResult.practices[0].visit_address.street,
                searchResult.practices[0].visit_address.street2,
                searchResult.practices[0].visit_address.city,
                searchResult.practices[0].visit_address.state,
                searchResult.practices[0].visit_address.zip,
                searchResult.practices[0].within_search_area
                searchResult.practices[0].website;
            )
        );
    });
    return doctors;
}