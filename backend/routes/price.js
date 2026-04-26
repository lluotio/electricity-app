const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const response = await axios.get(
			"https://api.porssisahko.net/v1/latest-prices.json",
		);

		const prices = response.data.prices;

		// otetaan uusin hinta
		const latest = prices[prices.length - 1];

		res.json({
			price: latest.price,
			currency: "c/kWh",
			updated: latest.startDate,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Failed to fetch electricity price" });
	}
});

module.exports = router;
