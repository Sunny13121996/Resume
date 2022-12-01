const mode = {
  	get dark  () {
  		Logger(`DARK MODE APPLIED!`, `warning`);
  		$(".terminalWindowTab").removeClass('bg-light').removeClass('bg-dark');
  		$(".terminalWindowTab").css('color','#FFF');
  		$(".terminalWindowTab .terminalControls").css('--bs-list-group-bg', '#2a2d30');
  	},
  	get light () {
  		Logger(`LIGHT MODE APPLIED!`, `warning`);
  		$(".terminalWindowTab").removeClass('bg-dark').addClass('bg-light');
  		$(".terminalWindowTab").css('color','#333');
  		$(".terminalWindowTab .terminalControls").css('--bs-list-group-bg', '#FFF');
  	}
};	