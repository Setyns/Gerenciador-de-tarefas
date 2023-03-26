tasksForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const title = tasksForm.elements.title.value;
    const description = tasksForm.elements.description.value;
  
    // Criar uma nova tarefa:
    const task = {
      id: new Date().getTime(), // ID único baseado na data/hora atual
      title,
      description
    };
    
    // Salvar a nova tarefa no LocalForage:
    localforage.setItem(`task-${task.id}`, task)
      .then(() => {
        // Adicionar a nova tarefa na lista de tarefas:
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
          <strong>${task.title}</strong>
          <p>${task.description}</p>
          <button data-task-id="${task.id}" class="edit-task">Editar</button>
          <button data-task-id="${task.id}" class="delete-task">Excluir</button>
        `;
        
        tasksList.appendChild(taskItem);
        tasksForm.reset();
        
        alert('Tarefa adicionada com sucesso!');
      })
      .catch((error) => {
        console.error('Erro ao salvar a tarefa:', error);
        alert('Erro ao salvar a tarefa.');
      });
  });
  
  tasksList.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete-task')) {
        const taskId = event.target.dataset.taskId;
        
        // Excluir a tarefa do LocalForage:
        localforage.removeItem(`task-${taskId}`)
          .then(() => {
            // Excluir a tarefa da lista de tarefas:
            const taskItem = event.target.closest('li');
            taskItem.remove();
            
            alert('Tarefa excluída com sucesso!');
          })
          .catch((error) => {
            console.error('Erro ao excluir a tarefa:', error);
            alert('Erro ao excluir a tarefa.');
          });
      }
    });

    tasksList.addEventListener('click', (event) => {
      if (event.target.classList.contains('edit-task')) {
        const taskId = event.target.dataset.taskId;
    
        // Buscar a tarefa no LocalForage:
        localforage.getItem(`task-${taskId}`)
          .then((task) => {
            // Preencher o formulário com as informações da tarefa:
            tasksForm.elements.title.value = task.title;
            tasksForm.elements.description.value = task.description;
    
            // Remover a tarefa antiga:
            localforage.removeItem(`task-${taskId}`)
              .then(() => {
                const taskItem = event.target.closest('li');
                taskItem.remove();
              })
              .catch((error) => {
                console.error('Erro ao excluir a tarefa antiga:', error);
                alert('Erro ao excluir a tarefa antiga.');
              });
          })
          .catch((error) => {
            console.error('Erro ao buscar a tarefa:', error);
            alert('Erro ao buscar a tarefa.');
          });
      }
    });
  