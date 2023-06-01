ls -1 /mongo-seed/*.json | while read jsonfile; do mongoimport --host mongodb --db tours --authenticationDatabase admin -u admin -p admin --type json --file $jsonfile --jsonArray; done
