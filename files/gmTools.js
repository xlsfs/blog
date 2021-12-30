/*
document.body.appendChild(document.createElement("script")).src = "//172.16.1.160/gmTools.js?"+Math.random();
*/

function __gm__() {
	var mouseX, mouseY, objX, objY, isDowm = false;
	var mainDom = document.getElementById("gmDiv");
	if(!mainDom) {
		mainDom = getMainDom();

		var option = [
			{
				txt:"关闭", 
				click:function(){
					mainDom.remove()
				}
			},
			
			{
				txt:"测试隐藏", 
				click:function(){
					alert("a");
				},
				disable:true
			},
			
			{
				txt:"下吊消失", 
				click:function(){
					let floors = _dg.floorMgr._floors;
					for(var i = 0; i < floors.length; i++) {
						floors[i].roof.drawCeiling.isSideFace=false;
						floors[i].roof.drawCeiling.areas.forEach((area)=>{
							area.isSideFace=false;
						});
					}
				}
			},
			
			{
				txt:"墙地板吊顶保存失效", 
				click:function(){
					let floors = _dg.floorMgr._floors;
					for(var i = 0; i < floors.length; i++) {
						if(floors[i].roof) {
							floors[i].roof.drawCeiling.storingAttributes.lineGroup = undefined;
						}
						if(floors[i].floor) {
							floors[i].floor.drawCeiling.storingAttributes.lineGroup = undefined;
						}
					}
					let faces = [..._dg.faceMgr._crossFaces];
					for(var i = 0; i < faces.length; i++) {
						if(faces[i].roomWall) {
							faces[i].roomWall.drawCeiling.storingAttributes.lineGroup = undefined;
						}
					}
				}
			},
			
			{
				txt:"加载死循环临时处理", 
				click:function(){
					var dd =_dg.poolMgr.poolDict["ObjectDrawCeiling"].creeatorFunc();
					if(!window.saveSetUp222) {
						window.saveSetUp222 = dd.constructor.prototype.setUp222;
					}
					dd.constructor.prototype.setUp222 = function(areaInfo){
						this.setupFromWalls(areaInfo);
					}
					dd.recover2pool();
					alert("点击此按钮后加载方案，加载完成后点击【加载后墙面消失临时处理】，然后保存方案，刷新网页再进行其他操作")
				}
			},
			
			{
				txt:"加载后墙面消失临时处理", 
				click:function(){
					var floors = _dg.floorMgr._floors;
					for(var i = 0; i < floors.length; i++) {
						if(floors[i].roof && floors[i].roof.drawCeiling) {
							floors[i].roof.drawCeiling.visible = true;
						}
						if(floors[i].floor && floors[i].floor.drawCeiling) {
							floors[i].floor.drawCeiling.visible = true;
						}
					}
					var faces = [..._dg.faceMgr._crossFaces];
					for(var i = 0; i < faces.length; i++) {
						if(faces[i].roomWall && faces[i].roomWall.drawCeiling) {
							faces[i].roomWall.drawCeiling.visible=true
						}
					}
				}
			},
			
			{
				txt:"重置所有吊顶", 
				click:function(){
					var floors = _dg.floorMgr._floors;
					for(var i = 0; i < floors.length; i++) {
						if(floors[i].roof && floors[i].roof.drawCeiling) {
							floors[i].roof.drawCeiling.setupFromWalls(floors[i].roof.areaInfo);
						}
					}
				}
			},
			
			{
				txt:"恢复门", 
				click:function(){
					var darr = []
					for(var i = 0; i < _dg.main.scene.children.length; i++) {
						var d = _dg.main.scene.children[i];
						if(d.isObjectDoorOrWindow) {
							if(d.getHeight() < 1){
								d.setHeight(2200);
								d.setUpdate();
							}
						}
					}
				}
			},
			
		];
		
		for(var i = 0; i < option.length; i++) {
			if(!option[i] || option[i].disable===true) continue;
			var btn = document.createElement("Button");
			btn.textContent=option[i].txt;
			btn.onclick = option[i].click
			mainDom.appendChild(btn);
		}
		
		document.body.appendChild(mainDom);
	}

	console.log(mainDom);
	
	return;

	function getMainDom() {
		var mainDom = document.createElement("div");
		mainDom.id = "gmDiv";
		mainDom.onmousedown = function(){mouseDown(mainDom,event)};
		mainDom.onmousemove = function(){mouseMove(mainDom,event)};
		mainDom.onmouseup = function(){mouseUp(mainDom,event)};
		mainDom.style.backgroundColor= "#6ca7fa";
		mainDom.style.width= "300px";
		mainDom.style.height= "200px";
		mainDom.style.top= "100px";
		mainDom.style.left= "100px";
		mainDom.style.position= "absolute";
		mainDom.style.zIndex= "9999999";
		return mainDom;
	}

	function mouseDown(obj, e) {
		var div = obj;
		obj.style.cursor = "move";
		objX = div.offsetLeft;
		objY = div.offsetTop;
		mouseX = e.clientX;
		mouseY = e.clientY;
		isDowm = true;
	}
	function mouseMove(obj, e) {
		var div = obj;
		var x = e.clientX;
		var y = e.clientY;
		if (isDowm) {
			div.style.left = parseInt(objX) + parseInt(x) - parseInt(mouseX) + "px";
			div.style.top = parseInt(objY) + parseInt(y) - parseInt(mouseY) + "px";
		}
	}
	function mouseUp(obj, e) {
		if (isDowm) {
			var x = e.clientX;
			var y = e.clientY;
			var div = obj;
			div.style.left = parseInt(objX) + parseInt(x) - parseInt(mouseX) + "px";
			div.style.top = parseInt(objY) + parseInt(y) - parseInt(mouseY) + "px";
			div.style.cursor = "default";
			isDowm = false;
		}
	}
}
__gm__();
