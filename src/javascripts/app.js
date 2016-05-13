import $ from 'jquery';

global.jQuery = $;

require('foundation-sites');

let $mobileMenu = $('.main-menu .menu').clone();

$mobileMenu.find('*').removeAttr('class');

$('.mobile-menu').append($mobileMenu);

$(document).foundation();

import $wordCount from './components/word-count';
