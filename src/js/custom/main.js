// parallax function

function Paralax(parent, element,transition, animationSpeed, offset, adaptive){
	var adaptiveMod;
	if(!adaptive) {
		adaptiveMod = 992;
	}
	if(adaptive) {
		adaptiveMod = adaptive;
	}
	if(parent !== null && window.innerWidth > adaptiveMod){
		var sizeCalc = parseInt(getComputedStyle(document.body).fontSize) / 20;
		var elemOffset = parent.clientHeight / (animationSpeed * sizeCalc);
		if(window.pageYOffset + parent.clientHeight > parent.offsetTop){
			var scrollSize = window.pageYOffset;
			if(offset){
				element.setAttribute("style", "top:" + elemOffset + ";");
			}
			TweenMax.to(element, transition, {y: -scrollSize / (animationSpeed * sizeCalc)});
		}
	}
	if(!(window.innerWidth > adaptiveMod)){
		element.setAttribute("style", "top:" + "" + "transform:" + "");
		element.css("transform", "");
	}
};

document.addEventListener('scroll', function (e) {
	var ParalaxParent = document.querySelector(".fs-image-container");
	var ParalaxElement = document.querySelector(".fs-image-container img");
	Paralax(ParalaxParent, ParalaxElement, 0.1, 6, false,1);
});

// end parallax function



// input label script

var activeInput = function(el){
	if (el.val() !== "") {
		el.closest(".wrap-input").find(".wrap-input__label").addClass("active");
	}
	else{
		el.closest(".wrap-input").find(".wrap-input__label").removeClass("active");
	}
};

$(".wrap-input__input").keyup(function(){
	activeInput($(this));
});

$(".wrap-input__input").focusout(function(){
	activeInput($(this));
});


//end input label script


//open menu script

$(".burger").click(function(){
	$(".navigation").toggleClass("active");
	if($(".navigation").hasClass("active")){
		$("body").addClass("modal-open");
	}
	else{
		$("body").removeClass("modal-open");
	}
})

//end open menu script

//form validation script

$(".reqiered-field").keyup(function(e){
	console.log($(this).val())
	if($(this).val() ==""){
		$(this).closest(".input-item").addClass("validation-error");
		$(this).closest(".input-item").find(".error span").html("can't be empty");
		sendForm=false;
	}
	else if($(this).attr("name") == "email"){
		if($(this).val() ==""){
			$(this).closest(".input-item").addClass("validation-error");
			$(this).closest(".input-item").find(".error span").html("can't be empty");
			sendForm=false;
		}
		else if(!(/\S+@\S+\.\S+/.test($(this).val()))){
			console.log(/\S+@\S+\.\S+/.test($(this).val()));
			$(this).closest(".input-item").addClass("validation-error");
			$(this).closest(".input-item").find(".error span").html("invalid email");
			sendForm=false;
		}
		else{
			$(this).closest(".input-item").removeClass("validation-error");
		}
	}
	else{
		$(this).closest(".input-item").removeClass("validation-error");
	}
})


$(".reqiered-field").focusout(function(e){
	console.log($(this).val())
	if($(this).val() ==""){
		$(this).closest(".input-item").addClass("validation-error");
		$(this).closest(".input-item").find(".error span").html("can't be empty");
		sendForm=false;
	}
	else if($(this).attr("name") == "email"){
		if($(this).val() ==""){
			$(this).closest(".input-item").addClass("validation-error");
			$(this).closest(".input-item").find(".error span").html("can't be empty");
			sendForm=false;
		}
		else if(!(/\S+@\S+\.\S+/.test($(this).val()))){
			console.log(/\S+@\S+\.\S+/.test($(this).val()));
			$(this).closest(".input-item").addClass("validation-error");
			$(this).closest(".input-item").find(".error span").html("invalid email");
			sendForm=false;
		}
		else{
			$(this).closest(".input-item").removeClass("validation-error");
		}
	}
	else{
		$(this).closest(".input-item").removeClass("validation-error");
	}
})
//end form validation script


//ajax script
var sendForm;
$("form").on("submit", function(e){
	e.preventDefault();
	var thisForm = $(this)
	sendForm=true;
	$(this).find(".reqiered-field").each(function(){
		console.log($(this).val());
		if($(this).val() ==""){
			$(this).closest(".input-item").addClass("validation-error");
			$(this).closest(".input-item").find(".error span").html("can't be empty");
			sendForm=false;
		}
		else if($(this).attr("name") == "email"){
			if($(this).val() ==""){
				$(this).closest(".input-item").addClass("validation-error");
				$(this).closest(".input-item").find(".error span").html("can't be empty");
				sendForm=false;
			}
			else if(!(/\S+@\S+\.\S+/.test($(this).val()))){
				console.log(/\S+@\S+\.\S+/.test($(this).val()));
				$(this).closest(".input-item").addClass("validation-error");
				$(this).closest(".input-item").find(".error span").html("invalid email");
				sendForm=false;
			}
			else{
				$(this).closest(".input-item").removeClass("validation-error");
			}
		}
		else{
			$(this).closest(".input-item").removeClass("validation-error");
		}
	});
	if(sendForm){
		var that = $(this);
		$.ajax({
			url: $(this).attr('action'),
			type:'POST',
			data:$(this).serialize(),
			
			success : function( data ) {
				$(".thk-modal").addClass("active");
				$("body").addClass("modal-open");
				if(that.hasClass("list-form")){
					$("body").removeClass("modal-open");
					$(".list-form .success-mess").addClass("active");
				}
				
				that.find(".form-input").each(function(){
					$(this).val("");
				});
			},
			error   : function( xhr, err , data ) {
				$(".err-modal").addClass("active");
				$("body").addClass("modal-open");
				console.log(that)
				if(that.hasClass("list-form")){
					$("body").removeClass("modal-open");
					$(".list-form .success-mess").addClass("active");
				}
			}
		});
	}
});
//end ajax script

// modal close script
$(".close-trigger").click(function(){
	$(".modal").removeClass("active");
	$("body").removeClass("modal-open");
})

//end modal close script


// head change script

$(".radio-form-list").on('change', function(){
	console.log($(this).attr('data-head'))
	var headTxt = $(this).attr('data-head');
	$('.variable-title').html(headTxt);
})

//end head change script