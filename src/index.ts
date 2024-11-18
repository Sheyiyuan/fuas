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
import {processStringArray} from './dice';
import * as textResource from './textResource'
import {rankToText} from './textResource'
import {getCharacterCard, setCharacterCard} from './character';

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
          if (!val1) {
            val1 = 0;
          }
        }
        if (isNaN(val2)) {
          val2 = characterCard[property2];
          if (!val2) {
            val2 = 0;
          }
        }
        //获取修正值和难度
        let {bonus, difficulty} = dice.getBonusAndDifficulty(args);
        //获取检定结果
        let checkResult = dice.fuCheck(fumode, val1, val2, difficulty, bonus);
        let reply = `<${ctx.player.name}>掷出了d${val1}+d${val2}+(${bonus})=${checkResult.diceResult1}+${checkResult.diceResult2}+(${bonus})=${checkResult.checkResult}`
        if (checkResult.difficulty !== '/') {
          if (checkResult.rank < 2) {
            reply += `<${checkResult.difficulty}，${rankToText[checkResult.rank]}`;
          } else {
            reply += `>=${checkResult.difficulty}，${rankToText[checkResult.rank]}`;
          }
        }
        reply += `，HR为:${checkResult.HR}。`
        //命刻显示
        if (fcmode === 1 && checkResult.difficulty !== '/') {
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
          //如果有参数，则显示指定角色的属性
          let key = cmdArgs.getArgN(2);
          if (!key) {
            //如果没有参数，则显示角色的所有属性
            //TODO
          } else {
            //如果有参数，则显示当前角色的属性key
            //TODO
          }
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

  const cmdClk = seal.ext.newCmdItemInfo();
  cmdClk.name = 'clk';
  cmdClk.help = textResource.helpMsg.clk;
  cmdClk.solve = (ctx, msg, cmdArgs) => {
    let val = cmdArgs.getArgN(1);
    switch (val) {
      case 'help': {
        const ret = seal.ext.newCmdExecuteResult(true);
        ret.showHelp = true;
        return ret;
      }
      case 'mk':
      case 'new': {
        //新建命刻
        let val1 = cmdArgs.getArgN(2), val2 = cmdArgs.getArgN(3),
          clkName = 'newClk', clkLength = 8;
        if (isNaN(Number(val1)) && isNaN(Number(val2))) {
          clkName = val1;
        }
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
          seal.replyToSender(ctx, msg, '请输入正确命刻名称（注意不能以纯数字作为名称）');
          return seal.ext.newCmdExecuteResult(true);
        }
        if (!isNaN(Number(val1)) && isNaN(Number(val2))) {
          clkLength = Number(val1);
          clkName = val2;
        }
        if (isNaN(Number(val1)) && !isNaN(Number(val2))) {
          clkName = val1;
          clkLength = Number(val2);
        }

        if (clkLength === 0) {
          clkLength = 8;
        }

        //获取命刻列表
        let clkListJson: string = seal.vars.strGet(ctx, `$g_clkList`)[0];
        if (!clkListJson) {
          clkListJson = `[]`;
        }
        let clkList = JSON.parse(clkListJson);
        //检查命刻是否已存在
        if (clkList.includes(clkName)) {
          seal.replyToSender(ctx, msg, `命刻${clkName}已存在。`);
          return seal.ext.newCmdExecuteResult(true);
        } else {
          //将命刻添加到列表中
          clkList.push(clkName);
          seal.vars.strSet(ctx, `$g_clkList`, JSON.stringify(clkList));
          //创建命刻变量
          let clk = {
            name: clkName,
            length: clkLength,
            value: 0,
          }
          seal.vars.strSet(ctx, `$g_clk_${clkName}`, JSON.stringify(clk));
          //当前命刻切换为新建命刻
          seal.vars.strSet(ctx, `$g_clkCurrentUsing`, clkName);
          seal.replyToSender(ctx, msg, `成功创建命刻${clkName}，长度为${clkLength}。`);
          return seal.ext.newCmdExecuteResult(true);
        }
      }
      case'ls': {
        //获取命刻列表
        let clkListJson: string = seal.vars.strGet(ctx, `$g_clkList`)[0];
        if (!clkListJson) {
          clkListJson = `[]`;
        }
        let clkList = JSON.parse(clkListJson);
        //检查命刻是否已存在
        if (clkList.length === 0) {
          seal.replyToSender(ctx, msg, `命刻列表为空。`);
          return seal.ext.newCmdExecuteResult(true);
        } else {
          //获取当前命刻
          let clkCurrentUsing: string = seal.vars.strGet(ctx, `$g_clkCurrentUsing`)[0];
          let reply = `命刻列表：\n`;
          for (let i = 0; i < clkList.length; i++) {
            let clkName = clkList[i];
            let clk = JSON.parse(seal.vars.strGet(ctx, `$g_clk_${clkName}`)[0]);
            if (clkName === clkCurrentUsing) {
              reply += `[*]`;
            } else {
              reply += `[ ]`;
            }
            reply += `${i + 1}. ${clk.name}(${clk.length})\n`;
          }
          seal.replyToSender(ctx, msg, reply);
          return seal.ext.newCmdExecuteResult(true);
        }
      }
      case 'cd': {
        //切换命刻
        let val1 = cmdArgs.getArgN(2);

        let clkListJson: string = seal.vars.strGet(ctx, `$g_clkList`)[0];
        if (!clkListJson) {
          clkListJson = `[]`;
        }
        let clkList = JSON.parse(clkListJson);
        //检查命刻是否存在
        if (clkList.includes(val1)) {
          seal.vars.strSet(ctx, `$g_clkCurrentUsing`, val1);
          seal.replyToSender(ctx, msg, `成功切换到命刻${val1}。`);
          return seal.ext.newCmdExecuteResult(true);
        } else {
          seal.replyToSender(ctx, msg, `命刻${val1}不存在。`);
          return seal.ext.newCmdExecuteResult(true);
        }
      }
      case 'rm':
      case 'del': {
        //删除命刻
        let val1 = cmdArgs.getArgN(2);

        let clkListJson: string = seal.vars.strGet(ctx, `$g_clkList`)[0];
        if (!clkListJson) {
          clkListJson = `[]`;
        }
        let clkList: string[] = JSON.parse(clkListJson);
        //检查命刻是否存在
        if (clkList.includes(val1)) {
          //删除命刻变量
          seal.vars.strSet(ctx, `$g_clk_${val1}`, JSON.stringify(null));
          //删除命刻列表
          clkList.splice(clkList.indexOf(val1), 1);
          seal.vars.strSet(ctx, `$g_clkList`, JSON.stringify(clkList));
          //如果删除的是当前命刻，切换为列表中的第一个命刻
          let clkCurrentUsing: string = seal.vars.strGet(ctx, `$g_clkCurrentUsing`)[0];
          if (clkList.includes(clkCurrentUsing)) {
            seal.vars.strSet(ctx, `$g_clkCurrentUsing`, clkList[0]);
          } else {
            seal.vars.strSet(ctx, `$g_clkCurrentUsing`, clkList[0]);
          }
          seal.replyToSender(ctx, msg, `成功删除命刻${val1}。`);
          return seal.ext.newCmdExecuteResult(true);
        } else {
          seal.replyToSender(ctx, msg, `命刻${val1}不存在。`);
          return seal.ext.newCmdExecuteResult(true);
        }
      }
      case 'mv': {
        //重命名命刻
        let val1 = cmdArgs.getArgN(2), val2 = cmdArgs.getArgN(3);

        let clkListJson: string = seal.vars.strGet(ctx, `$g_clkList`)[0];
        if (!clkListJson) {
          clkListJson = `[]`;
        }
        let clkList: string[] = JSON.parse(clkListJson);
        //检查命名刻是否合法
        if (!isNaN(Number(val2))) {
          seal.replyToSender(ctx, msg, `命刻名称不能为纯数字。`);
          return seal.ext.newCmdExecuteResult(true);
        }
        //检查命刻是否存在
        if (clkList.includes(val1)) {
          //检查新命刻是否已存在
          if (clkList.includes(val2)) {
            seal.replyToSender(ctx, msg, `命刻${val2}已存在。`);
            return seal.ext.newCmdExecuteResult(true);
          } else {
            //重命名命刻变量
            let clk = JSON.parse(seal.vars.strGet(ctx, `$g_clk_${val1}`)[0]);
            clk.name = val2;
            seal.vars.strSet(ctx, `$g_clk_${val2}`, JSON.stringify(clk));
            //如果当前命刻为val1，切换为val2
            let clkCurrentUsing: string = seal.vars.strGet(ctx, `$g_clkCurrentUsing`)[0];
            if (clkCurrentUsing === val1) {
              seal.vars.strSet(ctx, `$g_clkCurrentUsing`, val2);
            }
            //更新命刻列表
            clkList.splice(clkList.indexOf(val1), 1);
            clkList.push(val2);
            seal.vars.strSet(ctx, `$g_clkList`, JSON.stringify(clkList));
            seal.replyToSender(ctx, msg, `成功重命名命刻${val1}为${val2}。`);
            return seal.ext.newCmdExecuteResult(true);
          }
        } else {
          seal.replyToSender(ctx, msg, `命刻${val1}不存在。`);
          return seal.ext.newCmdExecuteResult(true);
        }
      }
      case 'show': {
        //获取当前命刻
        let clkCurrentUsing: string = seal.vars.strGet(ctx, `$g_clkCurrentUsing`)[0];
        if (!clkCurrentUsing) {
          seal.replyToSender(ctx, msg, `当前命刻不存在。请使用.clk mk命令创建一个命刻。`);
          return seal.ext.newCmdExecuteResult(true);
        }
        let clk = JSON.parse(seal.vars.strGet(ctx, `$g_clk_${clkCurrentUsing}`)[0]);
        let reply = `当前命刻：${clk.name}(${clk.length})，当前值：${clk.value}/${clk.length}。`;
        seal.replyToSender(ctx, msg, reply);
        return seal.ext.newCmdExecuteResult(true);
      }
      default: {
        if (!isNaN(Number(val))) {
          //判断当前命刻是否存在
          let reply = `当前命刻： `;
          let clkListJson: string = seal.vars.strGet(ctx, `$g_clkList`)[0];
          if (!clkListJson) {
            clkListJson = `[]`;
          }
          let clkList = JSON.parse(clkListJson);
          let clkCurrentUsing: string = seal.vars.strGet(ctx, `$g_clkCurrentUsing`)[0];
          if (!clkList.includes(clkCurrentUsing)) {
            seal.replyToSender(ctx, msg, `当前命刻不存在。请使用.clk mk命令创建一个命刻。`);
            return seal.ext.newCmdExecuteResult(true);
          }
          //判断变动值是否合法
          let val1 = Number(val);
          if (val1 !== Math.floor(val1)) {
            seal.replyToSender(ctx, msg, `命刻变动值必须为整数。`);
            return seal.ext.newCmdExecuteResult(true);
          }
          //命刻变动
          let clk = JSON.parse(seal.vars.strGet(ctx, `$g_clk_${clkCurrentUsing}`)[0]);
          clk.value += val1;
          //判断是否超过长度
          if (clk.value >= clk.length) {
            clk.value = clk.length;
            reply += `${clk.value}/${clk.length} ；命刻已满。`;
          } else {
            if (clk.value < 0) {
              clk.value = 0;
            }
            reply += `${clk.value}/${clk.length}。`;
          }
          seal.vars.strSet(ctx, `$g_clk_${clkCurrentUsing}`, JSON.stringify(clk));
          seal.replyToSender(ctx, msg, reply);
        }
        return seal.ext.newCmdExecuteResult(true);
      }
    }
  }
  ext.cmdMap['clk'] = cmdClk;

  //下面是列表屎山
  //帮助信息，用这个指令获取指令列表
  const cmdGL = seal.ext.newCmdItemInfo();
  cmdGL.name = 'GroupList'; // 指令名字，可用中文
  cmdGL.help = textResource.helpMsg['GroupList'];
  cmdGL.solve = (_ctx, _msg, _cmdArgs) => {
    const ret = seal.ext.newCmdExecuteResult(true);
    ret.showHelp = true;
    return ret;
  };
  ext.cmdMap['GroupList'] = cmdGL;

