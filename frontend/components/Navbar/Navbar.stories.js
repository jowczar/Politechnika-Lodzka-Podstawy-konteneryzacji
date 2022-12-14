import Navbar from "./Navbar";

export default {
  title: "Components/Navbar",
  component: Navbar,
};

const Template = (args) => <Navbar {...args} />;

export const Menu = Template.bind({});
Menu.parameters = {
    nextRouter: {
      path: "/groups",
      asPath: "/groups",
    },
    user: { avatar: "https://i.pravatar.cc/300", email: "example@youtube.com" }
}
