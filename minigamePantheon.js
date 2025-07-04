var M={};
M.parent=Game.Objects['Temple'];
M.parent.minigame=M;
M.launch=function()
{
	var M=this;
	M.name=M.parent.minigameName;
	M.init=function(div)
	{
		//populate div with html and initialize values
		
		M.gods={
			'asceticism':{
				name:'Holobore, Spirit of Asceticism',
				icon:[21,18],
				desc1:'<span class="green">'+loc("+%1% base CpS.",15)+'</span>',
				desc2:'<span class="green">'+loc("+%1% base CpS.",10)+'</span>',
				desc3:'<span class="green">'+loc("+%1% base CpS.",5)+'</span>',
				descAfter:'<span class="red">'+loc("If a golden cookie is clicked, this spirit is unslotted and all worship swaps will be used up.")+'</span>',
				quote:'An immortal life spent focusing on the inner self, away from the distractions of material wealth.',
			},
			'decadence':{
				name:'Vomitrax, Spirit of Decadence',
				icon:[22,18],
				desc1:'<span class="green">'+loc("Golden and wrath cookie effect duration +%1%.",7)+'</span> <span class="red">'+loc("Buildings grant -%1% CpS.",7)+'</span>',
				desc2:'<span class="green">'+loc("Golden and wrath cookie effect duration +%1%.",5)+'</span> <span class="red">'+loc("Buildings grant -%1% CpS.",5)+'</span>',
				desc3:'<span class="green">'+loc("Golden and wrath cookie effect duration +%1%.",2)+'</span> <span class="red">'+loc("Buildings grant -%1% CpS.",2)+'</span>',
				quote:'This sleazy spirit revels in the lust for quick easy gain and contempt for the value of steady work.',
			},
			'ruin':{
				name:'Godzamok, Spirit of Ruin',
				icon:[23,18],
				descBefore:'<span class="green">'+loc("Selling buildings triggers a buff boosted by how many buildings were sold.")+'</span>',
				desc1:'<span class="green">'+loc("Buff boosts clicks by +%1% for every building sold for %2 seconds.",[1,10])+'</span>',
				desc2:'<span class="green">'+loc("Buff boosts clicks by +%1% for every building sold for %2 seconds.",[0.5,10])+'</span>',
				desc3:'<span class="green">'+loc("Buff boosts clicks by +%1% for every building sold for %2 seconds.",[0.25,10])+'</span>',
				quote:'The embodiment of natural disasters. An impenetrable motive drives the devastation caused by this spirit.',
			},
			'ages':{
				name:'Cyclius, Spirit of Ages',
				icon:[24,18],
				activeDescFunc:function()
				{
					var godLvl=Game.hasGod('ages');
					var mult=1;
					if (godLvl==1) mult*=0.15*Math.sin((Date.now()/1000/(60*60*3))*Math.PI*2);
					else if (godLvl==2) mult*=0.15*Math.sin((Date.now()/1000/(60*60*12))*Math.PI*2);
					else if (godLvl==3) mult*=0.15*Math.sin((Date.now()/1000/(60*60*24))*Math.PI*2);
					return loc("Current bonus:")+' '+(mult<0?'-':'+')+Beautify(Math.abs(mult)*100,2)+'%';
				},
				descBefore:loc("CpS bonus fluctuating between %1 and %2 over time.",['<span class="green">+15%</span>','<span class="red">-15%</span>']),
				desc1:loc("Effect cycles over %1 hours.",3),
				desc2:loc("Effect cycles over %1 hours.",12),
				desc3:loc("Effect cycles over %1 hours.",24),
				quote:'This spirit knows about everything you\'ll ever do, and enjoys dispensing a harsh judgment.',
			},
			'seasons':{
				name:'Selebrak, Spirit of Festivities',
				icon:[25,18],
				descBefore:'<span class="green">'+loc("Some seasonal effects are boosted.")+'</span>',
				desc1:'<span class="green">'+loc("Large boost.")+'</span> <span class="red">'+loc("Switching seasons is %1% pricier.",100)+'</span>',
				desc2:'<span class="green">'+loc("Medium boost.")+'</span> <span class="red">'+loc("Switching seasons is %1% pricier.",50)+'</span>',
				desc3:'<span class="green">'+loc("Small boost.")+'</span> <span class="red">'+loc("Switching seasons is %1% pricier.",25)+'</span>',
				quote:'This is the spirit of merry getaways and regretful Monday mornings.',
			},
			'creation':{
				name:'Dotjeiess, Spirit of Creation',
				icon:[26,18],
				desc1:'<span class="green">'+loc("All buildings are <b>%1% cheaper</b>.",7)+'</span> <span class="red">'+loc("Heavenly chips have %1% less effect.",30)+'</span>',
				desc2:'<span class="green">'+loc("All buildings are <b>%1% cheaper</b>.",5)+'</span> <span class="red">'+loc("Heavenly chips have %1% less effect.",20)+'</span>',
				desc3:'<span class="green">'+loc("All buildings are <b>%1% cheaper</b>.",2)+'</span> <span class="red">'+loc("Heavenly chips have %1% less effect.",10)+'</span>',
				quote:'All things that be and ever will be were scripted long ago by this spirit\'s inscrutable tendrils.',
			},
			'labor':{
				name:'Muridal, Spirit of Labor',
				icon:[27,18],
				desc1:'<span class="green">'+loc("Clicking is <b>%1%</b> more powerful.",15)+'</span> <span class="red">'+loc("Buildings produce %1% less.",3)+'</span>',
				desc2:'<span class="green">'+loc("Clicking is <b>%1%</b> more powerful.",10)+'</span> <span class="red">'+loc("Buildings produce %1% less.",2)+'</span>',
				desc3:'<span class="green">'+loc("Clicking is <b>%1%</b> more powerful.",5)+'</span> <span class="red">'+loc("Buildings produce %1% less.",1)+'</span>',
				quote:'This spirit enjoys a good cheese after a day of hard work.',
			},
			'industry':{
				name:'Jeremy, Spirit of Industry',
				icon:[28,18],
				desc1:'<span class="green">'+loc("Buildings produce %1% more.",10)+'</span> <span class="red">'+loc("Golden and wrath cookies appear %1% less.",10)+'</span>',
				desc2:'<span class="green">'+loc("Buildings produce %1% more.",6)+'</span> <span class="red">'+loc("Golden and wrath cookies appear %1% less.",6)+'</span>',
				desc3:'<span class="green">'+loc("Buildings produce %1% more.",3)+'</span> <span class="red">'+loc("Golden and wrath cookies appear %1% less.",3)+'</span>',
				quote:'While this spirit has many regrets, helping you rule the world through constant industrialization is not one of them.',
			},
			'mother':{
				name:'Mokalsium, Mother Spirit',
				icon:[29,18],
				desc1:'<span class="green">'+loc("Milk is <b>%1% more powerful</b>.",10)+'</span> <span class="red">'+loc("Golden and wrath cookies appear %1% less.",15)+'</span>',
				desc2:'<span class="green">'+loc("Milk is <b>%1% more powerful</b>.",5)+'</span> <span class="red">'+loc("Golden and wrath cookies appear %1% less.",10)+'</span>',
				desc3:'<span class="green">'+loc("Milk is <b>%1% more powerful</b>.",3)+'</span> <span class="red">'+loc("Golden and wrath cookies appear %1% less.",5)+'</span>',
				quote:'A caring spirit said to contain itself, inwards infinitely.',
			},
			'scorn':{
				name:'Skruuia, Spirit of Scorn',
				icon:[21,19],
				descBefore:'<span class="red">'+loc("All golden cookies are wrath cookies with a greater chance of a negative effect.")+'</span>',
				desc1:'<span class="green">'+loc("Wrinklers appear %1% faster and digest %2% more cookies.",[150,15])+'</span>',
				desc2:'<span class="green">'+loc("Wrinklers appear %1% faster and digest %2% more cookies.",[100,10])+'</span>',
				desc3:'<span class="green">'+loc("Wrinklers appear %1% faster and digest %2% more cookies.",[50,5])+'</span>',
				quote:'This spirit enjoys poking foul beasts and watching them squirm, but has no love for its own family.',
			},
			'spell':{
				name:'Mokalsium, Spirit of Spells',
				icon:[22,19],
				desc1:'<span class="green">'+loc("Spell duration +%1%.",25)+'</span>',
				desc2:'<span class="green">'+loc("Spell duration +%1%.",15)+'</span>',
				desc3:'<span class="green">'+loc("Spell duration +%1%.",5)+'</span>',
				quote:'A benevolent spirit that empowers your spells, protecting you from harm.',
			},
		};
		M.gods['decadence'].descAfter=M.gods['decadence'].desc2;

		M.godLvl=0;
		M.godsInGame={};
		M.dragging=null;
		M.dragOffsetX=0;
		M.dragOffsetY=0;

		div.innerHTML='';
		div.style.position='relative';

		var godDiv=l('templeGods');
		if(!godDiv)
		{
			godDiv=document.createElement('div');
			godDiv.id='templeGods';
			div.appendChild(godDiv);
		}
		godDiv.innerHTML='';

		for(var i in M.gods)
		{
			var me=M.gods[i];
			var godEl=document.createElement('div');
			godEl.id='templeGodDrag'+me.id;
			godEl.className='templeGodDrag';
			godEl.style.position='absolute';
			godEl.style.left='0px';
			godEl.style.top='0px';
			godEl.style.width='60px';
			godEl.style.height='32px';
			godEl.style.backgroundPosition='-'+me.icon[0]*60+'px -'+me.icon[1]*32+'px';
			godDiv.appendChild(godEl);

			// 以下、イベント登録部分を修正・追加

			// PC マウスイベント
			AddEvent(godEl,'mousedown',(function(what){
				return function(e){
					if(e.button==0){
						M.dragGod(what);
						e.preventDefault();
					}
				};
			})(me));

			AddEvent(godEl,'mouseup',(function(what){
				return function(e){
					if(e.button==0){
						M.dropGod(what);
						e.preventDefault();
					}
				};
			})(me));

			// タッチイベント
			AddEvent(godEl,'touchstart',(function(what){
				return function(e){
					M.dragGod(what);
					e.preventDefault();
				};
			})(me));

			AddEvent(godEl,'touchend',(function(what){
				return function(e){
					M.dropGod(what);
					e.preventDefault();
				};
			})(me));

			// もし必要なら touchmove で位置更新など対応もここに

		}
	};
	
	// ドラッグ開始
	M.dragGod=function(what)
	{
		M.dragging=what;
		var box=l('templeGodDrag'+what.id).getBoundingClientRect();
		M.dragOffsetX=Game.mouseX-box.left-60/2;
		M.dragOffsetY=Game.mouseY-box.top-32/2+TopBarOffset;
	};

	// ドラッグ終了
	M.dropGod=function(what)
	{
		if (M.dragging==what)
		{
			M.dragging=null;
		}
	};

	// 毎フレーム描画処理
	M.draw=function()
	{
		// 画面描画処理
		var box=l('templeGods').getBoundingClientRect();
		for(var i in M.gods)
		{
			var me=M.gods[i];
			var godEl=l('templeGodDrag'+me.id);
			if(!godEl) continue;
			if(M.dragging==me)
			{
				// ドラッグ中はマウス座標に追従（Game.mouseX/Yは要タッチ対応）
				var x=Game.mouseX-box.left-60/2;
				var y=Game.mouseY-box.top-32/2+TopBarOffset;
				godEl.style.left=x+'px';
				godEl.style.top=y+'px';
			}
			else
			{
				// 通常位置（初期は0,0に固定されているが必要に応じて位置更新可能）
				godEl.style.left='0px';
				godEl.style.top='0px';
			}
		}
	};

	// もしGame.mouseX, Game.mouseYがタッチ非対応なら、documentのtouchmoveイベントで更新する
	AddEvent(document,'touchmove',function(e){
		if(e.touches && e.touches.length>0){
			Game.mouseX = e.touches[0].clientX;
			Game.mouseY = e.touches[0].clientY;
		}
	});
};

// ヘルパー関数：AddEvent
function AddEvent(element, eventName, func) {
	if(element.addEventListener) element.addEventListener(eventName, func, false);
	else if(element.attachEvent) element.attachEvent("on"+eventName, func);
	else element["on"+eventName] = func;
}

// ヘルパー関数：loc（ローカライズ置き場、例）
function loc(str, args) {
	if(!args) return str;
	if(Array.isArray(args)){
		for(var i=0;i<args.length;i++){
			str=str.replace('%'+(i+1), args[i]);
		}
		return str;
	} else {
		return str.replace('%1', args);
	}
}

// ヘルパー関数：l(id) = document.getElementById(id)
function l(id){return document.getElementById(id);}