//make list
//.mklist listName
  const cmdMk = seal.ext.newCmdItemInfo();
  cmdMk.name = 'mklist';
  cmdMk.help = textResource.helpMsg['mklist'];
  cmdMk.solve = (ctx, msg, cmdArgs) => {
    let val = cmdArgs.getArgN(1);
    switch (val) {
      case 'help': {
        const ret = seal.ext.newCmdExecuteResult(true);
        ret.showHelp = true;
        return ret;
      }
      default: {
        //首先检查是否列表存在
        if (!val) {
          seal.replyToSender(ctx, msg, '请输入列表名称。');
          return seal.ext.newCmdExecuteResult(true);
        }
        if (val === 'CurrentList') {
          seal.replyToSender(ctx, msg, '你不能使用CurrentList作为列表名称，请重新输入列表名称。');
          return seal.ext.newCmdExecuteResult(true);
        }
        let list = seal.vars.strGet(ctx, `$g${textResource.Listpre}${val}`)[0];
        if (list) {
          seal.replyToSender(ctx, msg, '列表已存在，请重新输入列表名称或删除原列表后重试。');
          return seal.ext.newCmdExecuteResult(true);
        }
        //创建列表
        let listNew = {'name': val};
        seal.vars.strSet(ctx, `$g${textResource.Listpre}${val}`, JSON.stringify(listNew));
        //注册到列表列表
        let listListJson = seal.vars.strGet(ctx, `$g${textResource.Listpre}ListList`)[0];
        let listList = [];
        if (listListJson) {
          listList = JSON.parse(listListJson);
        }
        listList.push(val);
        seal.vars.strSet(ctx, `$g${textResource.Listpre}ListList`, JSON.stringify(listList));
        //切换到新列表
        seal.vars.strSet(ctx, `$g${textResource.Listpre}CurrentList`, val);
        seal.replyToSender(ctx, msg, `创建列表${val}成功！已自动切换为该列表。`);
        return seal.ext.newCmdExecuteResult(true);
      }
    }
  };
  ext.cmdMap['mklist'] = cmdMk;

