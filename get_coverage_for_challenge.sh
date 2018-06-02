#!/usr/bin/env bash

set -x
set -e
set -u
set -o pipefail

SCRIPT_CURRENT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

CHALLENGE_ID=$1
NODEJS_TEST_REPORT_JSON_FILE="${SCRIPT_CURRENT_DIR}/coverage/coverage-summary.json"
NODEJS_CODE_COVERAGE_INFO="${SCRIPT_CURRENT_DIR}/coverage.tdl"

( cd ${SCRIPT_CURRENT_DIR} && npm install && npm run coverage || true 1>&2 )

[ -e ${NODEJS_CODE_COVERAGE_INFO} ] && rm ${NODEJS_CODE_COVERAGE_INFO}

if [ -f "${NODEJS_TEST_REPORT_JSON_FILE}" ]; then
    prettier --write ${NODEJS_TEST_REPORT_JSON_FILE}
    COVERAGE_OUTPUT=$(grep ${CHALLENGE_ID} ${NODEJS_TEST_REPORT_JSON_FILE} -A 4 | grep -o -P '(?<="lines": {).*(?=},)' | tr -d ' "')
    MISSED=$(echo $COVERAGE_OUTPUT | awk -F "," '{print $3}' | awk -F ":" '{print $2}')
    COVERED=$(echo $COVERAGE_OUTPUT | awk -F "," '{print $2}' | awk -F ":" '{print $2}')
    TOTAL_LINES=$((MISSED + $COVERED))
    echo $(($COVERED * 100 / $TOTAL_LINES)) > ${NODEJS_CODE_COVERAGE_INFO}
    cat ${NODEJS_CODE_COVERAGE_INFO}
    exit 0
else
    echo "No coverage report was found"
    exit -1
fi
