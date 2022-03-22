# Bot Detection Tutorial
This is a tutorial for beginners on bot detection and countermeasures that can be taken by hackers to evade detection. Bots vs bot detection is a fascinating and neverending competition in writing better code than your adversary.

# Demo
To run the applications in this repo, you can download and install the files in this repo. You should clone this repo if you want to run a bot and bot detector locally. Some of the mini-tutorials in this repo require a server to be running, while others can be demonstrated just by opening the <a href="./debug.html" target="_blank">debug</a> html page from the filesystem.  
<code>
$ git clone git@github.com:davidpaulmcintyre/bot_tutorial.git 
</code>
## What are bots?
Bots are automation software that simulates human interaction with a browser. Common tools are phantomJs, selenium, puppeteer, and playwright.


There are several reasons why hackers use bots to target a website. The most common are:

* Scraping. A webscraper may collect price data from airline websites and aggregate it on its own website in order to allow consumers to compare prices. Not all scrapers are bad or undesireable; search engine spiders are a type of scraper that is desired by most websites.
* Buying concert tickets or limited edition sneakers. Have you ever logged on to a ticket site just after they went on sale, only to see all the best seats are already sold? Bots used by scalpers can submit thousands of requests per second, scooping up items before humans can. Sneakers are often resold on StockX for 3x their original cost, so hacking the Supreme site with a bot has become a hacker's rite of passage.
* Credential stuffing. A bot can keep guessing username/password combinations until it finds a valid combination. Hackers may use brute force for credential stuffing, or they may use credentials harvest from other websites to increase their success rates.
* Fake users on social media. Bots can be used to create fake users on twitter or facebook, and a bot network can be used to generate fake traffic around a particular issue or page.  

Scraping and buying the latest Yeezys are fairly benign forms of hacking and probably not even illegal (note: I am not a lawyer), but credential stuffing for the purposes of account takeover is much worse and almost uncertainly illegal. Please use my techniques for learning purposes, not to hurt others, ok? 

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
* The most common obfuscation technique is to use the <a href="https://v4.webpack.js.org/plugins/uglifyjs-webpack-plugin/" target="_blank">UglifyPlugin</a> with webpack This plugin does some code obfuscation by renaming variables and giving them meaningless, short names. And it makes the code unreadable by removing whitespace, but the devtools have a button to display the source in a prettier format. This plugin offers a very low level of protection.  
* <code>eval</code> can be used within a script to dynamically generate code from variables. But I was taught that eval is evil, and I am scared of executing code from variables that could be overwritten by hackers to do bad things.
* Type coercion. Type coercion takes advantage of how javascript coerces truthy and falsey values into 1 or 0. 
Numbers can also be coerced to letters, so the following snippet returns <code>fail</code>  
<code>var x = (![]+[])[+[]]+(![]+[])[+!+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]];
console.log('x = ', x); // 'fail'
</code>   
To learn more about the bizarre possibilities of type coercion, check out <a href="http://www.jsfuck.com/" target="_blank">JSFuck</a>.  

* String Transformations. Similar to type coercion, we can obfuscate the static strings in our code by breaking the string's characters into an array, then shuffling, rotating, and replacing each character value with a convoluted sequence of function calls. You can also encode letters as numbers or hexadecimal values. Much like type coercion, making your code confusing like this discourages the noob trying to gain an understanding of how the code works, but it can be countered by replacing a complicated expression with its static value that is returned at the end of all that misdirection. 

* Indirect function calls. Normally you would call a function with something like <code>foo.bar()</code>. But string transformations can also be used to hide function names and which function is being called. Given that <code>foo.bar()</code> can also be called as <code>foo["bar"]()</code> or  
<code>const name = "bar";  
foo[name]()  
</code>
the <code>name</code> variable can be split up into separate characters or the result of a rat's nest of function calls.  
* Control flow flattening. This technique takes all the control flow blocks in a script (loops, conditionals, function calls) and combines them into a single "flat" switch statement, and the switch statement controls the application flow based on the parameters, and the switch statement runs in almost an endless loop.

