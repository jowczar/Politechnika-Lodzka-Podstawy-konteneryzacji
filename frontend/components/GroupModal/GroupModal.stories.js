import GroupModal from "./GroupModal";

export default {
  title: "Components/GroupModal",
  component: GroupModal,
};

const Template = (args) => <GroupModal {...args} />;

export const SimpleModal = Template.bind({});
SimpleModal.args = { };