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

hex2rgb() {
    local color=`echo $1 | tr '[:lower:]' '[:upper:]'`

    hex=$(echo "$color" | sed 's/#//g')

    a=$(echo $hex | cut -c-2)
    b=$(echo $hex | cut -c3-4)
    c=$(echo $hex | cut -c5-6)

    r=$(echo "ibase=16; $a" | bc)
    g=$(echo "ibase=16; $b" | bc)
    b=$(echo "ibase=16; $c" | bc)

    echo $color
    echo $r, $g, $b

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

hex2rgb $MAIN_COLOR
