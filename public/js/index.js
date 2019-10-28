(function() {
  var chart = echarts.init(document.getElementById('chart'));
  $('#addData').on('click', function() {
    if (!$('#hero').val()) {
      message({
        type: 'error',
        text: '请先选择英雄'
      });
      return;
    }
    $('.append-box').show();
  });
  $('.append-box .overlay, .append-box .close').on('click', function() {
    $('.append-box').hide();
  })
  $('#submit').on('click', function() {
    var val = $(this).prev().val().trim();
    if (val !== '') {
      $.ajax({
        url: '/upload',
        type: 'POST',
        data: {
          data: val,
          hero: $('#hero').val()
        }
      })
      .then(() => {
        message({
          type: 'success',
          text: '提交成功'
        });
        $('.append-box').hide();
      })
      .catch(err => {
        message({
          type: 'error',
          text: '提交失败'
        });
        console.log(err);
      })
    }
  });
  $('#hero').chosen({
    width: '100px',
    disable_search_threshold: 200
  })
  $('#mainType').chosen({
    width: '100px',
    disable_search_threshold: 200
  });
  $('#subType').chosen({
    width: '200px',
    disable_search_threshold: 200
  });
  $.ajax({
    url: 'hero_list'
  })
  .then(res => {
    $('#hero').append($.map(res.data, item => {
      return '<option value="' + item.id + '">' + item.name + '</option>';
    }).join(''));
    $('#hero').trigger('chosen:updated');
  })
  $('#hero').on('change', function() {
    var val = $(this).val();
    $('#mainType').children().slice(1).remove();
    $.ajax({
      url: '/type_list',
      data: {
        hero: val
      }
    })
    .then(res => {
      $('#mainType').append($.map(res.data, item => {
        return '<option value="' + item.id + '">' + item.name + '</option>';
      }).join(''));
      $('#mainType').trigger('chosen:updated');
    });
  })
  $('#mainType').on('change', function() {
    var val = $(this).val();
    $('#subType').children().slice(1).remove();
    $.ajax({
      url: '/sub_type_list',
      data: {
        type: val,
        hero: $('#hero').val()
      }
    })
    .then(res => {
      $('#subType').append($.map(res.data, item => {
        return '<option value="' + item.id + '">' + item.name + '</option>';
      }).join(''));
      $('#subType').trigger('chosen:updated');
    })
  });
  $('#subType').on('change', function() {
    var sub_type = $(this).val();
    getData(sub_type, $('[name="time-type"]:checked').val());
  });
  $('[name="time-type"]').on('change', function() {
    var time = $(this).val();
    getData($('#subType').val(), time);
  })

  function getData(sub_type, time) {
    var main_type = $('#mainType').val();
      $.ajax({
        url: '/get_data',
        data: {
          type: main_type,
          sub_type,
          hero: $('#hero').val(),
          time
        }
      })
      .then(res => {
        var dataObj = filterData(res.data);
        var {data, type} = dataObj;
        var option = {
          xAxis: {
              name: '日期',
              type: 'category',
              data: data.map(item => item.date),
          },
          yAxis: {
              name: (() => {
                var map = {
                  'time': '时长(秒)',
                  'percent': '%',
                  'number': '值'
                };
                return map[type];
              })(),
              type: 'value',
              min: function(value) {
                if (value.min > 500) {
                  return parseInt(value.min / 100) * 50;
                }
                return 0;
              }
          },
          series: [{
              name: '数值',
              data: data.map(item => item.value),
              type: 'line',
              label: {
                show: true,
                formatter(obj) {
                  var {data} = obj;
                  if (type === 'time') {
                    var hour = parseInt(data / 3600);
                    var minute = parseInt((data - hour * 3600) / 60);
                    var second = parseInt(data % 60);
                    return `${fixZero(hour)}:${fixZero(minute)}:${fixZero(second)}`;
                  } else if (type === 'percent') {
                    return `${data}%`;
                  }
                  return data;
                }
              }
          }]
        };
        chart.setOption(option);
      })
      .catch(err => {
        message({
          type: 'error',
          message: '请求失败'
        });
        console.log(err);
      })
  }

  function message({type, text}) {
    $('.msgbox').addClass(type).show().find('span').text(text);
    setTimeout(() => {
      $('.msgbox').removeClass(type).hide().find('span').empty();
    }, 2000);
  }

  function filterData(data) {
    var type = '';
    var ret = data.map(item => {
      var value = 0;
      if (item.value.indexOf(':') > -1) {
        var segment = item.value.split(':');
        value =  Number(segment[0]) * 3600 + Number(segment[1]) * 60 + Number(segment[2]);
        type = 'time';
      } else if (item.value.indexOf('%') > -1) {
        value = Number(item.value.slice(0, -1));
        type = 'percent';
      } else {
        value = Number(item.value);
        type = 'number';
      }
      return {
        date: item.date,
        value
      }
    });
    return {
      data: ret,
      type
    }
  }

  function fixZero(num) {
    if (num < 10) {
      return `0${num}`;
    }
    return `${num}`;
  }
})()