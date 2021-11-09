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

//Es para hacer las consultas.
const listRole = async (req, res) => {
  const roleSchema = await role.find();
  if (!roleSchema || roleSchema.length == 0)
    return res.status(400).send("Empty role list");
  return res.status(200).send({ roleSchema });

  //return !roleSchema || roleSchema.length==0 ? res.status(400).send("Empty role list") : res.status(200).send({roleSchema}); //Operador contrario para consultar
};

//Para realizar la actualizacion de un rol.
const updateRole = async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send("Imcomplete data");

  const existinRole = await role.findOne({
    name: req.body.name,
    description: req.body.description,
  });
  if (existinRole) return res.status(400).send("The rol already exist");

  const roleUpdate = await role.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    description: req.body.description,
  });

  return !roleUpdate
    ? res.status(400).send("Error editing role")
    : res.status(200).send({ roleUpdate });
};

//Para eliminar los roles.
const deleteRole = async (req, res) => {
  const roleDelete = await role.findByIdAndDelete({ _id: req.params["_id"] });
  return !roleDelete
    ? res.status(400).send("Role no found")
    : res.status(200).send("Role deleted");
};

//Se realiza interno.Cuando se hace login para identificar el rol.
//jwt para el login{dsdpwnoiewfnoen4nr0f0ene}
const findRole = async (req, res) => {
  const roleId = await role.findById({ _id: req.params["_id"] });
  //if (!roleId) return res.status
  return !roleId
    ? res.status(400).send("No search results")
    : res.status(200).send({ roleId });
};

export default { registerRole, listRole, findRole, updateRole, deleteRole };
