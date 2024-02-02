const Empolye = require("../Models/empolyee");

module.exports.index = async (req, res) => {
  const result = await Empolye.find();

  try {
    if (result) {
      res.send({
        status: 200,
        result,
      });
    }
  } catch (error) {
    res.send({
      massage: "An error Occured" + error,
    });
  }
};

module.exports.show = (req, res) => {
  let { id } = req.params;
  console.log(id);
  Empolye.findById(id)
    .then((result) => {
      res.send({
        status: 200,
        result,
      });
    })
    .catch((error) => {
      res.send({
        massage: "An error Occured" + error,
      });
    });
};

module.exports.search = (req, res) => {
  let { id } = req.params;

  Empolye.find({
    id,
  })
    .then((result) => {
      if (result) {
        return res.send({
          status: 200,
          result,
        });
      }
    })
    .catch((error) => {
      res.send({
        massage: "An error Occured" + error,
      });
    });
};

module.exports.add = async (req, res) => {
  try {
    const { name, Email, Phone, designation, age, id } = req.body;
    const empolyee = new Empolye({
      name,
      designation,
      Email,
      Phone,
      age,
      id,
    });

    if (!Email || !designation || !name || !Phone || !age || !id) {
      return res
        .status(200)
        .send({ success: null, msg: "All field are requried" });
    }

    const empolyeeData = await Empolye.findOne({
      $or: [{ Phone: Phone }, { Email: Email }],
    });

    if (empolyeeData) {
      return res.status(200).send({
        success: false,
        massage: "This Email OR Phone Is already Register",
      });
    } else {
      const empolyee_data = await empolyee.save();
      return res.status(200).send({ success: true, data: empolyee_data });
    }
  } catch (error) {
    res.status(204).send(error.message);
    console.log(error);
  }
};

module.exports.update = async (req, res) => {
  try {
    const empolyee_data_update = await Empolye.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (empolyee_data_update) {
      return res.status(200).send({
        massage: "Empolyee updated successfully!",
        success: true,
        result: empolyee_data_update,
      });
    }
  } catch (error) {
    res.send({
      message: `An error occured ${error}`,
    });
  }

  console.log(req.params);
};

module.exports.remove = (req, res) => {
  let empolyeeID = req.params.employeeId;
  console.log("Params delete", req.params);

  Empolye.findByIdAndDelete(empolyeeID)
    .then((result) => {
      res.send({
        massage: "Empolyee delete successfully!",
        status: 204,
        result,
      });
    })
    .catch((error) => {
      res.send({
        massage: "An error Occured",
      });
    });
};
