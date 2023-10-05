import { ClipboardText } from '@phosphor-icons/react'

import styles from './Empty.module.css'

export function Empty() {
  return (
    <div className={ styles.empty }>
      <ClipboardText weight='light' size={ 60 } />
      <strong>Você ainda não tem tarefas cadastradas</strong>
      <span>Crie tarefas e organize seus itens a fazer</span>
    </div>
  )
}