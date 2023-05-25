// alert('no');
// $(document).ready(function(){
	(function(){
		window.WALLET = (function(){
			function WALLET (){}
			WALLET.loadjQuery = function(afterLoad)
			{
				if (Shopify.shop != "splashings-of-fabric.myshopify.com") {
					return WALLET.loadScript("//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js", function () {
						return WALLET.loadScript("https://js.stripe.com/v3/", function () {
							$ = jQuery.noConflict(true);
							$("head").append('<style type="text/css">.mp-spinner{ width: 36px !important; height: 36px !important; border-width: 4px !important; } .wm-thank-loader { position: fixed; background: rgba(255, 255, 255, 1); top: 0; left: 0; bottom: 0; right: 0; z-index: 1100} .wm-thank-loader .mp-spinner { width: 52px; height: 52px; border: 4px solid #cccccc; border-radius: 50%; animation: mp-spin 460ms infinite linear; -o-animation: mp-spin 460ms infinite linear; -ms-animation: mp-spin 460ms infinite linear; -webkit-animation: mp-spin 460ms infinite linear; -moz-animation: mp-spin 460ms infinite linear; border-color: #0033EE #1100BB; position: absolute; left: 50%; top: 50%; margin-left: -26px; margin-top: -26px; } .wm-thank-loader .title-text { position: relative; text-align: center !important; top: 56%; width: 100%; } @keyframes mp-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } @-o-keyframes mp-spin { from { -o-transform: rotate(0deg); } to { -o-transform: rotate(360deg); } } @-ms-keyframes mp-spin { from { -ms-transform: rotate(0deg); } to { -ms-transform: rotate(360deg); } } @-webkit-keyframes mp-spin { from { -webkit-transform: rotate(0deg); } to { -webkit-transform: rotate(360deg); } } @-moz-keyframes mp-spin { from { -moz-transform: rotate(0deg); } to { -moz-transform: rotate(360deg); } }.mp-absolute {	position: absolute;	}.mp-relative {	position: relative;	} .wk-margin-bottom{margin-bottom:10px;} .wk-text-danger{color:red!important;} .wk-text-success{color:green!important;}.wk-text-warning{color:#8a6d3b!important;} .wk-mp-hide{display:none!important;}</style>');
							$("body").append('<div class="wm-thank-loader"  style="display: none;"><div class="mp-spinner"></div><div class="title-text" id="wk-loader-msg1">Please Wait...</div><div class="title-text">Do Not Press Back Or Refresh button</div></div>');
	
							WALLET.loadLink(WALLET.api_url + "/css/wallet.css");
	
							return afterLoad();
						});
					});
				}
				else {
					//return WALLET.loadScript("//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js", function () {
					return WALLET.loadScript("https://js.stripe.com/v3/", function () {
						$ = jQuery.noConflict(true);
						$("head").append('<style type="text/css">.mp-spinner{ width: 36px !important; height: 36px !important; border-width: 4px !important; } .wm-thank-loader { position: fixed; background: rgba(255, 255, 255, 1); top: 0; left: 0; bottom: 0; right: 0; z-index: 1100} .wm-thank-loader .mp-spinner { width: 52px; height: 52px; border: 4px solid #cccccc; border-radius: 50%; animation: mp-spin 460ms infinite linear; -o-animation: mp-spin 460ms infinite linear; -ms-animation: mp-spin 460ms infinite linear; -webkit-animation: mp-spin 460ms infinite linear; -moz-animation: mp-spin 460ms infinite linear; border-color: #0033EE #1100BB; position: absolute; left: 50%; top: 50%; margin-left: -26px; margin-top: -26px; } .wm-thank-loader .title-text { position: relative; text-align: center !important; top: 56%; width: 100%; } @keyframes mp-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } @-o-keyframes mp-spin { from { -o-transform: rotate(0deg); } to { -o-transform: rotate(360deg); } } @-ms-keyframes mp-spin { from { -ms-transform: rotate(0deg); } to { -ms-transform: rotate(360deg); } } @-webkit-keyframes mp-spin { from { -webkit-transform: rotate(0deg); } to { -webkit-transform: rotate(360deg); } } @-moz-keyframes mp-spin { from { -moz-transform: rotate(0deg); } to { -moz-transform: rotate(360deg); } }.mp-absolute {	position: absolute;	}.mp-relative {	position: relative;	} .wk-margin-bottom{margin-bottom:10px;} .wk-text-danger{color:red!important;} .wk-text-success{color:green!important;}.wk-text-warning{color:#8a6d3b!important;} .wk-mp-hide{display:none!important;}</style>');
						$("body").append('<div class="wm-thank-loader"  style="display: none;"><div class="mp-spinner"></div><div class="title-text" id="wk-loader-msg1">Please Wait...</div><div class="title-text">Do Not Press Back Or Refresh button</div></div>');
	
						WALLET.loadLink(WALLET.api_url + "/css/wallet.css");
	
						return afterLoad();
					});
					//});
				}
			};
			WALLET.loadLink = function(url)
			{
				var style;
				style = document.createElement("link");
				style.type = "text/css";
				style.rel = "stylesheet";
	
				style.href = url;
				return document.getElementsByTagName("head")[0].appendChild(style);
	
			}
			WALLET.loadScript  = function(url,callback)
			{
				
				var script;
				script = document.createElement("script");
				script.type = "text/javascript";
	
				if(script.readyState) {
					script.onreadystatechange = function()
					{
						if(script.readyState == "loaded" || script.readyState == "complete")
						{
							script.onreadystatechange = null;
							return callback();
						}
					};
				}
				else {
					script.onload = function()
					{
						return callback();
					};
				}
				script.src = url;
				document.getElementsByTagName("head")[0].appendChild(script);
				return true;
			};
			return WALLET;
		})();
		
	  	WALLET.api_url = "https://app-sp.webkul.com/shopify-wallet-management/";
		WALLET.shop_name = Shopify.shop;
	 	WALLET.currency = Shopify.money_format;
	  	WALLET.path = window.location.pathname.split('/');
		WALLET.handle = WALLET.path.pop(-1);
		WALLET.page = WALLET.path.pop(-2);
		WALLET.showLoader = function()
      	{
			$.ajax({
				type:'POST',
				url : WALLET.api_url+"/admin/wallet",
				jsonpCallback :"WALLET_AS_PAYMENT_METHOD",
				dataType: "jsonp",
				crossDomain: true,
				data:{shop_name:WALLET.shop_name},
				success:function(response){
					if(response){
						$('body').find('.wm-thank-loader').show();
					}
				},
				error:function(response){
					console.log("something went wrong in loader ");
				}
			});
      	};
  
      	WALLET.removeLoader = function() 
      	{
        	$('body').find('.wm-thank-loader').hide();
      	};

	  	WALLET.loadjQuery(function(){
			console.log(WALLET.currency);
			console.log('server 6');
			

			if($(".wk_wallet_amount").length > 0) {
			var customer_id= $(".wk_wallet_amount").attr("customer_id");
			var customer_email = $(".wk_wallet_amount").attr("customer_email");
			var remaning_amt = 'check';
			$.ajax({
				type:'POST',
				url : WALLET.api_url+"/admin/wallet",
				jsonpCallback :"WALLETAMOUNT",
				dataType: "jsonp",
				crossDomain: true,
				data:{customer_id:customer_id,customer_email:customer_email,shop_name:WALLET.shop_name,remaning_amt:remaning_amt},
				success:function(response){
				// console.log(response);
				if(response){
					$(".wk_wallet_amount").html(response);
				}
				},
				error:function(response){
				// console.log(response);
				console.log("something went wrong");
				}
			});
			}

			
			if(WALLET.page == "orders" || WALLET.handle == "thank_you"){
				
				$("#wk-loader-msg1").text("Please Wait...while redirecting you to the order status page");
				if (getSession('wk_stripe_order_paid') === undefined || getSession('wk_stripe_order_paid') === null) {
					WALLET.showLoader();
					myinterval = setInterval(function(){ 
						WALLET.checkStripeEnable(); 
					}, 10000);
			   	}else{
					if(getSession('wk_stripe_order_paid') == 0) {
						WALLET.showLoader();
						myinterval = setInterval(function(){ 
							WALLET.checkStripeEnable(); 
						}, 10000);
					}
				}

				// if (getCookie('wk_stripe_order_paid') === undefined || getCookie('wk_stripe_order_paid') === null) {
				// 	WALLET.showLoader();
				// 	myinterval = setInterval(function(){ 
				// 		WALLET.checkStripeEnable(); 
				// 	}, 10000);
			   	// }else{
				// 	if(getCookie('wk_stripe_order_paid') == 0) {
				// 		WALLET.showLoader();
				// 		myinterval = setInterval(function(){ 
				// 			WALLET.checkStripeEnable(); 
				// 		}, 10000);
				// 	}
				// }
			}
			else if (WALLET.page == "pages" && WALLET.handle == "paypal-payment-cancelled" && window.location.search != ""){
				// var params = window.location.search.substring(1).split("=");
				// // console.log(params);
				// if(params[0] == "main_id_order"){
				// 	Stripe.checkGetPaypalPaymentUrl(params[1]);
				// }
			}

			WALLET.checkStripeEnable = function()
			{
				WALLET.showLoader();
				var type = "token";
				var token = WALLET.handle;
				var return_url = JSON.stringify(window.location.href);
				var order_checkout_no = window.location.pathname;
				if(WALLET.handle == "thank_you"){
					type = "checkout_token";
					token = WALLET.page;
				}
	
				$.ajax
				({
					url: WALLET.api_url + "/admin/wallet_payment",
					type: "POST",
					jsonpCallback: 'STRIPEPAY',
					dataType: "jsonp",
					data: { type: type, token: token, return_url: return_url, order_checkout_no: order_checkout_no, shop_name: WALLET.shop_name},
					beforeSend: function(){
						WALLET.showLoader();
					},
					success: function(data)
					{
						// console.log(data);
						// setCookie('wk_stripe_order_paid','0',10);
						setSession('wk_stripe_order_paid','0');

						if (typeof data.name === "undefined") {
							// else{
							// 	// }
							// 	// else if (Stripe.$.trim(data.method) == "paypal-adaptive") {
							// 	// 	/* payment was made by paypal adaptive payment method */
							// 	// 	var html = "<form id='wk_paypal_payment_form' method='POST' action='" + Stripe.api_url + "index.php?p=front_paypal_adaptive_payment_process' class='wk-mp-hide'><input type='hidden' name='return_url' value='" + window.location + "'/><input type='hidden' name='shop' value='" + Shopify.shop + "'/><input type='hidden' name='type' value='" + type + "'/><input type='hidden' name='token' value='" + token + "'/><input type='hidden' name='main_id_order' value='" + data.main_id_order + "'/><button id='wk_stripe_submit_btn' type='submit'/></form>";
							// 	// 	Stripe.removeLoader();
							// 	// 	Stripe.$("body").append(html);
							// 	// 	Stripe.$("#wk_paypal_payment_form").submit();
							// 	// }
							// }
						}else{
							WALLET.removeLoader();
							if(data.name == 'session_id'){
								session_id = data.session_id;
								var stripe = Stripe(data.publish_key);
								stripe.redirectToCheckout({
								// Make the id field from the Checkout Session creation API response
								// available to this file, so you can provide it as parameter here
								// instead of the {{CHECKOUT_SESSION_ID}} placeholder.
								sessionId: session_id
								}).then(function (result) {
								// If `redirectToCheckout` fails due to a browser or network
								// error, display the localized error message to your customer
								// using `result.error.message`.
								console.log(result.error.message);
								});
							}else if(data.name == 'error_with_create_session') {
								console.log("this is due to issue with stripe key");
								console.log(data.message);

								$("body").find(".payment-method-list").append("<p>" +data.payment_status_label+ ": <span class='wk-text-warning'>"+data.pending_label+"</span></p>");
								clearInterval(myinterval);
								// setCookie('wk_stripe_order_paid','1',10);
								setSession('wk_stripe_order_paid','1');
								Shopify.Checkout.OrderStatus.addContentBox(
									'<h2>'+data.payment_status_label+'</h2>',
									'<p style="color:red;">'+data.error_msg+'</p>' 
								)
								WALLET.removeLoader();
							}else if(data.name == 'extra_add_amount_below_cents') {

								console.log("This is due to which rest amount need to add in wallet to purchase products but that amount have not fullfill the minimum add amount condition of stripe.");

								$("body").find(".payment-method-list").append("<p>" +data.payment_status_label+ ": <span class='wk-text-warning'>"+data.pending_label+"</span></p>");

								clearInterval(myinterval);
								// setCookie('wk_stripe_order_paid','1',10);
								setSession('wk_stripe_order_paid','1');
								Shopify.Checkout.OrderStatus.addContentBox(
									'<h2>'+data.payment_status_label+'</h2>',
									'<p style="color:red;">'+data.error_msg+'</p>' 
								)
								WALLET.removeLoader();
							}else if (data.name == "pending"){
								console.log("Get stuck at the time of create transaction crossponding to this order");

								$("body").find(".payment-method-list").append("<p>" +data.payment_status_label+ ": <span class='wk-text-warning'>"+data.pending_label+"</span></p>");
								clearInterval(myinterval);
								// setCookie('wk_stripe_order_paid','1',10);
								setSession('wk_stripe_order_paid','1');
								Shopify.Checkout.OrderStatus.addContentBox(
									'<h2>'+data.payment_status_label+'</h2>',
									'<p style="color:red;">'+data.error_msg+'</p>' 
								)
								WALLET.removeLoader();
							}
							else if(data.name == "paid"){

								console.log("order paid successfully");
								clearInterval(myinterval);
								// setCookie('wk_stripe_order_paid','1',10);
								setSession('wk_stripe_order_paid','1');
								$("body").find(".payment-method-list").append("<p>" +data.payment_status_label+ " : <span class='wk-text-success'>"+data.success_label+"</span></p>");
								WALLET.removeLoader();
							}else if(data.name == 'different_payment_method') {
								clearInterval(myinterval);
								setSession('wk_stripe_order_paid','1');
								WALLET.removeLoader();
							}else if(data.name == 'paypal_payment_creation'){
								window.open(data.checkout_link,'_top');
							}
						}
					},
					error: function(error)
					{
						console.log(error);
						console.log("error");
						WALLET.removeLoader();
					}
				});
			};
			

			if($(".wk_cashback").length > 0) {  /*THIS IS FOR ALL PRODUCT ON PRODUCT GRIG IN SNIPPET */
					products_ids = [];
					$(".wk_cashback").each(function(){
						var product_id = $(this).attr('product_id');
						if(product_id) {
							products_ids.push(product_id);
						}
					});
					if(products_ids) {
						$.ajax({
							type:'POST',
							url : WALLET.api_url+"/admin/walletCashback",
							jsonpCallback :"CASHBACK_GRID",
							dataType: "jsonp",
							crossDomain: true,
							data:{shop_name:WALLET.shop_name,products_ids:products_ids},
							success:function(response){
								// console.log(response);
								if(response) {
									$(".wk_cashback").each(function(){
										var product_id = $(this).attr('product_id');
										var same = $(this);
										$(response.data).each(function(index,value){
											$(value).each(function(){
												if(value.product_id == product_id) {
													// console.log(value.templates);
													$(same).html(value.templates);
												}
											});
										});
									});
								}
							},
							error:function(response){
								console.log("something went wrong");
							}
						});
					}
			}
	
			if($(".wk_cashback_product").length > 0) {
			var product_id= $(".wk_cashback_product").attr("product_id");
			$.ajax({
				type:'POST',
				url : WALLET.api_url+"/admin/walletCashback",
				jsonpCallback :"CASHBACK_PRODUCT",
				dataType: "jsonp",
				crossDomain: true,
				data:{product_id:product_id,shop_name:WALLET.shop_name},
				success:function(response){
				// console.log(response);
				// if(response.cashback){
				//   $(".wk_cashback_product").html(response.cashback+ ' CASHBACK')
				// }
				if(response){
					$(".wk_cashback_product").html(response);
				}
				},
				error:function(response){
				console.log("something went wrong");
				}
			});
			}
	
			if($("#wk_wallet").length > 0){
				var customer_id= $("#wk_wallet").attr("customer_id");
				var customer_email = $("#wk_wallet").attr("customer_email");
				var customer_tag = $("#wk_wallet").attr("customer_tag");

				// localStorage.setItem('customer_email', email_id);
				// localStorage.setItem('customer_id', id);
				$.ajax({
					type:'POST',
					url : WALLET.api_url+"/admin/walletFront",
					jsonpCallback :"WALLET",
					dataType: "jsonp",
					crossDomain: true,
					data:{customer_id:customer_id,customer_email:customer_email,shop_name:WALLET.shop_name},
					success:function(response){
						// console.log(response);
						if(response == 0) {
							$("#wk_wallet").html("<p class='not_publish'>Customer not Exists</p>");
						}
						else {
							$("#wk_wallet").html(response);
							let searchParams = new URLSearchParams(window.location.search)
							if(searchParams.has('success')){
								let amount_added_successfully = $(".amount_added_successfully").html();
								$('.wr_has_money_err').html(amount_added_successfully).show();
								$('.wr_has_money_err').css('color','green');
							}
						}
					},
					error:function(response){
					// console.log(response);
					console.log("something went wrong");
					}
				});
		
		
				$("#wk_add_wallet").on("click",function(){
					// console.log(customer_id);
					// console.log(customer_email);
					// console.log(customer_tag);
					$.ajax({
						type:'POST',
						url : WALLET.api_url+"/admin/wallet",
						jsonpCallback :"WALLET",
						dataType: "jsonp",
						crossDomain: true,
						data:{customer_id:customer_id,customer_email:customer_email,shop_name:WALLET.shop_name},
						success:function(response){
						// console.log(response);
						if(response == 0) {
							$("#wk_wallet").html("<p class='not_publish'>Customer not Exists</p>");
						}
						else {
							// if((".money").length > 0){
							//
							// }
							// else{
							$("#wk_wallet").append(response);
							// }
						}
						},
						error:function(response){
						console.log("something went wrong");
						}
					});
				});
			}
	
			$("body").on('click','.wk_transaction_history',function(){
				$(this).css("pointer-events","none");
		  		var customer_id= $("#wk_wallet").attr("customer_id");
		  		var customer_email = $("#wk_wallet").attr("customer_email");
	
				$.ajax({
					type:'POST',
					url : WALLET.api_url+"/admin/transaction",
					jsonpCallback :"WALLET",
					dataType: "jsonp",
					crossDomain: true,
					data:{customer_id:customer_id,customer_email:customer_email,shop_name:WALLET.shop_name},
					success:function(response){
						$('.wk_transaction_history').css("pointer-events","auto");
						// console.log(response);
						if(response == 0) {
							$("#wk_wallet").html("<p class='not_publish'>Customer not Exists</p>");
						}
						else {
							var border_bottom = $(".wk_transaction_history").siblings('.active').css("border-bottom");
							$(".wk_transaction_history").siblings('.active').removeClass('active');
							$(".wk_transaction_history").siblings('span').css({"border-bottom": "none", "color": "#555"});

							$(".wk_transaction_history").css({"border-bottom": border_bottom, "color": "#333"});
							$(".wk_transaction_history").addClass('active');

							$(".wk_main_body").html(response);
							if($('.wk_status_span_pending').length > 0) {
								$('.wk_status_span_pending').parent('.wk_status_span').css('padding','0px');
							}
						}
					},
					error:function(response){
						console.log("something went wrong");
					}
		 		});
			});
	
	
			$("body").on('click','.wk_transfer_history',function() {
				var customer_id= $("#wk_wallet").attr("customer_id");
				var customer_email = $("#wk_wallet").attr("customer_email");
				if(customer_id && customer_email) {
					var offset = 0;
					var record_no = 1;
					var data = {
						customer_id:customer_id,
						customer_email:customer_email,
						offset:offset,
						record_no:record_no,
						shop_name:WALLET.shop_name
					}
					var result = transferedDetail(data);
				}else {
					console.log('customer id and email not found');
				}
			});
	
			$("body").on('click','.transfer_record_li',function(){
				var customer_id= $("#wk_wallet").attr("customer_id");
				var customer_email = $("#wk_wallet").attr("customer_email");
				if(customer_id && customer_email) {
					var record_no = $(this).text();
					if(record_no == '<') {
						var record_no = $(this).next('.transfer_record_li').text();
					}
					else if(record_no == '>') {
						var record_no = $(this).prev('.transfer_record_li').text();
					}
					if(parseInt(record_no) == 1) {
						var offset = 0;
					}
					else {
						var offset = (parseInt(record_no) - 1)*10;
					}
	
					var data = {
						customer_id:customer_id,
						customer_email:customer_email,
						offset:offset,
						record_no:record_no,
						shop_name:WALLET.shop_name
					}
					var result = transferedDetail(data);
				}else {
					console.log('customer id and email not found');
				}
			});
	
	
			$("body").on('click','.wk_refund_requests',function() {
		  		var customer_id= $("#wk_wallet").attr("customer_id");
		  		var customer_email = $("#wk_wallet").attr("customer_email");
				if(customer_id && customer_email) {
	
					$.ajax({
						type:'POST',
						url : WALLET.api_url+"/admin/transaction",
						jsonpCallback :"REFUNDREQUESTLISTING",
						dataType: "jsonp",
						crossDomain: true,
						data:{customer_id:customer_id,customer_email:customer_email,shop_name:WALLET.shop_name},
						success:function(response){
							// console.log(response);
							if(response == 0) {
								$("#wk_wallet").html("<p class='not_publish'>Customer not Exists</p>");
							}
							else {
	
								var border_bottom = $(".wk_refund_requests").siblings('.active').css("border-bottom");
								$(".wk_refund_requests").siblings('.active').removeClass('active');
								$(".wk_refund_requests").siblings('span').css({"border-bottom": "none", "color": "#555"});
	
								$(".wk_refund_requests").css({"border-bottom": border_bottom, "color": "#333"});
								$(".wk_refund_requests").addClass('active');
	
								$(".wk_main_body").html(response);
								if($('.wk_status_span_pending').length > 0) {
									$('.wk_status_span_pending').parent('.wk_status_span').css('padding','0px');
								}
							}
						},
						error:function(response){
							console.log("something went wrong");
						}
					});
				}else{
					console.log("Customer Id & email Not Found");
				}
			});
			
			$("body").on('click','.wk_dropdown-content > .refund_request',function(e){
				e.preventDefault();
				var refund_spended_amount_value = $(this).siblings('.refund_spended_amount').val();
				var refund_added_amount_value = $(this).siblings('.refund_added_amount').val();
				var currency = $(".wk_refund_request_div").find('.wk_refund_request_currency').text();
				if(refund_spended_amount_value > 0){
					$(".wk_refund_request_div").find('.wk_refunded_amt').html(currency + refund_spended_amount_value);
				}else if(refund_added_amount_value){
					$(".wk_refund_request_div").find('.wk_refunded_amt').html(currency + refund_added_amount_value);
				}
			});

			$("body").on('click','.refund_request_record_li',function() {
				var record_value= $(this).text();
				var last_page = $('#last_page').val();
				if(record_value == '>') {
					var record_value= $(this).prev('.refund_request_record_li').text();
					record_value = parseInt(record_value) + parseInt('1');
				}
				if(record_value == '<') {
					var record_value= $(this).next('.refund_request_record_li').text();
					record_value = parseInt(record_value) - parseInt('5');
				}
				var customer_id= $("#wk_wallet").attr("customer_id");
		  		var customer_email = $("#wk_wallet").attr("customer_email");
				if(parseInt(record_value)<= parseInt(last_page)) {
					$.ajax({
						type:'POST',
						url : WALLET.api_url+"/admin/transaction",
						jsonpCallback :"REFUNDREQUESTLISTING",
						dataType: "jsonp",
						crossDomain: true,
						data:{customer_id:customer_id,customer_email:customer_email,record_value:record_value,shop_name:WALLET.shop_name},
						beforeSend: function() {
							$(".wk_main_body").addClass("wm-loader").prop("disabled",true);
							$(".wk_main_body").prop("disabled",true);
						},
						complete: function() {
							$(".wk_main_body").removeClass("wm-loader").prop("disabled",false);
							$(".wk_main_body").prop("disabled",false);
						},
						success:function(response){
							// console.log(response);
							if(response == 0) {
								$("#wk_wallet").html("<p class='not_publish'>Customer not Exists</p>");
							}
							else {
								$(".wk_status").css("border-bottom","none");
								// $(".wk_transaction_history").css("border-bottom","3px solid #F56951");
								$(".wk_main_body").html(response);
								if($('.wk_status_span_pending').length > 0) {
									$('.wk_status_span_pending').parent('.wk_status_span').css('padding','0px');
								}
							}
						},
						error:function(response){
							console.log("something went wrong");
						}
					});
				}
			});
	
	
			$("body").on('click','.record_li',function() {
				var record_value= $(this).text();
				var last_page = $('#last_page').val();
				if(record_value == '>') {
					var record_value= $(this).prev('.record_li').text();
					record_value = parseInt(record_value) + parseInt('1');
				}
				if(record_value == '<') {
					var record_value= $(this).next('.record_li').text();
					record_value = parseInt(record_value) - parseInt('5');
				}
				var customer_id= $("#wk_wallet").attr("customer_id");
		  		var customer_email = $("#wk_wallet").attr("customer_email");
				if(parseInt(record_value)<= parseInt(last_page)) {
					$.ajax({
						type:'POST',
						url : WALLET.api_url+"/admin/transaction",
						jsonpCallback :"WALLET",
						dataType: "jsonp",
						crossDomain: true,
						data:{customer_id:customer_id,customer_email:customer_email,record_value:record_value,shop_name:WALLET.shop_name},
						beforeSend: function() {
							$(".wk_main_body").addClass("wm-loader").prop("disabled",true);
							$(".wk_main_body").prop("disabled",true);
						},
						complete: function() {
							$(".wk_main_body").removeClass("wm-loader").prop("disabled",false);
							$(".wk_main_body").prop("disabled",false);
						},
						success:function(response){
							// console.log(response);
							if(response == 0) {
								$("#wk_wallet").html("<p class='not_publish'>Customer not Exists</p>");
							}
							else {
								$(".wk_status").css("border-bottom","none");
								// $(".wk_transaction_history").css("border-bottom","3px solid #F56951");
								$(".wk_main_body").html(response);
								if($('.wk_status_span_pending').length > 0) {
									$('.wk_status_span_pending').parent('.wk_status_span').css('padding','0px');
								}
							}
						},
						error:function(response){
							console.log("something went wrong");
						}
					});
				}
			});
	
			$("body").on('click','.wk_popup_transfer_cancel',function(){
				$(this).parents('.wk_popup_main_div').hide();
				$(this).siblings('button').html('TRANSFER MONEY');
			});
	
	
			$("body").on('click','.wk_transfer_money',function(){
				var error = false;
				$('.wr_has_error').hide();
				var customer_id= $("#wk_wallet").attr("customer_id");
		  		var customer_email = $("#wk_wallet").attr("customer_email");
				var tranferrred_email = $(this).siblings('.wk_email_detail').val();
				var transfer_money = $(this).siblings('.wk_input_currency').find('#wk_money_input').val();
				if(!$.trim(tranferrred_email)) {
					error = true;
					var error_email = $(".blank_email").val();
					$(".wr_email_error").html(error_email).show();
				}
				else if(!(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})$/.test(tranferrred_email))) {
					error = true;
					var error_email = $(".proper_email_format").val();
					$(".wr_email_error").html(error_email).show();
				}
				if(!$.trim(transfer_money)) {
					error = true;
					var error_money = $(".blank_amount").val();
					$(".wr_transfer_money_error").html(error_money).show();
				}
				else if(!(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(transfer_money))) {
					error = true;
					var error_money = $(".wrong_amount").val();
					$(".wr_transfer_money_error").html(error_money).show();
				}
				else if((parseInt(transfer_money) < parseInt(1))) {
					error = true;
					var error_money = $(".wrong_amount").val();
					$(".wr_transfer_money_error").html(error_money).show();
				}
	
				if($.trim(tranferrred_email) == customer_email) {
					error = true;
					var error_email = $(".receiver_email").val();
					$(".wr_email_error").html(error_email).show();
				}
	
				if(!error) {
					$('.wr_has_error').hide();
					$(".wk_popup_main_div").show();
					transfer_money_detail = {tranferrred_email:tranferrred_email,transfer_money:transfer_money};
				}
			});
	
			$("body").on('click','.wk_popup_transfer_money',function(){
				var customer_id= $("#wk_wallet").attr("customer_id");
		  		var customer_email = $("#wk_wallet").attr("customer_email");
				var tranferrred_email = transfer_money_detail.tranferrred_email;
				var transfer_money = transfer_money_detail.transfer_money;
				if(customer_id && customer_email && tranferrred_email && transfer_money) {
					$(".wk_popup_main_div").hide();
					$.ajax({
						type:'POST',
						url : WALLET.api_url+"/admin/wallet_front",
						jsonpCallback :"TRANSFERMONEY",
						dataType: "jsonp",
						crossDomain: true,
						data:{
							customer_id:customer_id,
							customer_email:customer_email,
							tranferrred_email:tranferrred_email,
							transfer_money:transfer_money,
							shop_name:WALLET.shop_name
						},
						beforeSend: function() {
							$(".wk_transfer_money").addClass("wm-loader").prop("disabled",true);
							$(".wk_transfer_money").prop("disabled",true);
						},
						complete: function() {
							$(".wk_transfer_money").removeClass("wm-loader").prop("disabled",false);
							$(".wk_transfer_money").prop("disabled",false);
						},
						success:function(response){
							console.log(response);
							if(response == 400) {
								var error_occoured = $(".error_occoured").val();
								$(".wr_transfer_money_error").html(error_occoured).show();
								// $('.wk_transfer_money').html('some  error occured to transfer money');
							}
							else if(response == 401) {
								var error_occoured = $(".cus_does_not_exist").val();
								$(".wr_transfer_money_error").html(error_occoured).show();
								// $('.wk_transfer_money').html('THIS CUSTOMER DOES NOT EXIST');
							}
							else if(response == 200) {
								var successful = $(".verify_transferred_mail").val();
								$('.wk_transfer_money').html(successful);
								$('.wk_transfer_money').css('pointer-events','none');
							}
							else {
								var successful = $(".transferred_successful").val();
								$('.wk_transfer_money').html(successful);
								// setTimeout(function(){
								// 	$('.wk_transfer_money').html('TRANSFER MONEY');
								// 	window.top.location.reload();
						  // }, 5000);
							}
						},
						error:function(response){
							console.log("something went wrong");
						}
					});
				}
				else {
	
				}
			});
	
	
			$("body").on('click','.wk_add_money_btn',function(){
				var error = false;
				$(".wr_has_money_err").hide();
				var customer_id= $("#wk_wallet").attr("customer_id");
				var customer_email = $("#wk_wallet").attr("customer_email");
				var price = $("#wk_money_input").val();
				if(!$.trim(price)) {
					error = true;
					var error_money = $(".blank_amount").val();
					$(".wr_add_money_error").html(error_money).show();
				}
				else if((parseInt(price) < parseInt(1))) {
					error = true;
					var error_money = $(".wrong_amount").val();
					$(".wr_add_money_error").html(error_money).show();
				}
	
				if(!error) {
					if(customer_id && customer_email) {
	
						$(".wr_has_money_err").hide();
						$(".wk_add_money_btn").prop("disabled",true);
						$(".wr_transfer_money_error").hide();
						$.ajax({
							type:'POST',
							url : WALLET.api_url+"/admin/wallet_discount",
							jsonpCallback :"WALLET",
							dataType: "jsonp",
							crossDomain: true,
							data:{customer_id:customer_id,customer_email:customer_email,price:price,shop_name:WALLET.shop_name},
							beforeSend: function() {
								$(".wk_add_money_btn").addClass("wm-loader").prop("disabled",true);
								$(".wk_add_money_btn").prop("disabled",true);
							},
							complete: function() {
								$(".wk_add_money_btn").removeClass("wm-loader").prop("disabled",false);
								$(".wk_add_money_btn").prop("disabled",false);
							},
							success:function(response){
								console.log(response.name);
								console.log(response.checkout_link);
								if (typeof response.name === "undefined") {
									window.open(response,'_top');
								}else{
									if(response.name == 'session_id'){
										session_id = response.session_id;
										var stripe = Stripe(response.publish_key);
										stripe.redirectToCheckout({
										// Make the id field from the Checkout Session creation API response
										// available to this file, so you can provide it as parameter here
										// instead of the {{CHECKOUT_SESSION_ID}} placeholder.
										sessionId: session_id
										}).then(function (result) {
										// If `redirectToCheckout` fails due to a browser or network
										// error, display the localized error message to your customer
										// using `result.error.message`.
										console.log(result.error.message);
										});
									}else if(response.name == 'minimum_stripe_amt_err'){
										var error_money = $(".minimum_stripe_amt").val();
										$(".wr_add_money_error").html('Minimum amount should be 50 cents ').show();
									}else if(response.name == 'error') {
										console.log('this is due to have error with stripe key which is added with this app');
										$(".wr_add_money_error").html(response.error_msg).show();
									}else if(response.name == 'paypal_payment_creation'){
										window.open(response.checkout_link,'_top');
									}else if(response.name == 'paypal_payment_error'){
										$(".wr_add_money_error").html(response.msg).show();
										console.log('please check your paypal credentials');
									}else if(response.name == 'UNPROCESSABLE_ENTITY'){
										$(".wr_add_money_error").html(response.msg).show();
										console.log(response.msg);
									}
								}

							},
							error:function(response){console.log(response);
								console.log("something went wrong");
							}
						});
					}
				}
				// if(price){
				//
				//   if(price >= 1){
				//
				//   }
				// }
			});
		
			$("body").on('click','.wk_status',function(){
				var customer_id= $("#wk_wallet").attr("customer_id");
				var customer_email = $("#wk_wallet").attr("customer_email");
		
				$.ajax({
					type:'POST',
					url : WALLET.api_url+"/admin/walletFront",
					jsonpCallback :"WALLET",
					dataType: "jsonp",
					crossDomain: true,
					data:{customer_id:customer_id,customer_email:customer_email,shop_name:WALLET.shop_name},
					success:function(response){
					// console.log(response);
					if(response == 0) {
						$("#wk_wallet").html("<p class='not_publish'>Customer not Exists</p>");
					}
					else {
						$("#wk_wallet").html(response);
									var background = $('.wk_add_money_btn').css("background-color");
									background = "3px solid "+background;
									$(".wk_status").css('border-bottom',background);
									$(".wk_add_amount").css('border-bottom',background);
					}
					},
					error:function(response){
					// console.log(response);
					console.log("something went wrong");
					}
				});
			});
	
			$('body').on("click",".wk_transfer_amount",function(){
	
				$(".wk_transfer_money").css('pointer-events','auto');
				$('.wr_has_error').hide();
				$(this).siblings('.wk_add_amount').css('border-bottom','none');
				$(this).parents('.wk_transactions').siblings('.wk_add_amt').hide();
				$(this).parents('.wk_transactions').siblings('.wk_transfer_amt').show();
	
				$(this).parents('.wk_transactions').siblings('.wk_transfer_amt').children('.wk_email_detail').val('');
				$(this).parents('.wk_transactions').siblings('.wk_transfer_amt').find('#wk_money_input').val('');
				var transfer_money = $(this).parents('.wk_transactions').siblings('.wk_popup_main_div').find('.wk_popup_transfer_money').text();
				$(this).parents('.wk_transactions').siblings('.wk_transfer_amt').find('.wk_transfer_money').html(transfer_money);
	
				var background = $('.wk_add_money_btn').css("background-color");
				if(!background) {
					var background = $('.total_record').css("background-color");
				}
				$(this).css('border-bottom','3px solid '+background);
			});
	
			$('body').on("click",".wk_add_amount",function(){
				$(".wr_has_money_err").hide();
				$(this).siblings('.wk_transfer_amount').css('border-bottom','none');
				$(this).parents('.wk_transactions').siblings('.wk_add_amt').show();
				$(this).parents('.wk_transactions').siblings('.wk_transfer_amt').hide();
	
				var background = $('.wk_add_money_btn').css("background-color");
				if(!background) {
					var background = $('.total_record').css("background-color");
				}
				$(this).css('border-bottom','3px solid '+background);
			});
	
			if($( "body" ).find( "#wk_get_cashback" ).length > 0){
				var shop_name = WALLET.shop_name;
				// console.log(WALLET.api_url);
				var price_and_current_curr = cartPrice();
				var total_price = price_and_current_curr['price'];
				var current_cart_curr = price_and_current_curr['currency'];
				$.ajax({
					type:'POST',
					url : WALLET.api_url+"/admin/wallet_cart_cashback",
					jsonpCallback :"WALLET_CART",
					dataType: "jsonp",
					crossDomain: true,
					data:{total_price:total_price,current_cart_curr:current_cart_curr,shop_name:WALLET.shop_name},
					success:function(response){
					if(response){
						// console.log(response);
						$("#wk_get_cashback").html(response);
					}
					},
					error:function(response){
					console.log("something went wrong");
					}
				});
			}
			if($( "body" ).find( "#wk_pay_wallet" ).length > 0){
				a = 0;
				var customer_id= $("#wk_pay_wallet").attr("customer_id");
				var customer_email = $("#wk_pay_wallet").attr("customer_email");
				var shop_name = WALLET.shop_name;
				$.ajax({
					type:'POST',
					url : WALLET.api_url+"/admin/wallet_payment",
					jsonpCallback :"WALLET",
					dataType: "jsonp",
					crossDomain: true,
					startTime: performance.now(),
					data:{customer_id:customer_id,customer_email:customer_email,shop_name:WALLET.shop_name},
					success:function(response){

						var time = performance.now() - this.startTime;
						var seconds = time / 1000;
						seconds = seconds.toFixed(3);
						var result = 'AJAX request took ' + seconds + ' seconds to complete.';
						console.log(result);
						// console.log(response);
						if(response){
							//for zasttra by pratik
							if($(".wk_pay_wallet_cls").length>1){
								$(".wk_pay_wallet_cls").each(function(){
									$(this).html(response)
								});
							}
							else
								$("#wk_pay_wallet").html(response);
						}
					},
					error:function(response){
						console.log("something went wrong");
					}
				});
			}
			
			if($(".wk_pay_wallet_cls").length > 0) {
				//for zasttra by pratik
				$("body").on('click', '.wk_pay_wallet_cls>button', function () {
					var hrf = '/cart/';
					var discount_coupan_code = $(this).val();
					var cart_perma = $(this).parent().attr('cart_perma');
					var not_div = $(this).parent().parent().siblings('.wk-note-data').find('textarea[name="note"]');
					if(not_div.length>0)
					{
						if (not_div.val() != '')
							window.location.href = hrf + cart_perma + '?discount=' + discount_coupan_code + '&note=' + not_div.val();
						else
							window.location.href = hrf + cart_perma + '?discount=' + discount_coupan_code;
					}
					else
						window.location.href = hrf + cart_perma + '?discount='+discount_coupan_code;
				})
			}
			else
			{
				$("body").on('click', '#wk_pay_wallet>button', function () {
					var customer_id = $("#wk_pay_wallet").attr("customer_id");
					var customer_email = $("#wk_pay_wallet").attr("customer_email");
					var discount_coupan_code = $(this).val();

					if (WALLET.shop_name == "pastaldente.myshopify.com") {
						if($("#delivery-date-pro").length > 0) {

							var date = $("#delivery-date-pro").val();
							if (date == null || date == "") {
								alert('Veuillez choisr une date de livraison !');
								$('#delivery-date-pro').focus();
								return false; 
								event.preventDefault();
							// }else if($('#agree').prop('checked')==false) {
							// 	alert('Pour finaliser votre commande, veuillez accepter nos conditions générales de vente.');
							// 	return false; 
							// 	event.preventDefault();
							}else{
								var array = cartValue();
								if(typeof(variant_id[0]['auto_discount']) != "undefined" && variant_id[0]['auto_discount'] !== null) {
									createDraftOrdersMvWithDiscount(customer_id,customer_email,total_cart_price,discount_coupan_code,variant_id);
								}else{
									var hrf = '/cart/';
									$.each(variant_id,function(index, value) {
										hrf = hrf+value+',';
									});
									$length = hrf.length;
									var res = hrf.substr(0, $length-1);
									var parmalink = res+'?discount='+discount_coupan_code;
					
									var properties = '';
									$.each(properties_product_wise,function(index, value) {
										properties += '&attributes['+value.key+']='+value.value+''
									});
									parmalink = parmalink +=properties;
									parmalink = parmalink+="&attributes[Delivery-Date]="+date;
									console.log(parmalink);
									window.location.href = parmalink;
								}
							}
						}else{
							var array = cartValue();
							if(typeof(variant_id[0]['auto_discount']) != "undefined" && variant_id[0]['auto_discount'] !== null) {
								createDraftOrdersMvWithDiscount(customer_id,customer_email,total_cart_price,discount_coupan_code,variant_id);
							}else{
								var hrf = '/cart/';
								$.each(variant_id,function(index, value) {
									hrf = hrf+value+',';
								});
								$length = hrf.length;
								var res = hrf.substr(0, $length-1);
								var parmalink = res+'?discount='+discount_coupan_code;
								var properties = '';
								$.each(properties_product_wise,function(index, value) {
									properties += '&attributes['+value.key+']='+value.value+''
								});
								parmalink = parmalink +=properties;
								// console.log(parmalink);
								window.location.href = parmalink;
							}
						}
					}else{
			
						var array = cartValue();
						if(typeof(variant_id[0]['auto_discount']) != "undefined" && variant_id[0]['auto_discount'] !== null) {
							createDraftOrdersMvWithDiscount(customer_id,customer_email,total_cart_price,discount_coupan_code,variant_id);
						}else{
							var hrf = '/cart/';
							$.each(variant_id,function(index, value) {
								hrf = hrf+value+',';
							});
							$length = hrf.length;
							var res = hrf.substr(0, $length-1);
							var parmalink = res+'?discount='+discount_coupan_code;
							var properties = '';
							var extra_fields = '';
							$.each(properties_product_wise[0].value,function(index, value) {
								// console.log(value.value);
								// console.log(value.key);
								if(value.value){
									values = value.value;
									$.each(values,function(index1, value1) {
										// console.log(value1);
										if($.type(value1) == 'object'){
											
											$.each(value1,function(index2, value2) {
												properties += '&attributes['+value.key+']['+index1+']['+index2+']='+value2+''
											});
										}else{
											properties += '&attributes['+value.key+']['+index1+']='+value1+''
										}
									});
								}else{

									properties += '&attributes['+value.key+']='+value.value+''
								}
							});

							// <a href="http://your.shopify.url/cart/add"; onclick="var f = document.createElement('form'); f.style.display = 'none'; this.parentNode.appendChild(f); f.method = 'POST'; f.action = this.href; var v = document.createElement('input'); v.setAttribute('type', 'hidden'); v.setAttribute('name', 'id'); v.setAttribute('value', 'VARIANT-ID'); f.appendChild(v); var r = document.createElement('input'); r.setAttribute('type', 'hidden'); r.setAttribute('name', 'return_to'); r.setAttribute('value', '/checkout'); f.appendChild(r); var lip = document.createElement('input'); lip.setAttribute('type', 'hidden'); lip.setAttribute('name', 'properties[LABEL]'); lip.setAttribute('value', 'YOUR VALUE'); f.appendChild(lip); f.submit(); return false;">BUY NOW</a>


							console.log(properties);
							parmalink = parmalink +=properties;
							// console.log(parmalink);
							window.location.href = parmalink;
						}
					}
				});
			}

	
			$("body").on('mouseenter','.wk_main_body .wk_dropdown',function() {
				$(this).children('.wk_dropdown-content').show();
			});
			$("body").on('mouseleave','.wk_main_body .wk_dropdown',function() {
				$(this).children('.wk_dropdown-content').hide();
			});
	
			$("body").on('click','.wk_refund_request_cancle',function(){
				$(".wk_request_refund_div").hide();
				$(".wk_refund_request").hide();
			});
	
			$("body").on('click','.wk_refund_request_btn',function(){
				var customer_id= $("#wk_wallet").attr("customer_id");
				var customer_email = $("#wk_wallet").attr("customer_email");
				var id_order_payment = $('.wk_request_active').siblings('.id_order_payment').val();
				var added_amount = $('.wk_request_active').siblings('.refund_added_amount').val();
				var spended_amount = $('.wk_request_active').siblings('.refund_spended_amount').val();
				if(added_amount > 0) {
					var total_amount = added_amount;
				}else{
					var total_amount = spended_amount;
				}
				var order_id = $('.wk_request_active').siblings('.order_id').val();
				$('.wk_request_active').removeClass('active');
				var requested_amount = $('.wk_refund_request_input').val();
				if((requested_amount > 0) && (parseFloat(requested_amount) <= parseFloat(total_amount))) {
					$.ajax({
						type:'POST',
						url : WALLET.api_url+"/admin/transaction",
						jsonpCallback :"REFUNDREQUEST",
						dataType: "jsonp",
						crossDomain: true,
						data:{customer_id:customer_id,customer_email:customer_email,id_order_payment:id_order_payment,requested_amount:requested_amount,shop_name:WALLET.shop_name},
						beforeSend: function() {
							$(".wk_refund_request_btn").addClass("wm-loader").prop("disabled",true);
							$(".wk_refund_request_btn").prop("disabled",true);
						},
						complete: function() {
							$(".wk_refund_request_btn").removeClass("wm-loader").prop("disabled",false);
							$(".wk_refund_request_btn").prop("disabled",false);
						},
						success:function(response){
							// console.log(response);
							if(response == 0) {
								$("#wk_wallet").html("<p class='not_publish'>Customer not Exists</p>");
							}
							else {
								$(".wk_status").css("border-bottom","none");
								$(".wk_status").css("color","#555");
								$(".wk_request_refund_div").hide();
								$(".wk_refund_request").hide();
								$(".wk_refund_requests").trigger('click');
							}
						},
						error:function(response){
							console.log("something went wrong");
						}
					});
				}
			});
	
			$("body").on('click','.wk_dropdown-content a',function(e){
				e.preventDefault();
				var added_amount = $(this).siblings('.refund_added_amount').val();
				var spended_amount = $(this).siblings('.refund_spended_amount').val();
				if(added_amount > 0) {
					var total_amount = added_amount;
				}else{
					var total_amount = spended_amount;
				}
				$('.wk_refund_request_input').val(total_amount);
				$(".wk_request_refund_div").show();
				$(".wk_refund_request").show();
				$(this).addClass('wk_request_active');
			});
		
		});

	}).call(this);
	
	
	// if($('body').find('#wk_wallet').length > 0){
	// 	WALLET.loadScript("https://www.paypal.com/sdk/js?client-id=AQzCacTp7SDakIZiVpwMGc4GM3dsuZHTpJe5EH4eyeumhG2uLt9U-QtKAjbyWeg5wlYjr2J3Aw0t484m",function(){
	// 		return true;
	// 	});
		
	// }
	
	
	function transferedDetail(data) {
		$.ajax({
			type:'POST',
			url : WALLET.api_url+"/admin/wallet_transfer_history",
			jsonpCallback :"TRANSFERHISTORY",
			dataType: "jsonp",
			crossDomain: true,
			data:data,
			beforeSend: function() {
				$(".wk_main_body").addClass("wm-loader").prop("disabled",true);
				$(".wk_main_body").prop("disabled",true);
			},
			complete: function() {
				$(".wk_main_body").removeClass("wm-loader").prop("disabled",false);
				$(".wk_main_body").prop("disabled",false);
			},
			success:function(response){
				// console.log(response);
				if(response == 0) {
					$("#wk_wallet").html("<p class='not_publish'>Customer not Exists</p>");
				}
				else {
	
					var border_bottom = $(".wk_transfer_history").siblings('.active').css("border-bottom");
					$(".wk_transfer_history").siblings('.active').removeClass('active');
					$(".wk_transfer_history").siblings('span').css({"border-bottom": "none", "color": "#555"});
	
					$(".wk_transfer_history").css({"border-bottom": border_bottom, "color": "#333"});
					$(".wk_transfer_history").addClass('active');
	
					$(".wk_main_body").html(response);
					if($('.wk_status_span_pending').length > 0) {
						$('.wk_status_span_pending').parent('.wk_status_span').css('padding','0px');
					}
				}
			},
			error:function(response){
				console.log("something went wrong");
			}
		});
	}

	// create draft order for multiple variants
	function createDraftOrdersMvWithDiscount(customer_id,customer_email,total_cart_price,title,variants_array) {
		variants_array = JSON.stringify(variants_array);
		$.ajax({
			type:'POST',
			url : WALLET.api_url+"/admin/wallet_discount",
			jsonpCallback :"DRAFT_ORDER_MULTIPLE_VARIANT",
			dataType: "jsonp",
			crossDomain: true,
			data:{customer_id:customer_id,customer_email:customer_email,title:title,total_cart_price:total_cart_price,variants_array:variants_array,shop_name:WALLET.shop_name},
			beforeSend: function() {
				$(".wk_add_money_btn").addClass("wm-loader").prop("disabled",true);
				$(".wk_add_money_btn").prop("disabled",true);
			},
			complete: function() {
				$(".wk_add_money_btn").removeClass("wm-loader").prop("disabled",false);
				$(".wk_add_money_btn").prop("disabled",false);
			},
			success:function(response){
				console.log(response);
				window.open(response,'_top');
			},
			error:function(response){
				console.log("something went wrong");
			}
		});
	}
	
	function cartPrice() {
	  price = 0;
	  $.ajax({
		type:'GET',
		url :"cart.js",
		dataType: "json",
		contentType:"application/json",
		async: false,
		success:function(response){
		  // console.log(response);
		  price = (response['total_price']/100);
		  currency = response['currency'];
		}
	  });
		price_and_current_curr = {}
		price_and_current_curr ["price"] = price;
		price_and_current_curr ["currency"] = currency;
		return price_and_current_curr;
	}
	
	function cartValue(){
	  var hf='/';
	  
	properties_product_wise = new Array();
	  var a = 0 ;
	  $.ajax({
		type:'GET',
		url :"cart.js",
		dataType: "json",
		contentType:"application/json",
		async: false,
		success:function(response){
			console.log(response);
			if(typeof(response['cart_level_discount_applications'][0]) != "undefined" && response['cart_level_discount_applications'][0] !== null) {
				variant_id = [[],[]];
				total_cart_price =  response['original_total_price'] / 100;
				$.each(response['items'],function(index, value) {
					var id = value.id;
					var quantity = value.quantity;

					variant_id[index] = {};
					variant_id[index]["id"] = id;
					variant_id[index]["quantity"] = quantity;
					variant_id[index]["auto_discount"] = true;

					// variant_id.push(id_quantity);
					// if(value.properties) {
					// 	properties_values = '';
					// 	$.each(value.properties,function(index,value){
					// 		properties_values+= index+':'+value+',';
					// 	});
					// 	properties_product_wise.push({
					// 		key: value.product_title,
					// 		value: properties_values
					// 	});
					// }
				});
			}else{
				variant_id = new Array();
				$.each(response['items'],function(index, value) {
					var id = value.id;
					var quantity = value.quantity;
					var id_quantity = id+':'+quantity;
					// variant_id.push(value.id);
					variant_id.push(id_quantity);
					if(value.properties) {
						// properties_values = '';
						properties_values = new Array();
						$.each(value.properties,function(index,value){
							// properties_values+= index+':'+value+',';

							properties_values.push({
								key: index,
								value: value
							});
							if($.isArray(value)){
								more_properties_value = new Array();
								$.each(value,function(index1,value1){
									more_properties_value.push({
										key: index1,
										value: value1
									});
								});
								properties_values.push({
									key: index,
									value: more_properties_value
								});
							}

						});
						properties_product_wise.push({
							key: value.product_title,
							value: properties_values
						});
					}
				});
			}
			console.log(variant_id);
		},
		error:function(response){
		  console.log('error');
		}
	  });
	  console.log(properties_product_wise);
	//   return variant_id;
	  // return hf;
	}

	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*0.5*60*60*1000));
		var expires = "expires="+ d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
	
	
	
	function getCookie(cname) {
	  var name = cname + "=";
	  var decodedCookie = decodeURIComponent(document.cookie);
	  var ca = decodedCookie.split(';');
	  for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
		  c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
		  return c.substring(name.length, c.length);
		}
	  }
	  return "";
	}

	function setSession(cname,cvalue) {
		sessionStorage.setItem(cname, cvalue);
	}
	function getSession(cname) {
		sessionStorage.getItem(cname);
	}

