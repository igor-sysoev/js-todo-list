const projectModule = (function(){

	let currentProject 
	let projects = []

	const setCurrentProject = (project) => {
		projectModule.currentProject = project
	}

	const projectConstructor = (title, tasks = []) => {
		return {title, tasks}
	}

	return {
			projectConstructor,
			projects,
			setCurrentProject
		}
})()

export default projectModule