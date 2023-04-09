#!/bin/bash

MSG="test commit msg"

node $COMMIT_HOOKS_PATH/commit-hooks/index.js -m "$MSG"