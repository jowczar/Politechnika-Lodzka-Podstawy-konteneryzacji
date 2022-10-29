import MenuList from "./MenuList";

export default {
  title: "Components/Navbar/MenuList",
  component: MenuList,
};

const Template = (args) => <MenuList {...args} />;

export const AllInactive = Template.bind({});
AllInactive.args = { };

export const SingleActive = Template.bind({});
SingleActive.args = { };
SingleActive.parameters = {
    nextRouter: {
      path: "/groups",
      asPath: "/groups",
    },
}
