const selectSQL = "select * from dishes;";
const selectById = "select * from dishes where id=$1";
const deleteById = "delete from dishes where id=$1";
const updateById = "update dishes set title=$1,img_url=$2 where id=$3";
const signupUser = "insert into users(email, password) values($1,$2)";
const selectUser = "select * from users where email=$1";

module.exports = {
  selectSQL,
  selectById,
  deleteById,
  updateById,
  signupUser,
  selectUser,
};
