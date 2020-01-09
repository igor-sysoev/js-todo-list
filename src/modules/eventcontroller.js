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

		const getFormValues = (formDiv) => {
			const inputs = formDiv.querySelectorAll('input')
			const selects = formDiv.querySelectorAll('select')
			const valArr = []
			inputs.forEach(input => valArr.push(input.value))
			selects.forEach(select => valArr.push(select.value))
			return valArr
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
			eventModule.buildProject('Learn To do It!');
			eventModule.buildTask('Build a new task', 'Press the cross near the Projects heading to add your first task!', 'Now', 'High')
			eventModule.buildTask('Build a new Project', 'Press the folder near the Projects heading to add your first project!', 'Now', 'High')
			eventModule.buildTask('Finish a task', 'Get that finished! Press the checkmark to mark your work done! Dont worry, your progress is saved, so you can track all your finished tasks!', 'Now', 'High')
			eventModule.buildTask('Give up!', 'Lets admit it; you were never going to make it in the first place. Press the cross near your task to delete the task and the shame that comes with giving up!', 'Now', 'High')
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
			if(localStorage.getItem('localProjects')) startFromLocalStorage()
			else buildDefaultProjects()
			domModule.renderAll()
		}
	return {
		buildProject,
		buildTask,
		init,
		switchProject,
		toggleTaskStatus,
		updateLocalStorage,
		getFormValues,
	}
})()

export default eventModule 

//if(localStorage.getItem('localProjects')) startFromLocalStorage()
			//else 