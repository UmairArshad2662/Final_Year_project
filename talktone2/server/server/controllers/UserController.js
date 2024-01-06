const bcrypt = require('bcrypt');
const User = require('../models/User');
const Profile = require('../models/Profile');


exports.loginAdmin = async (req, res) => {
  const { cnic, password } = req.body;

  try {
    const admin = await User.findOne({ cnic, role: 'admin' });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid CNIC or unauthorized as admin' });
    }

    const passwordMatch = admin.password === password;

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    return res.status(200).json({ message: 'Login successful',success:true, user: admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.loginOperator = async (req, res) => {
  const { cnic, password } = req.body;

  try {
    const operator = await User.findOne({ cnic, role: 'operator' });

    if (!operator) {
      return res.status(401).json({ message: 'Invalid CNIC or role' });
    }

    const passwordMatch = operator.password === password;

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    return res.status(200).json({ message: 'Login successful',success:true, user: operator });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
exports.addOperator = async (req, res) => {
  try {
    const { cnic, password, name,email,address,phoneNumber,dob,experience } = req.body;
    const existingOperator = await User.findOne({ cnic });
    if (existingOperator) {
      return res.status(400).json({ error: 'Operator with this CNIC already exists' });
    }
    const operator = new User({
      cnic,
      password,
      email,
      name,
    });
    await operator.save();
    const profile = new Profile({
      name,
      address,
      dob,
      phNumber:phoneNumber,
      experience,
      User: operator._id, // Assign the user's ID to the User field in the Profile model
    });
  await profile.save()
  operator.Profile=profile._id
  operator.save() 
    res.status(201).json({ message: 'Operator added successfully', operator });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.viewOperator = async (req, res) => {
  try {
    const operators = await User.find({
      role: 'operator',
    }).populate('Profile');

    res.status(200).json({ operators });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching operator profiles' });
  }
};

exports.operatorSuggestion = async (req, res) => {
  try {
    const operators = await User.find({
      cnic: {
        $regex: "^" + req.query.cnic,
      },
    }).select({cnic:1, _id:0});
    res.json({ operators });
}
catch (error) {
  res.status(500).json({ error: 'An error occurred while fetching operator profiles' });
}
};

exports.deleteOperator = async (req, res) => {
    try {
      const cnic = req.params.cnic;
      const user = await User.findOneAndDelete({ cnic });
      if (!user) {
        return res.status(404).json({ error: 'Operator profile not found' });
      }
      res.status(200).end(); 
    } catch (error) {
      res.status(500).json({ error});
    }
  };

  exports.operatorCount = (req,res) => {
    console.log("here")
    User.count({role: 'operator'}).then( (count) => {
        res.json({ count });
    });
  }
exports.registerUser = (req, res) => {
  const {cnic, password } = req.body;
  User.findOne({cnic: cnic}).then((onFulfilled) => {
    if (onFulfilled) {
      res.json({
        message: "user already exist",
      });
    } else {
      const user = new User({
        password,
        cnic,
      });
      user.save().then((onFulfilled, onRejected) => {
        if (onFulfilled) {
          res.json({
            message: "user is created",
          });
        } else {
          res.json({
            message: "user creation failed",
          });
        }
      });
    }
  });
};
