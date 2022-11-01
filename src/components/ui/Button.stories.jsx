import Button from "./Button";

export default {
  title: "Button component",
  component: Button,
};

const Template = (args) => <Button {...args}>Hello World</Button>;

export const Primary = Template.bind({});
Primary.args = {
  className: "w-64"
};
