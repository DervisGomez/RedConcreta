var key="TEST-babe268e-4653-4666-b374-104d22ee885b"
Mercadopago.setPublishableKey(key);
console.log(Mercadopago.getIdentificationTypes());

function addEvent(el, eventName, handler){
    if (el.addEventListener) {
    	alert("1");
           el.addEventListener(eventName, handler);
    } else {
    	alert("2");
        el.attachEvent('on' + eventName, function(){
          handler.call(el);
        });
    }
};

function getBin() {
	alert("3");
    var ccNumber = document.querySelector('input[data-checkout="cardNumber"]');
    return ccNumber.value.replace(/[ .-]/g, '').slice(0, 6);
};

function guessingPaymentMethod(event) {
    var bin = getBin();

    if (event.type == "keyup") {
    	alert("4");
        if (bin.length >= 6) {
        	alert("5");
            Mercadopago.getPaymentMethod({
                "bin": bin
            }, setPaymentMethodInfo);
        }
    } else {
    	alert("6");
        setTimeout(function() {
            if (bin.length >= 6) {
            	alert("7");
                Mercadopago.getPaymentMethod({
                    "bin": bin
                }, setPaymentMethodInfo);
            }
        }, 100);
    }
};

function setPaymentMethodInfo(status, response) {
    if (status == 200) {
        // do somethings ex: show logo of the payment method
        var form = document.querySelector('#pay');

        if (document.querySelector("input[name=paymentMethodId]") == null) {
        	alert("8");
            var paymentMethod = document.createElement('input');
            paymentMethod.setAttribute('name', "paymentMethodId");
            paymentMethod.setAttribute('type', "hidden");
            paymentMethod.setAttribute('value', response[0].id);

            form.appendChild(paymentMethod);
        } else {
        	alert("9");
            document.querySelector("input[name=paymentMethodId]").value = response[0].id;
        }
    }
};

addEvent(document.querySelector('input[data-checkout="cardNumber"]'), 'keyup', guessingPaymentMethod);
addEvent(document.querySelector('input[data-checkout="cardNumber"]'), 'change', guessingPaymentMethod);

doSubmit = false;
addEvent(document.querySelector('#pay'),'submit',doPay);
function doPay(event){
    event.preventDefault();
    alert("10");
    if(!doSubmit){
    	alert("11");
        var $form = document.querySelector('#pay');
        
        Mercadopago.createToken($form, sdkResponseHandler); // The function "sdkResponseHandler" is defined below

        return false;
    }
};

function sdkResponseHandler(status, response) {
    if (status != 200 && status != 201) {
    	alert("12");
        alert("verify filled data");
    }else{
       alert("13");
        var form = document.querySelector('#pay');

        var card = document.createElement('input');
        card.setAttribute('name',"token");
        card.setAttribute('type',"hidden");
        card.setAttribute('value',response.id);
        form.appendChild(card);
        doSubmit=true;
        form.submit();
    }
};


