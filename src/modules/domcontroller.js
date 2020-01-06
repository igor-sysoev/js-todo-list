import projectModule from './projects'
import eventModule from './eventcontroller'
import taskModule from './tasks'
const domModule = (function(){

	const projectDiv = document.querySelector('#projectDiv')
	const taskDiv = document.querySelector('#taskDiv')
	const projectForm = document.querySelector('.modal')
	const formButton = document.querySelector('.addButton')
	const titleInput = document.querySelector('.formInput')

	const projectButton = document.querySelector('#projectAdd')
	const taskButton = document.querySelector('#taskAdd')


	const addClickListener = (target, fun) => {
		target.addEventListener('click', fun);
	}

	const checkIfNameExists = (name) => {
		 return projectModule.projects.some(project => project.title == name)
	}

	const throwError = (msg) => {

	}

	const openProjectForm = () => {
		projectForm.style.height = '100px'
		titleInput.style.height = '10px'
		titleInput.style.padding = '15px 10px'
		formButton.style.opacity = '100'
	}

	const closeProjectForm = () => {
		projectForm.style.height = '0px'
		titleInput.style.height = '0px'
		titleInput.style.padding = '0'
		formButton.style.opacity = '0'
	}

	const renderProjects = (projects) => {
		projects.forEach(project =>{
			let projectTitle = document.createElement('p')
			projectTitle.classList.add('projectName')
			projectTitle.innerText = project.title
			projectDiv.appendChild(projectTitle)

			projectTitle.addEventListener('click', function(){
				eventModule.switchProject(projectTitle)
				renderAll()
				closeProjectForm()
			})

		})
	}

	const checkTaskStatus = (key, obj, div) => {
		if(obj[key] == true) div.classList.add('finished')
		else div.classList.remove('finished')
	}

	const findCurrentTask = (div) => {
		let taskName = div.querySelector('h3').innerText
		return projectModule.currentProject.tasks.filter(task => task.title == taskName)[0]
	}

	const buildIcons = (div) => {
		let deleteIcon = document.createElement('i')
		let finishIcon = document.createElement('i')
		deleteIcon.classList.add('fas', 'fa-times', 'closeIcon')
		finishIcon.classList.add('fas', 'fa-check')
		div.appendChild(deleteIcon)
		div.appendChild(finishIcon)
		
		let currentTask = findCurrentTask(div)

		deleteIcon.addEventListener('click', () => {
			taskModule.deleteTask(currentTask)
			renderAll()
		})

		finishIcon.addEventListener('click', () => {
			eventModule.toggleTaskStatus(currentTask)
			renderAll()
		})
	}

	const buildTaskElement = (key, obj, div) => {
		let element

		switch(key){
			case 'title':
				element = document.createElement('h3')
				element.innerText = obj[key]
				break;
			case 'description':
				element = document.createElement('p')
				element.classList.add('description')
				element.innerText = obj[key]
				break;
			case 'dueDate':
				element = document.createElement('p')
				element.classList.add('dueDate', 'smallInfo')
				element.innerText = `Due: ${obj[key]}`
				break;
			case 'priority':
				element = document.createElement('p')
				element.classList.add('priority', 'smallInfo')
				element.innerText = `Priority: ${obj[key]}`
			break;
			case 'isFinished':
				element = document.createElement('p')
				element.classList.add('isDone', 'smallInfo')
				if(obj[key] == true) element.innerText = 'Done'
				else element.innerText = 'In Progress'
			break;
		}
			return element
	}
		
	const renderTasks = (project) => {
		project.tasks.forEach(task => {
			let infoDiv = document.createElement('div')
			infoDiv.classList.add('task')
			for(const key in task){
				if(key == 'isFinished') checkTaskStatus(key, task, infoDiv)
				let taskElement = buildTaskElement(key, task)
				infoDiv.appendChild(taskElement)
			}
			buildIcons(infoDiv)
			taskDiv.appendChild(infoDiv);
		})
	}

	const removeTasks = () => {
		const tasks = document.querySelectorAll('.task')
		tasks.forEach(task => taskDiv.removeChild(task))
	}

	const removeProjects = () => {
		const projects = document.querySelectorAll('.projectName')
		projects.forEach(project => projectDiv.removeChild(project))
	}

	const renderAll = () => {
			removeProjects()
			removeTasks()
			renderTasks(projectModule.currentProject)
			renderProjects(projectModule.projects)
			eventModule.updateLocalStorage()
	}


	projectButton.addEventListener('click', () => {
		openProjectForm()
	}) 

	taskButton.addEventListener('click', () => {
		alert('tst')
	})

	formButton.addEventListener('click', () => {
		if(checkIfNameExists(titleInput.value)) alert('Please choose a non-existing name')
		else eventModule.buildProject(titleInput.value)
		renderAll()
		closeProjectForm()
	});

	return {
		renderProjects, 
		renderTasks,
		removeTasks,
		removeProjects,
		renderAll,
	}
})()

export default domModule