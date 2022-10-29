import Navbar from "./Navbar";

export default {
  title: "Components/Navbar",
  component: Navbar,
};

const Template = (args) => <Navbar {...args} />;

export const Menu = Template.bind({});
Menu.args = { user: { avatar: "https://i.pravatar.cc/300" } };
Menu.parameters = {
    nextRouter: {
      path: "/groups",
      asPath: "/groups",
    },
}
