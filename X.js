// ==UserScript==
// @name         Google網頁翻譯
// @author       Kaiter-Plus
// @namespace    https://gitee.com/kfxxx/xxx/blob/master/X.js
// @description  
// @version      1.42
// @license      BSD-3-Clause
// @icon         https://cdn-icons.flaticon.com/png/512/2097/premium/2097948.png?token=exp=1635644051~hmac=21e2ccad44c05e9840c100b7b9a02bf0
// @include      *://*
// @run-at       document-end
// ==/UserScript==

;(function () {
  'use strict'
  // head
  const head = document.head;
  // body
  const body = document.body;
  // 抓網頁使用的語言
  const pLang = document.documentElement.lang.toLowerCase().substr(0,5);
  // 抓自己使用的語言
  const uLang = (navigator.language||navigator.browserLanguage).toLowerCase().substr(0,5);
  // 空 DIV
  let xdiv = document.createElement("div");
  xdiv.id = "google_translate_element";
  // 主體 CSS
  let xcss = document.createElement("style");
  xcss.innerHTML = "body{top:0px!important;}.goog-te-banner-frame.skiptranslate{display:none!important;}select.goog-te-combo,#xcancel{z-index: 88888888;opacity:0.5;position:fixed;font-size:8px; font-weight:bold;width:90px;left:5px;top:55px;color:#666;background:#f8f8f8;border:solid #aaa 2px;}#xcancel{top:85px;opacity:0;}select.goog-te-combo:hover,#xcancel:hover{opacity:1;}#google_translate_element{display:block;width:0px;overflow:hidden;}";
 // 關閉按鈕
  let button = document.createElement("button");
  button.innerHTML = "取消翻譯";
  button.id = "xcancel";
  button.onclick = function(){
    let iframe = document.getElementsByClassName("goog-te-banner-frame")[0];
    if(!iframe)return;
    let innerDoc = iframe.contentDocument||iframe.contentWindow.document;
    let restore_el = innerDoc.getElementsByTagName("button");
    for(let i=0;i<restore_el.length;i++){
      if(restore_el[i].id.indexOf("restore")>=0) {
        restore_el[i].click();
        let close_el = innerDoc.getElementsByClassName("goog-close-link");
        close_el[0].click();
      return;}
    }
  };
  // 翻譯選單

  function googleTranslateElementInit(){
    new google.translate.TranslateElement({
      pageLanguage:"auto",
      //可翻譯的語言，繁簡中，英語，日語，法語
      includedLanguages: "zh-TW,zh-CN,en,ja,fr",
    },"google_translate_element");
      document.body.appendChild(button);
    setTimeout(function(){
      var select = document.querySelector("select.goog-te-combo");
      //自動翻譯語言
      select.value = "zh-TW";
      select.dispatchEvent(new Event("change"));
    },100);
  };
  (function() {
  var googleTranslateScript = document.createElement('script');
  googleTranslateScript.type = 'text/javascript';
  googleTranslateScript.async = true;
  googleTranslateScript.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  ( document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0] ).appendChild( googleTranslateScript );
  })();
  if(pLang==uLang){
    // 使用者語言與網頁相同不動作
  } else if (pLang!==uLang){
    // 網頁語言不是指定語言：寫入空 DIV 、主體 JS 和 CSS
    window.onload = googleTranslateElementInit;
    document.body.appendChild(xdiv);
    document.head.appendChild(xcss);
  }else{
    // 其他
  };
})()