* Debug protection. To hack a site, hackers need to gather some intelligence on how the site works. They might start by opening Chrome Devtools, inserting some breakpoints, and writing some console.log statements.  
So what if we don't let them do that? We can rename the console methods (log, info, warn, error). And we can also choose to make the app nonfunctional with "code traps" if we detect that Chrome Devtools is open. See a <a href="./debug.html" target="_blank"> of these obnoxious techniques, and <a href="https://js-antidebug.github.io">U Can't Debug This</a> is a more comprehensive demo of debugger detection.</a> Debug protection is problematic because there are perfectly legitimate reasons to debug a website, and might make it harder for developers to debug their own website in production.
** Dead code injection. We can also make it difficult for hackers to gain an understanding of our code by inserting "dead code" which exists only to confuse the reader. The dead code is a garble of loops and conditionals which can have only one result; it creates the illusion of variation when the code is really static.  
** Canvas fingerprinting. Canvas fingerprinting relies on the minute differences in how each computer's GPU renders elements on the screen. The fingerprint is obtained by using javascript to draw a simple screen on a canvas element. The pixels are serialized using <code>toDataURL</a> and sent to the server. This fingerprint is highly unique and shared with few other users. However, browsers such as <a href="https://github.com/brave/brave-browser">Brave</a> and browser extensions from <a href="https://chrome.google.com/webstore/detail/duckduckgo-privacy-essent/bkdgflcldnnnapblkhphbgpggdiikppg?hl=en">Duck Duck Go</a> make fingerprinting more difficult if not impossible by introducing random noise into the <code>toDataURL</a> serialization.
** Hardware/Software fingerprinting. Computers and mobile devices have very complex configurations of hardware and software. This complexity makes each device very distinct, and very few devices share the same hw/sw fingerprint. Check a fingerprint of your computer at <a href="https://coveryourtracks.eff.org/">Cover Your Tracks</a>, a site created by the EFF to demonstrate the dangers of this kind of fingerprinting. When I obtained a fingerprint of my brand new MacBook Pro, to which I had done zero customization or installations, I was shocked that only 10 other computers out of 50,000 shared the same fingerprint as mine. Currently my MacBook has a totally unique fingerprint out of 60,000 recent tests. This kind of fingerprinting can obviously be used for nefarious purposes to track users for advertising purposes, regardless of if they're browsing incognito. A fingerprint can also be used to identify multiple requests from the same user and which might be camouflaged across different IPs thru a vpn.
Naturally, all of these techniques can be combined. If a script is obfuscated with the first 3 of these techniques, it will look like an ungodly mess that is impossible to read. Using one of the playgrounds below, you can see how to transform:
<code>
function hi() {
  console.log("Hello World!");
}
hi();
</code>
into the following gibberish, which will nonetheless behave exactly the same as the snippet snippet when executed by the browser
<code>
function _0x1b4d(_0x40bb76,_0x730e14){var _0x5dac50=_0x5dac();return _0x1b4d=function(_0x1b4d7c,_0x1c0795){_0x1b4d7c=_0x1b4d7c-0x143;var _0x1433fc=_0x5dac50[_0x1b4d7c];return _0x1433fc;},_0x1b4d(_0x40bb76,_0x730e14);}(function(_0x3e0ab2,_0x40ea88){var _0x5df60f=_0x1b4d,_0x2646e1=_0x3e0ab2();while(!![]){try{var _0x5f3e9c=parseInt(_0x5df60f(0x149))/0x1*(-parseInt(_0x5df60f(0x145))/0x2)+-parseInt(_0x5df60f(0x147))/0x3+-parseInt(_0x5df60f(0x14b))/0x4*(parseInt(_0x5df60f(0x143))/0x5)+-parseInt(_0x5df60f(0x146))/0x6+-parseInt(_0x5df60f(0x14a))/0x7+parseInt(_0x5df60f(0x14c))/0x8+parseInt(_0x5df60f(0x148))/0x9;if(_0x5f3e9c===_0x40ea88)break;else _0x2646e1['push'](_0x2646e1['shift']());}catch(_0x27c4bd){_0x2646e1['push'](_0x2646e1['shift']());}}}(_0x5dac,0x25531));function _0x5dac(){var _0x2586ae=['443925RifyEn','8016588bEOmRR','1633hrUojm','485450bVjVRe','2804ftOLEl','407552qKCyKX','2035HMuPTJ','Hello\x20World!','334cZrqmN','80712cpQhqR'];_0x5dac=function(){return _0x2586ae;};return _0x5dac();}function hi(){var _0xdd1bc9=_0x1b4d;console['log'](_0xdd1bc9(0x144));}hi();
</code>  
You can experiment with some of these techniques by pasting code snippets at the following demo sites:
* <a href="https://obfuscator.io/" target="_blank">JavaScript Obfuscator Tool</a>
* <a href="https://www.preemptive.com/products/jsdefender/online-javascript-obfuscator-demo/" target="_blank">JSDefender Demo</a>  

