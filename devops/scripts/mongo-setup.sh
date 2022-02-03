#!/bin/bash
echo "sleeping for 10 seconds"
sleep 10

echo mongo-setup.sh time now: `date +"%T" `
mongo --host kotletti-devops-mongodb0:37017 <<EOF
  var cfg = {
    "_id": "rs0",
    "version": 1,
    "members": [
      {
        "_id": 0,
        "host": "kotletti-devops-mongodb0:37017",
        "priority": 2
      },
      {
        "_id": 1,
        "host": "kotletti-devops-mongodb1:37018",
        "priority": 0
      },
      {
        "_id": 2,
        "host": "kotletti-devops-mongodb2:37019",
        "priority": 0
      }
    ]
  };
  rs.initiate(cfg);
EOF
