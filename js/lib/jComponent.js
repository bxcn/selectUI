/**
 * Created by Administrator on 2015/12/22.
 */

function JTheme( container, options ) {
  var defaults = {
    style: "radioOrange",
    top:0,
    left:0,
    width:16,
    height:16
  };
  // jquery匹配的窗口
  this.container = $(container);
  this.checkbox = this.container.find("input[type='checkbox']");
  // 继承
  this.options = $.extend({}, defaults, options );
  //初始化
  this.init();

  return this;
}

JTheme.prototype = {
  constructor: JTheme,
  init: function() {
    var self = this;
    var isIE8 = self.isIE8();

    return self.container.each(function(){
      var that = $(this);
      var inputElement = that.find("input");

      if ( !that.hasClass("jComponentContainer")) {
        that.addClass("jComponentContainer");
      }

      inputElement.addClass("jComponent").addClass(self.options.style);

      // 防止对同一个container窗口多次定义，产生的多个i标签
      if ( that.find("i").size() == 0) {
        inputElement.after("<i class='jComponentIcon'></i>");
        inputElement.next("i").css({"width": self.options.width, "height": self.options.height});
      }

      // 定义container窗口的大小
      // self.setContainerSize( that );

      // 支持 IE8 以下浏览器
      if ( isIE8 ) {
        inputElement.change(function(){
          self.hackIE(inputElement);
        });
        //初始化
        self.hackIE(inputElement);
      }

    });
  },
  isIE8:function() {

    var version=navigator.appVersion.split(";");
    var trim_Version=(version[1]||"").replace(/[ ]/g,"");

    if ( trim_Version == 'MSIE6.0' ||
      trim_Version == 'MSIE7.0' ||
      trim_Version == 'MSIE8.0') {

      return true;
    }

    return false;
  },
  setContainerSize: function(container) {
    // 设置容器尺寸
    container = $(container);
    var containerWidth = container.css("width");
    var containerHeight= container.css("height");
    container.css({"width": containerWidth, "height": containerHeight});
  },
  hackIE: function( that ) {

    var self = this;
    var left = self.options.left;
    var top = self.options.top;

    if ( that.prop("checked") ) {

      /**
       * 每次有新的选中状态时就清除所有已选中的radio
       */
      if ( that.attr("type") == "radio" ) {
        // 清除所有的样式
        $("input[name='" + that.attr("name") + "']").next("i").css({"background-position": left + "px " +  top +"px"});
      }

      that.next().css({"background-position": left - self.options.width + "px " +  top +"px"});

      // 此代码在ie8浏览器下无效（不支持动态添加class中的图片），但在兼容模式下可以，
      // _that.next("i").addClass("jComponentChecked");

    } else {
      that.next().css({"background-position": left + "px " +  top +"px"});
    }

  },
  addChecked: function() {
    if ( this.isIE8() ) {
      // 先删除checked属性 解决全选之前有选中的checkbox，那么再点全选按钮时，选中的元素取消选中，未选中的则反之
      this.checkbox.removeAttr("checked").click();
    } else {
      this.checkbox.prop("checked", true);
    }
    return this;
  },
  removeChecked: function(){
    if ( this.isIE8() ) {
      // 先增加checked属性 解决取消全选之前有未选中的checkbox，那么再点取消按钮时，未选中的元素选中，选中的则反之
      this.checkbox.prop("checked", true).click();
    } else {
      this.checkbox.removeAttr("checked");
    }

    return this;
  }

}

