import { HiOutlineLightBulb } from "react-icons/hi";
import MenuOption from "./MenuOption";

export default {
  title: "Components/Navbar/MenuList/MenuOption",
  component: MenuOption,
};

const Template = (args) => <MenuOption {...args}>{args.child}</MenuOption>;

export const Inactive = Template.bind({});
Inactive.args = { isActive: false, child: <><HiOutlineLightBulb size={24} /><span>Groups</span></> };

export const Active = Template.bind({});
Active.args = { isActive: true, child: <><HiOutlineLightBulb size={24} /><span>Groups</span></> };
