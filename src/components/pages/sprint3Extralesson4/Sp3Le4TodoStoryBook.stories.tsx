import type { Meta, StoryObj } from "@storybook/react";
import { Sp3Le4TodoStoryBook } from "./Sp3Le4TodoStoryBook";
import { ReduxStoreProviderDecorator } from "./decorators/ReduxStoreProviderDecorator";

// More on how to set up stories at:
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Sp3Le4TodoStoryBook> = {
  title: "TODOLISTS/AppWithRedux",
  component: Sp3Le4TodoStoryBook,
  // This component will have an automatically generated Autodocs entry:
  // https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  decorators: [ReduxStoreProviderDecorator],
};

export default meta;
type Story = StoryObj<typeof Sp3Le4TodoStoryBook>;

// More on component templates:
// https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const AppWithReduxStory: Story = {};
