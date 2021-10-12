import React from "react";
import "../App.css";
import { useHistory } from "react-router-dom";

function Home(props) {
	let history = useHistory();

	return (
		<div className="home-container">
			<br />
			<br />
			<br />
			<h1>
				Selected Cooking Recipes <br />
				for <br />
				Halloween{" "}
			</h1>
		</div>
	);
}

export default Home;
