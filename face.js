$(function(){
	var lanren = {
		face:function(_this){
			var target = $(_this).html();
			if(target.length < 5){
				$(_this).html("<img src='image/face/"+target+".gif' />")
			}
		},
		faceimg:'',
		imgs:function(min,max){
			for(i=min;i<max;i++){  //通过循环创建60个表情，可扩展
        		lanren.faceimg+='<li><a href="javascript:void(0)"><img src="image/face/'+(i+1)+'.gif" face="<emt>'+(i+1)+'</emt>"/></a></li>';
    		};
		},
		cur:0
	}
	$('.list li emt').each(function(){
		lanren.face(this);
	});
	$('.send a.btn').on('click',function(){
		var a = $('#content').html();
		a = a.replace(/<img src="image\/face\/(\d+?)\.gif">/g, "{:$1}")//要显示的
		var b = a.replace(/\{\:(\d+?)}/g,"<img src='image\/face\/$1\.gif'>");//要提交的
		if(!a){
			alert('发布内容不能为空');
			$('#content').focus();
			return false;
		}
		$('.list').append(b);//显示多行评论

		$('#content').html('');
	});
	$('.send .faces').on('click',function(){
		if(lanren.cur == 0){
			$(this).addClass('on');
			lanren.cur =1;
			$('.face').show(0);
		}else if(lanren.cur == 1){
			$(this).removeClass('on');
			$('.face').hide(0);
			lanren.cur =0;
		}
	})
    lanren.imgs(0,60);
    $('.face').append(lanren.faceimg);
    $('.face li img').on('click',function(){
		var target = $(this).attr('face');
		var num = target.replace(/[a-z,A-Z,/,~'!<>@#$%^&*()-+_=:]/g, "");
		var pre = $('#content').html();//可以作为显示用
		var showimg = '<img src="image/face/'+num+'.gif">';
		$('#content').html(pre+showimg);//target对应showimg
		$(this).parents('.face').hide(0);
		$('.send .faces').removeClass('on');
		lanren.cur =0;
		// lanren.face(this);
	})
})