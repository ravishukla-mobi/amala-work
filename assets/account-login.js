var countdownTimer = '';
function startcountdown(activeForm) {
    let timeleft = 30;
    countdownTimer = setInterval(function() {
        if(timeleft <= 0 || $(activeForm).find('.resend-otp-text.active').length == 0) {
            clearInterval(countdownTimer);
            $(activeForm).find('.resend-otp-text').html('Didn\'t get the OTP? <a href="javascript: void(0);" onclick="resendotp(\''+activeForm.attr('id')+'\');">Resend now.</a>');
        } else {
            $(activeForm).find('.resend-otp-text').html('Didn\'t get the OTP? Resend in '+timeleft+' seconds');
        }
        timeleft -= 1;
    }, 1000);
}

var showUpdatedLoader = false;
var devicetype = navigator.userAgent.toLowerCase();
var isAndroid = devicetype.indexOf("android") > -1;
let userAgent = navigator.userAgent;
let browserName;
if(userAgent.match(/chrome|chromium|crios/i)){
    browserName = "chrome";
    } else {
    browserName=null;
}
if(browserName == 'chrome' && window.innerWidth < 480 && isAndroid){
    showUpdatedLoader = true;
}
function addoverlayAccountLogin() {
    history.pushState(null, null, location.href);
    window.onpopstate = function(event) {
        history.go(1);
    };
    $('<div class="custom-overlay account-custom-overlay"><div class="overlay__inner"><div class="overlay__content"><div class="spinner_overlay_container"><span class="spinner"></span></div><div><p class="account_otp_loader_text">This may take a moment, please wait while we fetch your OTP</p></div></div></div></div>').appendTo(document.body);
};

function resendotp(activeFormId) {
    event.preventDefault();
    $('.otp-err-msg').html('');
    if(activeFormId == 'login-with-otp') {
     var activeForm = $('#login-with-otp');
     var phonenumberInput = $('.login-with-otp input[name="customer-phonenumber"]');
     var phonenumberlength = $('.login-with-otp input[name="customer-phonenumber"]').val().length;
    } else if(activeFormId == 'create_customer') {
     var activeForm = $('#create_customer');
     var phonenumberInput = $('#create_customer input[name="customer[phone]"]');
     var phonenumberlength = $('#create_customer input[name="customer[phone]"]').val().length;
    }
    if(phonenumberlength < 10 || phonenumberlength > 10) {
        phonenumberInput.next().remove('div');
        $('<div class="is-invalid invalid-feedback">Please enter a 10 digit mobile number without any special characters.</div>').insertAfter(phonenumberInput);
        return false;
    }

    if(showUpdatedLoader){
        addoverlayAccountLogin();
    } else {
        addoverlay();
    }
    
    $.ajax({
        url: theme.apiUrl,
        type: 'POST',
        dataType: 'JSON',
        data: {
            phone_number: '+91'+phonenumberInput.val(),
            form_type: 'login_user',
            app_key: '1152360221919110',
            isresend: true
        },
        success: function(response) {
            otpSuccess(activeForm,response,'false');
        }, error: function(xhr) {
            otpError(activeForm,xhr,'true');
        }
    });
}

