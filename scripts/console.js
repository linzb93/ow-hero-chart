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
      name: '单场最多使用投射屏障',
      id: 'max_barrier',
      value: Number($hero_spec.find('tbody tr').eq(0).find('td').eq(1).text())
    },
    {
      name: '平均能量',
      id: 'average_energy',
      value: Number($hero_spec.find('tbody tr').eq(2).find('td').eq(1).text())
    },
    {
      name: '主要攻击模式命中率',
      id: 'shooting',
      value: Number($hero_spec.find('tbody tr').eq(3).find('td').eq(1).text())
    },
    {
      name: '单场最多高能消灭',
      id: 'max_height_energy_kill',
      value: Number($hero_spec.find('tbody tr').eq(5).find('td').eq(1).text())
    },
    {
      name: '单场最多重力喷涌消灭',
      id: 'max_gravity_flowing_kill',
      value: Number($hero_spec.find('tbody tr').eq(6).find('td').eq(1).text())
    },
    {
      name: '单场最多阻挡伤害量',
      id: 'max_resist_demage',
      value: Number($hero_spec.find('tbody tr').eq(8).find('td').eq(1).text())
    },
    {
      name: '平均每10分钟高能消灭',
      id: 'per_height_energy_kill',
      value: Number($hero_spec.find('tbody tr').eq(10).find('td').eq(1).text())
    },
    {
      name: '平均每10分钟使用投射屏障',
      id: 'per_barrier',
      value: Number($hero_spec.find('tbody tr').eq(11).find('td').eq(1).text())
    },
    {
      name: '平均每10分钟阻挡伤害量',
      id: 'per_resist_demage',
      value: Number($hero_spec.find('tbody tr').eq(12).find('td').eq(1).text())
    },
    {
      name: '单场最高平均能量',
      id: 'max_average_energy',
      value: Number($hero_spec.find('tbody tr').eq(13).find('td').eq(1).text())
    },
    {
      name: '平均每10分钟重力喷涌消灭',
      id: 'per_gravity_flowing_kill',
      value: Number($hero_spec.find('tbody tr').eq(14).find('td').eq(1).text())
    }
  ],
  battle: [
    {
      name: 'K/D',
      id: 'kd',
      value: (Number($battle.find('tbody tr').eq(9).find('td').eq(1).text()) / Number($battle.find('tbody tr').eq(6).find('td').eq(1).text())).toFixed(4)
    }
  ],
  support: [
    {
      name: '单场最多防御助攻',
      id: 'max_defense_assists',
      value: Number($support.find('tbody tr').eq(0).find('td').eq(1).text())
    },
    {
      name: '单场最多攻击助攻',
      id: 'max_attack_assists',
      value: Number($support.find('tbody tr').eq(2).find('td').eq(1).text())
    },
    {
      name: '平均每10分钟攻击助攻',
      id: 'per_attack_assists',
      value: Number($support.find('tbody tr').eq(3).find('td').eq(1).text())
    },
    {
      name: '平均每10分钟防御助攻',
      id: 'per_defense_assists',
      value: Number($support.find('tbody tr').eq(4).find('td').eq(1).text())
    }
  ],
  best: [
    {
      name: '单场最多对英雄伤害量',
      id: 'max_damage_hero',
      value: Number($best.find('tbody tr').eq(2).find('td').eq(1).text())
    },
    {
      name: '单场最长火力全开时间',
      id: 'max_time_on_fire',
      value: Number($best.find('tbody tr').eq(7).find('td').eq(1).text())
    }
  ],
  average: [
    {
      name: "平均每10分钟消灭",
      id: 'per_kill',
      value: Number($average.find('tbody tr').eq(0).find('td').eq(1).text())
    },
    {
      name: "平均每10分钟阵亡",
      id: 'per_die',
      value: Number($average.find('tbody tr').eq(2).find('td').eq(1).text())
    },
    {
      name: "平均每10分钟对英雄伤害量",
      id: 'per_damage_hero',
      value: Number($average.find('tbody tr').eq(5).find('td').eq(1).text())
    },
    {
      name: "平均每10分钟火力全开时间",
      id: 'per_time_on_fire',
      value: Number($average.find('tbody tr').eq(7).find('td').eq(1).text())
    }
  ]
};
JSON.stringify(data)