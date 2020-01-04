import projectModule from './projects'
import taskModule from './tasks'
import domModule from './domcontroller'

const eventModule = (function(){

		const buildProject = (title, tasks = []) => {
			let newProject = projectModule.projectConstructor(title, tasks)
			projectModule.setCurrentProject(newProject)
			projectModule.projects.push(newProject);
		}

		const buildTask = (title, description, dueDate, priority, isFinished = false) => {
			let newTask = taskModule.taskConstructor(title, description, dueDate, priority, isFinished)
			projectModule.currentProject.tasks.push(newTask)
		}

		const switchProject = (target) => {
		let thisProject = projectModule.projects.filter(project => project.title == target.innerText)[0]
		console.log(thisProject)
		console.log(projectModule)
		projectModule.setCurrentProject(thisProject)
	}

		const init = () => {
			eventModule.buildProject('Test empty');
			eventModule.buildTask('Sleep', 'Get a good night of sleep', '25.01.2001', 'Low')

			eventModule.buildProject('New Project');

			eventModule.buildTask('Clean da dishez', 'clean dishes after the party', '24.01.2001', 'High')
			eventModule.buildTask('Work out', 'Do a few excercises from my program', '5.02.2001', 'Medium')
			eventModule.buildTask('Sleep', 'Get a good night of sleep', '25.01.2001', 'Low')

			domModule.renderAll()
		}
	return {
		buildProject,
		buildTask,
		init,
		switchProject,
	}
})()

export default eventModule 