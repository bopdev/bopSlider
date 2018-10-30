(function($){
  'use strict';
  $.fn.bopSlider = function(opts){
    var action = '';
    if(typeof opts != 'string'){
      if(typeof opts == 'undefined'){
        opts = {};
      }
      opts = $.extend({}, $.fn.bopSlider.defaults, opts);
    }else{
      action = opts;
    }
    return this.each(function(){
      var main = this;
      var $main = $(main);
      var $inner = $main.find('>.slider-inner');
      var $items = $inner.find('>.slider-item');

      //init
      if(!action){
        main.bopSlider = {};
        main.bopSlider.opts = opts;
        main.bopSlider.pos = 0;

        var indent = 0;
        $items.each(function(){
          var $item = $(this);
          $item.css('left', indent+'px');
          indent += $item.width();
        }).css('position', 'absolute');
        return;
      }

      //action
      switch(action){
        case 'next':
          if($items.length > main.bopSlider.pos + main.bopSlider.opts.display){
            var itemWidth = $items.eq(main.bopSlider.pos).width();
            $items.each(function(){
              var $item = $(this);
              $item.css('left', $item.position().left-itemWidth);
            });
            ++main.bopSlider.pos;
          }
        break;
        case 'prev':
          if(main.bopSlider.pos > 0){
            --main.bopSlider.pos;
            var itemWidth = $items.eq(main.bopSlider.pos).width();
            $items.each(function(){
              var $item = $(this);
              $item.css('left', $item.position().left+itemWidth);
            });
          }
        break;
      }
    });
  };
  $.fn.bopSlider.defaults = {
    display:1,
    step:1,
    transition:'horizontal'
  };

  $(document).ready(function(){
    $('[data-component="bopSlider"][data-fn="main"]').each(function(){
      var $main = $(this);
      $main.bopSlider($main.data('options'));
    });

    $(document).on('click', '[data-component="bopSlider"][data-fn="control"]', function(e){
      e.preventDefault();
      var data = $(this).data();
      if(typeof data.target == 'string' && typeof data.action == 'string')
        $('[data-component="bopSlider"][data-name="'+data.target+'"]').bopSlider(data.action);
    });
  });
})(jQuery);