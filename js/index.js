;

// 绑定事件
function addHandler(element,type,handler) {
    if(element.addEventListener){
        element.addEventListener(type,handler);
    }else if(element.attachEvent){
        element.attachEvent('on'+type,handler);
    }else {
        element['on'+type]=handler;
    }
}

function removeHandler(element,type,handler) {
    if(element.removeEventListener){
        element.removeEventListener(type,handler);
    }else if(element.detachEvent){
        element.detachEvent('on'+type,handler);
    }else {
        element['on'+type]=null;
    }
}

//获取样式
function getStyle(element,attr) {
    if(getComputedStyle(element,null)){
        return window.getComputedStyle(element,null)[attr];
    }else {
        return element.currentStyle[attr];
    }
}

window.onload=function () {
    //使body高度等于窗口高度
    document.body.style.height=window.innerHeight+'px';
    window.onresize=function () {
        document.body.style.height=window.innerHeight+'px';
    };

    var oInput=document.getElementById('input');
    var oOutput=document.getElementById('output');

    var oRegExp={
        //转义字符
        trans:/\\(\S)/g,
        //斜体
        italic:/([^\\]|^)\*(.*?[^\\\n])\*/g,
        // 粗体
        bold:/([^\\]|^)\*\*(.*?[^\\\n])\*\*/g,
        // 标题
        h1:/(^\s*|\n[\s]*)\#[\x20\t\f](.*)/g,
        h2:/(^\s*|\n[\s]*)\#\#[\x20\t\f](.*)/g,
        h3:/(^\s*|\n[\s]*)\#\#\#[\x20\t\f](.*)/g,
        h4:/(^\s*|\n[\s]*)\#\#\#\#[\x20\t\f](.*)/g,
        h5:/(^\s*|\n[\s]*)\#\#\#\#\#[\x20\t\f](.*)/g,
        h6:/(^\s*|\n[\s]*)\#\#\#\#\#\#[\x20\t\f](.*)/g,
        // 链接
        link:/([^\!]|^|\\\!)\[(.*?)\]\((.*?)\)/g,
        // 图片
        img:/([^\\]|^)\!\[(.*?)\]\((.*?)\)/g,
        // 引用
        blockquote:/(^\s*|\n[\s]*)\>[\x20\t\f]([^]*?(?=\n[\s]*\n|$))/g,
        //blockquoteIn:/(?=\<blockquote\>)(\n[\s]*\>\>\s([^]*))(?=\<\/blockquote\>)/,
        // 列表
        ul:/(^\s*|\n[\s]*)(\*[\x20\t\f][^]*?(?=\n[\s]*\n|$))/g,
        ulLi:/(\n[\s]*)\*[\x20\t\f]([^]*?(?=\n[\s]*\n|$|\n[\s]*\*[\x20\t\f]))/g,
        ol:/(^\s*|\n[\s]*)(\d+\.[\x20\t\f][^]*?(?=\n[\s]*\n|$))/g,
        olLi:/(\n[\s]*)\d+\.[\x20\t\f]([^]*?(?=\n[\s]*\n|$|\n[\s]*\d+\.[\x20\t\f]))/g,
        // 分割线
        horizontal:/(^\s*|\n[\s]*)-[\x20\t\f]*-[\x20\t\f]*-[\x20\t\f]*(-|[\x20\t\f])*(?=\n|$)/g,
        // 行内代码
        inlineCode:/([^\\]|^)`(.*?[^\\\`])`/g,
		 // 代码块
        blockCode:/(^\s*|\n[\s]*)```[\s]*\n([^]*?)```/g,
        // 段落
        p:/((?=\n[\s]*\n)[^]+?(?=\n[\s]*\n|$))/g
    };

    function parse() {
        var input_content=oInput.value;
        input_content=input_content.replace(oRegExp.bold,"$1<strong>$2</strong>");
        input_content=input_content.replace(oRegExp.italic,"$1<em>$2</em>");
        input_content=input_content.replace(oRegExp.inlineCode,"$1<code>$2</code>");
        input_content=input_content.replace(oRegExp.blockquote,"$1<blockquote>$2</blockquote>");
        input_content=input_content.replace(oRegExp.ul,"$1<ul>\n$2\n</ul>");
        input_content=input_content.replace(oRegExp.ulLi,"$1<li>$2</li>");
        input_content=input_content.replace(oRegExp.ol,"$1<ol>\n$2\n</ol>");
        input_content=input_content.replace(oRegExp.olLi,"$1<li>$2</li>");
        input_content=input_content.replace(oRegExp.blockCode,"$1<pre><code>$2</code></pre>");
        input_content=input_content.replace(oRegExp.horizontal,"$1<hr>");
        input_content=input_content.replace(oRegExp.p,"<p>$1</p>");
        //input_content=input_content.replace(oRegExp.blockquoteIn,"<blockquote>$2</blockquote>");
        input_content=input_content.replace(oRegExp.h1,"<h1>$2</h1>");
        input_content=input_content.replace(oRegExp.h2,"<h2>$2</h2>");
        input_content=input_content.replace(oRegExp.h3,"<h3>$2</h3>");
        input_content=input_content.replace(oRegExp.h4,"<h4>$2</h4>");
        input_content=input_content.replace(oRegExp.h5,"<h5>$2</h5>");
        input_content=input_content.replace(oRegExp.h6,"<h6>$2</h6>");
        input_content=input_content.replace(oRegExp.link,"$1<a href='$3' target='_blank'>$2</a>");
        input_content=input_content.replace(oRegExp.img,"$1<img src='$3' title='$2'/>");
        input_content=input_content.replace(oRegExp.trans,"$1");
        oOutput.innerHTML=input_content;
    }
    addHandler(oInput,'input',parse);


    // 默认值
    oInput.value="# 标题一\n# 标题一\n## 标题二\n### 标题三\n#### 标题四\n##### 标题五\n###### 标题六 \n- - - - - - - \n> 简易markdown解析器暂不支持列表和引用嵌套\n\n *斜体* \n**加粗**\n ***斜体加粗***\n\\> 关键字*\\*符转义\\**\n[链接百度](https://www.baidu.com)\n![图片](https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3651634877,800136928&fm=27&gp=0.jpg)\n\n无序列表 \n* 列表项 \n* 列表项 \n* 列表项 \n* 列表项\n\n有序列表\n1. 列表项\n2. 列表项\n3. 列表项 \n\n> 这是一个引用\n\n这有一个行内`代码`\n\n下面是一个代码块：\n```\n// 绑定事件\nfunction addHandler(element,type,handler) {if(element.addEventListener){element.addEventListener(type,handler);}else if(element.attachEvent){element.attachEvent('on'+type,handler);}else {element['on'+type]=handler;}}\n```";

    parse();


};
