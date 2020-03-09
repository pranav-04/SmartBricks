# Trial 1:SmartBricks
Follow the steps given below:
## Procedure
1) Download nodejs and install that software
	link : [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
2) Download Visual Code and install the software
	link : [https://code.visualstudio.com/](https://code.visualstudio.com/)
3) Open visual studio and download some extensions from left pannel
	1) Live Server
	2) JavaScript (ES6) code snippets
	3) formatter-pug
	3) code-runner
4) Download mongoDB software
	link : [https://www.mongodb.com/download-center/community](https://www.mongodb.com/download-center/community)
5) Install mongoDB
	1) install mongoDB on custom method
	2) Browse the folder and select C drive itself. Then make new folder name mongodb in C drive and choose that folder to install software.
	3) On the next page, append '\db' in data file path. **Remember not to change log file path. Just change data path to 'C:\mongodb\data\db'.**
	4) On the next page, uncheck **Install MongoDB Compass**. Then press install. It might ask for restarting your PC. 
6) Open CMD as administator and set path to **C:\mongodb\bin** and run `net start mongodb`. Ignore if mongoDB is already activated.
7) Type `mongo` on terminal.
8) Type `>use trial1` on command line.
9) Open VS Code and press 
<kbd>Ctrl +`</kbd>
10) Open folder **trial1** which you have downloaded from here.
11) ``npm install``
12) ``npm install -D nodemon``
13) ``npm run dev``
14) Open Chrome browser and type ``http://localhost:5000`` 
