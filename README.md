# selectUI
自定义组件selectUI

调用方式：
```
  var selectUI = $("#select1").selectUI({
      width: 350,
      height: 30,
      "name": "name",
      "addClass": "year",
      init: function (option) {
        var week = +(option.attr("week"));
        if (week == 0) {
          option.addClass("disable");
        }
      },
      before: function (option) {

        var disable = +(option.hasClass("disable"));
        if ( disable ) {
          return false;
        }
        return true;
      },
      after: function(option) {

      }
    });
```    

    selectUI返回selectUI对象
    动态给select添加option元素后，通过 seelctUI.render渲染可以对selectUI组件中的列表进行更新。

    # width 定义selectUI组件的宽度；

    # height 定义selectUI组件的高度;

    # addClass 给selectUI组件增加一个class选择器，作用是可以扩展默认selectUI的样式；

    # init 传入参数
    * option：是组件中的点击的选项，不是select中的option，而是组件中的。它的作用是在selectUI组件渲染前做的一些工作，
    * 假如：selectUI中的某一个可多个元素不可点，颜色上要区别于其他，可以给它加一个disable. before回调函数中来判断那些是不可点的，对于不可点的返回false;

    # before 传入参数
    * option：是组件中的点击的选项，不是select中的option，而是组件中的。

    # before 返回值
    * true：组件中的选项是可点击、也选择的；
    * false：组件中的选项是不可点击、不可选择的;

    # after 传入参数
    * option：是组件中的点击的选项，不是select中的option，而是组件中的。它的作用是如同select onchange事件
