"use strict"

const axios = require("axios")

const getLatestDevArticles = require("./getLatestArticles")
const { getRecentTweets, tweet, isPublished, format } = require("./twitter")

const sendToTelegram = async text =>
  axios.post(
    `https://api.telegram.org/bot${process.env.telegram_bot_token}/sendMessage`,
    { chat_id: process.env.telegram_chat_id, text }
  )

module.exports.scrapArticlesAndTweet = async () => {
  const articles = await getLatestDevArticles(process.env.dev_tag)
  const recentTweets = await getRecentTweets(
    process.env.twitter_bot_screen_name
  )

  for (article of articles) {
    if (!isPublished(article, recentTweets)) {
      const data = await tweet(format(article))
      const log = `Tweeted ${article.title} on ${
        data.id
      } at ${new Date().toISOString()}`
      sendToTelegram(log)
    }
  }
}
