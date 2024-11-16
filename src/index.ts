//
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//
//
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
//               佛祖保佑         永无BUG
import * as dice from './dice';
import * as textResource from './textResource'
import {getCharacterCard, setCharacterCard} from './character';
import {processStringArray} from "./dice";
import {rankToText} from "./textResource";

function main() {
  //注册扩展
  let ext = seal.ext.find('FUAS');
  if (!ext) {
    ext = seal.ext.new('FUAS', 'Sheyiyuan', '1.0.0');
    seal.ext.register(ext);
  }


  const cmdFuas = seal.ext.newCmdItemInfo();
  cmdFuas.name = 'fuas';
  cmdFuas.help = textResource.helpMsg.fuas;
  cmdFuas.solve = (_ctx, _msg, _cmdArgs) => {
    const ret = seal.ext.newCmdExecuteResult(true);
    ret.showHelp = true;
    return ret;
  };
  ext.cmdMap['fuas'] = cmdFuas;

  /**
   * 指令:fu
   * 用处:用于fu的检定
   */
  const cmdFu = seal.ext.newCmdItemInfo();
  cmdFu.name = 'fu'; // 指令名字，可用中文
  cmdFu.help = textResource.helpMsg.fuas;
  cmdFu.solve = (ctx, msg, cmdArgs) => {
    let val = cmdArgs.getArgN(1);
    switch (val) {
      case 'help': {
        const ret = seal.ext.newCmdExecuteResult(true);
        ret.showHelp = true;
        return ret;
      }
      default: {
        //参数标准化
        let args = dice.argsFmt(cmdArgs.args);
        //首先获取检定模式
        let fumode = seal.vars.intGet(ctx, `$g_fumode`)[0]
        let fcmode = seal.vars.intGet(ctx, `$g_fcmode`)[0]
        //获取值
        let val1: number, val2: number;
        let property1 = dice.propertyFmt(args[0]);
        let property2 = dice.propertyFmt(args[1]);
        val1 = Number(property1);
        val2 = Number(property2);
        //获取角色卡属性
        let characterCard = getCharacterCard(ctx);
        if (isNaN(val1)) {
          val1 = characterCard[property1];
          if(!val1){
            val1 = 0;
          }
        }
        if (isNaN(val2)) {
          val2 = characterCard[property2];
          if(!val2){
            val2 = 0;
          }
        }
        //获取修正值和难度
        let {bonus, difficulty} = dice.getBonusAndDifficulty(args);
        //获取检定结果
        let checkResult = dice.fuCheck(fumode, val1, val2, difficulty, bonus);
        let reply = `<${ctx.player.name}>掷出了d${val1}+d${val2}+(${bonus})=${checkResult.diceResult1}+${checkResult.diceResult2}+(${bonus})=${checkResult.checkResult}`
        if (checkResult.difficulty!=='/') {
          if(checkResult.rank<2) {
            reply += `<${checkResult.difficulty}，${rankToText[checkResult.rank]}`;
          }else{
            reply += `>=${checkResult.difficulty}，${rankToText[checkResult.rank]}`;
          }
        }
        reply += `，HR为:${checkResult.HR}。`
        //命刻显示
        if (fcmode===1) {
          reply += `命刻变动为：${checkResult.clock}。`
        }
        seal.replyToSender(ctx, msg, reply)
        return seal.ext.newCmdExecuteResult(true);
      }
    }
  };
  // 将命令注册到扩展中
  ext.cmdMap['fu'] = cmdFu;

  /**
   * 指令:opp
   * 用处:用于获取或查询机会
   * 参数:为空或机会名称
   */
  const cmdOpp = seal.ext.newCmdItemInfo();
  cmdOpp.name = 'opp';
  cmdOpp.help = textResource.helpMsg.opp;
  cmdOpp.solve = (ctx, msg, cmdArgs) => {
    let val = cmdArgs.getArgN(1);
    let reply = '';
    switch (val) {
      case 'help': {
        const ret = seal.ext.newCmdExecuteResult(true);
        ret.showHelp = true;
        return ret;
      }
      default: {
        let list = textResource.opportunityList;
        if (!val) {
          let RandomOpp = dice.getRandomKeyValuePair(list)
          reply = '(随机机会)' + RandomOpp[0] + ':\n' + RandomOpp[1];
          seal.replyToSender(ctx, msg, reply);
          return seal.ext.newCmdExecuteResult(true);
        }
        if (val in list) {
          reply = val + ':\n' + list[val];
          seal.replyToSender(ctx, msg, reply);
          return seal.ext.newCmdExecuteResult(true);
        }
        reply = '输入的机会名称不存在，请检查输入。'
        seal.replyToSender(ctx, msg, reply);
        return seal.ext.newCmdExecuteResult(true);
      }
    }
  };
  ext.cmdMap['opp'] = cmdOpp;

  const cmdFst = seal.ext.newCmdItemInfo();
  cmdFst.name = 'fst';
  cmdFst.help = textResource.helpMsg.fst;
  cmdFst.solve = (ctx, msg, cmdArgs) => {
    let val = cmdArgs.getArgN(1);
    switch (val) {
      case 'help': {
        const ret = seal.ext.newCmdExecuteResult(true);
        ret.showHelp = true;
        return ret;
      }
      default: {
        let args = cmdArgs.args;
        if (val === 'show') {
          //TODO

          return seal.ext.newCmdExecuteResult(true);
        }
        //将角色卡属性与角色属性合并
        let {resultObj, count} = processStringArray(args),
          characterSet = resultObj,
          characterCard = getCharacterCard(ctx),
          character = {...characterCard, ...characterSet};
        setCharacterCard(ctx, character);
        seal.replyToSender(ctx, msg, `成功录入<${ctx.player.name}>的${count}条属性。`)
        return seal.ext.newCmdExecuteResult(true);
      }
    }
  }
  ext.cmdMap['fst'] = cmdFst;

  const cmdFumod = seal.ext.newCmdItemInfo();
  cmdFumod.name = 'fmod';
  cmdFumod.help = textResource.helpMsg.fmod;
  cmdFumod.solve = (ctx, msg, cmdArgs) => {
    let val = cmdArgs.getArgN(1);
    switch (val) {
      case 'help': {
        const ret = seal.ext.newCmdExecuteResult(true);
        ret.showHelp = true;
        return ret;
      }
      default: {
        if (val === '1') {
          seal.vars.intSet(ctx, `$g_fumode`, 1);
          seal.replyToSender(ctx, msg, '已切换至便捷模式。');
          return seal.ext.newCmdExecuteResult(true);
        } else if (val === '0') {
          seal.vars.intSet(ctx, `$g_fumode`, 0);
          seal.replyToSender(ctx, msg, '已切换至默认模式。');
          return seal.ext.newCmdExecuteResult(true);
        }
        seal.replyToSender(ctx, msg, '输入错误，请输入1或0。');
        return seal.ext.newCmdExecuteResult(true);
      }
    }
  }
  ext.cmdMap['fmod'] = cmdFumod;


  const cmdFc = seal.ext.newCmdItemInfo();
  cmdFc.name = 'fc';
  cmdFc.help = textResource.helpMsg.fc;
  cmdFc.solve = (ctx, msg, cmdArgs) => {
    let val = cmdArgs.getArgN(1);
    switch (val) {
      case 'help': {
        const ret = seal.ext.newCmdExecuteResult(true);
        ret.showHelp = true;
        return ret;
      }
      default: {
        if (val === '1') {
          seal.vars.intSet(ctx, `$g_fcmode`, 1);
          seal.replyToSender(ctx, msg, '命刻显示：已开启。');
          return seal.ext.newCmdExecuteResult(true);
        } else if (val === '0') {
          seal.vars.intSet(ctx, `$g_fcmode`, 0);
          seal.replyToSender(ctx, msg, '命刻显示：已关闭。');
          return seal.ext.newCmdExecuteResult(true);
        }
        seal.replyToSender(ctx, msg, '输入错误，请输入1或0。');
        return seal.ext.newCmdExecuteResult(true);
      }
    }
  }
  ext.cmdMap['fc'] = cmdFc;

}
main();
