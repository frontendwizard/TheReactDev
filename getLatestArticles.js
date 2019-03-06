const axios = require("axios");

module.exports = async (tag) => {
  const articles = (await axios.get(`https://dev.to/api/articles/?tag=${tag}`)).data;
  // map articles to get the same object as in the previous version
  return articles.map(({
     title,
     tag_list,
     url,
     user: {
       name,
       twitter_username,
     }
   }) => ({
    title,
    tags: tag_list.map(t => `#${t}`),
    link: url,
    author: {
      name,
      link: `https://dev.to/${name}`,
      twitterHandle: `@${twitter_username}`,
    },
  }));
};
