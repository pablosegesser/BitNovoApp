# Instructions to run the app

## First step

Download or clone repository and checkout to develop branch

## Second step

Copy and rename .env.example to .env and add the correct X-Device-Id in the environment variable

## Third step

Install node modules with command yarn install

## Fourth step

Generate ios and android folders using command npx expo prebuild, if you make changes and already have these folders use instead npx expo prebuild --clean to clear old folders and re compile code again

## Fifth step

Run the app with command yarn ios or yarn android
