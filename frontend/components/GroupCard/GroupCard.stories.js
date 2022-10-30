import GroupCard from "./GroupCard";
import { subMinutes } from 'date-fns'

export default {
  title: "Components/GroupCard",
  component: GroupCard,
};

const Template = (args) => <GroupCard {...args} />;

export const AllSeenGroup = Template.bind({});
AllSeenGroup.args = { id: 1, name: 'Biologia 🌳', lastUpdate: subMinutes(new Date(), 60*5), newContent: false, isSelected: false }

export const NewContentInactiveGroup = Template.bind({});
NewContentInactiveGroup.args = { id: 1, name: 'Biologia 🌳', lastUpdate: subMinutes(new Date(), 60*5), newContent: true, isSelected: false }

export const NewContentActiveGroup = Template.bind({});
NewContentActiveGroup.args = { id: 1, name: 'Biologia 🌳', lastUpdate: subMinutes(new Date(), 60*5), newContent: true, isSelected: true }

export const NoContentGroup = Template.bind({});
NoContentGroup.args = { id: 1, name: 'Biologia 🌳', lastUpdate: null, newContent: false, isSelected: false }