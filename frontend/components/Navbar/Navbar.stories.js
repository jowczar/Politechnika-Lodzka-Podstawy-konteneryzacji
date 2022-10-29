import Navbar from "./Navbar";

export default {
  title: "Components/Navbar",
  component: Navbar,
};

const Template = (args) => <Navbar {...args} />;

export const Menu = Template.bind({});
Menu.args = { };
Menu.parameters = {
    nextRouter: {
      path: "/groups",
      asPath: "/groups",
    },
}
