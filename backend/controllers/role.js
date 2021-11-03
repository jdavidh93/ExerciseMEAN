import role from "../models/role.js";

const registerRole = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send("Imcomplete data");

  const existinRole = await role.findOne({ name: req.body.name });
  if (existinRole) return res.status(400).send("The rol already exist");

  const roleSchema = new role({
    name: req.body.name,
    description: req.body.description,
    dbStatus: true,
  });

  const result = await roleSchema.save();
  if (!result) return res.status(400).send("Failed to register role");
  return res.status(200).send({ result });
};

export default { registerRole };
