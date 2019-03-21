/**
 * @Description: 百度统计工具类
 * @author snail
 * @date 2019-03-21
 * @param id {string} 百度统计唯一标识
 */
function snBaiDuTJ(id: string): void {
  console.log('百度统计代码 : ');
  let hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?" + id;
  let s = document.getElementsByTagName("script")[0];
  // @ts-ignore
  s.parentNode.insertBefore(hm, s);
}

export default {
  baiDuTj: snBaiDuTJ
};

