#!/bin/sh
drush sql-dump > ~/www/db_backup/default.sql
drush sql-dump --uri=adibasi > ~/www/db_backup/adibasi.sql
drush sql-dump --uri=washimahmed > ~/www/db_backup/washimahmed.sql
drush sql-dump --uri=demo > ~/www/db_backup/demo.sql
git add ./
git commit -m 'Automated Push in Master Branch By Cron'
git push origin master

