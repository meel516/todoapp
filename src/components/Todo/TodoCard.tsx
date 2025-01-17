type todoCard ={
    status:"done"|"todo"|"in progress",
    title:string,
    description:string,
    dueDate:string,
    priority:"high"|"low"|"medium",
    assignedUser:string,
    id:string,
}

const TodoCard = ({status,assignedUser,description,dueDate,id,priority,title}:todoCard) => {
  return (
    <div className={`todo-card ${status}`}>
      <div className="todo-card-header">
        <h2>{title}</h2>
        <span>{status}</span>
      </div>
      <div className="todo-card-content">
        <p>{description}</p>
        <div className="todo-card-meta">
          <span>Due: {dueDate}</span>
          <span>Priority: {priority}</span>
          <span>Assigned to: {assignedUser}</span>
        </div>
      </div>
    </div>
  )
}

export default TodoCard