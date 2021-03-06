/*
JSNES, based on Jamie Sanders' vNES
Copyright (C) 2010 Ben Firshman

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

'use strict';

JSNES.Utils = {
  copyArrayElements: function(src, srcPos, dest, destPos, length) {
    for (var i = 0; i < length; ++i) {
      dest[destPos + i] = src[srcPos + i];
    }
  },

  copyArray: function(src) {
    var dest = new Array(src.length);
    for (var i = 0; i < src.length; i++) {
      dest[i] = src[i];
    }
    return dest;
  },

  fromJSON: function(obj, state) {
    for (var i in obj.JSON_PROPERTIES) {
      if (!obj.JSON_PROPERTIES.hasOwnProperty(i)) {
        continue;
      }
      var prop = state[obj.JSON_PROPERTIES[i]];
      if (Array.isArray(state[obj.JSON_PROPERTIES[i]])) {
        var type = obj[i].constructor.name;
        if (type === 'Uint8Array') {
          prop = new Uint8Array(state[obj.JSON_PROPERTIES[i]]);
        }
      }
      obj[i] = prop;
    }
  },

  toJSON: function(obj) {
    var state = {}, i;
    for (i in obj.JSON_PROPERTIES) {
      if (!obj.JSON_PROPERTIES.hasOwnProperty(i)) {
        continue;
      }
      var prop = obj[i];
      if (obj[i] instanceof Uint8Array) {
        prop = new Array(obj[i].length);
        for (var j = 0; j < obj[i].length; j++) {
          prop[j] = obj[i][j];
        }
      }
      state[obj.JSON_PROPERTIES[i]] = prop;
    }
    return state;
  },

  isIE: function() {
    return (/msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent));
  }
};
