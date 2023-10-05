import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { PlusCircle } from '@phosphor-icons/react'

import { Empty } from './Empty'
import { Task } from './Task'

import styles from './Tasks.module.css'

interface newTaskProps {
  id: string
  text: string
  isCompleted: boolean
}

export function Tasks() {
  const [newTaskText, setNewTaskText] = useState('')
  const [tasks, setTasks] = useState<newTaskProps[]>([])

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    setNewTaskText(event.target.value)
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!!!')
  }

  function handleFormSubmit(event: FormEvent) {
    event.preventDefault()

    const newTask = {
      id: uuidv4(),
      text: newTaskText,
      isCompleted: false
    }

    setTasks([newTask, ...tasks])
    setNewTaskText('')
  }

  function completeTask(id: string) {
    setTasks(tasks.map(task => {
      if(task.id === id) task.isCompleted = !task.isCompleted
      return task
    }))
  }

  function deleteTask(id: string) {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const isNewTastTextEmpty = newTaskText.length === 0

  const completedTasts = tasks.filter(task => task.isCompleted).length

  return (
    <main>
      <form
        onSubmit={ handleFormSubmit }
        className={ `${ styles.container }
        ${ styles.form }` }
      >
        <input
          className={ styles.input }
          type="text"
          placeholder="Adicione uma nova tarefa"
          onChange={ handleNewTaskChange }
          onInvalid={ handleNewTaskInvalid }
          value={ newTaskText }
          required
        />
        <button
          type="submit"
          className={ styles.button }
          disabled={ isNewTastTextEmpty }
        >
          Criar
          <PlusCircle weight="bold" size={ 18 } />
        </button>
      </form>
      <header className={ `${ styles.container } ${ styles.header }` }>
        <strong className={ styles.created }>
          Tarefas criadas
          <span>{ tasks.length }</span>
        </strong>
        <strong className={ styles.done }>
          Concluídas
          <span>{ completedTasts } de { tasks.length }</span>
        </strong>
      </header>
      { tasks.length === 0 ? (
        <Empty />
      ) : (
        <ul className={ `${ styles.container } ${ styles.list }` }>
          { tasks.map(task => (
            <Task
              key={ task.id }
              id={ task.id }
              text={ task.text }
              isCompleted={ task.isCompleted }
              onCompleteTask={ completeTask }
              onDeleteTask={ deleteTask }
            />
          )) }
        </ul>
      ) }
    </main>
  )
}