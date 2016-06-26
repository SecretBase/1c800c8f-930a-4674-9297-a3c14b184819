import $ from 'jquery';
import $wordCount from './components/word-count';

global.jQuery = $;

require('foundation-sites/dist/plugins/foundation.core');
require('foundation-sites/dist/plugins/foundation.util.mediaQuery');
require('foundation-sites/dist/plugins/foundation.offcanvas.js');
require('foundation-sites/dist/plugins/foundation.util.triggers.js');
require('foundation-sites/dist/plugins/foundation.util.motion.js');

let $mobileMenu = $('.main-menu .menu').clone();

$mobileMenu.find('*').removeAttr('class');

$('.mobile-menu').append($mobileMenu);

$(document).foundation();
