import { Button } from "./Button";
import { MdLogout } from "react-icons/md";

export default {
  title: "Components/Button",
  component: Button,
};

const Template = (args) => <Button {...args}>{args.child}</Button>;
const FullWidthTemplate = (args) => (
    <div className="w-[32rem] h-[16rem] bg-darky px-[5rem]">
        <div className="bg-whitey h-full py-5">
            <Button {...args}>{args.child}</Button>
        </div>
    </div>
);

export const Primary = Template.bind({});
Primary.args = { variant: 'primary', child: 'I\'m a button' };

export const Secondary = Template.bind({});
Secondary.args = { ...Primary.args, variant: 'secondary' };

export const Disabled = Template.bind({});
Disabled.args = { ...Primary.args, disabled: true };

export const WithIcon = Template.bind({});
WithIcon.args = { ...Primary.args, variant: 'secondary', size: 'square', child: <MdLogout size={21} /> };

export const MaxWidth = FullWidthTemplate.bind({});
MaxWidth.args = { ...Primary.args, size: 'full', child: "I'm always taking up the full width of my container!" };

export const Loading = Template.bind({});
Loading.args = { ...Primary.args, isLoading: true };