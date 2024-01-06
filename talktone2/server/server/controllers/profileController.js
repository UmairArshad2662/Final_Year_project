const Profile = require("../models/Profile");
const User = require("../models/User");

exports.createProfile = async (req, res) => {
  const { name, address, dob, phNumber, experience, cnic } = req.body;

  try {
    const user = await User.findOne({ cnic });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log("User:", user);

    // Check if a profile already exists for this user
    const profileExists = await Profile.findOne({ User: user._id });
    console.log("Profile Exists: ", profileExists);

    if (profileExists) {
      return res.status(409).json({ error: 'Profile already exists' }); 
    }

    const profile = new Profile({
      name,
      address,
      dob,
      phNumber,
      experience,
      User: user._id, // Assign the user's ID to the User field in the Profile model
    });

    user.Profile = profile._id; // Assign the profile's ID to the user's Profile field
    await user.save();
    await profile.save();

    res.status(201).json({ message: 'Operator profile created successfully', profile });
  } 
  catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the operator profile' });
  }
}



exports.fetchProfile = async (req, res) => {
  try {
    console.log(req.query.id);
    const profile = await Profile.findOne({ User: req.query.id }).populate('User');
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.status(200).json({ profile });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the operator profile' });
  }
};


exports.fetchOperatorProfile = async (req, res) => {
  try {
    console.log(req.params.cnic);
    const user = await User.findOne({cnic:req.params.cnic})
    if (!user) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    const profile = await Profile.findOne({ User: user._id }).populate("User");
    res.status(200).json({ profile });
  } catch (error) {
    res.status(500).json({ error });
  }
};


