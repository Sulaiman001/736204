#!/bin/sh
cd /home/tmwgroups/www/db_backup
drush sql-dump > default.sql
drush sql-dump --uri=adibasi > adibasi.sql
drush sql-dump --uri=washimahmed > washimahmed.sql
drush sql-dump --uri=demo > demo.sql
cd ../
git add ./
git commit -m 'Automated Push in Master Branch By Cron'
git push origin master
echo "Automated Push in Master Branch By Cron"

