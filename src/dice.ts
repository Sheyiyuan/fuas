import * as TextResource from './textResource';
import {keyList2} from './textResource';

/**
 * 生成一个随机数并根据给定的参数进行计算
 * @description (n,x,k,p,c)=(nDx+p)*k+c
 * @param n - 骰子的数量
 * @param x - 骰子的面数
 * @param k - 加权值，默认为 1
 * @param p - 第一修正值，默认为 0
 * @param c - 第二修正值，默认为 0
 * @returns 计算后的结果
 */
export function D(n: number, x: number, k = 1, p = 0, c = 0) {
    let sum = 0;
    let sumPlus = 0;
    for (let i = 0; i < n; i++) {
        let randomNumber = Math.floor(Math.random() * x) + 1;
        sum += randomNumber;
    }
    sum += p;
    sumPlus = sum * k + c;
    return sumPlus;
}

/**
 * 进行一个检定，根据骰子结果和难度值判断成功等级，并返回详细结果
 * @param fumod - 检定模式，0 表示默认模式，1 表示便捷模式
 * @param diceSiz1 - 第一个骰子的面数
 * @param diceSiz2 - 第二个骰子的面数
 * @param difficulty - 检定的难度值
 * @param bonus - 额外的修正值，默认为 0
 * @returns 一个对象，包含检定的详细结果，如骰子结果、成功等级、命刻变动值等
 */
export function fuCheck(fumod:number,diceSiz1: number, diceSiz2: number, difficulty: number|'/'|null, bonus = 0) {
  let rank = 0;
    let clock = 0;
    let diceResult1 = D(1, diceSiz1);
    let diceResult2 = D(1, diceSiz2);
    let HR = Math.max(diceResult1, diceResult2);
    let diceResult = diceResult1 + diceResult2;
    let checkResult = diceResult + bonus;
    if (diceResult1 >= 6 && diceResult1 === diceResult2) {
        rank = 3;
    }
    if (fumod == 0) {
      if (difficulty == null||difficulty=='/'){
        rank = null
        clock = null
        difficulty = '/'
      } else {
        if (checkResult >= difficulty) {
          rank = 2;
        } else {
          if (diceResult1 === 1 && diceResult2 === 1) {
            rank = 0;
          } else {
            rank = 1;
          }
        }
        let delta = checkResult - difficulty
        clock = getCheckClock(delta, rank)
      }
    }
  if (fumod == 1) {
    if (difficulty == '/'){
      rank = null
      clock = null
    } else {
      if(difficulty == null){
        difficulty = 10
      }
      if (checkResult >= difficulty) {
        rank = 2;
      } else {
        if (diceResult1 === 1 && diceResult2 === 1) {
          rank = 0;
        } else {
          rank = 1;
        }
      }
      let delta = checkResult - difficulty
      clock = getCheckClock(delta, rank)
    }
  }
  return {
      'diceResult1': diceResult1,
      'diceResult2': diceResult2,
      'diceResult': diceResult,
      'HR': HR,
      'checkResult': checkResult,
      'rank': rank,
      'clock': clock,
      'difficulty': difficulty
    }
}

/**
 * 根据给定的检定差值和成功等级确定并返回命刻变动值
 * @param delta - 检定的差值，即目标值和实际值之间的差值
 * @param rank - 成功等级，0 表示大失败，1 表示失败，2 表示成功，3 表示大成功
 * @returns clock - 命刻变动值
 */
export function getCheckClock(delta: number, rank: number) {
    let clock = 0
    if (delta >= 6 || rank == 3) {
        clock = 3
    } else if (delta >= 3) {
        clock = 2
    } else if (delta >= 0) {
        clock = 1
    } else if (delta > -3 && rank != 0) {
        clock = -1
    } else if (delta > -6 || rank != 0) {
        clock = -2
    } else {
        clock = -3
    }
    return clock
}

/**
 * 从一个对象中随机获取一个键值对
 * @param obj - 一个对象，其键和值可以是任何类型
 * @returns 一个数组，包含随机选择的键和对应的值
 */
export function getRandomKeyValuePair(obj: { [key: string]: any }) {
    const keys = Object.keys(obj);
    const randomIndex = Math.floor(Math.random() * keys.length);
    const randomKey = keys[randomIndex];
    return [randomKey, obj[randomKey]];
}

/**
 * 格式化属性名称，将其转换为小写并去除空格
 * @param property - 属性名称
 * @returns 格式化后的属性名称
 */
export function propertyFmt(property: string) {
    if (!isNaN(Number(property))){
      return property
    }
    let fmtKey: string
    if (property in TextResource.keyList) {
        fmtKey = TextResource.keyList[property]
    } else {
        fmtKey = property.toLowerCase()
    }
    return fmtKey
}

export function processStringArray(strArray: string[]) {
  let resultObj = {};
  let count = 0;

  for (let str of strArray) {
    let parts: any[];

    // 检查字符串是否符合字母/汉字 + 数字的形式
    if (/^[\u4e00-\u9fa5a-zA-Z]+[\d]+$/.test(str)) {
      let index = getFirstNumberIndex(str);
      let property = propertyFmt(str.slice(0, index));
      let value = parseInt(str.slice(index));
      resultObj[property] = value;
      count++;
    } else if (str.includes(":")) {
      // 如果字符串包含冒号，以冒号分割为键和值
      parts = str.split(/:|：/);
      resultObj[parts[0]] = parts[1];
      count++;
    }
  }

  return {resultObj,count};
}

function getFirstNumberIndex(str) {
  for (let i = 0; i < str.length; i++) {
    if (!isNaN(+str[i])) {
      return i;
    }
  }
  return -1;
}

export function getBonusAndDifficulty(args: string[]) {
  if (args.length < 3) {
    return { bonus: 0, difficulty: null };
  }

  const slicedArgs = args.slice(2);
  let bonus = 0;
  let difficulty = null;

  for (const arg of slicedArgs) {
    const match = arg.match(/^([-+]\d+)|(\d+)|(\/)/);
    if (match) {
      if (match[1]) {
        bonus = parseInt(match[1]);
      } else if (match[2]) {
        difficulty = parseInt(match[2]);
      } else if (match[3]) {
        difficulty = '/';
      }
    }
  }

  return { bonus, difficulty };
}


export function argsFmt(args: string[]) {
  let fmtArgs: string[] = []
  if(args[0] in keyList2){
    fmtArgs = keyList2[args[0]]
    fmtArgs = fmtArgs.concat(args.slice(1))
  }else{
    fmtArgs = args;
  }
  return fmtArgs
}


