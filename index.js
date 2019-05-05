$(document).on('click', "[data-amplitude-event]", function () {

  var object;
  if($(this).data('amplitude-object')===undefined) {
    console.log('amplitude object undefined!');
    return;
  }else{
    object = $(this).data('amplitude-object');
    amplitude_push($(this).data('amplitude-event'), object);
  }
});

$('html').click(function(e) {
  if(!$(e.target).data("amplitude-event") && !$(e.target).hasClass("onclick-event")) {
    amplitude.getInstance().logEvent("NotEvent", {
      Url : document.location.href,
      El : e.target.outerHTML
    });
  }
});


function amplitude_push(event, object) {

  //라스트 이벤트를 가져온다.
  var LastEvent = getCookie('LastEvent');
  var LastEventObject = getCookie('LastEventObject');

  //스트링으로 들어왔으면 오브젝트로 변환.
  if(typeof object == "string"){
    object = JSON.parse(object);
  }

  //오브젝트에 라스트이벤트를 푸쉬
  object.LastEvent = LastEvent===undefined?'null':LastEvent;
  object.LastEventObject = LastEventObject===undefined?'null':JSON.parse(LastEventObject);

  amplitude.getInstance().logEvent(event, object);



  object.LastEvent = undefined;
  object.LastEventObject = undefined;
  setCookie('LastEvent', event);
  setCookie('LastEventObject', JSON.stringify(object).replace(/[\u007f-\uffff]/g,
    function(c) {
      return '\\u'+('0000'+c.charCodeAt(0).toString(16)).slice(-4);
    }
  ));

}

