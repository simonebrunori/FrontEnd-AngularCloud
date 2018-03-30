(function(factory){if(typeof define==='function'&&define.amd){define([],factory);}else if(typeof exports==='object'){module.exports=factory();}else{window.noUiSlider=factory();}}(function(){'use strict';function addNodeTo(target,className){var div=document.createElement('div');addClass(div,className);target.appendChild(div);return div;}
function unique(array){return array.filter(function(a){return!this[a]?this[a]=true:false;},{});}
function closest(value,to){return Math.round(value/to)*to;}
function offset(elem,orientation){var rect=elem.getBoundingClientRect(),doc=elem.ownerDocument,docElem=doc.documentElement,pageOffset=getPageOffset();if(/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)){pageOffset.x=0;}
return orientation?(rect.top+ pageOffset.y- docElem.clientTop):(rect.left+ pageOffset.x- docElem.clientLeft);}
function isNumeric(a){return typeof a==='number'&&!isNaN(a)&&isFinite(a);}
function addClassFor(element,className,duration){if(duration>0){addClass(element,className);setTimeout(function(){removeClass(element,className);},duration);}}
function limit(a){return Math.max(Math.min(a,100),0);}
function asArray(a){return Array.isArray(a)?a:[a];}
function countDecimals(numStr){numStr=String(numStr);var pieces=numStr.split(".");return pieces.length>1?pieces[1].length:0;}
function addClass(el,className){if(el.classList){el.classList.add(className);}else{el.className+=' '+ className;}}
function removeClass(el,className){if(el.classList){el.classList.remove(className);}else{el.className=el.className.replace(new RegExp('(^|\\b)'+ className.split(' ').join('|')+'(\\b|$)','gi'),' ');}}
function hasClass(el,className){return el.classList?el.classList.contains(className):new RegExp('\\b'+ className+'\\b').test(el.className);}
function getPageOffset(){var supportPageOffset=window.pageXOffset!==undefined,isCSS1Compat=((document.compatMode||"")==="CSS1Compat"),x=supportPageOffset?window.pageXOffset:isCSS1Compat?document.documentElement.scrollLeft:document.body.scrollLeft,y=supportPageOffset?window.pageYOffset:isCSS1Compat?document.documentElement.scrollTop:document.body.scrollTop;return{x:x,y:y};}
function getActions(){return window.navigator.pointerEnabled?{start:'pointerdown',move:'pointermove',end:'pointerup'}:window.navigator.msPointerEnabled?{start:'MSPointerDown',move:'MSPointerMove',end:'MSPointerUp'}:{start:'mousedown touchstart',move:'mousemove touchmove',end:'mouseup touchend'};}
function subRangeRatio(pa,pb){return(100/(pb- pa));}
function fromPercentage(range,value){return(value*100)/ ( range[1] - range[0] );}
function toPercentage(range,value){return fromPercentage(range,range[0]<0?value+ Math.abs(range[0]):value- range[0]);}
function isPercentage(range,value){return((value*(range[1]- range[0]))/ 100) + range[0];}
function getJ(value,arr){var j=1;while(value>=arr[j]){j+=1;}
return j;}
function toStepping(xVal,xPct,value){if(value>=xVal.slice(-1)[0]){return 100;}
var j=getJ(value,xVal),va,vb,pa,pb;va=xVal[j-1];vb=xVal[j];pa=xPct[j-1];pb=xPct[j];return pa+(toPercentage([va,vb],value)/ subRangeRatio (pa, pb));}
function fromStepping(xVal,xPct,value){if(value>=100){return xVal.slice(-1)[0];}
var j=getJ(value,xPct),va,vb,pa,pb;va=xVal[j-1];vb=xVal[j];pa=xPct[j-1];pb=xPct[j];return isPercentage([va,vb],(value- pa)*subRangeRatio(pa,pb));}
function getStep(xPct,xSteps,snap,value){if(value===100){return value;}
var j=getJ(value,xPct),a,b;if(snap){a=xPct[j-1];b=xPct[j];if((value- a)>((b-a)/2)){return b;}
return a;}
if(!xSteps[j-1]){return value;}
return xPct[j-1]+ closest(value- xPct[j-1],xSteps[j-1]);}
function handleEntryPoint(index,value,that){var percentage;if(typeof value==="number"){value=[value];}
if(Object.prototype.toString.call(value)!=='[object Array]'){throw new Error("noUiSlider: 'range' contains invalid value.");}
if(index==='min'){percentage=0;}else if(index==='max'){percentage=100;}else{percentage=parseFloat(index);}
if(!isNumeric(percentage)||!isNumeric(value[0])){throw new Error("noUiSlider: 'range' value isn't numeric.");}
that.xPct.push(percentage);that.xVal.push(value[0]);if(!percentage){if(!isNaN(value[1])){that.xSteps[0]=value[1];}}else{that.xSteps.push(isNaN(value[1])?false:value[1]);}
that.xHighestCompleteStep.push(0);}
function handleStepPoint(i,n,that){if(!n){return true;}
that.xSteps[i]=fromPercentage([that.xVal[i],that.xVal[i+1]],n)/ subRangeRatio (that.xPct[i],that.xPct[i+1]);var totalSteps=(that.xVal[i+1]- that.xVal[i])/ that.xNumSteps[i];var highestStep=Math.ceil(Number(totalSteps.toFixed(3))- 1);var step=that.xVal[i]+(that.xNumSteps[i]*highestStep);that.xHighestCompleteStep[i]=step;}
function Spectrum(entry,snap,direction,singleStep){this.xPct=[];this.xVal=[];this.xSteps=[singleStep||false];this.xNumSteps=[false];this.xHighestCompleteStep=[];this.snap=snap;this.direction=direction;var index,ordered=[];for(index in entry){if(entry.hasOwnProperty(index)){ordered.push([entry[index],index]);}}
if(ordered.length&&typeof ordered[0][0]==="object"){ordered.sort(function(a,b){return a[0][0]- b[0][0];});}else{ordered.sort(function(a,b){return a[0]- b[0];});}
for(index=0;index<ordered.length;index++){handleEntryPoint(ordered[index][1],ordered[index][0],this);}
this.xNumSteps=this.xSteps.slice(0);for(index=0;index<this.xNumSteps.length;index++){handleStepPoint(index,this.xNumSteps[index],this);}}
Spectrum.prototype.getMargin=function(value){var step=this.xNumSteps[0];if(step&&(value%step)){throw new Error("noUiSlider: 'limit' and 'margin' must be divisible by step.");}
return this.xPct.length===2?fromPercentage(this.xVal,value):false;};Spectrum.prototype.toStepping=function(value){value=toStepping(this.xVal,this.xPct,value);return value;};Spectrum.prototype.fromStepping=function(value){return fromStepping(this.xVal,this.xPct,value);};Spectrum.prototype.getStep=function(value){value=getStep(this.xPct,this.xSteps,this.snap,value);return value;};Spectrum.prototype.getNearbySteps=function(value){var j=getJ(value,this.xPct);return{stepBefore:{startValue:this.xVal[j-2],step:this.xNumSteps[j-2],highestStep:this.xHighestCompleteStep[j-2]},thisStep:{startValue:this.xVal[j-1],step:this.xNumSteps[j-1],highestStep:this.xHighestCompleteStep[j-1]},stepAfter:{startValue:this.xVal[j-0],step:this.xNumSteps[j-0],highestStep:this.xHighestCompleteStep[j-0]}};};Spectrum.prototype.countStepDecimals=function(){var stepDecimals=this.xNumSteps.map(countDecimals);return Math.max.apply(null,stepDecimals);};Spectrum.prototype.convert=function(value){return this.getStep(this.toStepping(value));};var defaultFormatter={'to':function(value){return value!==undefined&&value.toFixed(2);},'from':Number};function testStep(parsed,entry){if(!isNumeric(entry)){throw new Error("noUiSlider: 'step' is not numeric.");}
parsed.singleStep=entry;}
function testRange(parsed,entry){if(typeof entry!=='object'||Array.isArray(entry)){throw new Error("noUiSlider: 'range' is not an object.");}
if(entry.min===undefined||entry.max===undefined){throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");}
if(entry.min===entry.max){throw new Error("noUiSlider: 'range' 'min' and 'max' cannot be equal.");}
parsed.spectrum=new Spectrum(entry,parsed.snap,parsed.dir,parsed.singleStep);}
function testStart(parsed,entry){entry=asArray(entry);if(!Array.isArray(entry)||!entry.length){throw new Error("noUiSlider: 'start' option is incorrect.");}
parsed.handles=entry.length;parsed.start=entry;}
function testSnap(parsed,entry){parsed.snap=entry;if(typeof entry!=='boolean'){throw new Error("noUiSlider: 'snap' option must be a boolean.");}}
function testAnimate(parsed,entry){parsed.animate=entry;if(typeof entry!=='boolean'){throw new Error("noUiSlider: 'animate' option must be a boolean.");}}
function testAnimationDuration(parsed,entry){parsed.animationDuration=entry;if(typeof entry!=='number'){throw new Error("noUiSlider: 'animationDuration' option must be a number.");}}
function testConnect(parsed,entry){var connect=[false];var i;if(entry===true||entry===false){for(i=1;i<parsed.handles;i++){connect.push(entry);}
connect.push(false);}
else if(!Array.isArray(entry)||!entry.length||entry.length!==parsed.handles+ 1){throw new Error("noUiSlider: 'connect' option doesn't match handle count.");}
else{connect=entry;}
parsed.connect=connect;}
function testOrientation(parsed,entry){switch(entry){case'horizontal':parsed.ort=0;break;case'vertical':parsed.ort=1;break;default:throw new Error("noUiSlider: 'orientation' option is invalid.");}}
function testMargin(parsed,entry){if(!isNumeric(entry)){throw new Error("noUiSlider: 'margin' option must be numeric.");}
if(entry===0){return;}
parsed.margin=parsed.spectrum.getMargin(entry);if(!parsed.margin){throw new Error("noUiSlider: 'margin' option is only supported on linear sliders.");}}
function testLimit(parsed,entry){if(!isNumeric(entry)){throw new Error("noUiSlider: 'limit' option must be numeric.");}
parsed.limit=parsed.spectrum.getMargin(entry);if(!parsed.limit||parsed.handles<2){throw new Error("noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles.");}}
function testDirection(parsed,entry){switch(entry){case'ltr':parsed.dir=0;break;case'rtl':parsed.dir=1;break;default:throw new Error("noUiSlider: 'direction' option was not recognized.");}}
function testBehaviour(parsed,entry){if(typeof entry!=='string'){throw new Error("noUiSlider: 'behaviour' must be a string containing options.");}
var tap=entry.indexOf('tap')>=0;var drag=entry.indexOf('drag')>=0;var fixed=entry.indexOf('fixed')>=0;var snap=entry.indexOf('snap')>=0;var hover=entry.indexOf('hover')>=0;if(fixed){if(parsed.handles!==2){throw new Error("noUiSlider: 'fixed' behaviour must be used with 2 handles");}
testMargin(parsed,parsed.start[1]- parsed.start[0]);}
parsed.events={tap:tap||snap,drag:drag,fixed:fixed,snap:snap,hover:hover};}
function testTooltips(parsed,entry){if(entry===false){return;}
else if(entry===true){parsed.tooltips=[];for(var i=0;i<parsed.handles;i++){parsed.tooltips.push(true);}}
else{parsed.tooltips=asArray(entry);if(parsed.tooltips.length!==parsed.handles){throw new Error("noUiSlider: must pass a formatter for all handles.");}
parsed.tooltips.forEach(function(formatter){if(typeof formatter!=='boolean'&&(typeof formatter!=='object'||typeof formatter.to!=='function')){throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.");}});}}
function testFormat(parsed,entry){parsed.format=entry;if(typeof entry.to==='function'&&typeof entry.from==='function'){return true;}
throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.");}
function testCssPrefix(parsed,entry){if(entry!==undefined&&typeof entry!=='string'&&entry!==false){throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.");}
parsed.cssPrefix=entry;}
function testCssClasses(parsed,entry){if(entry!==undefined&&typeof entry!=='object'){throw new Error("noUiSlider: 'cssClasses' must be an object.");}
if(typeof parsed.cssPrefix==='string'){parsed.cssClasses={};for(var key in entry){if(!entry.hasOwnProperty(key)){continue;}
parsed.cssClasses[key]=parsed.cssPrefix+ entry[key];}}else{parsed.cssClasses=entry;}}
function testUseRaf(parsed,entry){if(entry===true||entry===false){parsed.useRequestAnimationFrame=entry;}else{throw new Error("noUiSlider: 'useRequestAnimationFrame' option should be true (default) or false.");}}
function testOptions(options){var parsed={margin:0,limit:0,animate:true,animationDuration:300,format:defaultFormatter},tests;tests={'step':{r:false,t:testStep},'start':{r:true,t:testStart},'connect':{r:true,t:testConnect},'direction':{r:true,t:testDirection},'snap':{r:false,t:testSnap},'animate':{r:false,t:testAnimate},'animationDuration':{r:false,t:testAnimationDuration},'range':{r:true,t:testRange},'orientation':{r:false,t:testOrientation},'margin':{r:false,t:testMargin},'limit':{r:false,t:testLimit},'behaviour':{r:true,t:testBehaviour},'format':{r:false,t:testFormat},'tooltips':{r:false,t:testTooltips},'cssPrefix':{r:false,t:testCssPrefix},'cssClasses':{r:false,t:testCssClasses},'useRequestAnimationFrame':{r:false,t:testUseRaf}};var defaults={'connect':false,'direction':'ltr','behaviour':'tap','orientation':'horizontal','cssPrefix':'noUi-','cssClasses':{target:'target',base:'base',origin:'origin',handle:'handle',horizontal:'horizontal',vertical:'vertical',background:'background',connect:'connect',ltr:'ltr',rtl:'rtl',draggable:'draggable',drag:'state-drag',tap:'state-tap',active:'active',tooltip:'tooltip',pips:'pips',pipsHorizontal:'pips-horizontal',pipsVertical:'pips-vertical',marker:'marker',markerHorizontal:'marker-horizontal',markerVertical:'marker-vertical',markerNormal:'marker-normal',markerLarge:'marker-large',markerSub:'marker-sub',value:'value',valueHorizontal:'value-horizontal',valueVertical:'value-vertical',valueNormal:'value-normal',valueLarge:'value-large',valueSub:'value-sub'},'useRequestAnimationFrame':true};Object.keys(tests).forEach(function(name){if(options[name]===undefined&&defaults[name]===undefined){if(tests[name].r){throw new Error("noUiSlider: '"+ name+"' is required.");}
return true;}
tests[name].t(parsed,options[name]===undefined?defaults[name]:options[name]);});parsed.pips=options.pips;var styles=[['left','top'],['right','bottom']];parsed.style=styles[parsed.dir][parsed.ort];parsed.styleOposite=styles[parsed.dir?0:1][parsed.ort];return parsed;}
function closure(target,options,originalOptions){var actions=getActions();var scope_Target=target;var scope_Locations=[];var scope_Base;var scope_Handles;var scope_HandleNumbers=[];var scope_Connects;var scope_Spectrum=options.spectrum;var scope_Values=[];var scope_Events={};var scope_Self;function addOrigin(base,handleNumber){var origin=addNodeTo(base,options.cssClasses.origin);var handle=addNodeTo(origin,options.cssClasses.handle);handle.setAttribute('data-handle',handleNumber);return origin;}
function addConnect(base,add){if(!add){return false;}
return addNodeTo(base,options.cssClasses.connect);}
function addElements(connectOptions,base){scope_Handles=[];scope_Connects=[];scope_Connects.push(addConnect(base,connectOptions[0]));for(var i=0;i<options.handles;i++){scope_Handles.push(addOrigin(base,i));scope_HandleNumbers[i]=i;scope_Connects.push(addConnect(base,connectOptions[i+ 1]));}}
function addSlider(target){addClass(target,options.cssClasses.target);if(options.dir===0){addClass(target,options.cssClasses.ltr);}else{addClass(target,options.cssClasses.rtl);}
if(options.ort===0){addClass(target,options.cssClasses.horizontal);}else{addClass(target,options.cssClasses.vertical);}
scope_Base=addNodeTo(target,options.cssClasses.base);}
function addTooltip(handle,handleNumber){if(!options.tooltips[handleNumber]){return false;}
return addNodeTo(handle.firstChild,options.cssClasses.tooltip);}
function tooltips(){var tips=scope_Handles.map(addTooltip);bindEvent('update',function(values,handleNumber,unencoded){if(!tips[handleNumber]){return;}
var formattedValue=values[handleNumber];if(options.tooltips[handleNumber]!==true){formattedValue=options.tooltips[handleNumber].to(unencoded[handleNumber]);}
tips[handleNumber].innerHTML=formattedValue;});}
function getGroup(mode,values,stepped){if(mode==='range'||mode==='steps'){return scope_Spectrum.xVal;}
if(mode==='count'){var spread=(100/(values-1)),v,i=0;values=[];while((v=i++*spread)<=100){values.push(v);}
mode='positions';}
if(mode==='positions'){return values.map(function(value){return scope_Spectrum.fromStepping(stepped?scope_Spectrum.getStep(value):value);});}
if(mode==='values'){if(stepped){return values.map(function(value){return scope_Spectrum.fromStepping(scope_Spectrum.getStep(scope_Spectrum.toStepping(value)));});}
return values;}}
function generateSpread(density,mode,group){function safeIncrement(value,increment){return(value+ increment).toFixed(7)/ 1;}
var indexes={},firstInRange=scope_Spectrum.xVal[0],lastInRange=scope_Spectrum.xVal[scope_Spectrum.xVal.length-1],ignoreFirst=false,ignoreLast=false,prevPct=0;group=unique(group.slice().sort(function(a,b){return a- b;}));if(group[0]!==firstInRange){group.unshift(firstInRange);ignoreFirst=true;}
if(group[group.length- 1]!==lastInRange){group.push(lastInRange);ignoreLast=true;}
group.forEach(function(current,index){var step,i,q,low=current,high=group[index+1],newPct,pctDifference,pctPos,type,steps,realSteps,stepsize;if(mode==='steps'){step=scope_Spectrum.xNumSteps[index];}
if(!step){step=high-low;}
if(low===false||high===undefined){return;}
step=Math.max(step,0.0000001);for(i=low;i<=high;i=safeIncrement(i,step)){newPct=scope_Spectrum.toStepping(i);pctDifference=newPct- prevPct;steps=pctDifference/density;realSteps=Math.round(steps);stepsize=pctDifference/realSteps;for(q=1;q<=realSteps;q+=1){pctPos=prevPct+(q*stepsize);indexes[pctPos.toFixed(5)]=['x',0];}
type=(group.indexOf(i)>-1)?1:(mode==='steps'?2:0);if(!index&&ignoreFirst){type=0;}
if(!(i===high&&ignoreLast)){indexes[newPct.toFixed(5)]=[i,type];}
prevPct=newPct;}});return indexes;}
function addMarking(spread,filterFunc,formatter){var element=document.createElement('div'),out='',valueSizeClasses=[options.cssClasses.valueNormal,options.cssClasses.valueLarge,options.cssClasses.valueSub],markerSizeClasses=[options.cssClasses.markerNormal,options.cssClasses.markerLarge,options.cssClasses.markerSub],valueOrientationClasses=[options.cssClasses.valueHorizontal,options.cssClasses.valueVertical],markerOrientationClasses=[options.cssClasses.markerHorizontal,options.cssClasses.markerVertical];addClass(element,options.cssClasses.pips);addClass(element,options.ort===0?options.cssClasses.pipsHorizontal:options.cssClasses.pipsVertical);function getClasses(type,source){var a=source===options.cssClasses.value,orientationClasses=a?valueOrientationClasses:markerOrientationClasses,sizeClasses=a?valueSizeClasses:markerSizeClasses;return source+' '+ orientationClasses[options.ort]+' '+ sizeClasses[type];}
function getTags(offset,source,values){return'class="'+ getClasses(values[1],source)+'" style="'+ options.style+': '+ offset+'%"';}
function addSpread(offset,values){values[1]=(values[1]&&filterFunc)?filterFunc(values[0],values[1]):values[1];out+='<div '+ getTags(offset,options.cssClasses.marker,values)+'></div>';if(values[1]){out+='<div '+ getTags(offset,options.cssClasses.value,values)+'>'+ formatter.to(values[0])+'</div>';}}
Object.keys(spread).forEach(function(a){addSpread(a,spread[a]);});element.innerHTML=out;return element;}
function pips(grid){var mode=grid.mode,density=grid.density||1,filter=grid.filter||false,values=grid.values||false,stepped=grid.stepped||false,group=getGroup(mode,values,stepped),spread=generateSpread(density,mode,group),format=grid.format||{to:Math.round};return scope_Target.appendChild(addMarking(spread,filter,format));}
function baseSize(){var rect=scope_Base.getBoundingClientRect(),alt='offset'+['Width','Height'][options.ort];return options.ort===0?(rect.width||scope_Base[alt]):(rect.height||scope_Base[alt]);}
function attachEvent(events,element,callback,data){var method=function(e){if(scope_Target.hasAttribute('disabled')){return false;}
if(hasClass(scope_Target,options.cssClasses.tap)){return false;}
e=fixEvent(e,data.pageOffset);if(events===actions.start&&e.buttons!==undefined&&e.buttons>1){return false;}
if(data.hover&&e.buttons){return false;}
e.calcPoint=e.points[options.ort];callback(e,data);};var methods=[];events.split(' ').forEach(function(eventName){element.addEventListener(eventName,method,false);methods.push([eventName,method]);});return methods;}
function fixEvent(e,pageOffset){e.preventDefault();var touch=e.type.indexOf('touch')===0,mouse=e.type.indexOf('mouse')===0,pointer=e.type.indexOf('pointer')===0,x,y,event=e;if(e.type.indexOf('MSPointer')===0){pointer=true;}
if(touch){if(event.touches.length>1){return false;}
x=e.changedTouches[0].pageX;y=e.changedTouches[0].pageY;}
pageOffset=pageOffset||getPageOffset();if(mouse||pointer){x=e.clientX+ pageOffset.x;y=e.clientY+ pageOffset.y;}
event.pageOffset=pageOffset;event.points=[x,y];event.cursor=mouse||pointer;return event;}
function calcPointToPercentage(calcPoint){var location=calcPoint- offset(scope_Base,options.ort);var proposal=(location*100)/ baseSize();return options.dir?100- proposal:proposal;}
function getClosestHandle(proposal){var closest=100;var handleNumber=false;scope_Handles.forEach(function(handle,index){if(handle.hasAttribute('disabled')){return;}
var pos=Math.abs(scope_Locations[index]- proposal);if(pos<closest){handleNumber=index;closest=pos;}});return handleNumber;}
function moveHandles(upward,proposal,locations,handleNumbers){var proposals=locations.slice();var b=[!upward,upward];var f=[upward,!upward];handleNumbers=handleNumbers.slice();if(upward){handleNumbers.reverse();}
if(handleNumbers.length>1){handleNumbers.forEach(function(handleNumber,o){var to=checkHandlePosition(proposals,handleNumber,proposals[handleNumber]+ proposal,b[o],f[o]);if(to===false){proposal=0;}else{proposal=to- proposals[handleNumber];proposals[handleNumber]=to;}});}
else{b=f=[true];}
var state=false;handleNumbers.forEach(function(handleNumber,o){state=setHandle(handleNumber,locations[handleNumber]+ proposal,b[o],f[o])||state;});if(state){handleNumbers.forEach(function(handleNumber){fireEvent('update',handleNumber);fireEvent('slide',handleNumber);});}}
function fireEvent(eventName,handleNumber,tap){Object.keys(scope_Events).forEach(function(targetEvent){var eventType=targetEvent.split('.')[0];if(eventName===eventType){scope_Events[targetEvent].forEach(function(callback){callback.call(scope_Self,scope_Values.map(options.format.to),handleNumber,scope_Values.slice(),tap||false,scope_Locations.slice());});}});}
function documentLeave(event,data){if(event.type==="mouseout"&&event.target.nodeName==="HTML"&&event.relatedTarget===null){eventEnd(event,data);}}
function eventMove(event,data){if(navigator.appVersion.indexOf("MSIE 9")===-1&&event.buttons===0&&data.buttonsProperty!==0){return eventEnd(event,data);}
var movement=(options.dir?-1:1)*(event.calcPoint- data.startCalcPoint);var proposal=(movement*100)/ data.baseSize;moveHandles(movement>0,proposal,data.locations,data.handleNumbers);}
function eventEnd(event,data){var active=scope_Base.querySelector('.'+ options.cssClasses.active);if(active!==null){removeClass(active,options.cssClasses.active);}
if(event.cursor){document.body.style.cursor='';document.body.removeEventListener('selectstart',document.body.noUiListener);}
document.documentElement.noUiListeners.forEach(function(c){document.documentElement.removeEventListener(c[0],c[1]);});removeClass(scope_Target,options.cssClasses.drag);setZindex();data.handleNumbers.forEach(function(handleNumber){fireEvent('set',handleNumber);fireEvent('change',handleNumber);fireEvent('end',handleNumber);});}
function eventStart(event,data){if(data.handleNumbers.length===1){var handle=scope_Handles[data.handleNumbers[0]];if(handle.hasAttribute('disabled')){return false;}
addClass(handle.children[0],options.cssClasses.active);}
event.preventDefault();event.stopPropagation();var moveEvent=attachEvent(actions.move,document.documentElement,eventMove,{startCalcPoint:event.calcPoint,baseSize:baseSize(),pageOffset:event.pageOffset,handleNumbers:data.handleNumbers,buttonsProperty:event.buttons,locations:scope_Locations.slice()});var endEvent=attachEvent(actions.end,document.documentElement,eventEnd,{handleNumbers:data.handleNumbers});var outEvent=attachEvent("mouseout",document.documentElement,documentLeave,{handleNumbers:data.handleNumbers});document.documentElement.noUiListeners=moveEvent.concat(endEvent,outEvent);if(event.cursor){document.body.style.cursor=getComputedStyle(event.target).cursor;if(scope_Handles.length>1){addClass(scope_Target,options.cssClasses.drag);}
var f=function(){return false;};document.body.noUiListener=f;document.body.addEventListener('selectstart',f,false);}
data.handleNumbers.forEach(function(handleNumber){fireEvent('start',handleNumber);});}
function eventTap(event){event.stopPropagation();var proposal=calcPointToPercentage(event.calcPoint);var handleNumber=getClosestHandle(proposal);if(handleNumber===false){return false;}
if(!options.events.snap){addClassFor(scope_Target,options.cssClasses.tap,options.animationDuration);}
setHandle(handleNumber,proposal,true,true);setZindex();fireEvent('slide',handleNumber,true);fireEvent('set',handleNumber,true);fireEvent('change',handleNumber,true);fireEvent('update',handleNumber,true);if(options.events.snap){eventStart(event,{handleNumbers:[handleNumber]});}}
function eventHover(event){var proposal=calcPointToPercentage(event.calcPoint);var to=scope_Spectrum.getStep(proposal);var value=scope_Spectrum.fromStepping(to);Object.keys(scope_Events).forEach(function(targetEvent){if('hover'===targetEvent.split('.')[0]){scope_Events[targetEvent].forEach(function(callback){callback.call(scope_Self,value);});}});}
function bindSliderEvents(behaviour){if(!behaviour.fixed){scope_Handles.forEach(function(handle,index){attachEvent(actions.start,handle.children[0],eventStart,{handleNumbers:[index]});});}
if(behaviour.tap){attachEvent(actions.start,scope_Base,eventTap,{});}
if(behaviour.hover){attachEvent(actions.move,scope_Base,eventHover,{hover:true});}
if(behaviour.drag){scope_Connects.forEach(function(connect,index){if(connect===false||index===0||index===scope_Connects.length- 1){return;}
var handleBefore=scope_Handles[index- 1];var handleAfter=scope_Handles[index];var eventHolders=[connect];addClass(connect,options.cssClasses.draggable);if(behaviour.fixed){eventHolders.push(handleBefore.children[0]);eventHolders.push(handleAfter.children[0]);}
eventHolders.forEach(function(eventHolder){attachEvent(actions.start,eventHolder,eventStart,{handles:[handleBefore,handleAfter],handleNumbers:[index- 1,index]});});});}}
function checkHandlePosition(reference,handleNumber,to,lookBackward,lookForward){if(scope_Handles.length>1){if(lookBackward&&handleNumber>0){to=Math.max(to,reference[handleNumber- 1]+ options.margin);}
if(lookForward&&handleNumber<scope_Handles.length- 1){to=Math.min(to,reference[handleNumber+ 1]- options.margin);}}
if(scope_Handles.length>1&&options.limit){if(lookBackward&&handleNumber>0){to=Math.min(to,reference[handleNumber- 1]+ options.limit);}
if(lookForward&&handleNumber<scope_Handles.length- 1){to=Math.max(to,reference[handleNumber+ 1]- options.limit);}}
to=scope_Spectrum.getStep(to);to=limit(to);if(to===reference[handleNumber]){return false;}
return to;}
function toPct(pct){return pct+'%';}
function updateHandlePosition(handleNumber,to){scope_Locations[handleNumber]=to;scope_Values[handleNumber]=scope_Spectrum.fromStepping(to);var stateUpdate=function(){scope_Handles[handleNumber].style[options.style]=toPct(to);updateConnect(handleNumber);updateConnect(handleNumber+ 1);};if(window.requestAnimationFrame&&options.useRequestAnimationFrame){window.requestAnimationFrame(stateUpdate);}else{stateUpdate();}}
function setZindex(){scope_HandleNumbers.forEach(function(handleNumber){var dir=(scope_Locations[handleNumber]>50?-1:1);var zIndex=3+(scope_Handles.length+(dir*handleNumber));scope_Handles[handleNumber].childNodes[0].style.zIndex=zIndex;});}
function setHandle(handleNumber,to,lookBackward,lookForward){to=checkHandlePosition(scope_Locations,handleNumber,to,lookBackward,lookForward);if(to===false){return false;}
updateHandlePosition(handleNumber,to);return true;}
function updateConnect(index){if(!scope_Connects[index]){return;}
var l=0;var h=100;if(index!==0){l=scope_Locations[index- 1];}
if(index!==scope_Connects.length- 1){h=scope_Locations[index];}
scope_Connects[index].style[options.style]=toPct(l);scope_Connects[index].style[options.styleOposite]=toPct(100- h);}
function setValue(to,handleNumber){if(to===null||to===false){return;}
if(typeof to==='number'){to=String(to);}
to=options.format.from(to);if(to!==false&&!isNaN(to)){setHandle(handleNumber,scope_Spectrum.toStepping(to),false,false);}}
function valueSet(input,fireSetEvent){var values=asArray(input);var isInit=scope_Locations[0]===undefined;fireSetEvent=(fireSetEvent===undefined?true:!!fireSetEvent);values.forEach(setValue);if(options.animate&&!isInit){addClassFor(scope_Target,options.cssClasses.tap,options.animationDuration);}
scope_HandleNumbers.forEach(function(handleNumber){setHandle(handleNumber,scope_Locations[handleNumber],true,false);});setZindex();scope_HandleNumbers.forEach(function(handleNumber){fireEvent('update',handleNumber);if(values[handleNumber]!==null&&fireSetEvent){fireEvent('set',handleNumber);}});}
function valueReset(fireSetEvent){valueSet(options.start,fireSetEvent);}
function valueGet(){var values=scope_Values.map(options.format.to);if(values.length===1){return values[0];}
return values;}
function destroy(){for(var key in options.cssClasses){if(!options.cssClasses.hasOwnProperty(key)){continue;}
removeClass(scope_Target,options.cssClasses[key]);}
while(scope_Target.firstChild){scope_Target.removeChild(scope_Target.firstChild);}
delete scope_Target.noUiSlider;}
function getCurrentStep(){return scope_Locations.map(function(location,index){var nearbySteps=scope_Spectrum.getNearbySteps(location);var value=scope_Values[index];var increment=nearbySteps.thisStep.step;var decrement=null;if(increment!==false){if(value+ increment>nearbySteps.stepAfter.startValue){increment=nearbySteps.stepAfter.startValue- value;}}
if(value>nearbySteps.thisStep.startValue){decrement=nearbySteps.thisStep.step;}
else if(nearbySteps.stepBefore.step===false){decrement=false;}
else{decrement=value- nearbySteps.stepBefore.highestStep;}
if(location===100){increment=null;}
else if(location===0){decrement=null;}
var stepDecimals=scope_Spectrum.countStepDecimals();if(increment!==null&&increment!==false){increment=Number(increment.toFixed(stepDecimals));}
if(decrement!==null&&decrement!==false){decrement=Number(decrement.toFixed(stepDecimals));}
return[decrement,increment];});}
function bindEvent(namespacedEvent,callback){scope_Events[namespacedEvent]=scope_Events[namespacedEvent]||[];scope_Events[namespacedEvent].push(callback);if(namespacedEvent.split('.')[0]==='update'){scope_Handles.forEach(function(a,index){fireEvent('update',index);});}}
function removeEvent(namespacedEvent){var event=namespacedEvent&&namespacedEvent.split('.')[0],namespace=event&&namespacedEvent.substring(event.length);Object.keys(scope_Events).forEach(function(bind){var tEvent=bind.split('.')[0],tNamespace=bind.substring(tEvent.length);if((!event||event===tEvent)&&(!namespace||namespace===tNamespace)){delete scope_Events[bind];}});}
function updateOptions(optionsToUpdate,fireSetEvent){var v=valueGet();var updateAble=['margin','limit','range','animate','snap','step','format'];updateAble.forEach(function(name){if(optionsToUpdate[name]!==undefined){originalOptions[name]=optionsToUpdate[name];}});var newOptions=testOptions(originalOptions);updateAble.forEach(function(name){if(optionsToUpdate[name]!==undefined){options[name]=newOptions[name];}});newOptions.spectrum.direction=scope_Spectrum.direction;scope_Spectrum=newOptions.spectrum;options.margin=newOptions.margin;options.limit=newOptions.limit;scope_Locations=[];valueSet(optionsToUpdate.start||v,fireSetEvent);}
if(scope_Target.noUiSlider){throw new Error('Slider was already initialized.');}
addSlider(scope_Target);addElements(options.connect,scope_Base);scope_Self={destroy:destroy,steps:getCurrentStep,on:bindEvent,off:removeEvent,get:valueGet,set:valueSet,reset:valueReset,__moveHandles:function(a,b,c){moveHandles(a,b,scope_Locations,c);},options:originalOptions,updateOptions:updateOptions,target:scope_Target,pips:pips};bindSliderEvents(options.events);valueSet(options.start);if(options.pips){pips(options.pips);}
if(options.tooltips){tooltips();}
return scope_Self;}
function initialize(target,originalOptions){if(!target.nodeName){throw new Error('noUiSlider.create requires a single element.');}
var options=testOptions(originalOptions,target);var api=closure(target,options,originalOptions);target.noUiSlider=api;return api;}
return{create:initialize};}));