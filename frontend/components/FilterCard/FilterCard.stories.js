import { IoIosCheckmarkCircle } from 'react-icons/io';
import FilterCard from "./FilterCard";

export default {
  title: "Components/FilterCard",
  component: FilterCard,
};

const Template = (args) => <FilterCard {...args} />;

export const ActiveFilter = Template.bind({});
ActiveFilter.args = { isActive: true, icon: <IoIosCheckmarkCircle size={28} />, text: "Show watched" };

export const InactiveFilter = Template.bind({});
InactiveFilter.args = { isActive: false, icon: <IoIosCheckmarkCircle size={28} />, text: "Show watched" };