
const getStudent = (req, res) => {
  res.status(200).json({
    name: "Max Guzman Aceituno",
    studentId: "226636976",
  });
};

module.exports = {
  getStudent,
};
