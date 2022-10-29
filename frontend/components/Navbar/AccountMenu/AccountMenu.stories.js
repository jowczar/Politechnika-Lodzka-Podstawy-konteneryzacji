import AccountMenu from "./AccountMenu";

export default {
  title: "Components/Navbar/AccountMenu",
  component: AccountMenu,
};

const Template = (args) => <div className="flex items-center justify-center vh-full vw-full"><AccountMenu {...args} /></div>;

export const Menu = Template.bind({});
Menu.parameters = { user: { avatar: "https://i.pravatar.cc/300", email: "example@youtube.com" } };