// eslint-disable-next-line strict
module.exports = app => {
  const { STRING } = app.Sequelize;

  const Video = app.model.define('video', {
    title: STRING,
    iframe_url: STRING,
    img: STRING,
  });

  return Video;
};