function sendotp(form_label) {
    event.preventDefault();
    $('.otp-err-msg').html('');
    if(form_label == 'login_user') {
     var activeForm = $('.login-with-otp');

     var phonenumberInput = $('.login-with-otp input[name="customer-phonenumber"]');
     var phonenumberlength = $('.login-with-otp input[name="customer-phonenumber"]').val().length;
    } else if(form_label == 'register_user') {
     var form_label = 'login_user';
     var activeForm = $('#create_customer');
     var phonenumberInput = $('#create_customer input[name="customer[phone]"]');
     var phonenumberlength = $('#create_customer input[name="customer[phone]"]').val().length;
    }

    if(phonenumberlength < 10 || phonenumberlength > 10) {
        phonenumberInput.next().remove('div');
        $('<div class="is-invalid invalid-feedback">Please enter a 10 digit mobile number without any special characters.</div>').insertAfter(phonenumberInput);
        return false;
    }
    if(showUpdatedLoader){
        addoverlayAccountLogin();
    } else {
        addoverlay();
    }
    $.ajax({
        url: theme.apiUrl,
        type: 'POST',
        dataType: 'JSON',
        data: {
            phone_number: '+91'+phonenumberInput.val(),
            form_type: form_label,
            app_key: '1152360221919110'
        },
        success: function(response) {
            otpSuccess(activeForm,response,'false');
        }, error: function(xhr) {
            otpError(activeForm,xhr,'false');
        }
    });
}
function otpSuccess(activeForm,response,resendOtp){
    // Verify a phone number WebOTP API
    if ('OTPCredential' in window) {
        var ac = new AbortController();
        navigator.credentials.get({
            otp: { transport:['sms'] },
            signal: ac.signal
        }).then(otp => {
            var otpInput = document.getElementById('customer-otp');
            otpInput.value = otp.code;
            if(showUpdatedLoader == true){
                $('.custom-overlay').remove();
            }
            document.querySelectorAll('.loginbutton')[0].click();
            $('.custom-overlay').remove();
            addoverlay();
        }).catch(err => { });
    }
    if(showUpdatedLoader != true){
        removeoverlay();
    }
    
    if(resendOtp == 'false'){
        activeForm.find('.otpinput').removeClass('hide');
        activeForm.find('#editPhone').removeClass('hide');
        activeForm.find('#registerEditPhone').removeClass('hide');
        activeForm.find('.phone_input_wrap').addClass('active_edit');
        activeForm.find('.resend-otp-text').addClass('active').removeClass('hide');
        activeForm.find('.otpbutton').addClass('hide');
        activeForm.find('.loginbutton').removeClass('hide');
        activeForm.find('.login-with-password-link').removeClass('hide');
        activeForm.find('.register-link').removeClass('hide');
        activeForm.find('.terms_privacy_link').addClass('hide');
    }
    startcountdown(activeForm);
    setTimeout(() => {
        $('.custom-overlay').remove();
    }, 30000);
}
function otpError(activeForm,xhr,resendOtp){
    removeoverlay();
    if(xhr.status == 429) {
        activeForm.find('.otp-err-msg').html('Too many requests, try again later.');
    }
    if(xhr.status == 403) {
        activeForm.find('.otp-err-msg').html('Access denied, try again later.');
    }
    if(xhr.status == 500) {
        activeForm.find('.otp-err-msg').html('Something went wrong, try again later.');
    }
    if(xhr.status == 400) {
        activeForm.find('.otp-err-msg').html('OTP couldn\'t be sent, please try again later.');
    }
    if(xhr.status == 409) {
        activeForm.find('.otp-err-msg').html('This email or phone number is already registered.');
    }
    if(xhr.status == 404) {
        if(resendOtp == 'true'){
            activeForm.find('.otp-err-msg').html('Account not found, please create an account.');
        }else{
            $('.Login-user-form-wrapper').addClass('hide');
            $('.register-user-form-wrapper').removeClass('hide');
            $('#create_customer input[name="customer[phone]"]').val($('.login-with-otp input[name="customer-phonenumber"]').val())
        }
    }
    if(xhr.status != 404) {
        startcountdown(activeForm);
    }
    setTimeout(function() {
     activeForm.find('.otp-err-msg').html('');
    }, 5000);
}

