/** 最终物语的角色羁绊列表 */
export class bandTargetInfo {
  targetName: string;
  bandPair1: "赞赏" | "自卑" | null;
  bandPair2: "忠诚" | "怀疑" | null;
  bandPair3: "喜爱" | "憎恨" | null;

  constructor(targetName: string, bandPair1: "赞赏" | "自卑" | null, bandPair2: "忠诚" | "怀疑" | null, bandPair3: "喜爱" | "憎恨" | null) {
    this.targetName = targetName;
    this.bandPair1 = bandPair1;
    this.bandPair2 = bandPair2;
    this.bandPair3 = bandPair3;
  }

  /**
   * 设置角色的羁绊
   * @param bandPair 羁绊类型
   * @returns 如果原羁绊不存在，则返回true，否则返回false
   */
  setBand(bandPair: "赞赏" | "自卑" | "忠诚" | "怀疑" | "喜爱" | "憎恨"): boolean {
    switch (bandPair) {
      case "赞赏":
      case "自卑": {
        this.bandPair1 = bandPair;
        return this.bandPair1 == null;
      }
      case "忠诚":
      case "怀疑": {
        this.bandPair2 = bandPair;
        return this.bandPair2 == null;
      }
      case "喜爱":
      case "憎恨": {
        this.bandPair3 = bandPair;
        return this.bandPair3 == null;
      }
      default: {
        return false;
      }
    }
  }

  /**
   * 获取角色的羁绊信息
   * @returns 角色的羁绊信息
   */
  getCurrentBand(): {
    targetName: string;
    bandPair1: "赞赏" | "自卑" | null;
    bandPair2: "忠诚" | "怀疑" | null;
    bandPair3: "喜爱" | "憎恨" | null;
  } {
    return {
      targetName: this.targetName,
      bandPair1: this.bandPair1,
      bandPair2: this.bandPair2,
      bandPair3: this.bandPair3,
    };
  }

  /**
   * 获取角色的羁绊点数
   * @returns 角色的羁绊点数
   */
  getBandPoint(): number {
    let point = 0;
    if (this.bandPair1 !== null) {
      point += 1;
    }
    if (this.bandPair2 !== null) {
      point += 1;
    }
    if (this.bandPair3 !== null) {
      point += 1;
    }
    return point;
  }
}

/** 角色的随从信息
 * @property name 名字
 * @property canBeUsed 是否可以被使用
 * @property mig 力量
 * @property dex 敏捷
 * @property ins 洞察
 * @property wlp 意志
 * @property hpm 生命值上限
 * @property mpm 精神值上限
 * @property hp 当前生命值
 * @property mp 当前精神值
 * @property initiation 先攻
 * @property physicalDefense 物理防御
 * @property magicDefense 魔法防御
 * @property damageDefense 伤害亲和
 * @property buff 角色的buff与debuff列表
 */
export class subordinateInfo {
  name: string;
  canBeUsed: boolean;
  mig: number;
  dex: number;
  ins: number;
  wlp: number;
  hpm: number;
  mpm: number;
  hp: number;
  mp: number;
  initiation: number;
  physicalDefense: number;
  magicDefense: number;
  damageDefense: {
    physical: 'vu' | 'rs' | 'im' | 'ab' | 'no';
    wind: 'vu' | 'rs' | 'im' | 'ab' | 'no';
    electricity: 'vu' | 'rs' | 'im' | 'ab' | 'no';
    dark: 'vu' | 'rs' | 'im' | 'ab' | 'no';
    fire: 'vu' | 'rs' | 'im' | 'ab' | 'no';
    terra: 'vu' | 'rs' | 'im' | 'ab' | 'no';
    ice: 'vu' | 'rs' | 'im' | 'ab' | 'no';
    lightning: 'vu' | 'rs' | 'im' | 'ab' | 'no';
    poison: 'vu' | 'rs' | 'im' | 'ab' | 'no';
  };
  buff: {
    "眩晕": boolean,
    "愤怒": boolean,
    "中毒": boolean,
    "动摇": boolean,
    "缓慢": boolean,
    "虚弱": boolean,
  }
}

/** 角色属性列表
 * @property characterName 角色名
 * @property isUsing 当前使用状态
 * @property level 等级
 * @property xp 经验值
 * @property up 物语点
 * @property mig 力量
 * @property dex 敏捷
 * @property ins 洞察
 * @property wlp 意志
 * @property ip 库存点
 * @property ipm 库存点上限
 * @property zenit 泽尼特
 * @property hpm 生命值上限
 * @property mpm 精神值上限
 * @property hp 当前生命值
 * @property mp 当前精神值
 * @property initiation 先攻
 * @property physicalDefense 物理防御
 * @property magicDefense 魔法防御
 * @property damageDefense 伤害亲和
 * @property buff 角色的buff与debuff列表
 * @property band 角色的羁绊信息
 * @property subordinate 角色的伙伴(随从)
 */
