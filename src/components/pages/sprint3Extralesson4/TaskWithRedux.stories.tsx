import { useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";
import { TaskType } from "./Sp3Le4TodolistStoryBook";
import { TaskWithRedux } from "./TaskWithRedux";
import { Meta, StoryObj } from "@storybook/react/*";
import { ReduxStoreProviderDecorator } from "./decorators/ReduxStoreProviderDecorator";
import { v1 } from "uuid";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof TaskWithRedux> = {
  title: "TODOLISTS/Task1",
  component: TaskWithRedux,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes

  decorators: [ReduxStoreProviderDecorator],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
};

export default meta;
type Story = StoryObj<typeof TaskWithRedux>;
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

const Task = () => {
  let task = useSelector<AppRootStateType, TaskType>(
    (state) => state.tasks["todolistId1"][0]
  );

  if (!task) task = { id: v1(), title: "DEFAULT TASK", isDone: false };

  return <TaskWithRedux task={task} todolistId={"todolistId1"} />;
};

export const Task1Story: Story = {
  render: () => <Task />,
};