//add keyword
//.addkw keyword ...
  const cmdAd = seal.ext.newCmdItemInfo();
  cmdAd.name = 'addkw';
  cmdAd.help = textResource.helpMsg['addkw'];
  cmdAd.solve = (ctx, msg, cmdArgs) => {
    let val = cmdArgs.getArgN(1);
    switch (val) {
      case 'help': {
        const ret = seal.ext.newCmdExecuteResult(true);
        ret.showHelp = true;
        return ret;
      }
      default: {
        //首先获取当前列表
        let pwd = seal.vars.strGet(ctx, `$g${textResource.Listpre}CurrentList`)[0]
        let listJson = seal.vars.strGet(ctx, `$g${textResource.Listpre}${pwd}`)[0];
        if (!listJson) {
          seal.replyToSender(ctx, msg, '当前列表不存在，请先创建或切换到列表。');
          return seal.ext.newCmdExecuteResult(true);
        }
        let list = JSON.parse(listJson);
        //将关键字添加到列表
        let kw = cmdArgs.args;
        //var kw []string
        let uid = ctx.player.name;
        let userList = []
        if (list[uid]) {
          userList = list[uid];
        }
        let preUserLen = userList.length;
        //将kw添加至userList
        userList = userList.concat(kw);
        //去除重复项
        userList = [...new Set(userList)];
        //计算增加的长度
        list[uid] = userList;
        let addLen = userList.length - preUserLen;
        //更新列表
        seal.vars.strSet(ctx, `$g${textResource.Listpre}${pwd}`, JSON.stringify(list));
        seal.replyToSender(ctx, msg, `成功添加了${addLen}个关键字到列表${pwd}中。`);
        return seal.ext.newCmdExecuteResult(true);
      }
    }
  }
  ext.cmdMap['addkw'] = cmdAd;

