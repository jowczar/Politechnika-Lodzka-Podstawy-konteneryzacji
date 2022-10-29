import Search from "./Search";

export default {
  title: "Components/Search",
  component: Search,
};

const Template = (args) => <Search {...args} />;

export const SearchBar = Template.bind({});
SearchBar.args = { }