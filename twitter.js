const Twit = require("twit")
const T = Twit({
  consumer_key: process.env.twitter_consumer_key,
  consumer_secret: process.env.twitter_consumer_secret,
  access_token: process.env.twitter_access_token,
  access_token_secret: process.env.twitter_access_token_secret
})

module.exports = {
  getRecentTweets: async () =>
    T.get("statuses/user_timeline", {
      screen_name: process.env.twitter_bot_screen_name,
      trim_user: true,
      tweet_mode: "extended"
    }).then(res => res.data),
  tweet: async status => T.post("statuses/update", { status }),
  isPublished: (article, tweets) => {
    const tweet = tweets
      .map(tweet => tweet.entities.urls[0])
      .find(entity => entity.expanded_url === article.link)
    return !!tweet
  },
  format: article =>
    `"${article.title}" by ${article.author.twitterHandle ||
      article.author.name}\n#DEVcommunity ${article.tags.join(" ")}\n${
      article.link
    }`
}
