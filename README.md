# Cafe-react-fe

	1. Intro
		1.1 This is a FrontEnd project for a Cafe-Employee Management system
		1.2 React TS, Vite, Tanstack Router v1 and Tanstack Query V5
		1.3 Antd, AgGrid
   		1.4 Works together with https://github.com/antaresQ/Cafe-NET-API

	2. Setup
		2.1 Install node:18.20.4 and npm
  		2.2 Ensure 'proxy' URL in vite.config.ts points to api url of deployed backend project 'Cafe-NET-API' 
    		2.3 npm run dev
      		Docker (if base url is configured without cors); currently not working
  		2.3 In project folder: docker build -f ./Dockerfile -t cafe-react-fe
  		2.4 To deploy: docker run --rm -it -p 8050:3000 --name cafe-react-fe cafe-react-fe
    
 	3. Use 
  		3.1 Go to http://localhost:3001/
		

	antaresQ
