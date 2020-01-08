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
			projectModule.setCurrentProject(thisProject)
		}

		const toggleTaskStatus = (currentTask) => {
			switch(currentTask.isFinished){
				case true:
				taskModule.unfinishTask(currentTask)
				break;
				case false:
				taskModule.finishTask(currentTask)
			}
		}

		const buildDefaultProjects = () => {
			eventModule.buildProject('Test empty');
			eventModule.buildTask('Sleep', 'Get a good night of sleep', '25.01.2001', 'Low', true)

			eventModule.buildProject('New Project');

			eventModule.buildTask('Clean the dishes', 'clean dishes after the party', '15.01.2020', 'High')
			eventModule.buildTask('Work out', 'Do a few excercises from my program', '15.01.2020', 'Medium')
			eventModule.buildTask('Sleep', 'Get a good night of sleep', '25.01.2020', 'Low')
		}
		const updateLocalStorage = () => {
			localStorage.setItem('localProjects', JSON.stringify(projectModule.projects))
			localStorage.setItem('currentProject', JSON.stringify(projectModule.currentProject))
		}

		const startFromLocalStorage = () => {
			projectModule.projects = JSON.parse(localStorage.getItem('localProjects'));
			projectModule.currentProject = JSON.parse(localStorage.getItem('currentProject'))
		}
		const init = () => {
			buildDefaultProjects()
			domModule.renderAll()
		}
	return {
		buildProject,
		buildTask,
		init,
		switchProject,
		toggleTaskStatus,
		updateLocalStorage,
	}
})()

export default eventModule 

//if(localStorage.getItem('localProjects')) startFromLocalStorage()
			//else 