import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import styles from "./TaskList.module.css";

type Task = {
  id: number;
  text: string;
};

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setNewTask(e.target.value);

  const handleAddTask = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = newTask.trim();
    if (!trimmed) return;

    setTasks((prev) => [...prev, { id: Date.now(), text: trimmed }]);
    setNewTask("");
  };

  const handleDeleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Список задач [To-Do List]</h2>

      <form onSubmit={handleAddTask} className={styles.form}>
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Введите новую задачу"
          className={styles.input}
        />
        <button type="submit" className={styles.buttonAdd}>
          Добавить
        </button>
      </form>

      {tasks.length === 0 ? (
        <p className={styles.emptyMessage}>Список задач пуст</p>
      ) : (
        <ul className={styles.list}>
          {tasks.map(({ id, text }) => (
            <li key={id} className={styles.listItem}>
              <span>{text}</span>
              <button
                onClick={() => handleDeleteTask(id)}
                className={styles.buttonDelete}
                type="button"
              >
                Удалить
              </button> 
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
 
