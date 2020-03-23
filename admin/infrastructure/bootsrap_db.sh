#!/bin/sh

echo "Bootstraping konstbel admin database..."

echo "* Provisioning database structure from db_provision.sql..."
docker-compose exec db psql -U konstbel -d konstbel -c "$(cat db_provision.sql)" > /dev/null

echo "* Adding admin user to the database..."
docker-compose exec backend_web node /app/dist-server/bin/add-user.js $1 $2

echo "Done."
