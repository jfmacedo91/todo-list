import { Check, Trash } from '@phosphor-icons/react'

import styles from './Task.module.css'

export interface TaskProps {
  id: string
  text: string
  isCompleted: boolean
  onCompleteTask: (id: string) => void
  onDeleteTask: (id: string) => void
}

export function Task({ id, text, isCompleted, onCompleteTask, onDeleteTask }: TaskProps) {
  function handleCompleteTask() {
    onCompleteTask(id)
  }

  function handleDeleteTask() {
    onDeleteTask(id)
  }

  return (
    <li className={ `${ styles.task } ${ isCompleted ? styles.completed : '' }` }>
      <div
        className={ styles.check }
        onClick={ handleCompleteTask }
      >
        <Check weight="bold" />
      </div> 
      <span>{ text }</span>
      <button onClick={ handleDeleteTask }>
        <Trash size={ 20 } />
      </button>
    </li>
  )
}