#!/bin/bash
export NODE_ENV="development"
/usr/bin/node ../source/node/adLibrary.js > dailyGet.log 2> dailyGet.err

# cron schedule
# 20 * * * * ~/projects/AdLens/bin/dailyGet.sh
