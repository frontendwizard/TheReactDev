# TheReactDev

The function that feeds @TheReactDev twitter.

This project was inspired by
[this article](https://dev.to/danielelkington/a-bot-that-tweets-new-dev-articles-about-vue-4p5a).

This function depends on a few environment variables:

- `dev_tag`: the dev.to tag to which the crawler will get the latest articles.
- `twitter_bot_screen_name`: the name of the account that will tweet the
  articles.
- Twitter keys:
  - `twitter_consumer_key`
  - `twitter_consumer_secret`
  - `twitter_access_token`
  - `twitter_access_token_secret`
- `telegram_bot_token`: the telegram bot who's going to log messages for
  maintenance/debug purposes
- `telegram_chat_id`: the channel where the bot will send messages

You just need to create a `env.yml` file and put those values in, like this:

```yml
dev_tag: "react"
twitter_bot_screen_name: "NameOfTheTwitterAccount"
twitter_consumer_key: "..."
twitter_consumer_secret: "..."
twitter_access_token: "..."
twitter_access_token_secret: "..."
telegram_bot_token: "..."
telegram_chat_id: "..."
```

It's worth noting that I used telegram here because it was simple and it
probably is the fastest way I can see a message in case things go wrong.
Probably sentry.io would be more

I started using azure, like
[twitter-vue-dev](http://github.com/danielelkington/twitter-vue-dev/), but after
a few hours of headaches I'm switching to the serverless framework with aws.