//delete keyword
//.delkw keyword ...
  const cmdDk = seal.ext.newCmdItemInfo();
  cmdDk.name = 'rmkw'; // 指令名字，可用中文
  cmdDk.help = textResource.helpMsg['rmkw'];
  cmdDk.solve = (ctx, msg, cmdArgs) => {
    let val = cmdArgs.getArgN(1);
    switch (val) {
      case 'help': {
        const ret = seal.ext.newCmdExecuteResult(true);
        ret.showHelp = true;
        return ret;
      }
      default: {
        //首先获取当前列表
        let pwd = seal.vars.strGet(ctx, `$g${textResource.Listpre}CurrentList`)[0]
        let listJson = seal.vars.strGet(ctx, `$g${textResource.Listpre}${pwd}`)[0];
        if (!listJson) {
          seal.replyToSender(ctx, msg, '当前列表不存在，请先创建或切换到列表。');
        }
        let list = JSON.parse(listJson);
        //将关键字从列表中移除
        let kw = cmdArgs.args;
        //type kw []string
        let uid = ctx.player.name;
        let userList = []
        if (list[uid]) {
          userList = list[uid];
        }
        let preUserLen = userList.length;
        //将kw从userList中移除
        userList = userList.filter(item => !kw.includes(item));
        list[uid] = userList;
        //计算减少的长度
        let rmLen = preUserLen - userList.length;
        //更新列表
        seal.vars.strSet(ctx, `$g${textResource.Listpre}${pwd}`, JSON.stringify(list));
        seal.replyToSender(ctx, msg, `成功从列表${pwd}中移除了${rmLen}个关键字。`);
        return seal.ext.newCmdExecuteResult(true);
      }
    }
  };
