# Recreate config file
rm -rf ./env-config.js
touch ./env-config.js

# Add assignment 
echo "window._env_ = {" >> ./env-config.js
echo "  \"SERVER_URL\": \"$(printenv SERVER_URL)\"," >> ./env-config.js

echo "}" >> ./env-config.js