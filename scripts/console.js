/**
 * 这里是复制进ow数据页面控制台的代码
 */

 $('.js-stats').first().children().each(function() {
   $(this).find('thead').remove();
 });
 $('.js-stats').first().html();