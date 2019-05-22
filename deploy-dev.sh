echo "deploying build folder to wd.gamantha.com..."

scp -r build/* wduser@aws.ppsdm.com:/var/www/html/walkingdocs/wd-frontend

echo "deployed."
