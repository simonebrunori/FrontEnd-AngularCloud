jvm.AbstractShapeElement=function(name,config,style){this.style=style||{};this.style.current=this.style.current||{};this.isHovered=false;this.isSelected=false;this.updateStyle();};jvm.AbstractShapeElement.prototype.setStyle=function(property,value){var styles={};if(typeof property==='object'){styles=property;}else{styles[property]=value;}
jvm.$.extend(this.style.current,styles);this.updateStyle();};jvm.AbstractShapeElement.prototype.updateStyle=function(){var attrs={};jvm.AbstractShapeElement.mergeStyles(attrs,this.style.initial);jvm.AbstractShapeElement.mergeStyles(attrs,this.style.current);if(this.isHovered){jvm.AbstractShapeElement.mergeStyles(attrs,this.style.hover);}
if(this.isSelected){jvm.AbstractShapeElement.mergeStyles(attrs,this.style.selected);if(this.isHovered){jvm.AbstractShapeElement.mergeStyles(attrs,this.style.selectedHover);}}
this.set(attrs);};jvm.AbstractShapeElement.mergeStyles=function(styles,newStyles){var key;newStyles=newStyles||{};for(key in newStyles){if(newStyles[key]===null){delete styles[key];}else{styles[key]=newStyles[key];}}}