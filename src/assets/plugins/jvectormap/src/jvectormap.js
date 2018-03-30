var jvm={inherits:function(child,parent){function temp(){}
temp.prototype=parent.prototype;child.prototype=new temp();child.prototype.constructor=child;child.parentClass=parent;},mixin:function(target,source){var prop;for(prop in source.prototype){if(source.prototype.hasOwnProperty(prop)){target.prototype[prop]=source.prototype[prop];}}},min:function(values){var min=Number.MAX_VALUE,i;if(values instanceof Array){for(i=0;i<values.length;i++){if(values[i]<min){min=values[i];}}}else{for(i in values){if(values[i]<min){min=values[i];}}}
return min;},max:function(values){var max=Number.MIN_VALUE,i;if(values instanceof Array){for(i=0;i<values.length;i++){if(values[i]>max){max=values[i];}}}else{for(i in values){if(values[i]>max){max=values[i];}}}
return max;},keys:function(object){var keys=[],key;for(key in object){keys.push(key);}
return keys;},values:function(object){var values=[],key,i;for(i=0;i<arguments.length;i++){object=arguments[i];for(key in object){values.push(object[key]);}}
return values;},whenImageLoaded:function(url){var deferred=new jvm.$.Deferred(),img=jvm.$('<img/>');img.error(function(){deferred.reject();}).load(function(){deferred.resolve(img);});img.attr('src',url);return deferred;},isImageUrl:function(s){return/\.\w{3,4}$/.test(s);}};jvm.$=jQuery;if(!Array.prototype.indexOf){Array.prototype.indexOf=function(searchElement,fromIndex){var k;if(this==null){throw new TypeError('"this" is null or not defined');}
var O=Object(this);var len=O.length>>>0;if(len===0){return-1;}
var n=+fromIndex||0;if(Math.abs(n)===Infinity){n=0;}
if(n>=len){return-1;}
k=Math.max(n>=0?n:len- Math.abs(n),0);while(k<len){if(k in O&&O[k]===searchElement){return k;}
k++;}
return-1;};}