// 将命令注册到扩展中
  ext.cmdMap['rmkw'] = cmdDk;

//show list
//.showlist
  const cmdSl = seal.ext.newCmdItemInfo();
  cmdSl.name = 'showlist';
  cmdSl.help = textResource.helpMsg['showlist'];
  cmdSl.solve = (ctx, msg, cmdArgs) => {
    let val = cmdArgs.getArgN(1);
    switch (val) {
      case 'help': {
        const ret = seal.ext.newCmdExecuteResult(true);
        ret.showHelp = true;
        return ret;
      }
      default: {
        //首先获取当前列表
        let pwd = seal.vars.strGet(ctx, `$g${textResource.Listpre}CurrentList`)[0]
        let listJson = seal.vars.strGet(ctx, `$g${textResource.Listpre}${pwd}`)[0];
        if (!listJson) {
          seal.replyToSender(ctx, msg, '当前列表不存在，请先创建或切换到列表。');
          return seal.ext.newCmdExecuteResult(true);
        }
        let list = JSON.parse(listJson);
        /*将列表内容按照以下格式输出：
        列表名：
        关键字1 from userid
        关键字2 from userid
        关键字3 from userid
        ……
        */
        let reply = `列表名：${pwd}\n`;
        let count = 1;
        for (let uid in list) {
          if (uid === 'name') {
            continue;
          }
          for (let i = 0; i < list[uid].length; i++) {
            reply += `${count++}.${list[uid][i]} from ${uid}\n`;
          }
        }
        seal.replyToSender(ctx, msg, reply);
        return seal.ext.newCmdExecuteResult(true);
      }
    }
  };
  ext.cmdMap['showlist'] = cmdSl;

//cd list
//.cdlist listName
  const cmdCd = seal.ext.newCmdItemInfo();
  cmdCd.name = 'cdlist';
  cmdCd.help = textResource.helpMsg['cdlist'];
  cmdCd.solve = (ctx, msg, cmdArgs) => {
    let val = cmdArgs.getArgN(1);
    switch (val) {
      case 'help': {
        const ret = seal.ext.newCmdExecuteResult(true);
        ret.showHelp = true;
        return ret;
      }
      default: {
        //首先检查是否列表存在
        let list = seal.vars.strGet(ctx, `$g${textResource.Listpre}${val}`)[0];
        if (!list) {
          seal.replyToSender(ctx, msg, '列表不存在，请重新输入列表名称或创建新列表。');
          return seal.ext.newCmdExecuteResult(true);
        }
        //切换到新列表
        seal.vars.strSet(ctx, `$g${textResource.Listpre}CurrentList`, val);
        seal.replyToSender(ctx, msg, `已切换到列表${val}。`);
        return seal.ext.newCmdExecuteResult(true);
      }
    }
  }
  ext.cmdMap['cdlist'] = cmdCd;

