#!/bin/bash
DATE_FMT="+%Y-%m-%d %H:%M:%S"
DRUSH="/usr/local/bin/drush"
COMMITMSG="Scripted auto-commit on $DATE_FMT by Shell"
WWW="/home/tmwgroups/www"
cd $WWW
$DRUSH sql-dump > $WWW/db_backup/default.sql
$DRUSH sql-dump --uri=adibasi > $WWW/db_backup/adibasi.sql
$DRUSH sql-dump --uri=washimahmed > $WWW/db_backup/washimahmed.sql
$DRUSH sql-dump --uri=demo > $WWW/db_backup/demo.sql
git add $WWW
git commit -m "$COMMITMSG"
git push origin master

