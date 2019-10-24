(function() {
  var chart = echarts.init(document.getElementById('chart'));
  $('#addData').on('click', function() {
    $('.append-box').show();
  });
  $('.append-box .overlay, .append-box .close').on('click', function() {
    $('.append-box').hide();
  })
  $('#submit').on('click', function() {
    var val = $(this).prev().val().trim();
    if (val !== '') {
      submit(val);
    }
  });
  function submit(val) {
    $.ajax({
      url: '/upload',
      type: 'POST',
      data: {
        data: val
      }
    })
    .then(res => {
      message('success', '提交成功');
    })
    .catch(err => {
      message('error','提交失败');
      console.log(e);
    })
  }
  $.ajax({
    url: '/type_list'
  })
  .then(res => {
    $('#mainType').append($.map(res.data, item => {
      return '<option value="' + item.id + '">' + item.name + '</option>';
    }).join(''))
  });
  $('#mainType').on('change', function() {
    var val = $(this).val();
    $('#subType').children().slice(1).remove();
    $.ajax({
      url: '/sub_type_list',
      data: {
        type: val
      }
    })
    .then(res => {
      $('#subType').append($.map(res.data, item => {
        return '<option value="' + item.id + '">' + item.name + '</option>';
      }).join(''))
    })
  });
  $('#subType').on('change', function() {
    var sub_type = $(this).val();
    var main_type = $('#mainType').val();
      $.ajax({
        url: '/get_data',
        data: {
          type: main_type,
          sub_type
        }
      })
      .then(res => {
        var data = filterData(res.data);
        var option = {
          legend: {
            data: ['数值']
          },
          xAxis: {
              type: 'category',
              data: data.map(item => item.date)
          },
          yAxis: {
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
                show: true
              }
          }]
        };
        chart.setOption(option);
      })
      .catch(err => {
        message('error', '请求失败');
        console.log(err);
      }) 
  });

  function message(type, text) {
    $('.msgbox').addClass(type).text(text).show();
    setTimeout(() => {
      $('.msgbox').removeClass(type).text('').hide();
    }, 2000);
  }

  function filterData(data) {
    return data.map(item => {
      var value = 0;
      if (item.value.indexOf(':') > -1) {
        var segment = item.value.split(':');
        value =  Number(segment[0]) * 3600 + Number(segment[1]) * 60 + Number(segment[2]);
      } else if (item.value.indexOf('%') > -1) {
        value = Number(item.value.slice(0, -1));
      } else {
        value = Number(item.value);
      }
      return {
        date: item.date,
        value
      }
    })
  }
})()