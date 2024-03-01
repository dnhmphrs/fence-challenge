import { RectAreaLight } from "three";

const BACKEND_URL = 'https://n80dj9of87.execute-api.us-east-1.amazonaws.com/production';

async function fetchLeaderboard(orderID) {
	const response = await fetch(`${BACKEND_URL}/getleaderboard/${orderID}/`, {
		method: 'GET',
		//mode: 'no-cors',
		headers: {
			//'Content-Type': 'multipart/form-data'
			'Content-Type': 'application/json'
			// Add the API Key here if required in the future
			// 'x-api-key': 'YOUR_API_KEY'
		},
		//body: JSON.stringify({ orderID })
	});

	if (!response.ok) {
		throw new Error(`Error: ${response.status}`);
	}

	const data = await response.json();
	console.log(response);
	return data;
}

async function postResults(experiment, orderID, area) {
	const payload = {
		//sessionID,
		EXPERIMENT: experiment,
		orderID: orderID,
		RECORDTABLE: area
		//SESSION: session,
		//TEAM: team
	};

	const response = await fetch(`${BACKEND_URL}/postresults`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
			// 'x-api-key': 'YOUR_API_KEY' // Uncomment and replace YOUR_API_KEY when API key is required
		},
		body: JSON.stringify(payload)
	});

	if (!response.ok) {
		throw new Error(`Error: ${response.status}`);
	}

	const data = await response.json();
	return data;
}

export { fetchLeaderboard, postResults };

// EXAMPLE CODE TO CALL THESE ENDPOINTS

// <script>
// import { onMount } from 'svelte';
// import { fetchLeaderboard, postResults } from './api.js';
//
// let leaderboard = [];
//
// onMount(async () => {
//   try {
//     leaderboard = await fetchLeaderboard('ED9C2565');
//     console.log(leaderboard);
//   } catch (error) {
//     console.error(error.message);
//   }
// });
//
// Example function call for postResults (you'll need to provide the actual data)
// async function submitResults() {
//   try {
//     const result = await postResults(/* sessionID, experiment, order, recordTable, session, team */);
//     console.log(result);
//   } catch (error) {
//     console.error(error.message);
//   }
// }
// </script>
