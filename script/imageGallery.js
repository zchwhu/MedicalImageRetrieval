/**
 * Created by Administrator on 2016/7/5.
 */
$(document).ready(function(){
    //滑块初始化及拖动调节图片大小事件
    d3.select('#slider').call(d3.slider().value(15).on("slide", function(evt, value) {
        var intValue=Math.floor(value);
        var changeValue=(intValue-15)*4.75;
        var newHeight=100+changeValue;
        //只针对展示中的图片，不针对论文详情页中的图片
        $("#mainContent img").css({"height":newHeight});
    }));

    //搜索排序模式切换事件
    $("#orderMode").click(function(){
        if($(this).hasClass("impact")){
            $(this).text("Random");
            $(this).removeClass("impact");
            $(this).parent("span").next().attr("placeholder","Keywords or PMCID (e.g. PMC395763), Ordered by Random");
        }else{
            $(this).text("Impact");
            $(this).addClass("impact");
            $(this).parent("span").next().attr("placeholder","Keywords or PMCID (e.g. PMC395763), Ordered by Impact");
        }
    })

    //图片展示模式切换事件
    $("#imagestyle img").click(function(){
        $(this).addClass("selected").siblings().removeClass("selected");
        $index=$(this).index();
        $("#mainContent>section").eq($index).show().siblings("section").hide();
    })

    //根据类型筛选图片事件
    $("input[type='checkbox']").click(function(){
        $imageType=$(this).parent("div").attr("id");
        if($(this).attr("checked")){
            $(this).attr("checked",false);
            //只针对列表中的图片
            $("#mainContent img."+$imageType).hide();
        }else{
            $(this).attr("checked",true);
            $("#mainContent img."+$imageType).show();
        }
    })

    //查看论文摘要事件
    $("#viewAbstract").click(function(){
        if($("#paperAbstract").is(":hidden")){
            $("#paperAbstract").show();
            $(this).text("Hide Abstract");
        }else{
            $("#paperAbstract").hide();
            $(this).text("View Abstract");
        }
    })

    //查看论文其他图片事件
    $("#showOtherImage").click(function(){
        if($("#otherImage").is(":hidden")){
            $("#otherImage").show();
            $(this).text("Hide Other Figures");
        }else{
            $("#otherImage").hide();
            $(this).text("Show Other Figures");
        }
    })

    //查看论文相关图片事件
    $("#showRelatedImage").click(function(){
        if($("#relatedImage").is(":hidden")){
            $("#relatedImage").show();
            $(this).text("Hide Related Figures");
        }else{
            $("#relatedImage").hide();
            $(this).text("Show Related Figures");
        }
    })

    //关闭论文详情页事件
    $("#close").click(function(){
        $("#paperDetail").removeClass();
        if(!$("#paperAbstract").is(":hidden")){
            $("#viewAbstract").trigger("click");
        }
        if(!$("#otherImage").is(":hidden")){
            $("#showOtherImage").trigger("click");
        }
        if(!$("#relatedImage").is(":hidden")){
            $("#showRelatedImage").trigger("click");
        }
        $("#paperDetail").hide();
        $("#mainContent").show();
    })

    //打开论文详情页事件，这里需要在打开时传入json数据
    // 部分数据可以从前台传入，图片对应论文作者，期刊摘要，其他图片和相关图片信息需要从后台传入
    $("#mainContent img").click(function(){
        var $fullPaper;//pdf文件资源
        var $src=$(this).attr("src");//获取对应点击的图片
        var $type=$(this).attr("class");//获取图片的类
        $("#paperDetail").addClass($type);//给打开的论文框赋对应的类名，显示不同颜色边框
        $("#paperDetail #taggerArea #taggerType").html($type+" <span class='caret'></span>");//根据图片类别赋初始标注结果
        $("#paperDetail #selectedImage").attr("src",$src);//传入点击的图片
        $("#viewFullPaper").attr("href",$fullPaper);//在pdf.js中指定全文路径
        $("#mainContent").hide();
        $("#paperDetail").show();
    })

    //标注图片类型事件
    $("#taggerSelected li").click(function(){
        var $selectedType=$(this).find("a").text();
        $("#paperDetail #taggerArea #taggerType").html($selectedType+" <span class='caret'></span>");
    })

    //提交标注结果事件
    $("#taggerSubmit").click(function(){
        $("#taggerArea input[type='text']").attr("placeholder","Tagged! Thank you.")
    })

    //滚动加载事件
    var loading=false;
    $(document).scroll(function(){
        if ($(this).scrollTop() + window.innerHeight >= $(document).height() && $(this).scrollTop() > 0){
            if(loading) return;
            loading = true;
            setTimeout(function() {
                //这里仅是示例，需要从后台传入json数据，拼接字符串传入
                if($("#imagestyle img").eq(0).hasClass("selected")){
                    $("#waterfall").append("<p>我是新加载的内容</p>");
                }else{
                    $("#imageList").append("<p>我是新加载的内容</p>");
                }
                loading = false;
            }, 1000);   //模拟延迟
        }
    })
})
