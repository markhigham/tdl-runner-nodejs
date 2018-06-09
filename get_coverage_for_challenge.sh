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
    ${SCRIPT_CURRENT_DIR}/node_modules/prettier/bin-prettier.js --write ${NODEJS_TEST_REPORT_JSON_FILE}

    COVERAGE_OUTPUT=$(grep "\/${CHALLENGE_ID}\/" ${NODEJS_TEST_REPORT_JSON_FILE} -A 4 | grep '"lines"' | sed 's/"lines": {\(.*\)},/\1/g' | tr -d ' "' || true)
    TOTAL_COVERAGE_PERCENTAGE=$(( 0 ))
    NUMBER_OF_FILES=$(( 0 ))
    AVERAGE_COVERAGE_PERCENTAGE=$(( 0 ))
    if [[ ! -z "${COVERAGE_OUTPUT}" ]]; then
        while read coveragePerFile;
        do
            coverageForThisFile=$(echo ${coveragePerFile} | awk -F "," '{print $4}' | awk -F ":" '{print $2}')
            TOTAL_COVERAGE_PERCENTAGE=$(( ${TOTAL_COVERAGE_PERCENTAGE} + ${coverageForThisFile} ))
            NUMBER_OF_FILES=$(( ${NUMBER_OF_FILES} + 1 ))
        done <<< ${COVERAGE_OUTPUT}

        AVERAGE_COVERAGE_PERCENTAGE=$(( ${TOTAL_COVERAGE_PERCENTAGE} / ${NUMBER_OF_FILES} ))
    fi

    echo ${AVERAGE_COVERAGE_PERCENTAGE} > ${NODEJS_CODE_COVERAGE_INFO}
    cat ${NODEJS_CODE_COVERAGE_INFO}
    exit 0
else
    echo "No coverage report was found"
    exit -1
fi
