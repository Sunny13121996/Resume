const MODE = {
  	get DARK  () {
  		clear();
  		Logger(`DARK MODE APPLIED!`, `warning`);
  		$(".terminalWindowTab").removeClass('bg-light').removeClass('bg-dark');
  		$(".terminalWindowTab").css('color','#FFF');
  		$(".terminalWindowTab .terminalControls").css('--bs-list-group-bg', '#2a2d30');
  		// $(".terminalConsole").css('background-image', 'linear-gradient(to right top, #212529, #24272b, #262a2d, #292c30, #2c2f32)');
  	},
  	get LIGHT () {
  		clear();
  		Logger(`LIGHT MODE APPLIED!`, `warning`);
  		$(".terminalWindowTab").removeClass('bg-dark').addClass('bg-light');
  		$(".terminalWindowTab").css('color','#333');
  		$(".terminalWindowTab .terminalControls").css('--bs-list-group-bg', '#FFF');
  		// background-image: linear-gradient(to left bottom, #cdcdcd, #d7d9da, #e0e5e5, #ebf1ee, #fafcf6);
  	}
};
const clear = () => {
  	console.clear();
}