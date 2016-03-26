;(function($, window, document, undefined ){

  function SelectUI( jSelect, settings ) {

    var time = +(new Date()).getTime();

    this.settings = settings;
    this.selectContainerUI = "selectContainerUI_" + time;
    this.selectOptionListContainer = "selectOptionListContainer_" + time;
    this.selectTitleContainerUI = "selectTitleContainerUI_" + time;
    this.selectIconUI = "selectIconUI_" + time;
    this.selectTitleUI = "selectTitleUI_" + time;
    this.jSelect = jSelect;
    this.jOptions = this.jSelect.find("option");
    this.jOptionUI = null;


    var selectHTML = "";
    selectHTML += "<div id='"+ this.selectContainerUI +"' class=\"jComponentSelect " + settings.addClass + "\">";
    selectHTML += "   <div id='" + this.selectTitleContainerUI + "'  class=\"jComponentSelectTitleBox\">";
    selectHTML += "     <div id='" + this.selectIconUI + "' class=\"jComponentSelectIcon\"></div>";
    selectHTML += "     <div id='" +this.selectTitleUI + "'  class=\"jComponentSelectTitle\" ></div>";
    selectHTML += "   </div>";
    selectHTML += "   <ul id='"+ this. selectOptionListContainer +"'  class=\"jComponentSelectList\"></ul>";
    selectHTML += "</div>";

    // 渲染selectUI框架
    this.jSelect.before(selectHTML).hide();

    // selectUI Container
    this.jSelectContainerUI = $("#" +this.selectContainerUI );
    // selectUI 标题修改对象
    this.jSelectTitleUI = $("#" +this.selectTitleUI );
    // selectUI的下拉列表
    this.jSelectListUI = $("#" +this.selectOptionListContainer );
    //icon
    this.jSelectIconUI = $("#" + this.selectIconUI );

    this.init();
  }

  SelectUI.prototype = {
    constructor: SelectUI,
    init: function() {
      // 给每个option加data-index索引
      var settings = this.settings;

        /** 初始化一些配置
         *  1、给select的option 增加序号
         *  2、回调函数init　对每一个option元素的操作
         */

      this.jOptions.map(function(i, data ){
        $(data).attr("data-index", i);
        settings.init.call(this, $(data));
      });


      // 渲染optionUI
      this.render();

      // 渲染显示当前的样式 如果找不到selected，默认把第一个做了选中的
      // 渲染selectUI组件的标题及改变打开selectUI列表时的icon状态
      this.renderHead(this.jSelect.find(":selected"));

      // 绑定事件
      this.bindEvent();

      this.jSelectContainerUI.width(settings.width).height(settings.height).css({"line-height": settings.height+"px"});
      this.jSelectIconUI.width(settings.height).height(settings.height);
      this.jSelectListUI.css({top: settings.height-1});
      this.jOptionUI.width(settings.width).height(settings.height);


    },
    renderHead: function( obj ) {

      var value = obj.attr("value");
      var name = obj.html();
      var dataIndex =obj.attr("data-index");

      // 修改原生select的选中项
      this.changeNativeSelect( dataIndex );

      this.jSelectTitleUI.html(name).attr("title",name);

      this.close();
    },
    render: function() {

      // 重新获取Option数据
      this.jOptions = this.jSelect.find("option");

      // 把select中的option转换成li元素
      var optionHTML = this.jSelect.html().replace(/(option)/gi,"li");

      this.jSelectListUI.html(optionHTML);

      this.jOptionUI = this.jSelectListUI.find("li");
    },
    // 修改原生select中的option
    changeNativeSelect: function( index ) {
      this.jOptions.eq( index ).attr("selected","selected");
    },
    open: function(  ) {
      this.jSelectListUI.show();
      this.jSelectIconUI.addClass("jComponentSelectIconOpen");
    },
    close: function(  ) {
      this.jSelectListUI.hide();
      this.jSelectIconUI.removeClass("jComponentSelectIconOpen");
    },
    bindEvent: function() {
      var that = this;
      $("#" + this.selectTitleContainerUI ).click(function() {
        if ( that.jSelectListUI.css("display") == "none") {
          that.open();
        } else {
          that.close();
        }
      });


      this.jSelectListUI.on("click", "li", function(){
        var _that = $(this);
        var callback = that.settings.before.call(this, _that);
        if ( callback ) {
          that.renderHead(_that);
        }
        //select change执行，回调函数
        that.settings.after.call(this, _that);
      });


    },
    getSelectedOption: function() {
      return this.jSelect.find(":selected");
    }
  }

  $.fn.jComponentSelect = $.fn.selectUI = function( options ) {

    var defaults = {
      height:30,
      init: function(){},
      before:function(option){},
      after: function(option) {
        // false是不可点的，true是可点的
        return true;
      }
    };

    var settings = $.extend({},defaults, options);

    var selectUI = new SelectUI( $(this), settings );

    return selectUI;
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
