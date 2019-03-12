const Xray = require("x-ray")
const URL = require("url").URL

const X = Xray({
  filters: {
    trim: value => value.trim(),
    parseName: value => value.split("・")[0]
  }
})

const getLatestArticles = async tag => {
  const articles = await X(
    `https://dev.to/t/${tag}/latest`,
    "#substories .single-article",
    [
      {
        title: ".index-article-link .content h3 | trim",
        link: ".index-article-link@href",
        tags: [".tags .tag"],
        author: {
          name: "h4 a | parseName",
          link: ".small-pic-link-wrapper@href"
        }
      }
    ]
  ).then(articles => articles.filter(article => article.title))

  // clean tags out of title
  for (article of articles) {
    article.tags.forEach(tag => {
      if (article.title.indexOf(tag) > -1) {
        article.title = article.title.split(tag)[1].trim()
      }
    })
  }

  // get twitter handle
  for (article of articles) {
    const socialLinks = await X(article.author.link, [
      ".profile-details .social a@href"
    ])
    const twitter = socialLinks.find(url => url.includes("twitter.com/"))
    if (twitter) {
      const twitterURL = new URL(twitter)
      article.author.twitterHandle = `@${twitterURL.pathname.substring(1)}`
    }
  }

  return articles
}

module.exports = getLatestArticles
