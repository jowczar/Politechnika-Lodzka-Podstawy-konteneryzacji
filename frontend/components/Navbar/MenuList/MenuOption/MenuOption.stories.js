import { HiOutlineLightBulb } from "react-icons/hi";
import MenuOption from "./MenuOption";

export default {
  title: "Components/MenuOption",
  component: MenuOption,
};

const Template = (args) => <MenuOption {...args}>{args.child}</MenuOption>;

export const MenuOptionInactive = Template.bind({});
MenuOptionInactive.args = { isActive: false, child: <><HiOutlineLightBulb size={24} /><span>Groups</span></> };

export const MenuOptionActive = Template.bind({});
MenuOptionActive.args = { isActive: true, child: <><HiOutlineLightBulb size={24} /><span>Groups</span></> };
