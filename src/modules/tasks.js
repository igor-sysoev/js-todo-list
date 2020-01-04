
const taskModule = (function(){
	
	const taskConstructor = (title, description, dueDate, priority, isFinished = false) => {
		return{title, description, dueDate, priority, isFinished}
	}

	const changeTitle = (task, title) => {

	}

	return{
		taskConstructor,
	}
})()

export default taskModule