;(function(){

  $.fn.radioOrange = function( options ){

    options = options || {};
    $.extend(options,{
      style: "radioOrange",
      top:-16,
      left:0
    });
    return new JTheme(this, options)
  }

  $.fn.radioBlue = function( options ){

    options = options || {};
    $.extend(options,{
      style: "radioBlue",
      top:0,
      left:0
    });
    return new JTheme(this, options)
  }


  $.fn.checkboxOrange = function( options ){

    options = options || {};-
    $.extend(options,{
      style: "checkboxOrange",
      top:-50,
      left:0,
      width:18,
      height:18
    });
    return new JTheme(this, options)
  }

  $.fn.checkboxBlue = function( options ){

    options = options || {};
    $.extend(options,{
      style: "checkboxBlue",
      top:-32,
      left:0,
      width:18,
      height:18
    });
    return new JTheme(this, options)
  }

})();
;(function($, window, document, undefined ){
  $.fn.jComponentSelect = $.fn.selectUI = function( options ) {

    var selectHTML = "";
    selectHTML += "<div class=\"jComponentSelect\">";
    selectHTML += "   <div class=\"jComponentSelectTitleBox\">";
    selectHTML += "     <div class=\"jComponentSelectIcon\"></div>";
    selectHTML += "     <div class=\"jComponentSelectTitle\" ></div>";
    selectHTML += "   </div>";
    selectHTML += "   <ul class=\"jComponentSelectList\">{jComponentSelectList}</ul>";
    selectHTML += "</div>";


    var defaults = {
      height:30,
      init: function(){},
      click:function(option){
        return true;
      },
      after: function(option) {

      }
    };

    var settings = $.extend({},defaults, options);


    return this.each(function(i, _that ){

      // 当前sleect原生标签
      var select = $(_that);

      // 给每个option加data-index索引
      select.find("option").map(function(i, data ){
        $(data).attr("data-index", i);
      });

      var optionsUI = select.html();
      optionsUI = optionsUI.replace(/(option)/gi,"li");
      selectHTML = selectHTML.replace(/\{jComponentSelectList}/gi, optionsUI);

      //当自定义的组件添加到select节点上，然后隐藏它
      select.before(selectHTML).hide();

      var jComponentSelect = select.prev();
      // HTML select 添加到自定的select dev中
      jComponentSelect.append(select).addClass(settings.addClass);

      var jComponentSelectTitleBox = jComponentSelect.find(".jComponentSelectTitleBox");
      var jComponentSelectTitle = jComponentSelect.find(".jComponentSelectTitle");
      var jComponentSelectList = jComponentSelect.find(".jComponentSelectList");
      var jComponentSelectIcon = jComponentSelect.find(".jComponentSelectIcon");
      var option = jComponentSelect.find("li");

      /**
       * wrap Customer Select Div
       */
        //customeSelect.width(settings.width).height(settings.height);

      jComponentSelect.width(settings.width).height(settings.height).css({"line-height": settings.height+"px"});
      jComponentSelectTitle.height(settings.height);

      jComponentSelectIcon.width(settings.height).height(settings.height);

      jComponentSelectList.css({top: settings.height-1});
      option.width(settings.width).height(settings.height);


      // 显示select下拉列表
      function selectListShow( o ) {
        o.show();
        jComponentSelectIcon.addClass("jComponentSelectIconOpen");
      }
      // 隐藏select下拉列表
      function selectListHide(o) {
        o.hide();
        jComponentSelectIcon.removeClass("jComponentSelectIconOpen");
      }

      // 改变选中后的select的状态
      function renderHeader(obj) {

        var value = obj.attr("value");
        var name = obj.html();
        var index =obj.attr("data-index");

        // 修改原生select的选中项
        modifySelectNative(select.find("option").eq(index));

        jComponentSelectTitle.html(name).attr("title",name);

        selectListHide(jComponentSelectList);
      }

      // 修改原生的option的selected
      function modifySelectNative( options ) {
        options.attr("selected","selected");
      }

      //自定义组件-标题框
      jComponentSelectTitleBox.click(function(){
        if ( jComponentSelectList.css("display") == "none") {
          selectListShow(jComponentSelectList);
        } else {
          selectListHide(jComponentSelectList);
        }
      });


      function init() {
        var obj = select.find(":selected") || option.eq(0);
        renderHeader(obj);

        option.map(function(i, data) {
          settings.init.call(this, $(data));
        });

      }

      init();

      option.click(function(){
        var that = $(this);
        var callback = settings.click.call(this, that);
        if ( callback ) {
          renderHeader(that);
        }
        //select change执行，回调函数
        settings.after.call(this, that);
      });

    });
  };
})(jQuery, window, document );

/*
 $("#reacordState").jComponentSelect({
 width:200,
 height:30,
 addClass:"fl",
 click: function(){
 return;
 },
 after: function(){
 checkDataList();
 }
 });
 * */
