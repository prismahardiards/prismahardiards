//通常のJPLASで使用(offlineJPLASでは未使用)
function scoring(){
	$("#scoring-res input").each(function(){
		var stm = statement.childNodes[0].nodeValue;
		var idx = ($("input").index(this))+1;
		wk = hex_sha256($(this).val()+stm+idx);
		if(wk!=$(this).attr("ans")){
			$(this).css('background-color','pink');
		}else{
			$(this).css('background-color','white');
		}
	});
}

//ストレージに記録する(「Answer」ボタン)
function newScoring(){
	vstr = ""; 
	$("#scoring-res input").each(function(){
		var stm = statement.childNodes[0].nodeValue;
		var idx = ($("input").index(this))+1;
		var flg = "[x]";
		wk = hex_sha256($(this).val()+stm+idx);
		//wk = hex_sha256($(this).val().replace(/\s+/g, "")+stm+idx); //do not check space
	
		let anlist = $(this).attr("ans").split(",");
		if(anlist.length > 1){
			let istrue = false;
			console.log("--------------答案循环-----------");
			for(let i in anlist){
				console.log(anlist[i]);
				if(anlist[i]==wk){
					istrue = true;
				}
			}
			console.log("------------------分界线-------")
			console.log(wk);
			console.log(istrue);
			if(istrue){
				console.log("正确进入");
				$(this).css('background-color','white');
				flg = "[o]";
			}else{
				console.log("错误进入");
				$(this).css('background-color','pink');
				
			}
			
		}else{
			if(wk!=$(this).attr("ans")){
				$(this).css('background-color','pink');
			}else{
				$(this).css('background-color','white');
				flg = "[o]";
			}
		}
		
		
	vstr += (vstr.length==0)?"\t":",";
	vstr += $(this).val();
	vstr += flg;
	});
	qid = document.getElementById("statement");
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	if(month<10){
		month="0"+month;
	}
	var day = date.getDate();
	if(day<10){
		day="0"+day;
	}
	var hour = date.getHours();
	if(hour<10){
		hour="0"+hour;
	}
	var minute = date.getMinutes();
	if(minute<10){
		minute="0"+minute;
	}
	var second = date.getSeconds();
	if(second<10){
		second="0"+second;
	}
	var kstr = qid.innerHTML +"\t"+ year+"-"+month+"-"+day+"\ "+hour+":"+minute+":"+second;
	localStorage.setItem(kstr,vstr);
}