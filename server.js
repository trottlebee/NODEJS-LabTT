// Node JS Lab - Part I //

// const path = require('path');
// const fs = require('fs');



// let chirps = [

//     { "Sept 1": "Nelly, do you know where I might find Ipswitch Brand Pitted Prunes?" },
//     { "Sept 2": "Behold, all-new-lows have officially been reached at the White House...." },
//     { "Sept 3": "Hmph, and I thought you were a clever critter--more's the pity." },
//     { "Sept 4": "A new episode in the saga, Elephants in the Rooms of Our Lives" },
//     { "Sept 5": "Elephant 665 - co-worker and admitted Trump voter laments the loss of manners in our culture (snort!)" }

// ]


// fs.writeFile(path.join(__dirname, 'chirps.json'), JSON.stringify(chirps), (err) => {
//     if (err) console.log('Couldnt write file: &{err}');
//     console.log('Success!');
// });



// fs.readFile(path.join(__dirname, 'chirps.json'), (err, data) => {
//     if (err) console.log('Couldnt read file: ${err}');

//     console.log(JSON.parse(data));

// });


// Node JS Lab - Part II //

// const path = require('path');
// const fs = require('fs');
// const rp = require('request-promise');


// rp('https://reddit.com/r/popular.json')
// .then(data => {
//     fs.writeFile(path.join(__dirname, 'reddit.js'), data, (error) => {
//         if (error) console.log(`Error writing file: ${error}`);
//         console.log(`Success!`);
//     })
// })

// .catch(error => console.log(`Error in GET or Parse: ${error}`));



const path = require('path');
const fs = require('fs');
const rp = require('request-promise');

const dataPath = path.join(__dirname, 'popular-articles.json');


rp('https://reddit.com/r/popular.json')

    .then(res => {


        let articles = JSON.parse(res).data.children.map(item => item.data)     


        let articleInfo = articles.map(article => (({title, url, author}) => ({title, url, author}))(article))


        fs.writeFileSync(dataPath, JSON.stringify(articleInfo, null, 2), err => {if (err) console.log(err) })


    }).catch(function (err) {
        console.log(err)

    })