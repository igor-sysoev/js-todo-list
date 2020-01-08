import projectModule from './projects'
const taskModule = (function(){
	
	const taskConstructor = (title, description, dueDate, priority, isFinished = false, hidden = true) => {
		return{title, description, dueDate, priority, isFinished, hidden}
	}

	const deleteTask = (task) => {
			let taskId = projectModule.currentProject.tasks.indexOf(task);
			projectModule.currentProject.tasks.splice(taskId, 1)
		}

	const finishTask = (task) => {
			task.isFinished = true
	}

	const unfinishTask = (task) => {
		task.isFinished = false
	}
	return{
		taskConstructor,
		deleteTask,
		finishTask,
		unfinishTask,
	}
})()

export default taskModule