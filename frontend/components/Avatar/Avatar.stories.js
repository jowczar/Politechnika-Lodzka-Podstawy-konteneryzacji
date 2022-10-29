import Avatar from "./Avatar";

export default {
  title: "Components/Avatar",
  component: Avatar,
};

const Template = (args) => <div className="h-40 w-40"><Avatar {...args} /></div>;

export const Circle = Template.bind({});
Circle.args = { link: "https://i.pravatar.cc/300" };

export const NoLink = Template.bind({});
NoLink.args = { link: null };
