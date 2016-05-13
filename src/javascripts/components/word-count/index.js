import $ from 'jquery';

let $wordCount = (() => {

  let $wordCount = $('.word-count');

  if ($wordCount.length === 0) {
    return $wordCount;
  }

  let wordCount = (event) => {

    let $input = $(event.target);
    let $parent = $input.closest('.word-count');
    let $count = $parent.find('.word-count-counter');

    $count.text(typeof event.target.value === 'undefined' ? 0 : event.target.value.length);

  }


  $wordCount.on('keyup input', wordCount);

  $wordCount.trigger('keyup');

  return  $wordCount;

})();
