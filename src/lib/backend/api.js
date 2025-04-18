import { RectAreaLight } from "three";
import { get } from "svelte/store";
import { supabase } from "./supabase.js";
import { sessionID, playerID, pFencedTiles, boardOccupiedTiles } from "$lib/store/pentominos.js"
import { leaderboard } from "$lib/store/data.js";

const BACKEND_URL = 'https://n80dj9of87.execute-api.us-east-1.amazonaws.com/production';

/*
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
		body: JSON.stringify({ orderID })
	});

	if (!response.ok) {
		throw new Error(`Error: ${response.status}`);
	}

	const data = await response.json();
	console.log(response);
	return data;
}
*/

async function fetchLeaderboard(orderID) {
	let { data: leaderboard, error } = await supabase
		.from('leaderboard')
		.select('name, orderID, playerID, country, area')
		.eq('orderID', orderID)
		.order('area', { ascending: false });
		return leaderboard;
}

async function fetchOptimals(orderNums) {
	if (orderNums.length == 12)
	{
	let { data: optimals, error } = await supabase
		.from('optimals')
		.select('Area, id1, id2, id3, id4, id5, id6, id7, id8, id9, id10, id11, id12')
		.eq('id1', parseInt(orderNums[0]))
		.eq('id2', parseInt(orderNums[1]))
		.eq('id3', parseInt(orderNums[2]))
		.eq('id4', parseInt(orderNums[3]))
		.eq('id5', parseInt(orderNums[4]))
		.eq('id6', parseInt(orderNums[5]))
		.eq('id7', parseInt(orderNums[6]))
		.eq('id8', parseInt(orderNums[7]))
		.eq('id9', parseInt(orderNums[8]))
		.eq('id10', parseInt(orderNums[9]))
		.eq('id11', parseInt(orderNums[10]))
		.eq('id12', parseInt(orderNums[11]));
		return optimals;
	}
	else return []
}

/*
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
*/

async function postResults(orderID, area, playerID, country, resultString, theEvent) {

	let payload = { 
		orderID: orderID, 
		sessionID: Math.floor(get(sessionID)*100000),
		area: area,
		name: 'Unknown', 
		country: country,
		playerID: playerID,
		resultString: resultString,
		event: theEvent
	}

	console.log(payload);

	try{
	const { data, error } = await supabase
		.from('leaderboard')
		.insert(payload).select();
		console.log(data);
		}
		catch(error)
		{
			console.error(error.message);
		}
	
		let leaderboard_data = await fetchLeaderboard(orderID);
		leaderboard.set(leaderboard_data);
}

async function fetchPlayerIDs()
{
	let { data: playerIDs, error } = await supabase
	.from('leaderboard')
	.select('playerID')
	return playerIDs;
}

async function setNewPlayerID()
{
	let usedIDs = await fetchPlayerIDs();
	let newID = Math.floor(Math.random()*100000000);
	console.log(usedIDs);
	while (usedIDs.includes(newID))
	{
		newID = Math.floor(Math.random()*100000000);
	}
	playerID.set(newID);
}


export { fetchLeaderboard, postResults, setNewPlayerID, fetchOptimals };



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
