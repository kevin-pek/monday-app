## WELCOME TO TELEASSIST!

TeleAssist is your personal telegram messaging bot! You can use our app to schedule your messages on your telegram groups at any time you like. Take advantage of our LLM model to generate the messages of your choice by inputting simple prompts.


## Getting Started with Telegram
- Search up 'theTeleAssistantBot' on Telegram
- Add the bot to your desired group
- Enter your username and telegram group name in the app
- Send messages right away using our LLM Model

  

## Run the project
- Go to Branch 'New_Bot' and Download/Pull the code

In the project directory, you should run:

### `npm install`

And then to run an application with the monday tunnel, run:

### `npm start`

Find the provided URL in your terminal. This is your public URL, and you can use it to test your application.
Example: https://unsightly-chickaree-35.tunnel.monday.app

## Configure Monday App 

1. Open monday.com, login to your account and go to a "Developers" section.
2. Create a new "QuickStart View Example App"
3. Open "OAuth & Permissions" section and add "boards:read" scope
4. Open "Features" section and create a new "Boards View" feature
5. Open "View setup" tab and fulfill in "Custom URL" field your monday tunnel public URL, which you got previously (example: https://unsightly-chickaree-35.tunnel.monday.app)
6. Click "Boards" button and choose one of the boards with some data in it.
7. Click "Preview button"
8. Enjoy the Quickstart View Example app!

## Release your app
1. Run script
### `npm run build`
2. Zip your "./build" folder
3. Open "Build" tab in your Feature
4. Click "New Build" button
5. Click "Upload" radio button and upload zip file with your build
6. Go to any board and add your just released view
7. Enjoy!
