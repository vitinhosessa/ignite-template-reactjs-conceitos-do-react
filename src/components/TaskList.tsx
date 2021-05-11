import { useEffect, useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if(!newTaskTitle) return

    const task: Task = {
      id: Math.floor(Math.random() * 99999999),
      title: newTaskTitle,
      isComplete: false
    }
    
    const newTasks = [...tasks, task]

    setTasks(oldState => [...oldState, task])
    setNewTaskTitle("")
  }

  function handleToggleTaskCompletion(id: number) {
    const taskIndex = tasks.findIndex((task) => task.id === id)

    const updatedTask = [...tasks]
    updatedTask[taskIndex].isComplete = updatedTask[taskIndex].isComplete ? false : true

    setTasks(updatedTask)
  }

  function handleToggleTaskCompletionAlternative(id: number) {
    const updatedTask = tasks.map((task) => task.id === id ? {
      ...task,
      isComplete: !task.isComplete
    } : task)
    setTasks(updatedTask)
  }

  function handleRemoveTask(id: number) {
    const taskIndex = tasks.findIndex((task) => task.id === id)

    const updatedTasks = [...tasks]
    updatedTasks.splice(taskIndex, 1)

    setTasks(updatedTasks)
  }

  function handleRemoveTaskAlternative(id: number) {
    const filteredTasks = tasks.filter((task) => task.id !== id)

    setTasks(filteredTasks)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}