function getlogintoken(form_label) {
    event.preventDefault();
    var phoneflag = true; var otpflag = true;
    if(form_label == 'login_user') {
     var activeForm = $('.login-with-otp');
     
     var phonenumberInput = $('.login-with-otp input[name="customer-phonenumber"]');
     var phonenumberlength = $('.login-with-otp input[name="customer-phonenumber"]').val().length;
     var otpInput = $('.login-with-otp input[name="customerOTP"]');
     var otplength = $('.login-with-otp input[name="customerOTP"]').val().length;
    } else if(form_label == 'register_user') {
     var activeForm = $('#create_customer');
     var customerData = $('#create_customer');
     var phonenumberInput = $('#create_customer input[name="customer[phone]"]');
     var phonenumberlength = $('#create_customer input[name="customer[phone]"]').val().length;
     var otpInput = $('#create_customer input[name="customerOTP"]');
     var otplength = $('#create_customer input[name="customerOTP"]').val().length;
    }
    var activeForm = otpInput.closest('form');
    if(phonenumberlength < 10 || phonenumberlength > 10) {
        phoneflag = false;
        phonenumberInput.siblings('div.is-invalid').remove();
        $('<div class="is-invalid invalid-feedback">Please enter a 10 digit mobile number without any special characters.</div>').insertAfter(phonenumberInput);
    }
    
    if(otplength < parseInt(theme.otpLength) || otplength > parseInt(theme.otpLength)) {
        otpflag = false;
        otpInput.siblings('div.is-invalid').remove();
        $('<div class="is-invalid invalid-feedback">Please enter 6 digit OTP.</div>').insertAfter(otpInput);
    }
    if(!phoneflag || !otpflag) {
        return false;
    }

    if(showUpdatedLoader){
        addoverlayAccountLogin();
    } else {
        addoverlay();
    }
   var data = {
       phone_number: '+91'+phonenumberInput.val(),
       token: otpInput.val(),
       form_type: form_label,
       app_key: '1152360221919110'
   };
   if(customerData) {
     data.customer_data = customerData.serialize();
   }
   
     $.ajax({
        url: theme.apiUrl,
        type: 'POST',
        dataType: 'JSON',
        data: data,
        success: function(response) {
           console.log('response',response);
           if(response.status == 'success'){
             $('.Login-user-form-wrapper').removeClass('hide').addClass('hide');
             $('.register-user-form-wrapper').removeClass('hide');
             $('#customer-phone').val($('#customer-phonenumber').val()).parent('.form__input-wrapper').addClass('hide');
             $('.register-user-form-wrapper #customer-otp').val($('.Login-user-form-wrapper #customer-otp').val()).addClass('hide');
             $('.register-user-form-wrapper .otpbutton').addClass('hide');
             $('.register-user-form-wrapper .loginbutton').removeClass('hide');
           }else{
            let return_to = '/';
            if(window.location.search){
                let searchValue = searchLocation();
                if(searchValue.return_to != 'order'){
                    return_to = searchValue.reValue;
                }else{
                    return_to = 'account';
                }
            }else{
                return_to = 'account';
            }
            window.location.href = 'https://amala.earth/account/login/multipass/'+response.token+'/?return_to='+return_to;
            localStorage.setItem('themeUserNew',true);
           }
              setTimeout(function() {
             removeoverlay();
              }, 2000);
        }, error: function(xhr) {
              removeoverlay();
           var responseText = JSON.parse(xhr.responseText);
            activeForm.find('.otp-err-msg').html(responseText.message);
            setTimeout(function() {
                activeForm.find('.otp-err-msg').html('');
            }, 5000);
        }
    });
}

$(document).on('click','#editPhone',function(){
 var activeForm = $(this).closest('#customer_login');
 activeForm.find('.otpinput').addClass('hide');
 activeForm.find('#editPhone').addClass('hide');
 activeForm.find('.phone_input_wrap').removeClass('active_edit');
 activeForm.find('.resend-otp-text').addClass('hide').removeClass('active');
 activeForm.find('.otpbutton').removeClass('hide');
 activeForm.find('.loginbutton').addClass('hide');
 activeForm.find('.login-with-password-link').addClass('hide');
 activeForm.find('.register-link').addClass('hide');
 activeForm.find('.terms_privacy_link').removeClass('hide');
 $('#customer-otp').val('');
});

$(document).on('click','#registerEditPhone',function(){
 var activeForm = $(this).closest('#create_customer');
 activeForm.find('#registerEditPhone').addClass('hide');
 activeForm.find('.phone_input_wrap').removeClass('active_edit');
 activeForm.find('.otpinput').addClass('hide');
 activeForm.find('.resend-otp-text').addClass('hide');
 activeForm.find('.otpbutton').removeClass('hide');
 activeForm.find('.loginbutton').addClass('hide');
});

$('.customer-phonenumber').on('keyup', function() {
    var phonenumberlength = $(this).val().length;
    $(this).next().remove('div');
    if(phonenumberlength < 10 || phonenumberlength > 10) {
        $('<div class="is-invalid invalid-feedback">Please enter a 10 digit mobile number without any special characters.</div>').insertAfter(this);
    }
});

$('.customer-otp').on('keyup', function() {
    var otplength = $(this).val().length;
    $(this).next().remove('div');
    if(otplength < parseInt(theme.otpLength) || otplength > parseInt(theme.otpLength)) {
        $('<div class="is-invalid invalid-feedback">Please enter the 6 digit OTP received on your phone.</div>').insertAfter(this);
    }
});

