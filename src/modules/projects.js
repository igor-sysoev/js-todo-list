const projectModule = (function(){

	let currentProject 
	let projects = []

	const setCurrentProject = (project) => {
		projectModule.currentProject = project
	}

	const projectConstructor = (title, tasks = []) => {
		return {title, tasks}
	}

	const deleteProject = (project) => {
		let projectId = projectModule.projects.indexOf(project);
		projectModule.projects.splice(projectId, 1)
	}

	const checkIfNameExists = (name) => {
		 return projects.some(project => project.title == name)
	}
	return {
			projectConstructor,
			projects,
			setCurrentProject,
			deleteProject,
			checkIfNameExists,
		}
})()

export default projectModule