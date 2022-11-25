var $TAKE_INPUT  = `#takeInput`, 
  $LOG           = `#log`,
  $URL_          = `#urlPath`,
  $CMDS          = `#commands li`,
  $TERMINAL_NAME = `#terminalName`,
  $RESUME_HTML   = `#resumeHtml`,
  $PRESS_ENTER   = `.pressEnter`;


const detectdeviceName = () => {
  return new Promise((resolve, reject) => {
    let module={options:[],header:[navigator.platform,navigator.userAgent,navigator.appVersion,navigator.vendor,window.opera],dataos:[{name:"Windows Phone",value:"Windows Phone",version:"OS"},{name:"Windows",value:"Win",version:"NT"},{name:"iPhone",value:"iPhone",version:"OS"},{name:"iPad",value:"iPad",version:"OS"},{name:"Kindle",value:"Silk",version:"Silk"},{name:"Android",value:"Android",version:"Android"},{name:"PlayBook",value:"PlayBook",version:"OS"},{name:"BlackBerry",value:"BlackBerry",version:"/"},{name:"Macintosh",value:"Mac",version:"OS X"},{name:"Linux",value:"Linux",version:"rv"},{name:"Palm",value:"Palm",version:"PalmOS"}],databrowser:[{name:"Chrome",value:"Chrome",version:"Chrome"},{name:"Firefox",value:"Firefox",version:"Firefox"},{name:"Safari",value:"Safari",version:"Version"},{name:"Internet Explorer",value:"MSIE",version:"MSIE"},{name:"Opera",value:"Opera",version:"Opera"},{name:"BlackBerry",value:"CLDC",version:"CLDC"},{name:"Mozilla",value:"Mozilla",version:"Mozilla"}],init:function(){var a=this.header.join(" "),n=this.matchItem(a,this.dataos),r=this.matchItem(a,this.databrowser);return{os:n,browser:r}},matchItem:function(a,n){var r,o,i,l,s,v=0,m=0;for(v=0;v<n.length;v+=1)if(i=(r=RegExp(n[v].value,"i")).test(a)){if(o=RegExp(n[v].version+"[- /:;]([\\d._]+)","i"),l=a.match(o),s="",l&&l[1]&&(l=l[1]),l)for(m=0,l=l.split(/[._]+/);m<l.length;m+=1)0===m?s+=l[m]+".":s+=l[m];else s="0";return{name:n[v].name,version:parseFloat(s)}}return{name:"unknown",version:0}}};var e=module.init();resolve({osName:e.os.name,browserName:e.browser.name,platForm:navigator.platform});
  });
};
const moveCursorToEnd = function(el, focused) {
  if (typeof el.selectionStart == "number") {
    el.selectionStart = el.selectionEnd = el.value.length;
  } else if (typeof el.createTextRange != "undefined") {
    if(!focused)
      el.focus();
      var range = el.createTextRange();
      range.collapse(false);
      range.select();
  }
  if(!focused)
    el.focus();
}

window.onload         = function() {
  document.onkeydown  = detectKey;
  //MOVE CURSOR TO END
  elem = document.getElementById($TAKE_INPUT.replace("#","").trim());
  moveCursorToEnd(elem);
};

const detectKey    = (e) => {
  e = e || window.event;
  if (e.keyCode == '13') {
    printLog();    
  }
}

const printLog    = () => {
  $($LOG).html(`
    <div class="row mt-5">
      <div class="col-md-5">
        <img src="./images/cv.png" width="480px">
      </div>
      <div class="col-md-7">
        <p>Sunny Singh</p>
        <p id="urlPath"></p><br/>
        <p>LinkedIn: <a href="https://www.linkedin.com/in/sunny-singh-38a52b113" target="_blank">https://www.linkedin.com/in/sunny-singh-38a52b113</a></p><br/>
        <caption>** Click on commands these commands to view my resume..</caption>
        <ul type="none" id="commands" class="commands">
          <li rel="aboutMe">About Me</li>
          <li rel="contact">Contact Info</li>
          <li rel="education">Education</li>
          <li rel="experience">Work Experience</li>
          <li rel="projects">Projects</li>
          <li rel="skills">Skills</li>
          <li rel="languages">Languages</li>
        </ul>
      </div>
    </div>
  `);
}

