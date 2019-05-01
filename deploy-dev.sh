echo "deploying build folder to wd.gamantha.com..."

scp -r build/. wduser@gamantha.com:/var/www/html/walkingdocs

echo "deployed."
