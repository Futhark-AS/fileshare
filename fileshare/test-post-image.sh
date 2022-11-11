#!/bin/bash
curl -X POST \
-F 'filename=@test-image.png' \
-H 'Content-Type: text/png' \
'http://localhost:7071/api/upload?filename=test-image.png&username=jorge' --verbose

