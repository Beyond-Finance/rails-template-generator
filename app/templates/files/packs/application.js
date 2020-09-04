// allow all images to be accessible to image_pack_tag
require.context('../images', true);

// polyfill babel for IE
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// global application js + css imports
import 'styles/application';
import 'jquery/src/jquery';
import 'jquery-ujs/src/rails';
