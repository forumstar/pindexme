$( document ).ready(function() 
{
// Handler for .ready() called.
//////////////////////////////////////////////////////

$(document).on('dragenter', function (e)
{
	e.stopPropagation();
	e.preventDefault();
});
$(document).on('dragover', function (e)
{
	e.stopPropagation();
	e.preventDefault();

});
$(document).on('drop', function (e)
{
	e.stopPropagation();
	e.preventDefault();
});

$(document).on('change keydown keypress input', 'div[data-placeholder]', function() {
	if (this.textContent) {
		this.dataset.divPlaceholderContent = 'true';
	}
	else {
		delete(this.dataset.divPlaceholderContent);
	}
});

/////////////////////////////////////////////////////////
//////NESTED DYNMAIC FORM////////////////////////////
$('form').on('click', '.remove_fields', function(event) {
	$(this).prev('input[type=hidden]').val('1');
	$(this).closest('fieldset').hide();
	
	this_class=$(this).closest("fieldset").attr('class').split(' ')[0];

	if (this_class=="px-eltarea-field"){
		count=$("#r_add_pin_eltareas").attr("data-count");
		$("#r_add_pin_eltareas").attr("data-count",--count)
		
	}
	return event.preventDefault();


});

$('form').on('click', '.add_fields', function(event) {
	var element_id, regexp, time;
	time = new Date().getTime();
	regexp = new RegExp($(this).data('id'), 'g');
	$(this).before($(this).data('fields').replace(regexp, time));
	$("#new_pin").children("fieldset").last().attr("class");
	event.preventDefault();
	//$("#new_pin").children("fieldset").addClass(time);
	this_id=$(this).attr("id");
	if (this_id=="add_pin_pinimages"){
		$("#new_pin").find(".px-image-field").last().attr("id",time);
	}

	if (this_id=="add_pin_eltareas"){
		//count=$("#r_add_pin_eltareas").attr("data-count");
		//$("#r_add_pin_eltareas").attr("data-count",++count);
		$("#new_pin").find(".px-eltarea-field").last().attr("id",time);

		CKEDITOR.replace( 'editor1', {
toolbar: 'Basic',

});

	}
	if (this_id=="add_pin_eltexts"){
		
	}

});
////////////////////////////////////////////////////////

//bunlar birlestitilcek split yapilip basa r eklencek
$( "#r_add_pin_pinimages" ).on('click', function(e) {
	$("#add_pin_pinimages").trigger( "click" );
	$("#element-settings-cl").empty();
	$("#new_pin").children("fieldset").last(".px-image-field").clone().prependTo("#element-settings-cl");
	//e.stopPropagation();
	$("#element-settings-cl").find(".hidden").removeClass("hidden");

})

$( "#r_add_pin_eltareas" ).on('click', function() {
	$("#add_pin_eltareas").trigger( "click" );
	$("#new_pin").on('change keydown keypress input','.px-editable-tarea ',function(){
		$(this).closest("fieldset").find(".px-eltarea-hidden-field").val($(this).html());
	})
})

$( "#r_add_pin_eltexts" ).on('click', function() {
	//$("#add_pin_eltexts").trigger( "click" );
});

$(".px-remote-submit").click(function(){
	$(".px-real-submit").trigger("click");
})

////////////////////////////////////////////////////

function dynamic_added_el(){

	$("#pin_creator_area").find("fieldset").on({
		mouseenter: function () {

			$(this).css("border", "1px solid black" );
			$(this).children(".px-el-remove").css("visibility","visible");
			$(this).draggable({disabled:false});

		},
		mouseleave: function (e) {
			$( this ).css( "border","0px solid black" );
			if (!$(this).is(".px_active_el")){
				$(this).children(".px-el-remove").css("visibility","hidden");
			}

		},
		click: function(e){
			//$(this).children(".px-el-remove").css("visibility","visible");
			
			//$("#element-settings-cls").empty();
			//$(this).children(".px-image-field").clone().prependTo("#element-settings-cl");

			//$(this).children("fieldset").clone().prependTo("#element-settings-cl");			

			$("#pin_creator_area").find("fieldset").removeClass("px_active_el");
			$(this).addClass("px_active_el");

			$("#element-settings-cl").empty();
			$(this).children("fieldset").clone().prependTo("#element-settings-cl");
			$(this).children(".px-el-attr").clone().prependTo("#element-settings-cl");
			$("#element-settings-cl").find("input[type='text']").on('keyup change',function(e) {
				$("#pin_creator_area").find("#"+this.id).val(this.value);
			});
			
			$("#element-settings-cl").find(".hidden").removeClass("hidden");
			$("#pin_creator_area").find(".px-el-remove").css("visibility","hidden");
			$(this).children(".px-el-remove").css("visibility","visible");
			// $(this).draggable({disabled:true});
			// $(this).removeClass(' ui-draggable-disabled ui-state-disabled');
			//e.stopPropagation();

		},
		dblclick: function(e){

			$(this).find(".px-editable-tarea").focus()

			$(this).draggable({disabled:true});
			$(this).removeClass(' ui-draggable-disabled ui-state-disabled');
			// e.stopPropagation();
		},

	});

$(".px-r-add-img").on("click",function(){
	this_id=$(this).closest("fieldset").attr("id");

	$("#new_pin").find("#"+this_id).find(".px-add-img-file").trigger("click");

})

$(".px-add-img-file").on("change",function(){
	var file = this.files[0];
	fileName = file.name;
	fileSize = file.size;

	var imageType = /image.*/;

	if (!file.type.match(imageType)) {
		alert("only image");
	}
	else{
		$(".px-r-add-img").hide();
	}

	//var img = document.createElement("fielsted");
	var img = document.createElement("img");
	img.classList.add("px-resizable-el");
	img.file = file;

	img.width=$("#pin_creator_area").width()/10;


	var reader = new FileReader();
	reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
	reader.readAsDataURL(file);

	$("#new_pin").find("#"+$(this).attr("id")).closest(".px-image-field").append(img);
	//$("#new_pin").append(img);
	px_resizable_img();
	px_draggable_el();

})	
}
///////////////////dynamic_added_el//////////////

function px_resizable_img(){
	//width=$("#pin_creator_area").height();
	//$(".px-resizable-el").height(width/10);
	$("#new_pin").find(".px-resizable-el").resizable({
		stop: function(event, ui) {
			var width = $(this).width();
			var height = $(this).height();
			$(this).closest("fieldset").find(".px-el-width").val(width);
			$(this).closest("fieldset").find(".px-el-height").val(height);
			
		}

	});

}


function px_resizable_el(){
	$("#new_pin").find("fieldset").resizable({
		stop: function(event, ui) {
			var width = $(this).width();
			var height = $(this).height();
			$(this).closest("fieldset").find(".px-el-width").val(width);
			$(this).closest("fieldset").find(".px-el-height").val(height);
			
		}

	});

	$(".px-editable-tarea").on('keydown',function(){
		height=$(this).height();
		$(this).closest("fieldset").height(height);

	})
}
function px_draggable_el(){
	$("#new_pin").find("fieldset").draggable({
			//disabled:false,
			drag: function(){
				var position = $(this).position();
				var xPos = position.left;
				var yPos = position.top;
				$(this).find('.px-el-p-left').val(xPos);
				$(this).find('.px-el-p-top').val(yPos);
				$( this ).css( "border","0px solid black" );
				
			},
			snap: true,
			containment: "#pin_creator_area",
			scroll: false,
		});

}

//NAVBAR BUTTONS////////////////////////////////////
$("#px-add-el-nav").find("button").on({

	click: function(e){
		dynamic_added_el();
		px_resizable_el();
		px_draggable_el();

	},

	mouseenter: function(){
		//$(this).tooltip({placement:"top"});

	},
	mouseleave: function(){

	}
}).tooltip({container: 'body',placement: 'right' });

///////////////////////////////////////////////////////
/////////////////////////////////////////////////

$("#pin_creator_area").on("click",function() {
	$("#element-settings-cl").empty();
	$("#pin_title").closest(".px-pin-field").clone(false).prependTo("#element-settings-cl");
	$("#element-settings-cl").find("input[type='text']").on('keyup change',function(e) {
		$("#pin_creator_area").find("#"+this.id).val(this.value);
	});

	$(".px-page-format").on('change',function(){
		var thisval=$(this).val();
		//alert(thisval);
		var width="200";
		var height="200";
		//alert(thisval);+#
		$("#pin_creator_area").find('.px-page-format option').attr('selected', false);

		$(this).find('option[value="'+thisval+'"]').attr('selected', true);
		
		$("#pin_creator_area").find('.px-page-format option[value="'+thisval+'"]').attr('selected', true);

		if(thisval==1){width="640"; height="480"}
		if(thisval==2){width="800"; height="600"}
		if(thisval==3){width="1024"; height="768"}
		if(thisval==4){width="1600"; height="1200"}

		$("#pin_creator_area").css("width",width).css("height",height);
		$(".px-pin-size#pin_width").val(width);
		$(".px-pin-size#pin_height").val(height);
		
	})
	$("#element-settings-cl").find(".hidden").removeClass("hidden");
	$("#pin_creator_area").find("fieldset").removeClass("px_active_el");
	$("#pin_creator_area").find(".px-el-remove").css("visibility","hidden");

	$(".px-pin-size").on("change",function(){
		width=$("#pin_width").val();
		height=$("#pin_height").val();
		$("#pin_creator_area").css("width",width).css("height",height);
		$('.px-page-format option').attr('selected', false);
		$('.px-page-format option[value="12"]').attr('selected', true);
	})
});
$("#pin_creator_area").trigger("click");

});