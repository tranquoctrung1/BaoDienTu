const writerModel = require("../model/writer.model");

module.exports.loadWriter = async function (req, res) {
  // const id = req.params.id;

  const LoadListPost = await writerModel.loadListPost();
  // const NewPost = await writerModel.addNewPost(req.body);

  res.render("vwWriter/Writer", {
    LoadListPost,
    // NewPost,
  });
};
