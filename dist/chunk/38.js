"use strict";(self.webpackJsonp=self.webpackJsonp||[]).push([[38],{"6589":function(n,e,t){t.r(e),t.d(e,{"taro_rich_text_core":function(){return u}});var i=t(1002),o=t(4933),u=function(){function r(n){var e=this;(0,o.r)(this,n),this.renderNode=function(n){if("type"in n&&"text"===n.type)return(n.text||"").replace(/&nbsp;/g," ");if("name"in n&&n.name){var t=n.name,u=n.attrs,a=n.children,c={},s=[];if(u&&"object"===(0,i.Z)(u)){var p=function f(n){var e=u[n];if("style"===n&&"string"==typeof e){var t=e.split(";").map((function(n){return n.trim()})).filter((function(n){return n})),i={};return t.forEach((function(n){if(n){var e=/(.+): *(.+)/g.exec(n);if(e){var t=e[1],o=e[2],u=t.replace(/-([a-z])/g,(function(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];return n[1].toUpperCase()}));i[u]=o}}})),Object.keys(i).length&&(c.style=i),"continue"}c[n]=e};for(var l in u)p(l)}return a&&a.length&&(s=a.map((function(n){return e.renderNode(n)}))),(0,o.h)(t,c,s)}return null}}return r.prototype.render=function(){var n=this.nodes,e=this.renderNode;return Array.isArray(n)?(0,o.h)(o.H,null,n.map((function(n){return e(n)}))):(0,o.h)(o.H,{"innerHTML":n})},r}()}}]);