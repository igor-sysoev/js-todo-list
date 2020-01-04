import projectModule from './projects'
import eventModule from './eventcontroller'
const domModule = (function(){

	const projectDiv = document.querySelector('#projectDiv')
	const taskDiv = document.querySelector('#taskDiv')
	const  projectForm = document.querySelector('.modal')
	const  titleInput = document.querySelector('.formInput')
	const formButton = document.querySelector('.addButton')

	const addClickListener = (target, fun) => {
		target.addEventListener('click', fun);
	}

	const checkIfNameExists = (name) => {
		projectModule.projects.some(project => project.title == name)
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
		})
	}

	const renderTasks = (project) => {
		project.tasks.forEach(task => {
			let infoDiv = document.createElement('div')
			infoDiv.classList.add('task')
			for(const key in task){
				let infoP = document.createElement('p')
				infoP.innerText = `${task[key]}`
				infoDiv.appendChild(infoP)
			}
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
			addEventListeners()
	}

	

	const addEventListeners = () => {
		
		let projectNames = document.querySelectorAll('.projectName')
		let projectButton = document.querySelector('#projectAdd')
		let taskButton = document.querySelector('#taskAdd')

		projectNames.forEach(name => {
			name.addEventListener('click', () => {
				eventModule.switchProject(name)
				renderAll()
				closeProjectForm()
			})
		})

		projectButton.addEventListener('click', () => {
			openProjectForm()
		}) 

		taskButton.addEventListener('click', () => {
			alert('yep, dis ones a task buton')
		})

		window.addEventListener('click', () => closeProjectForm)

		formButton.addEventListener('click', () => {
			eventModule.buildProject(titleInput.value)
			console.log(formButton)
			renderAll()
			closeProjectForm()
			console.log(projectModule.projects)
		})
	}

	return {
		renderProjects, 
		renderTasks,
		removeTasks,
		removeProjects,
		addEventListeners,
		renderAll,
	}
})()

export default domModule