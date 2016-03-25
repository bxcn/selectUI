# selectUI
自定义组件selectUI

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

        var week = +(option.attr("week"));
        if (week == 0) {
          return false;
        }

        return true;
      }
    });
    
    selectUI返回selectUI对象
    动态给select添加option元素后，通过 seelctUI.render渲染可以对selectUI组件中的列表进行更新。
    
