#!/bin/sh
cd /home/tmwgroups/www
drush sql-dump > db_backup/default.sql
drush sql-dump --uri=adibasi > db_backup/adibasi.sql
drush sql-dump --uri=washimahmed > db_backup/washimahmed.sql
drush sql-dump --uri=demo > db_backup/demo.sql
git add ./
git commit -m 'Automated Push in Master Branch By Cron'
git push origin master

