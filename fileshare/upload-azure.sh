#!/bin/bash
FUNCTION_URL="https://sandskog-dev-function-app.azurewebsites.net/api/upload?code=slo7kPdAndbeElDwHiRjaQEwpNalPdOxq5cA1FWCi0swAzFucO4T_A=="

echo "${FUNCTION_URL}"

curl -X POST \
-F "filename=@test-file.txt" \
-H "Content-Type: text/plain" \
"$FUNCTION_URL&filename=test-file.txt&username=jorge" --verbose
