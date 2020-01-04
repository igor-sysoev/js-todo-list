import taskModule from './modules/tasks'
import projectModule from './modules/projects'
import domModule from './modules/domcontroller'
import eventModule from './modules/eventcontroller'

eventModule.init();

const test = document.querySelector('#testbutan')

test.addEventListener('click', function(){
	eventModule.buildProject('New ons')
	domModule.renderAll();
	console.log(projectModule.projects)
})
// const formBuilder = (function(){
// 	const buildTaskForm = () => {
// 		let taskForm = document.createElement('div')
// 		taskForm.classList.add('modal')
// 		document.body.appendChild(taskForm)
// 	}

// 	return{buildTaskForm}

// })()

