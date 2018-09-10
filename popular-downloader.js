// Node JS Lab - Advanced Part //

var rp = require('request-promise');
const fs = require('fs');


rp('https://reddit.com/r/popular.json')

    .then(res => {
        let articles = JSON.parse(res).data.children.map(item => item.data)


        articles.map(article => {

            let img = /\/\/i/
            let vid = /\/\/v/
            let gifv = /gifv/
            let gif = /gif/


            if (gifv.test(article.url)) {

                let url =article.preview.reddit_video_preview.fallback_url
                rp(url).pipe(fs.createWriteStream(`./downloads/${article.id}.gifv`))

            } else if (gif.test(article.url)) {
                rp(article.url).pipe(fs.createWriteStream(`./downloads/${article.id}.gif`))
            } else if (vid.test(article.url)) {
                let url =article.media.reddit_video.fallback_url
                rp(url).pipe(fs.createWriteStream(`./downloads/${article.id}.mp4`))
            } else if (img.test(article.url)) {
                rp(article.url).pipe(fs.createWriteStream(`./downloads/${article.id}.jpg`))
            }          

        })

    }).catch(err => console.log(err))