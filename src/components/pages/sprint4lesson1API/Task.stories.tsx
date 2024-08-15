import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Task } from "./Task";
import { fn } from "@storybook/test";
import { useState } from "react";

// More on how to set up stories at:
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
  title: "TODOLISTS/Task",
  component: Task,
  // This component will have an automatically generated Autodocs entry:
  // https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  args: {
    changeTaskStatus: action("Status changed inside Task"),
    changeTaskTitle: action("Title changed inside Task"),
    removeTask: action("Remove Button clicked changed inside Task"),
    task: { id: "12wsdewfijdei", title: "JS", isDone: false },
    todolistId: "fgdosrg8rgjuh",
  },
};

export default meta;
type Story = StoryObj<typeof Task>;

// More on component templates:
// https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const TaskIsNotDoneStory: Story = {};

export const TaskIsDoneStory: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    task: { id: "12wsdewfijdei2343", title: "CSS", isDone: true },
  },
};

const ToggleTask = () => {

  const [task, setTask] = useState({ id: "12wsdewfijdei2343", title: "CSS", isDone: true });

  function changeTaskStatus () {
    setTask({...task, isDone: !task.isDone})
  }

  function changeTaskTitle(taskId: string, newTitle: string) {
    setTask({ ...task, title: newTitle });
  }

  return (
    <Task
      changeTaskStatus={changeTaskStatus}
      changeTaskTitle={changeTaskTitle}
      removeTask={action('removeTask')}
      task={task}
      todolistId=""
    />
  );
}

export const ToggleTaskStory: Story = {
  render: () => <ToggleTask />
}
