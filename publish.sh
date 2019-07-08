rm index.zip 
cd lambda
zip -r -X index.zip *
mv index.zip ../
cd ..
aws lambda update-function-code --function-name CDNgateway --zip-file fileb://index.zip