** How to deobfuscate
Alas, when faced with such seemingly impossible to understand code, you may start by using regular expressions and eval statements to simplify the code. An alternative is to recompile it using an abstract syntax tree (AST). An AST is a hierarchical representation of a script or block of code. When a compiler takes source code and turns it into a binary executable, it first parses the source code and then builds an AST. Similarly, when webpack uses babel to transpile javascript from ES6 to ES5 so it can be backwards compatible, it builds an AST. An excellent tool is <a href="https://astexplorer.net/" target="_blank">AST Explorer</a>. An advanced deobfuscation technique is to build a custom babel plugin that reverses all of the above techniques. This task takes alot of work and is beyond an intro tutorial. But it is a valuable learning exercise that would teach you about how a language works and how compilers or interpreters work.

## Why bother?
If front-end code can be de-obfuscated, then why bother obfuscating it?  
Any code that can be obfuscated can be de-obfuscated. But we can make de-obfuscation difficult and time-consuming. Protecting code is a bit like protecting a house from burglars. No house is completely impregnable, but with burglar bars and alarms we can make burglarizing our house costly enough so that the burglars move on to someone else's house. Another analogy is protecting a store against shoplifters. To secure a store's merchandise against all possibility of shoplifting, we would inconvenience the shoppers who are not there to steal and make their experience a negative one. We just need to keep the expense from shoplifting to a manageable level and to deter all but the most skilled shoplifters.

The contest between obfuscating and de-obfuscating code is a long-running game where each measure is met with a countermeasure from the other side. Failing to innovate allows the opponent to win.

Now that we have some familiarity with obfuscation, let's examine what code we're interesting in obfuscating.

# How to Detect a Bot
The following commands will start a crude server and webpage, and is a test environment for you to "hack" the website with a bot.
<code> 
$ cd bot_tutorial/server
$ npm install
$ npm run start
</code> 
The server is now running, protected by the bot detector. You can navigate to http://localhost:3000 in your browser and see the simple homepage. 
The server application has a number of different endpoints, each with varying defenses against bots. Each time you click a button, you send a POST request to the server, which will respond with a classification of the user as either a bot or human. If you are clicking the buttons in a browser with your human hands, you should be properly classified as a human.  
The <code>bot</code> directory contains a script that uses Selenium to navigate to each of these routes. Selenium is like a robot that can open webpages and simulate button clicks executed by humans. Selenium is a great tool for integration testing; you can use it to test hundreds of webpages across multiple browsers and browser versions. But it can also be used as a bot to execute thousands of requests to purchase highly coveted sneakers before others have a chance to buy. Selenium supports lots of different languages, but our Selenium client uses javascript. 
To start the Selenium client:
<code>
$ cd ../bot (if you are in the server directory)
$ npm install
$ npm run start
</code>  
If you get an error such as the one below: 
<code>
Error: The ChromeDriver could not be found on the current PATH. Please download the latest version of the ChromeDriver
</code>  
you may need to install the chromedriver. For MacOS, <a href="https://www.swtestacademy.com/install-chrome-driver-on-mac">these instructions</a> worked for me. I installed the chromedriver in /usr/local/bin, then in Finder i had to click on the chromedriver to open it and click 'OK' to make it accessible to Selenium.  
## Start the bot
To start the bot, run:
<code>
$ npm run start
</code>
This command should execute the client.js script, which launches Selenium. Upon loading, Selenium navigates to http://localhost:3000 and clicks the first button. This event triggers a POST, which would generally be something meaningful within the website, but in our case it simply sends the value of navigator.webdriver to the server. The simplest means of detecting selenium is to check the <code>navigator.webdriver</code>, which will be undefined for humans browsing with chrome (you can check this in your console), but true for the Selenium bots. To evade this detection, some Stack Overflow users suggest that <a href="https://stackoverflow.com/questions/33225947/can-a-website-detect-when-you-are-using-selenium-with-chromedriver">you can edit the chromedriver that you just downloaded</a>. Other authors suggest that you can <a href="https://piprogramming.org/articles/How-to-make-Selenium-undetectable-and-stealth--7-Ways-to-hide-your-Bot-Automation-from-Detection-0000000017.html">modify the Selenium startup options to remove the webdriver flag</a>.

canvas fingerprinting





