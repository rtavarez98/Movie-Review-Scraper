const puppeteer = require('puppeteer');
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//includes spoiler warnings and review behind

async function scrape(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url);

    //if(document.body.querySelector('.frame-title').textContent == null ) console.log("Error: movie not found");//supposed to check if page is valid; not working
    //else{
        const review = await page.evaluate( () => { //elements of 'review' are disassociated from each other + pulls data from one page
            let userName = Array.from(document.body.querySelectorAll('strong.name'), element => element.textContent);
            let rating = Array.from(document.body.querySelectorAll('[class^="rating"]'), element => element.textContent); //(change rating to float/int?)
            let reviewText = Array.from(document.body.querySelectorAll('[class^="body-text -prose"]'), element => element.textContent);
            let movieTitle = [];
            let movieTitleArr = document.body.querySelector('.frame-title').textContent;
            for(var i = 0; i < rating.length; i++){
                movieTitle.push(movieTitleArr);
            }
            return {
                userName,
                rating,
                reviewText,
                movieTitle
            }
        });
        console.log( {review} ); //test
    //}

    browser.close();
}

rl.question("Enter the movie title: ", (answer) => {
    scrape('https://letterboxd.com/film/' + answer + '/reviews/');
    rl.close();
});
