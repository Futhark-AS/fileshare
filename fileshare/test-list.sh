#!/bin/bash
curl -X GET \
-H 'Content-Type: text/plain' \
'http://localhost:7071/api/list?username=jorge' --verbose
