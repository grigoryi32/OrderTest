$(function(){
	
	/*SELECT TRANSLATE*/

	var check_translate = 0;
	var check_document = 0; 
	
	//select translate
	$(".h").click(function(e){		
		switch(e.target.id){
			case "web":
				$("#web").addClass("focus");
				$("#doc, #soc").removeClass("focus");										
				$("#web .check").css({display:"block"});
				$("#doc .check, #soc .check").css({display:"none"});
				check_translate = 1;
				break;
			case "doc":
				$("#doc").addClass("focus");
				$("#web, #soc").removeClass("focus");
				$("#doc .check").css({display:"block"});
				$("#web .check, #soc .check").css({display:"none"});
				check_translate = 1;
				break;
			case "soc":
				$("#soc").addClass("focus");
				$("#doc, #web").removeClass("focus");
				$("#soc .check").css({display:"block"});
				$("#web .check, #doc .check").css({display:"none"});
				check_translate = 1;
				break;	
		}
	});

	//select tone
	$(".btn").click(function(e){		
		switch(e.target.id){
			case "btn_1":
				$("#btn_1").addClass("focus_1");
				$("#btn_2, #btn_3").removeClass("focus_1");										
				$("#btn_1 .check").css({display:"block"});
				$("#btn_2 .check, #btn_3 .check").css({display:"none"});
				check_translate = 1;
				break;
			case "btn_2":
				$("#btn_2").addClass("focus_1");
				$("#btn_1, #btn_3").removeClass("focus_1");
				$("#btn_2 .check").css({display:"block"});
				$("#btn_1 .check, #btn_3 .check").css({display:"none"});
				check_translate = 1;
				break;
			case "btn_3":
				$("#btn_3").addClass("focus_1");
				$("#btn_1, #btn_2").removeClass("focus_1");
				$("#btn_3 .check").css({display:"block"});
				$("#btn_1 .check, #btn_2 .check").css({display:"none"});
				check_translate = 1;
				break;	
		}
	});

	/*UPLOAD FILES*/

	//size del icon
	$(document).on("mouseover", ".del", function(){
		$(this).addClass("fa-lg");
	});
	$(document).on("mouseout", ".del", function(){
		$(this).removeClass("fa-lg");
	});

	//del elements
	$(document).on("click", "tr .del", function(){
		$(this).parents("tr").remove();

		if($("table tr").length == 1){
			$("table").hide();
			check_document = 0;
		}else{
			$("table").show();
			check_document = 1;
		}
	});

	//add files to table
	$("#file").change(function(){
		var check = 0;
		var extentions = ["doc", "docx", "txt", "pdf", "md"];

		var name= this.files[0].name;
		var type_file = name.substring(name.lastIndexOf('.')+1);

		for(var i = 0; i < extentions.length; i++){console.log(extentions[i]);
			if(extentions[i] == type_file){
				check = 1;
				break;
			}
		}

		if(check != 0){
			var size = this.files[0].size;
			var result_size;
			var type_size;

			if(size < 1024){
				result_size = size;
				type_size = "b";
				AddFileTo(name, result_size, type_size, RandomInt(500, 2000));
			}else if(size >= 1024 && size < 1024000){
				result_size = Math.round(size/1024);
				type_size = "kb";
				AddFileTo(name, result_size, type_size, RandomInt(500, 2000));
			}else if(size >= 1024000 && size < 1024000000){
				result_size = Math.round(size/1024000);
				type_size = "mb";
				AddFileTo(name, result_size, type_size, RandomInt(500, 2000));
			}else{
				alert("Размера файла не должен превышать 1 гигабайт!");
			}
		}else{
			alert("Недопустимый тип файла, Вы можете загружать следующите типы файлов: " + extentions);			
		}
	});

	//urgent job
	$("#range").change(function(){
		var txt_color = "#edbe76";
		switch($(this).val()){
			case "0":
				$(".left").css({color:txt_color});
				$(".center, .right").css({color:"#6e768f"});
				ChangeMessage("I GOT TIME", data[0].gotTime);
				break;
			case "1":
				$(".center").css({color:txt_color});
				$(".left, .right").css({color:"#6e768f"});
				ChangeMessage("AVAREGE", data[0].average);
				break;
			case "2":
				$(".right").css({color:txt_color});
				$(".left, .center").css({color:"#6e768f"});
				ChangeMessage("YESTERDY", data[0].yesterday);
				break;
		}
	});

	/*clear inputs*/
	$(".payment #name, #email").change(function(e){
		if($(this).val() != ""){
			switch(e.target.id){			
				case "name":
					$("#check_name").css({display:"block"});
					break;
				case "email":
				$("#check_email").css({display:"block"});
					break;
			}
		}else{
			switch(e.target.id){			
				case "name":
					$("#check_name").css({display:"none"});
					break;
				case "email":
				$("#check_email").css({display:"none"});
					break;
			}
		}
	});

	$(".payment #password").keydown(function(e){	
		if($(this).val() != ""){
			$("#clear_password").css({display:"block"});
		}else{
			$("#clear_password").css({display:"none"});
		}
	});

	$(document).on("click", "#clear_password", function(){
		$(this).css({display:"none"});
		$("#password").val("");
	});

	function ChangeMessage(urgent, message){
		$(".timeline_message .big").text(urgent);
		$(".timeline_message .txt_message").text(message);
	}

	function AddFileTo(name, size, extention, count_words){
		$("table").show();
		var row = '<tr>'+
						'<td><i class="fas fa-file-alt"></i></td>'+
						'<td>'+name+'</td>'+
						'<td class="hide">'+size+''+extention+'</td>'+
						'<td class="hide">'+count_words+'</td>'+
						'<td class="txt-center"><i class="fas fa-trash del"></i></td>'+
					'</tr>';
		$("table tbody").after(row);
	}

	function RandomInt(min, max){
  		return Math.floor(Math.random() * (max - min + 1)) + min;
	}


});