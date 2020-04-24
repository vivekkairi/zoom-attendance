chrome.runtime.onMessage.addListener(gotmsg);
var A = []
var B = []
var A_absent=[]
var B_absent=[]

var go = true
var popup = null

function gotmsg(msg, sender, sendResponse){
    if(msg['msg'] == 'start'){
        A = []
        B = []
        A_absent=[]
        B_absent=[]
        setInterval(()=>{
            var participants = document.querySelectorAll('.participants-item__display-name')
            var nameList = []

            for(let participant of participants){
                nameList.push(participant.innerText)
            }
            for(var i=0;i<nameList.length;i++){
                var [div,roll,temp] = nameList[i].split('_')
                if(div == 'A' || div == 'a'){
                    if(!A.includes(parseInt(roll,10)))
                        A.push(parseInt(roll,10))
                }else if(div == 'B' || div == 'b') {
                    if(!B.includes(parseInt(roll,10)))
                        B.push(parseInt(roll,10))
                }
            }
        }, 600000)
    }else {
        console.log("A Present: ", A)
        console.log("B Present: ", B)
        modal()
    }
}


function modal(){

    const div = document.createElement('div');

      div.className = 'sabrow';
      div.style.cssText = "display: block; width: 500px; position: absolute; z-index: 9999 !important; background: white; top: 50px; left: 0; right: 0; margin: 0 auto; border-radius: 10px; padding: 20px; box-shadow: 0 0 20px rgba(0,0,0,0.3);";

      textarea = '<textarea cols="50" rows="6">'
      textarea += "A Absent: " + A_absent + "\n"
      textarea += "B Absent: " + B_absent
      textarea = textarea + "</textarea>"

      div.innerHTML = `
        <h1 style="font-size:24px; font-weight:600; margin-bottom:20px;">Copy Attendance</h1>
        ` + textarea + `
      `;

    document.querySelector('body').appendChild(div);
}