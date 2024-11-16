/** 各指令帮助信息 */
export const helpMsg = {
    'fuas': '最终物语的辅助插件，包含以下指令：\n.fu 检定指令\n.fc 命刻变动显示开关\n.fmod 检定模式切换\n.opp 随机机会',
    'fu': '最终物语的检定辅助指令。\n拥有两种模式：\n0，默认模式\n\t难度留空时仅显示结果。\n\t指令为.fu 属性1 属性2 补正 难度\n1，便捷模式\n\t难度可以留空，默认为10。补正可以留空，默认为0。使用补正必须输入难度\n\t指令为.fu 属性1 属性2 难度 补正\nps：属性不用不用加d作为前缀，直接用数字即可。',
    'fmod': '最终物语的检定模式切换指令。\n指令：.fmod 模式代码\n模式：\n0，默认模式\n\t难度留空时仅显示结果。\n\t检定指令为.fu 属性1 属性2 补正 难度\n1，便捷模式\n\t难度可以留空，默认为10。补正可以留空，默认为0。使用补正必须输入难度\n\t检定指令为.fu 属性1 属性2 难度 补正',
    'fc': '最终物语的检定命刻变动显示开关。\n指令：.fc 开关代码\n0，关闭.     1，开启.',
    'opp': '使用空白参数获取随机机会，使用机会的名字，获取机会的详细信息。',
    'fst':'最终物语的属性录入指令，用法类似st'

}

export const rankToText=['大失败','失败','成功','大成功']

/** 检定模式列表 */
export const fmodList = ['0，默认模式', '1，便捷模式']

/** 命刻变动显示开关 */
export const fcmodList = ['0，关闭', '1，开启']

/** 掷骰关键字对应表 */
export const keyList = {
    "力量": "mig",
    "灵巧": "dex",
    "敏捷": "dex",
    "智力": "ins",
    "洞察": "ins",
    "意志": "wlp",
    "m": "mig",
    "d": "dex",
    "i": "ins",
    "w": "wlp"
}

export const keyList2 = {
  'md': ['mig','dex'],
  'dm': ['dex','mig'],
  'wm': ['wlp','mig'],
  'mw': ['mig','wlp'],
  'id': ['ins','dex'],
  'di': ['dex','ins'],
  'iw': ['ins','wlp'],
  'wi': ['wlp','ins'],
  'dw': ['dex','wlp'],
  'wd': ['wlp','dex'],
  'im': ['ins','mig'],
  'mi': ['ins','mig'],
}

export const buffList ={
    "眩晕": "暂时降低INS骰尺寸一阶。",
    "愤怒": "暂时降低DEX和INS骰尺寸一阶。",
    "中毒": "暂时降低MIG和WLP骰尺寸一阶。",
    "动摇": "暂时降低WLP骰尺寸一阶。",
    "缓慢": "暂时降低DEX骰尺寸一阶。",
    "虚弱": "暂时降低MIG骰尺寸一阶。"
};

/** 机会列表 */
export const opportunityList = {
    "优势": "你或盟友的下一个检定将获得+4加值。",
    "苦难": "目标生物会眩晕、动摇、缓慢或虚弱",
    "羁绊": "你对某人或某物建立了一种新羁绊，或者在你现有的羁绊中添加一种情感",
    "失言": "选择一个出现在场景之中的生物：做出一个由控制他们的人选择的妥协",
    "亲睐": "的行为为你赢得了某人的支持或赞赏",
    "线索": "你发现了有用的线索或细节。GM可能会告诉你这是什么，或者让你自己说明自己想要什么。",
    "丢失": "丢失一件物品被摧毁、丢失、被盗或留下。",
    "进展": "你可以在命刻上填充或删除两个部分",
    "情节转折": "你选择的某个人或某物突然出现在现场。",
    "扫描": "你会发现目标的一个弱点或者一个特质",
    "揭秘": "你可以了解你所选择的生物的目标和动机"
}

/** 扑克牌
 * @description 扑克牌的牌组，按照Joker、黑桃、红桃、梅花、方片、百搭的顺序排列。
 */
export const pokerList =
    [
        ['小鬼', '大鬼'],
        ['黑桃A', '黑桃2', '黑桃3', '黑桃4', '黑桃5', '黑桃6', '黑桃7', '黑桃8', '黑桃9', '黑桃10', '黑桃J', '黑桃Q', '黑桃K'],
        ['红桃A', '红桃2', '红桃3', '红桃4', '红桃5', '红桃6', '红桃7', '红桃8', '红桃9', '红桃10', '红桃J', '红桃Q', '红桃K'],
        ['黑桃A', '黑桃2', '黑桃3', '黑桃4', '黑桃5', '黑桃6', '黑桃7', '黑桃8', '黑桃9', '黑桃10', '黑桃J', '黑桃Q', '黑桃K'],
        ['方片A', '方片2', '方片3', '方片4', '方片5', '方片6', '方片7', '方片8', '方片9', '方片10', '方片J', '方片Q', '方片K'],
        ['百搭']
    ]

/**
 * 塔罗牌
 * @description 塔罗牌的牌组，按照大阿尔卡那牌、权杖牌组、圣杯牌组、宝剑牌组、星币牌组的顺序排列，大阿尔卡那牌的牌中[0]为中文，[1]为英文。
 *  */
export const tarotList = [
    // 大阿尔卡那牌
    [
        ['愚者', 'The Fool'],
        ['魔术师', 'The Magician'],
        ['女祭司', 'The High Priestess'],
        ['女皇', 'The Empress'],
        ['皇帝', 'The Emperor'],
        ['教皇', 'The Hierophant'],
        ['恋人', 'The Lovers'],
        ['战车', 'The Chariot'],
        ['力量', 'Strength'],
        ['隐士', 'The Hermit'],
        ['命运之轮', 'The Wheel of Fortune'],
        ['正义', 'Justice'],
        ['倒吊人', 'The Hanged Man'],
        ['死神', 'Death'],
        ['节制', 'Temperance'],
        ['恶魔', 'The Devil'],
        ['塔', 'The Tower'],
        ['星星', 'The Star'],
        ['月亮', 'The Moon'],
        ['太阳', 'The Sun'],
        ['审判', 'Judgment'],
        ['世界', 'The World']
    ],
    // 小阿尔卡那牌 - 权杖牌组
    ['权杖Ace', '权杖2', '权杖3', '权杖4', '权杖5', '权杖6', '权杖7', '权杖8', '权杖9', '权杖10', '权杖侍从', '权杖骑士', '权杖王后', '权杖国王'],
    // 小阿尔卡那牌 - 圣杯牌组
    ['圣杯Ace', '圣杯2', '圣杯3', '圣杯4', '圣杯5', '圣杯6', '圣杯7', '圣杯8', '圣杯9', '圣杯10', '圣杯侍从', '圣杯骑士', '圣杯王后', '圣杯国王'],
    // 小阿尔卡那牌 - 宝剑牌组
    ['宝剑Ace', '宝剑2', '宝剑3', '宝剑4', '宝剑5', '宝剑6', '宝剑7', '宝剑8', '宝剑9', '宝剑10', '宝剑侍从', '宝剑骑士', '宝剑王后', '宝剑国王'],
    // 小阿尔卡那牌 - 星币牌组
    ['星币Ace', '星币2', '星币3', '星币4', '星币5', '星币6', '星币7', '星币8', '星币9', '星币10', '星币侍从', '星币骑士', '星币王后', '星币国王']
];