//remove list
//.rmlist listName
  const cmdRm = seal.ext.newCmdItemInfo();
  cmdRm.name = 'rmlist';
  cmdRm.help = textResource.helpMsg['rmlist'];
  cmdRm.solve = (ctx, msg, cmdArgs) => {
    let val = cmdArgs.getArgN(1);
    switch (val) {
      case 'help': {
        const ret = seal.ext.newCmdExecuteResult(true);
        ret.showHelp = true;
        return ret;
      }
      default: {
        //首先检查是否列表存在
        let list = seal.vars.strGet(ctx, `$g${textResource.Listpre}${val}`)[0];
        if (!list) {
          seal.replyToSender(ctx, msg, '列表不存在，请重新输入列表名称。');
          return seal.ext.newCmdExecuteResult(true);
        }
        //删除列表
        seal.vars.strSet(ctx, `$g${textResource.Listpre}${val}`, '');
        //从列表列表中移除
        let listListJson = seal.vars.strGet(ctx, `$g${textResource.Listpre}ListList`)[0];
        let listList = [];
        if (listListJson) {
          listList = JSON.parse(listListJson);
        }
        listList = listList.filter(item => item !== val);
        seal.vars.strSet(ctx, `$g${textResource.Listpre}ListList`, JSON.stringify(listList));
        //如果删除的是当前列表，则切换到列表列表中的第一个列表
        if (val === seal.vars.strGet(ctx, `$g${textResource.Listpre}CurrentList`)[0]) {
          if (listList.length > 0) {
            seal.vars.strSet(ctx, `$g${textResource.Listpre}CurrentList`, listList[0]);
          } else {
            seal.vars.strSet(ctx, `$g${textResource.Listpre}CurrentList`, '');
          }
        }
        seal.replyToSender(ctx, msg, `成功删除列表${val}。`);
        return seal.ext.newCmdExecuteResult(true);
      }
    }
  }
  ext.cmdMap['rmlist'] = cmdRm;

//rename list
//.mvlist oldName newName
  const cmdRn = seal.ext.newCmdItemInfo();
  cmdRn.name = 'mvlist';
  cmdRn.help = '重命名当前群组中的列表。';
  cmdRn.solve = (ctx, msg, cmdArgs) => {
    let val = cmdArgs.getArgN(1);
    switch (val) {
      case 'help': {
        const ret = seal.ext.newCmdExecuteResult(true);
        ret.showHelp = true;
        return ret;
      }
      default: {
        //首先检查是否列表存在
        let oldName = cmdArgs.getArgN(1);
        let list = seal.vars.strGet(ctx, `$g${textResource.Listpre}${oldName}`)[0];
        if (!list) {
          seal.replyToSender(ctx, msg, '列表不存在，请重新输入列表名称。');
          return seal.ext.newCmdExecuteResult(true);
        }
        //检查新名称是否存在
        let newName = cmdArgs.getArgN(2);
        if (newName === oldName) {
          seal.replyToSender(ctx, msg, '新名称与旧名称相同，请重新输入新名称。');
          return seal.ext.newCmdExecuteResult(true);
        }
        let newList = seal.vars.strGet(ctx, `$g${textResource.Listpre}${newName}`)[0];
        if (newList) {
          seal.replyToSender(ctx, msg, '新名称已存在，请重新输入新名称。');
          return seal.ext.newCmdExecuteResult(true);
        }
        //重命名列表
        seal.vars.strSet(ctx, `$g${textResource.Listpre}${newName}`, list);
        seal.vars.strSet(ctx, `$g${textResource.Listpre}${oldName}`, '');
        //更新列表列表
        let listListJson = seal.vars.strGet(ctx, `$g${textResource.Listpre}ListList`)[0];
        let listList = [];
        if (listListJson) {
          listList = JSON.parse(listListJson);
        }
        let index = listList.indexOf(oldName);
        if (index !== -1) {
          listList[index] = newName;
        }
        seal.vars.strSet(ctx, `$g${textResource.Listpre}ListList`, JSON.stringify(listList));
        //如果重命名的是当前列表，则切换到新列表
        if (oldName === seal.vars.strGet(ctx, `$g${textResource.Listpre}CurrentList`)[0]) {
          seal.vars.strSet(ctx, `$g${textResource.Listpre}CurrentList`, newName);
        }
        seal.replyToSender(ctx, msg, `成功重命名列表${oldName}为${newName}。`);
        return seal.ext.newCmdExecuteResult(true);
      }
    }
  }
  ext.cmdMap['mvlist'] = cmdRn;

