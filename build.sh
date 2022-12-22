#!/bin/bash
#
# webhookie - webhook infrastructure that can be incorporated into any microservice or integration architecture.
# Copyright (C) 2022 Hookie Solutions AB, info@hookiesolutions.com
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.
#
# If your software can interact with users remotely through a computer network, you should also make sure that it provides a way for users to get its source. For example, if your program is a web application, its interface could display a "Source" link that leads users to an archive of the code. There are many ways you could offer source, and different solutions will be better for different programs; see section 13 for the specific requirements.
#
# You should also get your employer (if you work as a programmer) or school, if any, to sign a "copyright disclaimer" for the program, if necessary. For more information on this, and how to apply and follow the GNU AGPL, see <https://www.gnu.org/licenses/>.
#

echo Building asyncapi-parser....

REPO="hookiesolutions"
name="webhookie-portal"
VERSION="2.0.0"

echo "$VERSION"

run_load() {
  echo "Building docker image version: $VERSION in  $(pwd)"
  docker build \
    --build-arg APP_NAME="$name" \
    -t "$REPO/$name:2.0.0" \
    -t "$REPO/$name:2" \
    -t "$REPO/$name:latest" \
    --load \
    .
}

run_beta() {
  echo "Building BETA docker image for $name"
  docker buildx build \
    --platform linux/amd64,linux/arm64 \
    -t $REPO/"$name":beta \
    --push \
    .
}

run_trial() {
  echo "Building BETA docker image for $name"
  docker buildx build \
    -f Dockerfile-trial \
    --platform linux/amd64,linux/arm64 \
    -t $REPO/"$name":trial \
    --push \
    .
}

run_latest() {
  echo "Building BETA docker image for $name"
  docker buildx build \
    --platform linux/amd64,linux/arm64 \
    -t "$REPO/$name:2.0.0" \
    -t "$REPO/$name:2" \
    -t $REPO/"$name":latest \
    -t $REPO/"$name":beta \
    --push \
    .
}

declare ver="latest"

init() {
  while [ $# -gt 0 ]; do
    case "$1" in
    --beta)
      ver="beta"
      ;;
    -b)
      ver="beta"
      ;;
    --trial)
      ver="trial"
      ;;
    -t)
      ver="trial"
      ;;
    --push)
      ver="latest"
      ;;
    -p)
      ver="latest"
      ;;
    esac
    shift
  done
}

init "$@"

angular-build-info

./build_number.sh $ver

deploy() {
  eval "run_$ver"
}

deploy