$('.customer-phonenumber').on('keydown', function(e) {
    if(!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 47 && e.keyCode < 58)
      || e.keyCode == 8)) {
        return false;
    }
});

$('.customer-otp').on('keydown', function(e) {
    if(!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 47 && e.keyCode < 58)
      || e.keyCode == 8)) {
        return false;
    }
});

$(document).on('submit','#create_customer',function(){
    localStorage.setItem('themeUserNew',true)
});

$(document).ready(function(){
    $('input#customer-phonenumber').focus();
    $('.login-with-password-link').click(function(){
        $('.Login-user-form-wrapper').removeClass('hide')
        $('.login-with-otp').addClass('hide');
        $('.loginbutton').addClass('hide');
        $('.login-with-password').removeClass('hide');
        $('.login-with-otp').find('input').val('');
        $('.login-with-password').find('input').val('');
        clearInterval(countdownTimer);
    });
    $('.login-with-otp-link').click(function(){
        $('.Login-user-form-wrapper').removeClass('hide')
        $('.login-with-password').addClass('hide');
        $('.login-with-otp').removeClass('hide');
        $('.login-with-otp').find('input').val('');
        $('.otpinput').addClass('hide');
        $('.resend-otp-text').addClass('hide');
        $('.otpbutton').removeClass('hide');
        $('.loginbutton').addClass('hide');
        $('.login-with-password').find('input').val('');
        $('.Login-user-form-wrapper .phone_input_wrap').removeClass('active_edit');
        $('#editPhone').addClass('hide');
    });
    $('.register-link').click(function(){
       $('.Login-user-form-wrapper').addClass('hide');
       $('.register-user-form-wrapper').removeClass('hide');
       $('#customer-phone').val($('#customer-phonenumber').val()).parent('.form__input-wrapper').removeClass('hide');
       $('.register-user-form-wrapper #customer-otp').val('').removeClass('hide');
       $('.register-user-form-wrapper .otpbutton').removeClass('hide');
       $('.register-user-form-wrapper .loginbutton').addClass('hide');
       $('#create_customer')[0].reset();
       $('.phone_input_wrap').removeClass('active_edit');
       $('#registerEditPhone').addClass('hide');
    });
    $('.login-link').click(function(){
       $('.register-user-form-wrapper').addClass('hide');
       $('.Login-user-form-wrapper').removeClass('hide');
       var activeForm = $('#customer_login');
       activeForm.find('.otpinput').addClass('hide');
       activeForm.find('#editPhone').addClass('hide');
       activeForm.find('.phone_input_wrap').removeClass('active_edit');
       activeForm.find('.resend-otp-text').addClass('hide').removeClass('active');
       activeForm.find('.otpbutton').removeClass('hide');
       activeForm.find('.loginbutton').addClass('hide');
       activeForm.find('.login-with-password-link').addClass('hide');
       activeForm.find('.register-link').addClass('hide');
       activeForm.find('.terms_privacy_link').removeClass('hide');
       $('#customer-otp').val('');
       $('#customer_login')[0].reset();
    });
    if(window.location.search){
        let searchValue = searchLocation();
        const reValue = searchValue.reValue;
        const return_to = searchValue.return_to;
        if(localStorage.getItem('themeDisBanner') == 'true'){
            $('#create_customer').append(`<input type="hidden" name="return_to" value="/" />`);
            $('#customer_login').append(`<input type="hidden" name="return_to" value="/" />`);
        }else{
            $('#create_customer').append(`<input type="hidden" name="${return_to}" value="${reValue}" />`);
            $('#customer_login').append(`<input type="hidden" name="${return_to}" value="${reValue}" />`);
        }
    }
});

function searchLocation(){
    let reValue = '/';
    let return_to = 'return_to';
    if(window.location.search.includes('order=')){
        let searchval = window.location.search.split('order=')[1];
        return_to = 'order';
        reValue = searchval;
    }else if(window.location.search.includes('return_url=')){
        let searchval = window.location.search.split('return_url=')[1];
        reValue = searchval;
    }else{
        reValue = window.location.search;
    }
    return {reValue:reValue,return_to:return_to};
}