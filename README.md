# Cafe-react-fe

	1. Intro
		1.1 This is a FrontEnd project for a Cafe-Employee Management system
		1.2 React TS, Vite, Tanstack Router v1 and Tanstack Query V5
		1.3 Antd, AgGrid
   		1.4 Works together with https://github.com/antaresQ/Cafe-NET-API

	2. Setup, Debugging & Deployment
		2.1 Setup
			2.1.1 Pull from this git repo: https://github.com/antaresQ/cafe-react-fe
			2.1.2 Install node:18.20.4 and npm
			2.1.3 In folder: npm install

		2.2 Local Debug
			2.2.1 Install node:18.20.4 and npm
  			2.2.2 Ensure 'proxy' URL in vite.config.ts points to api url of deployed backend project 'Cafe-NET-API' 
    		2.2.3 npm run dev
      		
		2.3 Docker Container
  			2.3.1 SET "VITE_API_BASE_URL" in .env file is set to url and port of where backend project 'Cafe-NET-API' is deployed
			2.3.2 In project folder: docker build -f ./Dockerfile -t cafe-react-fe
  			2.3.3 To deploy: docker run -d --rm -it -p 8050:3000 --name cafe-react-fe cafe-react-fe
    
 	3. Use 
  		3.1 Local Debug: Go to --> http://localhost:3001/
		3.1 Docker Deployment: Go to --> http://<ip address of server>:8050/
		

	antaresQ
