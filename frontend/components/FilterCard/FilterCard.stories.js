import FilterCard from "./FilterCard";

export default {
  title: "Components/FilterCard",
  component: FilterCard,
};

const Template = (args) => <FilterCard {...args} />;

export const ActiveFilter = Template.bind({});
ActiveFilter.args = { isActive: true };

export const InactiveFilter = Template.bind({});
InactiveFilter.args = { isActive: false };