//show all lists
//.lslist
  const cmdLs = seal.ext.newCmdItemInfo();
  cmdLs.name = 'lslist';
  cmdLs.help = textResource.helpMsg['lslist'];
  cmdLs.solve = (ctx, msg, cmdArgs) => {
    let val = cmdArgs.getArgN(1);
    switch (val) {
      case 'help': {
        const ret = seal.ext.newCmdExecuteResult(true);
        ret.showHelp = true;
        return ret;
      }
      default: {
        //首先检查是否有列表
        let listListJson = seal.vars.strGet(ctx, `$g${textResource.Listpre}ListList`)[0];
        if (!listListJson) {
          seal.replyToSender(ctx, msg, '当前群组没有列表，请先创建或切换到列表。');
          return seal.ext.newCmdExecuteResult(true);
        }
        let lists = JSON.parse(listListJson);
        if (lists.length === 0) {
          seal.replyToSender(ctx, msg, '当前群组没有列表，请先创建或切换到列表。');
          return seal.ext.newCmdExecuteResult(true);
        }
        //首先获取所有列表
        let reply = '当前群组列表：\n';
        //在当前列表前加上‘[*]’，否则加上‘[ ]’
        let currentList = seal.vars.strGet(ctx, `$g${textResource.Listpre}CurrentList`)[0];
        for (let i = 0; i < lists.length; i++) {
          let name = lists[i];
          if (name === currentList) {
            reply += `[*] ${name}\n`;
          } else {
            reply += `[ ] ${name}\n`;
          }
        }
        seal.replyToSender(ctx, msg, reply);
        return seal.ext.newCmdExecuteResult(true);
      }
    }
  }
  ext.cmdMap['lslist'] = cmdLs;

//GLclear
//.GLclear
  const cmdClear = seal.ext.newCmdItemInfo();
  cmdClear.name = 'GLclear';
  cmdClear.help = '清除当前群组的所有列表。';
  cmdClear.solve = (ctx, msg, cmdArgs) => {
    let val = cmdArgs.getArgN(1);
    switch (val) {
      case 'help': {
        const ret = seal.ext.newCmdExecuteResult(true);
        ret.showHelp = true;
        return ret;
      }
      default: {
        //首先检查是否有列表
        let listListJson = seal.vars.strGet(ctx, `$g${textResource.Listpre}ListList`)[0];
        if (!listListJson) {
          seal.replyToSender(ctx, msg, '当前群组没有列表，请先创建或切换到列表。');
          return seal.ext.newCmdExecuteResult(true);
        }
        let lists = JSON.parse(listListJson);
        //删除所有列表
        for (let i = 0; i < lists.length; i++) {
          let list = lists[i];
          let name = list.name;
          seal.vars.strSet(ctx, `$g${textResource.Listpre}${name}`, '');
        }
        //删除列表列表
        seal.vars.strSet(ctx, `$g${textResource.Listpre}ListList`, '[]');
        //删除当前列表
        seal.vars.strSet(ctx, `$g${textResource.Listpre}CurrentList`, '');
        seal.replyToSender(ctx, msg, '成功清除当前群组的所有列表。');
        return seal.ext.newCmdExecuteResult(true);
      }
    }
  }
  ext.cmdMap['GLclear'] = cmdClear;

}

main();
