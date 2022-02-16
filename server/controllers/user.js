import bcrypt from 'bcryptjs';

import User from '../models/user.js';

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: 'Invalid Password.' });

    res.status(200).json({ result: user });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

export const signUp = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ message: 'User with this email already exists.' });

    if (password !== confirmPassword)
      return res.status(400).json({ message: 'Passwords do no match.' });

    const hashPassword = bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashPassword,
      name: `${firstName} ${lastName}`,
    });

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};
