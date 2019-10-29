---
title: How I protect my privacy online
bigTitle: true
date: 2019-07-19
tags:
  - notes
layout: layouts/post.njk
---

For past year or so I’ve been actively trying to protect my online privacy by making decisions about what products I use, it started with switching to [Firefox] and ended up in leaving Instagram.

[Surveillance capitalism] is scary and I want to minimise my exposure to it. A couple of weeks back Maciej Cegłowski wrote [this brilliant essay](https://idlewords.com/2019/06/the_new_wilderness.htm) how we need to transform how we think about privacy by comparing it to how 100 years ago no one was interesting in protecting the environment.

_Here’s a little list of the things I’ve done:_

## I use Firefox with strict browser privacy enabled

[Firefox] repects it’s user privacy and has lots of features that actively help. For example [Firefox] blocks adverts and tracking pixels. [Safari] is not bad either.

## I switched from Gmail to ProtonMail

[ProtonMail] is probably overkill [Fastmail] would is good too. As with most of these things, if you’re not paying, you are the product.

## I deleted my Facebook account

I like to think most people know why Facebook is bad, but just in case here ar five articles: [1], [2], [3], [4] and [5].

## I don’t use Instagram anymore

This was probably the hardest habit for me to shake but last summer I bit the bullet and deleted the app. I probably miss out on some excellent stories but I like to think it’s good for my mental health.

## I use DuckDuckGo instead of Google for search

[DuckDuckGo] doesn’t track you like Google does. There are some searches that [DuckDuckGo] is not so good at. For instance pub opening times. But in those cases you can add `g!` to the end of you search and it redirects to Google. They have a good explainer on [why you should care about tracking](https://donttrack.us/).

## Firefox containers

[Firefox containers] are really useful for keeping trackers in check. I have a container which is signed into my Youtube account, and when I launch a youtube url it opens in this container keeping the rest of my browsing separate and disconnected. I could use Youtube without an account but the fact is subscriptions are the best way to find the videos you want rather than the trending stuff the algorithm  recommends.

## Twitter via TweetBot

I use [TweetBot], I don’t use Twitter.com or the Twitter iOS app this means tweets are in chronological order, I see no promoted tweets nor do I have to put up with Twitter suggesting who I follow or what is trending.

## DNS with 1.1.1.1

When you ask you computer to access a website the first thing that happens is a DNS lookup to find out where that web address lives. Usually you ISP does this lookup for you, they [log this and use it for advertising](https://arstechnica.com/information-technology/2018/04/how-to-keep-your-isps-nose-out-of-your-browser-history-with-encrypted-dns/). Using [1.1.1.1] which is run by [Cloudflare] is private and also way faster.

## DNS over HTTPS within Firefox

This is new and also very similar to the above, Firefox are the only browser that support it and this wound the ISPs up so much they [awarded Firefox _’Villan of the Year’_](https://techcrunch.com/2019/07/05/isp-group-mozilla-internet-villain-dns-privacy/), silly.

## 1Password

This is less about privacy more about security, but I used to have a well flimsy password method, now I rely on [1Password] to generate and store my passwords for me. I only have to remember one password (see what they did there). Make sure it’s something good, mine is a 28+ character phrase.

[Surveillance capitalism]: https://en.wikipedia.org/wiki/Surveillance_capitalism
[Firefox]: https://www.mozilla.org/en-US/firefox/new/
[Safari]: https://www.apple.com/safari/
[Fastmail]: https://www.fastmail.com/
[1.1.1.1]: https://1.1.1.1
[Firefox containers]: https://support.mozilla.org/en-US/kb/containers
[TweetBot]: https://tapbots.com/tweetbot/
[1Password]: https://1password.com/
[DuckDuckGo]: https://duckduckgo.com/about
[ProtonMail]: https://protonmail.com/
[Cloudflare]: https://www.cloudflare.com/
[1]: https://www.buzzfeednews.com/article/craigsilverman/facebook-graph-search-war-crimes
[2]: https://theoutline.com/post/7377/facebook-is-trying-to-make-the-word-private-meaningless
[3]: https://www.wired.com/story/facebook-mark-zuckerberg-15-months-of-fresh-hell/
[4]: https://www.theguardian.com/technology/2019/jan/20/shoshana-zuboff-age-of-surveillance-capitalism-google-facebook
[5]: https://theintercept.com/2019/03/06/facebook-mark-zuckerberg-privacy/
