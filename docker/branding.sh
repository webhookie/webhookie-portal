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

# shellcheck disable=SC2001
hex2rgb() {
    local color;color=$(echo "$1" | tr '[:lower:]' '[:upper:]')

    local hex;hex=$(echo "$color" | sed 's/#//g')

    local a;a=$(echo "$hex" | cut -c-2)
    local b;b=$(echo "$hex" | cut -c3-4)
    local c;c=$(echo "$hex" | cut -c5-6)

    local r;r=$(echo "ibase=16; $a" | bc)
    local g;g=$(echo "ibase=16; $b" | bc)
    local b;b=$(echo "ibase=16; $c" | bc)

    echo "$color"
    echo "$r", "$g", "$b"

#     echo ':root {
#   --main-color: '"${r}"', '"${g}"', '"${b}"';
# }' > /usr/share/nginx/html/assets/css/vars.css

#     cat <<< '
# :root {
#   --main-color: '"${r}"', '"${g}"', '"${b}"';
# }
#     ' > /usr/share/nginx/html/assets/css/vars.css

cat <<EOF > /usr/share/nginx/html/assets/css/vars.css
:root {
  --main-color: ${r}, ${g}, ${b};
}
EOF
}

# hex2rgb "#FF0000"
# hex2rgb "#00FF00"
# hex2rgb "#0000FF"

if [[ -z "${WEBHOOKIE_MAIN_COLOR}" ]]; then
  MAIN_COLOR="#0151cc"
else
  MAIN_COLOR="${WEBHOOKIE_MAIN_COLOR}"
fi

hex2rgb "$MAIN_COLOR"

if [[ "${WEBHOOKIE_PAGE_TITLE}" != "" ]]; then
  # shellcheck disable=SC2086
  echo ${WEBHOOKIE_PAGE_TITLE} > /usr/share/nginx/html/assets/branding/page-title.txt
fi

if [[ "${WEBHOOKIE_MAIN_TITLE_HTML}" != "" ]]; then
  # shellcheck disable=SC2086
  echo ${WEBHOOKIE_MAIN_TITLE_HTML} > /usr/share/nginx/html/assets/branding/title.html
fi

if [[ "${WEBHOOKIE_MAIN_BODY_HTML}" != "" ]]; then
  # shellcheck disable=SC2086
  echo  ${WEBHOOKIE_MAIN_BODY_HTML} > /usr/share/nginx/html/assets/branding/body.html
fi

replace() {
  local current_file=$1
  local path=$2

  if [ -e "$path" ]; then
    echo "Replacing $current_file with $path"
    rm -rf "$current_file"
    ln -s "$path" "$current_file"
  fi
}

rebrand() {
  declare files=(
    "body.html"
    "hero.svg"
    "logo.svg"
    "title.html"
    "page-title.txt"
  )
  declare -r branding_path="/var/data/webhookie/branding"
  declare -r assets_path="/usr/share/nginx/html/assets/branding"

  for file in "${files[@]}"; do
    replace "$assets_path//$file" "$branding_path/$file"
  done

  declare -r favicon="favicon.ico"
  replace "/usr/share/nginx/html/$favicon" "$branding_path/$favicon"
}

rebrand
