const router = require("express").Router();
const { User } = require("../models/user");

router.get("/:id", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user)
			return res.status(404).send({ message: "User not found" });

		// Send the user's admin status
		res.status(200).send({ admin: user.admin });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;