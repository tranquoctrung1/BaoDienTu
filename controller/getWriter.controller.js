const writerModel = require("../model/writer.model");

module.exports.loadWriter = async function (req, res) {
  // const id = req.params.id;

  const LoadListPost = await writerModel.loadListPost();
  // const entity = {
  //   NewsID: req.body.NewsID,
  //   NewsTitle: req.body.NewsTitle,
  //   Author: req.body.Author,
  //   DatePost: req.body.DatePost,
  //   CatChild_ID: req.body.CatChild_ID,
  //   Content: req.body.Content
  // }
  // const NewPost = await writerModel.addNewPost(entity);


  res.render("vwWriter/Writer", {
    LoadListPost,
    // NewPost,
  });
};