export class characterCardInfo {
  characterName: string;
  isUsing: boolean;
  level: number;
  xp: number;
  up: number;
  mig: number;
  dex: number;
  ins: number;
  wlp: number;
  ip: number;
  ipm: number;
  zenit: number;
  hpm: number;
  mpm: number;
  hp: number;
  mp: number;
  initiation: number;
  physicalDefense: number;
  magicDefense: number;
  damageDefense: {
    physical: 'vu' | 'rs' | 'im' | 'ab' | 'no';
    wind: 'vu' | 'rs' | 'im' | 'ab' | 'no';
    electricity: 'vu' | 'rs' | 'im' | 'ab' | 'no';
    dark: 'vu' | 'rs' | 'im' | 'ab' | 'no';
    fire: 'vu' | 'rs' | 'im' | 'ab' | 'no';
    terra: 'vu' | 'rs' | 'im' | 'ab' | 'no';
    ice: 'vu' | 'rs' | 'im' | 'ab' | 'no';
    lightning: 'vu' | 'rs' | 'im' | 'ab' | 'no';
    poison: 'vu' | 'rs' | 'im' | 'ab' | 'no';
  };
  buff: {
    "眩晕": boolean,
    "愤怒": boolean,
    "中毒": boolean,
    "动摇": boolean,
    "缓慢": boolean,
    "虚弱": boolean,
  }
  band: {
    targetName: string;
    bandPair1: "赞赏" | "自卑" | null;
    bandPair2: "忠诚" | "怀疑" | null;
    bandPair3: "喜爱" | "憎恨" | null;
  }[]
  subordinate: subordinateInfo[]

  constructor(ctx: seal.MsgContext) {
    this.characterName = ctx.player.name;
    this.isUsing = false;
    this.level = 0;
    this.xp = 0;
    this.up = 0;
    this.mig = 0;
    this.dex = 0;
    this.ins = 0;
    this.wlp = 0;
    this.ip = 0;
    this.ipm = 0;
    this.zenit = 0;
    this.hpm = 0;
    this.mpm = 0;
    this.hp = 0;
    this.mp = 0;
    this.initiation = 0;
    this.physicalDefense = 0;
    this.magicDefense = 0;
    this.damageDefense = {
      physical: 'no',
      wind: 'no',
      electricity: 'no',
      dark: 'no',
      fire: 'no',
      terra: 'no',
      ice: 'no',
      lightning: 'no',
      poison: 'no',
    };
    this.buff = {
      "眩晕": false,
      "愤怒": false,
      "中毒": false,
      "动摇": false,
      "缓慢": false,
      "虚弱": false,
    }
    this.band = [];
    this.subordinate = [];
  }
}

/**
 * 获取角色卡信息
 * @param ctx - 消息上下文
 * @param characterName - 角色名称
 * @returns 角色卡信息对象
 */

export function getCharacterCard(ctx: seal.MsgContext): characterCardInfo {
  //获取角色卡指针
  let characterName = getCurrentCharacterCardName(ctx);
  //从数据库中获取角色信息
  let characterCard: characterCardInfo
  let characterCardJson = seal.vars.strGet(ctx, `$m_fuas_character_${characterName}`)[0];
  if (!characterCardJson) {
    characterCard = new characterCardInfo(ctx);
    seal.vars.strSet(ctx, `$m_fuas_character_${characterName}`, JSON.stringify(characterCard));
  } else {
    characterCard = JSON.parse(characterCardJson);
  }
  return characterCard;
}

export function setCharacterCard(ctx: seal.MsgContext, characterCard: characterCardInfo) {
  let characterName = getCurrentCharacterCardName(ctx);
  seal.vars.strSet(ctx, `$m_fuas_character_${characterName}`, JSON.stringify(characterCard));
}

export function getCurrentCharacterCardName(ctx: seal.MsgContext): string {
  let characterName = seal.vars.strGet(ctx, `$g_fuas_character_pointer_${ctx.player.userId}`)[0];
  if (!characterName) {
    characterName = `default_${ctx.player.userId}`;
    seal.vars.strSet(ctx, `$g_fuas_character_pointer_${ctx.player.userId}`, characterName);
  }
  return characterName;
}

export function setCurrentCharacterCardName(ctx: seal.MsgContext, characterName: string) {
  if (!characterName) {
    return false;
  }
  seal.vars.strSet(ctx, `$g_fuas_character_pointer_${ctx.player.userId}`, characterName);
  return true;
}