(async function () {
  //PRINT DEVICE NAME
  let deviceName = await detectdeviceName();
  $($TERMINAL_NAME).html(`${deviceName.osName}/${deviceName.platForm}/${deviceName.browserName}`);

  // GET MONTH AND YEAR
  var getMonthAndYear = () => { let month = new Date().getMonth() + 1; month = (month < 10)? "0"+month: month; return month+"/"+new Date().getFullYear() }
  
  //GET CURRENT DATE AND TIME
  setInterval(() => {
    let monthsNames = { 1:"Jan",2:"Feb",3:"Mar",4:"April",5:"May",6:"June",7:"July",8:"Aug",9:"Sep",10:"Oct",11:"Nov",12:"Dec" };
    let monthNumeric = new Date().getMonth() + 1;
    $(`#nowDate`).html(`${monthsNames[monthNumeric]}, ${new Date().getDate()} ${new Date().getFullYear()}  ${new Date().getHours()}:${new Date().getMinutes()}`);
  }, 1000);

  // GET SITE URL
  $($URL_).html(`<a href="${window.location.href}">${window.location.href}</a>`);
  
  // API FUNCTION CALL
  const API_ = (url) => {
    return new Promise((resolve, reject) => {
      fetch(url).then(response => {
        return resolve(response.json());
      }).then(data => {
        resolve(data);
      }).catch(err => {
        reject(err);
      });
    });
  };

  // DECIDE WHAT TO PRINT
  const decideWhatToPrint = (data, expression) => {
    let renderData    = ``;
    let recordsLength = 0;
    let commandRun    = ``;
    switch(expression) {
      case 'aboutMe':
        renderData    = `${data[expression]}`;
        recordsLength = 1;
        commandRun    = `./AboutMe`
        break;
      case 'contact':
        commandRun    = `./Contact`
        recordsLength = 1;
        renderData    = ` <div class="table-responsive">
            <table class="table table-bordered borderGreen">
              <thead>
                <tr>
                  <th>Phone Number</th>
                  <th>Mail</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><a href="tel:${data[expression].phoneNumber}">${data[expression].phoneNumber}</a></td>
                  <td><a href="mail:${data[expression].mail}">${data[expression].mail}</a></td>
                  <td>${data[expression].location}</td>
                </tr>
              </tbody>
            </table>
          </div>
        `;
        break;
      case 'education':
        commandRun    = `./Education`
        recordsLength = data[expression].length; 
        let tr = ``;
        data[expression].forEach((el) => { 
          tr += `<tr><td>${el.education}</td><td>${el.university}</td><td>${el.course}</td><td>${el.years}</td><td>${el.cgpa}</td></tr>`;
        });
        renderData = `
          <div class="table-responsive">
            <table class="table table-bordered borderGreen">
              <thead>
                <tr>
                  <th>Education</th>
                  <th>University</th>
                  <th>Course</th>
                  <th>Duration</th>
                  <th>CGPA</th>
                </tr>
              </thead>
              <tbody>
                ${tr}
              </tbody>
            </table>
          </div>
        `;
        break;
      case 'experience':
        commandRun    = `./Experience`
        recordsLength = data[expression].length;
        data[expression][data[expression].length-1].years = data[expression][data[expression].length-1].years+" "+getMonthAndYear()+" (Present)";
        let tables = ``;
        data[expression].forEach((el) => {
          tables += `<div class="table-responsive">
            <table class="table table-bordered borderGreen">
              <tr>
                <th>Designation</th>
                <td>${el.designation}</td>
              </tr>
              <tr>
                <th>Company</th>
                <td>${el.company}</td>
              </tr>
              <tr>
                <th>Location</th>
                <td>${el.location}</td>
              </tr>
              <tr>
                <th>Duration</th>
                <td>${el.years}</td>
              </tr>
              <tr>
                <th>Description</th>
                <td>${el.description}</td>
              </tr>
            </table>
          </div>`;
        });
        renderData = tables;
        break;
      case 'projects':
        commandRun    = `./Projects`
        recordsLength = data[expression].length;
        let projectsTables = ``;
        data[expression].forEach((el) => {
          let projectData = ``;
          for (const [projectName, projectLink] of Object.entries(el.projects)) {
            projectData  += `
              <tr>
                <td>${projectName}</td>
                <td><a href="${projectLink}" target="_blank">${projectLink}</a></td>
              </tr>
            `;
          }
          projectsTables += `<div class="table-responsive">
             <table class="table table-bordered borderGreen">
              <thead>
                <tr>
                  <th colspan="2">Company - ${el.company}</th>
                </tr>
              </thead>
              <tbody>
                ${projectData}
              </tbody>
            </table>
          </div>`;
        });
        renderData = projectsTables;
        break;
      case 'skills':
        commandRun      = `./Skills`
        recordsLength   = data[expression].length;
        let skillData   = ``;
        data[expression].forEach((el) => {
          skillData    += `<a href="${el.link}" target="_blank"><span class="badge m-2 rounded-pill border border-success text-success">${el.title}</span></a>`;
        });
        renderData = `<div class="d-flex">${skillData}</div>`;
        break;
      case 'languages':
        commandRun      = `./Languages`
        recordsLength   = data[expression].length;
        let langsData   = ``;
        data[expression].forEach((el) => {
          langsData    += `<span class="badge m-2 rounded-pill border border-success text-success">${el.title} ${(el.native)? "("+el.native+")": "" }</span>`;
        });
        renderData = `<div class="d-flex">${langsData}</div>`;
        break;
    }
    return { 
      renderData    : renderData, 
      commandRun    : commandRun.concat(".sh"), 
      recordsLength : recordsLength 
    };
  };

  // COMMANDS CLICKABLE
  $($LOG).on('click', $CMDS, async function(e) {
    let sendDate       = (new Date()).getTime();
    let responce       = await API_(API_ENPOINTS.RESUME);
    if (responce.data) {
      let receiveDate    = (new Date()).getTime();
      let responseTimeMs = receiveDate - sendDate;
      printData(decideWhatToPrint(responce.data, $(this).attr('rel')), responseTimeMs);
    }
  });

  // WELCOME SCREEE CLICK
  $($LOG).on('click', $PRESS_ENTER, async function(e) {
    printLog();
  });

  // CALLING NAVIGATION LINK
  $($RESUME_HTML).on('click', '.ulWidth li', async function(e) {
    let sendDate         = (new Date()).getTime();
    let responce         = await API_(API_ENPOINTS.RESUME);
    if (responce.data)   {
      let receiveDate    = (new Date()).getTime();
      let responseTimeMs = receiveDate - sendDate;
      printData(decideWhatToPrint(responce.data, $(this).attr('rel')), responseTimeMs);
    }
  });

  // PRINT DATA
  const printData = (data, responseTimeMs) => {
    $($RESUME_HTML).append(`
      <div class="row">
        <div class="col-md-10 mt-3">
          <ul class="d-flex ulWidth" type="none">
            <li rel="aboutMe">About Me</li>
            <li rel="contact">Contact Info</li>
            <li rel="education">Education</li>
            <li rel="experience">Work Experience</li>
            <li rel="projects">Projects</li>
            <li rel="skills">Skills</li>
            <li rel="languages">Languages</li>
          </ul>
          <p class="commandRun">:~ $ ${data.commandRun}</p>
          ${data.renderData} 
          <p class="responceTimeInMs">${data.recordsLength} in set (${responseTimeMs}.00 ms)</p> 
        </div>
      </div>
    `);
  }
})();



