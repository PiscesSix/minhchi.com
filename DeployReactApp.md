npm install gh-pages --save-dev
add in package.json:
    "predeploy": "react-scripts build",
    "deploy": "gh-pages -d build"
make .env:
    PUBLIC_URL="."
run:
    npm run deploy