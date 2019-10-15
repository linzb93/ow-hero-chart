/**
 * 这里是复制进ow数据页面控制台的代码
 * 获取单个英雄的具体数据
 */

const $main_box = $('.js-stats').first();
const $hero_spec = $main_box.children().eq(0);
const $battle = $main_box.children().eq(1);
const $support = $main_box.children().eq(2);
const $best = $main_box.children().eq(3);
const $average = $main_box.children().eq(4);
const data = {
  hero_spec: [
    {
      id: 'max_barrier',
      value: Number($hero_spec.find('tbody tr').eq(0).find('td').eq(1).text())
    },
    {
      id: 'average_energy',
      value: $hero_spec.find('tbody tr').eq(2).find('td').eq(1).text()
    },
    {
      id: 'shooting',
      value: $hero_spec.find('tbody tr').eq(3).find('td').eq(1).text()
    },
    {
      id: 'max_height_energy_kill',
      value: Number($hero_spec.find('tbody tr').eq(5).find('td').eq(1).text())
    },
    {
      id: 'max_gravity_flowing_kill',
      value: Number($hero_spec.find('tbody tr').eq(6).find('td').eq(1).text())
    },
    {
      id: 'max_resist_demage',
      value: Number($hero_spec.find('tbody tr').eq(8).find('td').eq(1).text())
    },
    {
      id: 'per_height_energy_kill',
      value: Number($hero_spec.find('tbody tr').eq(10).find('td').eq(1).text())
    },
    {
      id: 'per_barrier',
      value: Number($hero_spec.find('tbody tr').eq(11).find('td').eq(1).text())
    },
    {
      id: 'per_resist_demage',
      value: Number($hero_spec.find('tbody tr').eq(12).find('td').eq(1).text())
    },
    {
      id: 'max_average_energy',
      value: $hero_spec.find('tbody tr').eq(13).find('td').eq(1).text()
    },
    {
      id: 'per_gravity_flowing_kill',
      value: Number($hero_spec.find('tbody tr').eq(14).find('td').eq(1).text())
    }
  ],
  battle: [
    {
      id: 'kd',
      value: (Number($battle.find('tbody tr').eq(9).find('td').eq(1).text()) / Number($battle.find('tbody tr').eq(6).find('td').eq(1).text())).toFixed(4)
    }
  ],
  support: [
    {
      id: 'max_defense_assists',
      value: Number($support.find('tbody tr').eq(0).find('td').eq(1).text())
    },
    {
      id: 'max_attack_assists',
      value: Number($support.find('tbody tr').eq(2).find('td').eq(1).text())
    },
    {
      id: 'per_attack_assists',
      value: Number($support.find('tbody tr').eq(3).find('td').eq(1).text())
    },
    {
      id: 'per_defense_assists',
      value: Number($support.find('tbody tr').eq(4).find('td').eq(1).text())
    }
  ],
  best: [
    {
      id: 'max_damage_hero',
      value: Number($best.find('tbody tr').eq(2).find('td').eq(1).text())
    },
    {
      id: 'max_time_on_fire',
      value: $best.find('tbody tr').eq(7).find('td').eq(1).text()
    }
  ],
  average: [
    {
      id: 'per_kill',
      value: Number($average.find('tbody tr').eq(0).find('td').eq(1).text())
    },
    {
      id: 'per_die',
      value: Number($average.find('tbody tr').eq(2).find('td').eq(1).text())
    },
    {
      id: 'per_damage_hero',
      value: Number($average.find('tbody tr').eq(5).find('td').eq(1).text())
    },
    {
      id: 'per_time_on_fire',
      value: $average.find('tbody tr').eq(7).find('td').eq(1).text()
    }
  ]
};
JSON.stringify(data)