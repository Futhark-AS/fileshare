#!/bin/bash
curl -X GET \
-H 'Content-Type: text/plain' \
'http://localhost:7071/api/geturl?username=jorge&filename=test-file.txt' --verbose

