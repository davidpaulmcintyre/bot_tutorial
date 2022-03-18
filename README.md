# Bot Tutorial
This is a tutorial for beginners on bot detection and countermeasures that can be taken by hackers to evade detection. It is a fascinating and neverending competition in writing better code than your adversary.

## What are bots?
Bots are automation software that simulates human interaction with a browser. Common tools are phantomJs, selenium, puppeteer, and playwright.


There are several reasons why hackers use bots to target a website. The most common are:

* Scraping. A webscraper may collect price data from airline websites and aggregate it on its own website in order to allow consumers to compare prices. Not all scrapers are bad or undesireable; search engine spiders are a type of scraper that is desired by most websites.
* Buying concert tickets or limited edition sneakers. Have you ever logged on to a ticket site just after they went on sale, only to see all the best seats are already sold? Bots used by scalpers can submit thousands of requests per second, scooping up items before humans can. Sneakers are often resold on StockX for 3x their original cost, so hacking the Supreme site with a bot has become a hacker's rite of passage.
* Credential stuffing. A bot can keep guessing username/password combinations until it finds a valid combination. Hackers may use brute force for credential stuffing, or they may use credentials harvest from other websites to increase their success rates.
* Fake users on social media. Bots can be used to create fake users on twitter or facebook, and a bot network can be used to generate fake traffic around a particular issue or page.  

Scraping and buying the latest Yeezys are fairly benign and probably not even illegal, but credential stuffing for the purposes of account takeover is much worse and almost uncertainly illegal. Please use my techniques for learning purposes, not to hurt others, ok? 

### Bots vs Obfuscation
There are several ways that we can minimize the damage done by bots. One is to obfuscate our javascript code that runs in the browser. Our database and code that runs in the backend are safer from hackers, but on the front-end hackers can view our code just by hitting F12 or opening Chrome DevTools. If hackers can read our code, then it's easier for them to design a bot to impersonate a human interacting with our website. 
So we want to make it harder for the hackers to understand our code by obfuscating it.  

## Is obfuscation wrong? 
Some open source advocates believe that any obfuscation of code is wrong. My employer disagrees, so I work on obfuscating my code.  

## Is deobfuscation wrong?
If you're a hacker, you may want to de-obfuscate a website's code in order to buy sneakers. But a website administrator may also be interested in de-obfuscation methods in order to detect malware. Malware may be installed on a website and when downloaded to users, the malware will mine bitcoin on the user's machine. Lots of websites have third-party scripts running on them, and they need to verify that nothing shady is going on with these scripts. 

In short, whether you're a black or white hat hacker, you need to be familiar with both obfuscation and de-obfuscation techniques. Both are tools, and like any tool they can be used for good or evil. Or it might be ethically neutral, and it's just a tool that you need to be good at your job.

## How to obfuscate
Here's some techniques used to obfuscate javascript code:
* The most common obfuscation technique is to use the <a href="https://v4.webpack.js.org/plugins/uglifyjs-webpack-plugin/">UglifyPlugin</a> with webpack This plugin does some code obfuscation by renaming variables and giving them meaningless, short names. And it makes the code unreadable by removing whitespace, but the devtools have a button to display the source in a prettier format. This plugin offers a very low level of protection.  
* <code>eval</code> can be used within a script to dynamically generate code from variables. But I was taught that eval is evil, and I am scared of executing code from variables that could be overwritten by hackers to do bad things.
* Type coercion. Type coercion takes advantage of how javascript coerces truthy and falsey values into 1 or 0. 
Numbers can also be coerced to letters, so the following snippet returns <code>fail</code>  
<code>var x = (![]+[])[+[]]+(![]+[])[+!+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]];
console.log('x = ', x); // 'fail'
</code>  
To play around with this more, check out <a href="http://www.jsfuck.com/">JSFuck</a>. This technique discourages the noob trying to gain an understanding of how the code works, but it can be countered by replacing a complicated expression with its static value. 

* Control flow flattening. This technique takes all the control flow blocks in a script (loops, conditionals, function calls) and combines them into a single "flat" switch statement.
* Indirect function calls.  
* Debug protection. To hack a site, hackers need to gather some intelligence on how the site works. They might start by opening Chrome Devtools, inserting some breakpoints, and writing some console.log statements.  
So what if we don't let them do that? We can rename the console methods (log, info, warn, error). And we can also choose to make the app nonfunctional if we detect that Chrome Devtools is open. <a href="./debug.html" target="_blank">See a demo of these obnoxious techniques.</a> 
* Integrity checks. Once hackers gain some understanding of a website's front-end code, they might want to start modifying the code to gain further understanding. To stop this, we create a digital signature of our code, and occasionally recreate the digital signature of the current state of the code, and if the signatures don't match, we know we're the target of a hacker. Lots of video games use this technique for DRM to prevent fortnite users from using aimbots and other cheats.  

Naturally, all of these techniques can be combined. If a script is obfuscated with the first 3 of these techniques, it will look like an ungodly mess that is impossible to read. You can experiment with some of these techniques by pasting code snippets at the following demo sites:
* <a href="https://obfuscator.io/">JavaScript Obfuscator Tool</a>
* <a href="https://www.preemptive.com/products/jsdefender/online-javascript-obfuscator-demo/">JSDefender Demo</a>  

** How to deobfuscate
Alas, when faced with such seemingly impossible to understand code, the solution may not be to reverse-engineer the code, but to recompile it using an abstract syntax tree (AST). An AST is a hierarchical representation of a script or block of code. When a compiler takes source code and turns it into a binary executable, it first parses the source code and then builds an AST. Similarly, when webpack uses babel to transpile javascript from ES6 to ES5 so it can be backwards compatible, it builds an AST. An excellent tool is AST Explorer https://astexplorer.net/. An advanced deobfuscation technique is to build a custom babel plugin that reverses all of the above techniques. This task takes alot of work and is beyond an intro tutorial. But it is a valuable learning exercise that would teach you about how a language works and how compilers or interpreters work.

## Why bother?
If front-end code can be de-obfuscated, then why bother obfuscating it?  
Any code that can be obfuscated can be de-obfuscated. But we can make de-obfuscation difficult and time-consuming. Protecting code is a bit like protecting a house from burglars. No house is completely impregnable, but with burglar bars and alarms we can make burglarizing our house costly enough so that the burglars move on to someone else's house. Another analogy is protecting a store against shoplifters. To secure a store's merchandise against all possibility of shoplifting, we would inconvenience the shoppers who are not there to steal and make their experience a negative one. We just need to keep the expense from shoplifting to a manageable level and to deter all but the most skilled shoplifters.

The contest between obfuscating and de-obfuscating code is a long-running game where each measure is met with a countermeasure from the other side. Failing to innovate allows the opponent to win.
        

                         
           
        


