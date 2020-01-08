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


	const toggleTaskHide = (currentTask, hideables, smallInfo) => {
			if(currentTask.hidden == false){
				changeDisplay(hideables, 'none')
				currentTask.hidden = true;
			}else{
				changeDisplay(hideables, 'block')
				changeDisplay(smallInfo, 'inline-block')
				currentTask.hidden = false
			}
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

	const createTaskButton = () => {
		let taskButton = document.createElement('button')
		taskButton.setAttribute('id', 'addTask');
	}

	const setActiveStyle = (elem, selector) => {
		const allStuff = document.querySelectorAll(selector)
		allStuff.forEach(stuff => stuff.classList.remove(selector))
		elem.classList.add(selector)
	}

	const renderProjects = (projects) => {
		projects.forEach(project =>{
			let nameDiv = document.createElement('div')
			let projectTitle = document.createElement('p')
			let deleteProject = document.createElement('i')

			nameDiv.classList.add('nameDiv')
			deleteProject.classList.add('fas', 'fa-trash', 'projectDel')
			projectTitle.classList.add('projectName')
			projectTitle.innerText = project.title

			nameDiv.appendChild(projectTitle)
			nameDiv.appendChild(deleteProject)
			projectDiv.appendChild(nameDiv)

			projectTitle.addEventListener('click', function(){
				eventModule.switchProject(projectTitle)
				renderAll()
				closeProjectForm()
			})

			deleteProject.addEventListener('click', function(){
				projectModule.deleteProject(project)
				projectModule.setCurrentProject(projectModule.projects[projectModule.projects.length - 1])
				renderAll();
			})

		})
	}

	const findCurrentTask = (div) => {
		let taskName = div.querySelector('h3').innerText
		return projectModule.currentProject.tasks.filter(task => task.title == taskName)[0]
	}

	const checkTaskStatus = (task, div) => {
		let hideables = div.querySelectorAll('.hideable')
		let smallInfo = div.querySelectorAll('.smallInfo')
			if(task.hidden){
				changeDisplay(hideables, 'none')
			}else{
				changeDisplay(hideables, 'block')
				changeDisplay(smallInfo, 'inline-block')
			}

			if(task.isFinished){
				div.classList.add('finished')
			}else{
				div.classList.remove('finished')
			}
	}

	const changeDisplay = (nodes, display) => {
		nodes.forEach(node => node.style.display = display)
	}

	const buildIcons = (div) => {
		let deleteIcon = document.createElement('i')
		let finishIcon = document.createElement('i')
		let expandIcon = document.createElement('i')
		expandIcon.classList.add('fas','fa-caret-right', 'expandIcon')
		deleteIcon.classList.add('fas', 'fa-times', 'closeIcon')
		finishIcon.classList.add('fas', 'fa-check')
		div.appendChild(deleteIcon)
		div.appendChild(finishIcon)
		div.appendChild(expandIcon)

		let currentTask = findCurrentTask(div)

		deleteIcon.addEventListener('click', () => {
			taskModule.deleteTask(currentTask)
			renderAll()
		})

		finishIcon.addEventListener('click', () => {
			eventModule.toggleTaskStatus(currentTask)
			renderAll()
		})

		expandIcon.addEventListener('click', () => {
			let hideables = div.querySelectorAll('.hideable')
			let smallInfo = div.querySelectorAll('.smallInfo')
			toggleTaskHide(currentTask, hideables, smallInfo)
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
				element.classList.add('description', 'hideable')
				element.innerText = obj[key]
				break;
			case 'dueDate':
				element = document.createElement('p')
				element.classList.add('dueDate', 'smallInfo', 'hideable')
				element.innerText = `Due: ${obj[key]}`
				break;
			case 'priority':
				element = document.createElement('p')
				element.classList.add('priority', 'smallInfo', 'hideable')
				element.innerText = `Priority: ${obj[key]}`
			break;
			case 'isFinished':
				element = document.createElement('p')
				element.classList.add('isDone', 'smallInfo', 'hideable')
				if(obj[key] == true) element.innerText = 'Done'
				else element.innerText = 'In Progress'
			break;
		}
			return element
	}

	const buildAddTaskButton = (div) => {
		if(!div.querySelector('.taskAdd')){
			let taskButton = document.createElement('button')
			taskButton.textContent = 'New Task'
			taskButton.classList.add('taskAdd')
			div.appendChild(taskButton)
		}
	} 
		
	const renderTasks = (project) => {
		project.tasks.forEach(task => {
			let infoDiv = document.createElement('div')
			infoDiv.classList.add('task')
			for(const key in task){
				if(key == 'hidden' || key == 'isFinished') continue;
				let taskElement = buildTaskElement(key, task)
				infoDiv.appendChild(taskElement)
			}
			checkTaskStatus(task, infoDiv)
			buildIcons(infoDiv)
			buildAddTaskButton(projectDiv)
			taskDiv.appendChild(infoDiv)
		})
	}

	const removeNodes = (div, className) => {
		const nodes = document.querySelectorAll(className)
		nodes.forEach(node => div.removeChild(node))
	}

	const renderAll = () => {
			removeNodes(projectDiv, '.nameDiv')
			removeNodes(taskDiv, '.task')
			renderTasks(projectModule.currentProject)
			renderProjects(projectModule.projects)
			eventModule.updateLocalStorage()
	}


	projectButton.addEventListener('click', () => {
		openProjectForm()
	}) 

	formButton.addEventListener('click', () => {
		if(projectModule.checkIfNameExists(titleInput.value) || titleInput.value == '') return;
		else eventModule.buildProject(titleInput.value)
		renderAll()
		closeProjectForm()
	});

	return {
		renderProjects, 
		renderTasks,
		renderAll,
	}
})()

export default domModule